module Handler.Error

open Falco

let errorHandler (e: string) : HttpHandler =
    Response.withStatusCode 500
    >> Response.ofJson {| error = "error!" |}
