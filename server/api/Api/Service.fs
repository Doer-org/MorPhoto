module Service

open Domain
open Infra.Repo

module Usecase =
    open FsToolkit.ErrorHandling

    let getAllUsers (userRepo: UserRepo) =
        result {
            let! users = userRepo.users ()
            users |> printfn "%A"
            return users
        }

    let registerMorphoto (morphoto: Morphoto) (morphotoRepo: MorphotoRepo) =
        taskResult {
            let! morphoto = morphotoRepo.register morphoto
            return morphoto
        }

    let getMorphoto (morphoto_id: string) (morphotoRepo: MorphotoRepo) =
        taskResult {
            let! morphoto = morphotoRepo.getMorphoto morphoto_id
            morphoto |> printfn "%A"
            return morphoto
        }

    let getTimeline (morphotoRepo: MorphotoRepo) =
        taskResult {
            let! morphotos = morphotoRepo.getTimeline ()
            morphotos |> printfn "%A"
            return morphotos
        }

    let getLog (morphoto_id: string) (morphotoRepo: MorphotoRepo) =
        taskResult {
            let! morphotoLogs = morphotoRepo.getLog morphoto_id
            morphotoLogs |> printfn "%A"
            return morphotoLogs
        }


    let updateLog (morphotoLog: MorphotoLog) (morphotoRepo: MorphotoRepo) =
        taskResult {
            let! log = morphotoRepo.updateLog morphotoLog
            log |> printfn "%A"
            return log
        }


module Handler =

    open Falco
    open Microsoft.Extensions.DependencyInjection

    let getAllUsers: HttpHandler =
        fun ctx ->
            let userRepo = ctx.RequestServices.GetService<Infra.Repo.UserRepo>()

            Usecase.getAllUsers userRepo
            |> function
                | Ok users -> ctx |> Response.ofJson {| data = users |}
                | Error e ->
                    ctx |> Response.withStatusCode 500 |> Response.ofPlainText e

    let registerMorphoto: HttpHandler =
        fun ctx ->
            try
                let morphotoRepo =
                    ctx.RequestServices.GetService<MorphotoRepo>()

                ctx
                |> Request.mapJson (fun morphoto ctx ->
                    task {
                        let! morphoto =
                            Usecase.registerMorphoto morphoto morphotoRepo

                        return
                            morphoto
                            |> function
                                | Ok morphoto ->
                                    ctx
                                    |> Response.ofJson {| data = morphoto |}
                                | Error e ->
                                    ctx
                                    |> Response.withStatusCode 500
                                    |> Response.ofPlainText e
                    })
            with e ->
                ctx
                |> Response.withStatusCode 500
                |> Response.ofPlainText e.Message


    let getMorphoto: HttpHandler =
        fun ctx ->
            let query = Request.getQuery ctx
            let morphoto_id = query.Get("morphoto_id")

            let morphotoRepo = ctx.RequestServices.GetService<MorphotoRepo>()

            task {
                let! morphoto = Usecase.getMorphoto morphoto_id morphotoRepo

                return
                    morphoto
                    |> function
                        | Ok morphoto ->
                            ctx |> Response.ofJson {| data = morphoto |}
                        | Error e ->
                            ctx
                            |> Response.withStatusCode 500
                            |> Response.ofPlainText e
            }

    let getTimeline: HttpHandler =
        fun ctx ->
            let morphotoRepo = ctx.RequestServices.GetService<MorphotoRepo>()

            task {
                let! morphotos = Usecase.getTimeline morphotoRepo

                return
                    morphotos
                    |> function
                        | Ok morphotos ->
                            ctx |> Response.ofJson {| data = morphotos |}
                        | Error e ->
                            ctx
                            |> Response.withStatusCode 500
                            |> Response.ofPlainText e
            }

    let getLog: HttpHandler =
        fun ctx ->
            let query = Request.getQuery ctx
            let morphoto_id = query.Get("morphoto_id")

            let morphotoRepo = ctx.RequestServices.GetService<MorphotoRepo>()

            task {
                let! morphotoLogs = Usecase.getLog morphoto_id morphotoRepo

                return
                    morphotoLogs
                    |> function
                        | Ok morphotoLogs ->
                            ctx |> Response.ofJson {| data = morphotoLogs |}
                        | Error e ->
                            ctx
                            |> Response.withStatusCode 500
                            |> Response.ofPlainText e
            }


    let updateLog: HttpHandler =
        fun ctx ->
            try
                let morphotoRepo =
                    ctx.RequestServices.GetService<MorphotoRepo>()

                ctx
                |> Request.mapJson (fun morphotoLog ctx ->
                    task {
                        let! morphotoLog =
                            Usecase.updateLog morphotoLog morphotoRepo

                        return
                            morphotoLog
                            |> function
                                | Ok morphotoLog ->
                                    ctx
                                    |> Response.ofJson {| data = morphotoLog |}
                                | Error e ->
                                    ctx
                                    |> Response.withStatusCode 500
                                    |> Response.ofPlainText e
                    })
            with e ->
                ctx
                |> Response.withStatusCode 500
                |> Response.ofPlainText e.Message
