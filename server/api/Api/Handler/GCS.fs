module Handler.GCS

open Domain
open Service

open Falco
open Microsoft.Extensions.DependencyInjection
open System.Text.Json

open Handler.Error
open System

/// ### Endpoint
/// - `POST: /gcs`
/// - `body: {| base64: string |}`
/// ### Response
/// - `{| data: {| id : string, url: string |} |}`
let register env : HttpHandler =
    fun ctx ->
        task {
            let! request =
                Request.getJsonOptions<{| base64: string |}>
                    JsonSerializerOptions.Default
                    ctx

            let gcsResponse =
                Infra.GCS.uploadFile request.base64 env
                |> Async.RunSynchronously

            return
                gcsResponse
                |> function
                    | Ok gcsResponse ->
                        ctx
                        |> Response.ofJson {|
                            data = {|
                                id = gcsResponse.Name
                                url = $"{env.GCS_URL}/{gcsResponse.Name}"
                            |}
                        |}
                    | Error e -> errorHandler e ctx
        }

/// ### Endpoint
/// - `Get: /gcs/:id`
/// ### Response
/// - `{| data: {| id : string, url: string, base64: string |} |}`
let get env : HttpHandler =
    fun ctx ->
        task {
            let route = Request.getRoute ctx
            let id = route.Get("id")

            let resp =
                Infra.GCS.getBase64FromGCS id env |> Async.RunSynchronously

            return
                resp
                |> function
                    | Ok base64 ->
                        ctx
                        |> Response.ofJson {|
                            data = {|
                                id = id
                                url = $"{env.GCS_URL}/{id}"
                            |}
                        |}
                    | Error e -> errorHandler e ctx
        }
