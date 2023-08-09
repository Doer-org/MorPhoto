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
                Environment.GetEnvironmentVariable("DB_HOST") // コンテナ内間通信ではlocalhostを指定できない

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
            member _.CLIENT_URL = CLIENT_URL
        }

    let dbEnv: Infra.Database.DBEnv = {
        IS_DEV = env.ENVIRONMENT = "test" || env.ENVIRONMENT = "local"
        DB_HOST = env.DB_HOST
        DB_USER = env.DB_USER
        DB_PASSWORD = env.DB_PASSWORD
        DB_DATABASE = env.DB_DATABASE
    }


module Program =

    open Falco
    open Falco.Routing
    open Falco.HostBuilder
    open Microsoft.Extensions.DependencyInjection
    open Service

    [<EntryPoint>]
    let main _ =

        webHost [||] {
            add_service (fun (svc: IServiceCollection) ->
                svc.AddSingleton<Infra.Repo.UserRepo>(fun _ ->
                    Infra.Database.userRepo Env.dbEnv))


            add_service (fun (svc: IServiceCollection) ->
                svc.AddSingleton<Infra.Repo.MorphotoRepo>(fun _ ->
                    Infra.Database.morphotoRepo Env.dbEnv))

            use_cors "CorsPolicy" (fun options ->
                options.AddPolicy(
                    "CorsPolicy",
                    fun builder ->
                        builder.AllowAnyHeader() |> ignore
                        builder.AllowAnyMethod() |> ignore

                        builder
                            .WithOrigins(Env.env.CLIENT_URL)
                            .AllowCredentials()
                        |> ignore
                ))


            endpoints [
                get "/health" (Response.ofJson {| env = Env.env.ENVIRONMENT |})
                get "/users" Handler.getAllUsers
                get "/morphoto/{morphoto_id}" Handler.getMorphoto
                // TODO: 検索条件（検索条件: 閲覧回数, 最新）を指定できるようにする
                get "/morphoto" Handler.getMorphotos
                post "/morphoto" Handler.registerMorphoto
                get "/timeline" Handler.getTimeline
                get "/log/{morphoto_id}" Handler.getLog
            ]

        }

        0
