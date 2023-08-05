module API.Test

open Xunit
open FsUnit.Xunit
open System.Net
open FsHttp

[<Fact>]
let health () =
    let resp =
        http {
            GET "http://localhost:8080/health"
            CacheControl "no-cache"
        }
        |> Request.send

    resp.statusCode |> should equal HttpStatusCode.OK
