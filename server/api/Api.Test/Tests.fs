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
let testStatusAPI () =
    let parent_id = "test_" + Guid.NewGuid().ToString()

    let resp =
        http {
            POST $"{endpoint}/status/{parent_id}"
            CacheControl "no-cache"

        }
        |> Request.send
        |> Response.deserializeJson<{| data: Status |}>

    resp.data.view_count |> should equal 0

    let resp =
        http {
            GET $"{endpoint}/status/{parent_id}"
            CacheControl "no-cache"
        }
        |> Request.send
        |> Response.deserializeJson<{| data: Status |}>

    resp.data.view_count |> should equal 1

    let resp =
        http {
            GET $"{endpoint}/status/{parent_id}"
            CacheControl "no-cache"
        }
        |> Request.send
        |> Response.deserializeJson<{| data: Status |}>

    resp.data.view_count |> should equal 2

[<Fact>]
let ``error: 同じキーでStatus登録`` () =


    let parent_id = "test_" + Guid.NewGuid().ToString()

    let resp =
        http {
            POST $"{endpoint}/status/{parent_id}"
            CacheControl "no-cache"

        }
        |> Request.send

    let resp =
        http {
            POST $"{endpoint}/status/{parent_id}"
            CacheControl "no-cache"

        }
        |> Request.send

    // FIXME: ??
    // Response.print resp |> should equal "error!"

    resp.statusCode
    |> should equal HttpStatusCode.InternalServerError



[<Fact>]
let testMorphotoAPI () =

    let morphoto: Morphoto =
        let parent_id = "test_" + Guid.NewGuid().ToString()
        let child_id = "test_" + parent_id + "_child"
        let prompt = "test_prompt"
        let strength = 0.5

        {
            parent_id = parent_id
            child_id = child_id
            prompt = prompt
            strength = strength
        }

    // TODO: `POST: /morphoto` を叩く前に `POST: /status/:parent_id` を叩く

    // status登録
    let resp =
        http {
            POST $"{endpoint}/status/{morphoto.parent_id}"
            CacheControl "no-cache"
        }
        |> Request.send

    resp.statusCode |> should equal HttpStatusCode.OK

    // status確認 is_done = false
    let resp =
        http {
            GET $"{endpoint}/status/{morphoto.parent_id}"
            CacheControl "no-cache"
        }
        |> Request.send
        |> Response.deserializeJson<{| data: Status |}>

    resp.data.is_done |> should equal false

    // morphoto登録
    let resp =
        http {
            POST $"{endpoint}/morphoto"
            CacheControl "no-cache"
            body
            jsonSerialize morphoto
        }
        |> Request.send
        |> Response.deserializeJson<{| data: Morphoto |}>


    resp.data |> should equal morphoto

    // morphoto確認
    let resp =
        http {
            GET $"{endpoint}/morphoto/{morphoto.parent_id}"
            CacheControl "no-cache"
        }
        |> Request.send

    resp.statusCode |> should equal HttpStatusCode.OK

    // status確認 is_done = true
    let resp =
        http {
            GET $"{endpoint}/status/{morphoto.parent_id}"
            CacheControl "no-cache"
        }
        |> Request.send
        |> Response.deserializeJson<{| data: Status |}>

    resp.data.is_done |> should equal true

    // morphoto全件取得
    let resp =
        http {
            GET $"{endpoint}/morphoto/all"
            CacheControl "no-cache"
        }
        |> Request.send

    resp.statusCode |> should equal HttpStatusCode.OK
