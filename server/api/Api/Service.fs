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

            let! _ =
                morphotoRepo.regiserLog
                    { created_at = System.DateTime.Now
                      morphoto_id = morphoto.morphoto_id
                      view_count = 0 }

            return morphoto
        }

    let getMorphoto (morphoto_id: string) (morphotoRepo: MorphotoRepo) =
        taskResult {
            let! morphoto = morphotoRepo.getMorphoto morphoto_id
            let! log = morphotoRepo.getLog morphoto_id

            let! _ =
                morphotoRepo.updateLog
                    { log with
                        view_count = log.view_count + 1 }

            return morphoto
        }

    let getMorphotos (morphotoRepo: MorphotoRepo) =
        taskResult {
            let! morphotos = morphotoRepo.getMorphotos ()
            morphotos |> printfn "%A"
            return morphotos
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
            morphotoLogs |> printfn "getLog: %A"
            return morphotoLogs
        }


    let updateLog (morphotoLog: MorphotoLog) (morphotoRepo: MorphotoRepo) =
        taskResult {
            let! log = morphotoRepo.updateLog morphotoLog
            log |> printfn "updateLog: %A"
            return log
        }


module Handler =

    open Falco
    open Microsoft.Extensions.DependencyInjection
    open System.Text.Json

    let getAllUsers: HttpHandler =
        fun ctx ->
            let userRepo = ctx.RequestServices.GetService<Infra.Repo.UserRepo>()

            Usecase.getAllUsers userRepo
            |> function
                | Ok users -> ctx |> Response.ofJson {| data = users |}
                | Error e ->
                    ctx |> Response.withStatusCode 500 |> Response.ofPlainText e

    /// Log追加も行う
    let registerMorphoto: HttpHandler =
        fun ctx ->
            task {
                let! morphoto =
                    Request.getJsonOptions<Morphoto>
                        JsonSerializerOptions.Default
                        ctx

                let morphotoRepo =
                    ctx.RequestServices.GetService<MorphotoRepo>()

                let! morphoto = Usecase.registerMorphoto morphoto morphotoRepo

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

    /// Log更新も行う(閲覧回数を加算)
    let getMorphoto: HttpHandler =
        fun ctx ->
            let query = Request.getRoute ctx
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

    let getMorphotos: HttpHandler =
        fun ctx ->
            let morphotoRepo = ctx.RequestServices.GetService<MorphotoRepo>()

            task {
                let! morphotos = Usecase.getMorphotos morphotoRepo

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
            let query = Request.getRoute ctx
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
