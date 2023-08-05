module API.Test

open Xunit
open FsUnit.Xunit
open System.Net
open FsHttp
open System
open Domain

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
let ``register and get morphoto info`` () =
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

    let resp =
        http {
            GET $"{endpoint}/morphoto/{key}"
            CacheControl "no-cache"
        }
        |> Request.send

    resp.statusCode |> should equal HttpStatusCode.OK

    let resp =
        http {
            GET $"{endpoint}/log/{key}"
            CacheControl "no-cache"
        }
        |> Request.send
        |> Response.deserializeJson<{| data: MorphotoLog |}>

    resp.data.morphoto_id |> should equal key
    resp.data.view_count |> should equal 1


[<Fact>]
let ``get all morphotos`` () =
    let resp =
        http {
            GET $"{endpoint}/morphoto"
            CacheControl "no-cache"
        }
        |> Request.send

    resp.statusCode |> should equal HttpStatusCode.OK
