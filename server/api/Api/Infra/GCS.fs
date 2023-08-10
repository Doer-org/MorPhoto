module Infra.GCS

open Google.Cloud.Storage.V1
open Google.Apis.Auth.OAuth2
open System.Net.Http
open System
open System.IO
open System.Text
open System.Text.RegularExpressions

type GCS_ENV = {
    GCP_CREDENTIALS: string
    GCP_BUCKET_NAME: string
    GCS_URL: string
}

let private downloadImageAndConvertToBase64 (imageUrl: string) =
    use httpClient = new HttpClient()
    let imageBytes = httpClient.GetByteArrayAsync(imageUrl)
    imageBytes.Wait()
    let base64String = Convert.ToBase64String(imageBytes.Result)
    base64String

let getBase64FromGCS (fileName: string) (env: GCS_ENV) =
    async {

        try
            let url = $"{env.GCS_URL}/{fileName}"
            let base64String = downloadImageAndConvertToBase64 url
            return Ok base64String
        with e ->
            return Error e.Message

    }

let uploadFile (base64: string) (env: GCS_ENV) =
    async {
        try
            let cred = GoogleCredential.FromJson(env.GCP_CREDENTIALS)
            let storage = StorageClient.Create(cred)

            let regex = Regex("data:image/(.*);base64,(.*)")

            let base64 =
                if regex.IsMatch base64 then
                    regex.Match base64 |> fun m -> m.Groups.[2].Value
                else
                    base64

            use stream = new MemoryStream(Convert.FromBase64String(base64))

            let r =
                storage.UploadObject(
                    env.GCP_BUCKET_NAME,
                    Guid.NewGuid().ToString(),
                    "image/png",
                    stream
                )

            return Ok r
        with e ->
            return Error e.Message
    }


let gcsStore env =
    { new Domain.GCPRepo with
        member _.downloadBase64(fileName: string) =
            getBase64FromGCS fileName env

        member _.upload base64 = uploadFile base64 env
    }
