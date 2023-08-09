module Service

open Domain
open Infra.Repo

module Usecase =
    open FsToolkit.ErrorHandling

    /// start morphing
    let registerStatus (parent_id: string) (statusStore: StatusRepo) =
        taskResult {
            let! status =
                statusStore.registerStatus {
                    parent_id = parent_id
                    is_done = false
                    view_count = 0
                    created_at = System.DateTime.Now
                }

            return status
        }

    let incrViewCountAndGetStatus
        (parent_id: string)
        (statusStore: StatusRepo)
        =
        taskResult {
            let! status = statusStore.getStatus parent_id

            let! status =
                statusStore.updateStatus {
                    status with
                        view_count = status.view_count + 1
                }

            return status
        }

    let registerMorphoto
        (morphoto: Morphoto)
        (morphotoRepo: MorphotoRepo, statusRepo: StatusRepo)
        =
        taskResult {
            let! morphoto = morphotoRepo.register morphoto
            let! status = statusRepo.getStatus morphoto.parent_id
            let! _ = statusRepo.updateStatus { status with is_done = true }

            return morphoto
        }

    let getMorphoto (parent_id: string) (morphotoRepo: MorphotoRepo) =
        taskResult {
            let! morphoto = morphotoRepo.getMorphoto parent_id
            return morphoto
        }

    let getAllMorphotos (morphotoRepo: MorphotoRepo) =
        taskResult {
            let! morphotos = morphotoRepo.getAllMorphotos ()
            return morphotos
        }


module Handler =

    open Falco
    open Microsoft.Extensions.DependencyInjection
    open System.Text.Json

    let errorHandler (e: string) : HttpHandler =
        Response.withStatusCode 500
        >> Response.ofJson {| error = "error!" |}

    /// ### Endpoint
    /// - `POST: /status/:parent_id`
    /// ### Response
    /// - `{| data: Status |}`
    let registerStatus: HttpHandler =
        fun ctx ->
            let route = Request.getRoute ctx
            let parent_id = route.Get("parent_id")
            let statusRepo = ctx.RequestServices.GetService<StatusRepo>()

            task {
                let! status = Usecase.registerStatus parent_id statusRepo

                return
                    status
                    |> function
                        | Ok status ->
                            ctx |> Response.ofJson {| data = status |}
                        | Error e -> errorHandler e ctx
            }

    // TODO: GET?? API側でGCS画像登録、ML APIの呼び出しを行う.
    /// add view_count and return status
    /// ### Endpoint
    /// - `GET: /status/:parent_id`
    /// ### Response
    /// - `{| data: Status |}`
    let getStatus: HttpHandler =
        fun ctx ->
            let route = Request.getRoute ctx
            let parent_id = route.Get("parent_id")
            let statusRepo = ctx.RequestServices.GetService<StatusRepo>()

            task {
                let! status =
                    Usecase.incrViewCountAndGetStatus parent_id statusRepo

                return
                    status
                    |> function
                        | Ok status ->
                            ctx |> Response.ofJson {| data = status |}
                        | Error e -> errorHandler e ctx
            }

    /// ### Endpoint
    /// - `POST: /morphoto`
    /// - `body: Morphoto`
    /// ### Request
    /// - `{| data: Morphoto |}`
    let registerMorphoto: HttpHandler =
        fun ctx ->
            let morphotoRepo = ctx.RequestServices.GetService<MorphotoRepo>()
            let statusRepo = ctx.RequestServices.GetService<StatusRepo>()

            task {
                let! morphoto =
                    Request.getJsonOptions<Morphoto>
                        JsonSerializerOptions.Default
                        ctx

                let! morphoto =
                    Usecase.registerMorphoto morphoto (morphotoRepo, statusRepo)

                return
                    morphoto
                    |> function
                        | Ok morphoto ->
                            ctx |> Response.ofJson {| data = morphoto |}
                        | Error e -> errorHandler e ctx
            }

    /// ### Endpoint
    /// - `GET: /morphoto/{parent_id}`
    /// ### Request
    /// - `{| data: Morphoto |}`
    let getMorphoto: HttpHandler =
        fun ctx ->
            let route = Request.getRoute ctx
            let parent_id = route.Get("parent_id")
            let morphotoRepo = ctx.RequestServices.GetService<MorphotoRepo>()

            task {
                let! morphoto = Usecase.getMorphoto parent_id morphotoRepo

                return
                    morphoto
                    |> function
                        | Ok morphoto ->
                            ctx |> Response.ofJson {| data = morphoto |}
                        | Error e -> errorHandler e ctx
            }

    /// ### Endpoint
    /// - `GET: /morphoto/all`
    /// ### Request
    /// - `{| data: Morphoto[] |}`
    let getAllMorphotos: HttpHandler =
        fun ctx ->
            let morphotoRepo = ctx.RequestServices.GetService<MorphotoRepo>()

            task {
                let! morphotos = Usecase.getAllMorphotos morphotoRepo

                return
                    morphotos
                    |> function
                        | Ok morphotos ->
                            ctx |> Response.ofJson {| data = morphotos |}
                        | Error e -> errorHandler e ctx
            }
