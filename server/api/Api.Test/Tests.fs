module API.Test

open Xunit
open FsUnit.Xunit
open System.Net
open FsHttp
open System

let endpoint = "http://localhost:8091"


[<Fact>]
let health () =
    let resp =
        http {
            GET $"{endpoint}/health"
            CacheControl "no-cache"
        }
        |> Request.send

    resp.statusCode |> should equal HttpStatusCode.OK

[<Fact>]
let users () =
    let resp =
        http {
            GET $"{endpoint}/users"
            CacheControl "no-cache"
        }
        |> Request.send

    resp.statusCode |> should equal HttpStatusCode.OK

[<Fact>]
let morphoto () =
    let key = "test_" + Guid.NewGuid().ToString()

    let resp =
        http {
            POST $"{endpoint}/morphoto"
            CacheControl "no-cache"
            body

            jsonSerialize
                {| morphoto_id = key
                   img_url = key
                   parent_id = key |}
        }
        |> Request.send

    resp.statusCode |> should equal HttpStatusCode.OK

// let resp =
//     http {
//         GET $"{endpoint}/morphoto/test"
//         CacheControl "no-cache"
//     }
//     |> Request.send

// resp.statusCode |> should equal HttpStatusCode.OK
