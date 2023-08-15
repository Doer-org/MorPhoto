module Handler.Morphoto

open Domain
open Service

open Falco
open Microsoft.Extensions.DependencyInjection
open System.Text.Json

open Handler.Error

let healthML (mlEnv) : HttpHandler =
    fun ctx ->
        let health =
            Infra.ML.mlRepo mlEnv
            |> fun store -> store.health () |> Async.RunSynchronously

        health
        |> function
            | Ok health -> ctx |> Response.ofJson {| data = health |}
            | Error e -> errorHandler e ctx

/// ### Endpoint
/// - `POST: /inference/:id`
/// - `body: { prompt: string, strength: float, is_mock?: bool }`
/// ### Response
/// - `Morphoto`
let inference (gcsEnv, mlEnv) : HttpHandler =
    fun ctx ->
        let route = Request.getRoute ctx
        let parent_id = route.Get("id")
        let morphotoRepo = ctx.RequestServices.GetService<MorphotoRepo>()
        let statusRepo = ctx.RequestServices.GetService<StatusRepo>()

        task {
            let! request =
                Request.getJsonOptions<{|
                    prompt: string
                    strength: float
                    is_mock: bool option
                |}>
                    JsonSerializerOptions.Default
                    ctx

            let morphoto =
                Usecase.inference
                    {
                        parent_id = parent_id
                        prompt = request.prompt
                        strength = request.strength
                        is_mock = request.is_mock
                    }
                    (morphotoRepo,
                     statusRepo,
                     Infra.GCS.gcsStore gcsEnv,
                     Infra.ML.mlRepo mlEnv)

            printfn "morphoto: %A" morphoto

            return
                morphoto
                |> function
                    | Ok morphoto ->
                        ctx |> Response.ofJson {| data = morphoto |}
                    | Error e -> errorHandler e ctx
        }



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
                    | Ok status -> ctx |> Response.ofJson {| data = status |}
                    | Error e -> errorHandler e ctx
        }

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
            let! status = Usecase.incrViewCountAndGetStatus parent_id statusRepo

            return
                status
                |> function
                    | Ok status -> ctx |> Response.ofJson {| data = status |}
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
