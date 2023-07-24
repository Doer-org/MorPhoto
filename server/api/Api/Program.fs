module MorPhoto

module Env =
    open System

    type IEnv =
        abstract member ENVIRONMENT: string
        abstract member DB_HOST: string
        abstract member DB_USER: string
        abstract member DB_PASSWORD: string
        abstract member DB_DATABASE: string
        abstract member CLIENT_URL: string

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
                Environment.GetEnvironmentVariable("DB_HOST")

        let DB_USER = Environment.GetEnvironmentVariable("DB_USER")
        let DB_PASSWORD = Environment.GetEnvironmentVariable("DB_PASSWORD")
        let DB_DATABASE = Environment.GetEnvironmentVariable("DB_DATABASE")
        let CLIENT_URL = Environment.GetEnvironmentVariable("CLIENT_URL")

        { new IEnv with
            member _.ENVIRONMENT = ENVIRONMENT
            member _.DB_HOST = DB_HOST
            member _.DB_USER = DB_USER
            member _.DB_PASSWORD = DB_PASSWORD
            member _.DB_DATABASE = DB_DATABASE
            member _.CLIENT_URL = CLIENT_URL }

    let dbEnv: Infra.Database.DBEnv =
        { DB_HOST = env.DB_HOST
          DB_USER = env.DB_USER
          DB_PASSWORD = env.DB_PASSWORD
          DB_DATABASE = env.DB_DATABASE }


module Program =

    open Falco
    open Falco.Routing
    open Falco.HostBuilder

    open Microsoft.Extensions.DependencyInjection

    [<EntryPoint>]
    let main _ =

        webHost [||] {
            add_service (fun (svc: IServiceCollection) ->
                svc.AddSingleton<Infra.Repo.UserRepo>(fun _ ->
                    Infra.Database.userRepo Env.dbEnv))

            endpoints
                [ get "/health" (Response.ofPlainText "ok")
                  get "/" Service.Handler.getAllUsers ]

        }

        0
