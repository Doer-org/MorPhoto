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

type MorphotoRepo = {
    register: Morphoto -> TaskResult<Morphoto, string>
    getMorphoto: string -> TaskResult<Morphoto, string>
    getAllMorphotos: unit -> TaskResult<Morphoto[], string>
}

type StatusRepo = {
    registerStatus: Status -> TaskResult<Status, string>
    getStatus: string -> TaskResult<Status, string>
    updateStatus: Status -> TaskResult<Status, string>
}

type GCPRepo = {
    upload: string -> Async<Result<Google.Apis.Storage.v1.Data.Object, string>>
    downloadBase64: string -> Async<Result<string, string>>
}

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

type MLHealthResp = {
    status: string
    device: string
}

type MLRepo = {
    health: unit -> Async<Result<MLHealthResp, string>>
    inference:
        MorphotoInferenceReq
            -> string
            -> Async<Result<MorphotoInferenceResp, string>>
}
