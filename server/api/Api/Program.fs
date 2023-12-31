﻿module MorPhoto

module Env =
    open System

    type Env = {
        ENVIRONMENT: string
        DB_HOST: string
        DB_USER: string
        DB_PASSWORD: string
        DB_DATABASE: string
        CLIENT_URL: string
        GCP_CREDENTIALS: string
        GCP_BUCKET_NAME: string
        GCS_URL: string
        ML_URL: string
    }

    let env =
        if
            Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") = "Development"
        then
            DotNetEnv.Env.Load("../../.env.local") |> ignore

        let ENVIRONMENT = Environment.GetEnvironmentVariable("ENVIRONMENT")

        let DB_HOST =
            if
                Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") = "Development"
            then
                "localhost"
            else
                // コンテナ内間通信ではlocalhostを指定できない
                Environment.GetEnvironmentVariable("DB_HOST")

        let DB_USER = Environment.GetEnvironmentVariable("DB_USER")
        let DB_PASSWORD = Environment.GetEnvironmentVariable("DB_PASSWORD")
        let DB_DATABASE = Environment.GetEnvironmentVariable("DB_DATABASE")
        let CLIENT_URL = Environment.GetEnvironmentVariable("CLIENT_URL")

        let GCP_CREDENTIALS =
            Environment.GetEnvironmentVariable("GCP_CREDENTIALS")

        let GCP_BUCKET_NAME =
            Environment.GetEnvironmentVariable("GCP_BUCKET_NAME")

        let GCS_URL = Environment.GetEnvironmentVariable("GCS_URL")

        let ML_URL =
            if
                Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") = "Development"
            then
                "http://localhost:8000"
            else
                // コンテナ名をホスト名として扱う
                Environment.GetEnvironmentVariable("ML_URL")

        {
            ENVIRONMENT = ENVIRONMENT
            DB_HOST = DB_HOST
            DB_USER = DB_USER
            DB_PASSWORD = DB_PASSWORD
            DB_DATABASE = DB_DATABASE
            CLIENT_URL = CLIENT_URL
            GCP_CREDENTIALS = GCP_CREDENTIALS
            GCP_BUCKET_NAME = GCP_BUCKET_NAME
            GCS_URL = GCS_URL
            ML_URL = ML_URL
        }

    let dbEnv: Infra.Database.DBEnv = {
        IS_DEV = env.ENVIRONMENT = "test" || env.ENVIRONMENT = "local"
        DB_HOST = env.DB_HOST
        DB_USER = env.DB_USER
        DB_PASSWORD = env.DB_PASSWORD
        DB_DATABASE = env.DB_DATABASE
    }

    let GCS_ENV: Infra.GCS.GCS_ENV = {
        GCP_CREDENTIALS = env.GCP_CREDENTIALS
        GCP_BUCKET_NAME = env.GCP_BUCKET_NAME
        GCS_URL = env.GCS_URL
    }

    let ML_ENV: Infra.ML.MLEnv = { ML_URL = env.ML_URL }

module Program =

    open Falco
    open Falco.Routing
    open Falco.HostBuilder
    open Microsoft.Extensions.DependencyInjection
    open Domain

    [<EntryPoint>]
    let main _ =

        webHost [||] {

            add_service (fun (svc: IServiceCollection) ->
                svc.AddSingleton<StatusRepo>(fun _ ->
                    Infra.Database.statusRepo Env.dbEnv))

            add_service (fun (svc: IServiceCollection) ->
                svc.AddSingleton<MorphotoRepo>(fun _ ->
                    Infra.Database.morphotoRepo Env.dbEnv))

            use_cors "CorsPolicy" (fun options ->
                options.AddPolicy(
                    "CorsPolicy",
                    fun builder ->
                        builder.AllowAnyHeader() |> ignore
                        builder.AllowAnyMethod() |> ignore

                        builder
                            .WithOrigins(
                                [|
                                    Env.env.CLIENT_URL
                                    "https://morphoto.app"
                                    "http://localhost:3000"
                                |]
                            )
                            .AllowCredentials()
                        |> ignore
                ))


            endpoints [
                get "/health" (Response.ofJson {| env = Env.env.ENVIRONMENT |})
                get "/health/ml" (Handler.Morphoto.healthML Env.ML_ENV)
                post "/status/{parent_id}" Handler.Morphoto.registerStatus
                get "/status/{parent_id}" Handler.Morphoto.getStatus
                get "/morphoto/{parent_id}" Handler.Morphoto.getMorphoto
                get "/morphoto/all" Handler.Morphoto.getAllMorphotos
                post "/morphoto" Handler.Morphoto.registerMorphoto
                post "/gcs" (Handler.GCS.register Env.GCS_ENV)
                get "/gcs/{id}" (Handler.GCS.get Env.GCS_ENV)
                post
                    "/inference/{id}"
                    (Handler.Morphoto.inference (Env.GCS_ENV, Env.ML_ENV))

            ]

        }

        0
