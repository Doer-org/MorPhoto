module Domain

open System

type Morphoto = {
    parent_id: string
    child_id: string
    prompt: string
    strength: float
}

type Status = {
    parent_id: string
    is_done: bool
    view_count: int
    created_at: DateTime
}

open FsToolkit.ErrorHandling

type MorphotoRepo =
    abstract member register: Morphoto -> TaskResult<Morphoto, string>
    abstract member getMorphoto: string -> TaskResult<Morphoto, string>
    abstract member getAllMorphotos: unit -> TaskResult<Morphoto[], string>

type StatusRepo =
    abstract member registerStatus: Status -> TaskResult<Status, string>
    abstract member getStatus: string -> TaskResult<Status, string>
    abstract member updateStatus: Status -> TaskResult<Status, string>

type GCPRepo =
    abstract member upload:
        string -> Async<Result<Google.Apis.Storage.v1.Data.Object, string>>

    abstract member downloadBase64: string -> Async<Result<string, string>>

type MorphotoInferenceReq = {
    parent_id: string
    prompt: string
    strength: float
    is_mock: bool option
}

type MorphotoInferenceResp = {
    converted_image: string
    prompt: string
}

type MLRepo =
    abstract member inference:
        MorphotoInferenceReq ->
        string ->
            Async<Result<MorphotoInferenceResp, string>>
