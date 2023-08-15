module Infra.ML

open Domain
open FsHttp
open System.Net

type MLEnv = { ML_URL: string }

type MLRequest = {
    prompt: string
    image: string
    strength: float
    is_mock: bool option
}

type MLResult = MorphotoInferenceResp

let inference (request: MLRequest) (env: MLEnv) =
    http {
        POST $"{env.ML_URL}/inference"
        body
        jsonSerialize request
    }
    |> Request.sendAsync
    |> Async.map (fun resp ->
        if resp.statusCode = HttpStatusCode.OK then
            resp |> Response.deserializeJson<MLResult> |> Ok
        else
            Error "ML Server Error")

let mlRepo env = {
    inference =
        fun request base64Image ->
            inference
                {
                    prompt = request.prompt
                    image = base64Image
                    strength = request.strength
                    is_mock = request.is_mock
                }
                env
    health =
        fun () -> 
            http {
                GET $"{env.ML_URL}/health"
                body 
            }
            |> Request.sendAsync
            |> Async.map (fun resp ->
                if resp.statusCode = HttpStatusCode.OK then
                    resp |> Response.deserializeJson<MLHealthResp> |> Ok
                else
                    Error "ML Server Error")
}
