module Service

open Domain

module Usecase =
    open FsToolkit.ErrorHandling

    /// start morphing
    let registerStatus (parent_id: string) (statusStore: StatusRepo) =
        taskResult {
            let! status =
                statusStore.registerStatus {
                    parent_id = parent_id
                    is_done = false
                    view_count = 0
                    created_at = System.DateTime.Now
                }

            return status
        }

    let incrViewCountAndGetStatus
        (parent_id: string)
        (statusStore: StatusRepo)
        =
        taskResult {
            let! status = statusStore.getStatus parent_id

            let! status =
                statusStore.updateStatus {
                    status with
                        view_count = status.view_count + 1
                }

            return status
        }

    let registerMorphoto
        (morphoto: Morphoto)
        (morphotoRepo: MorphotoRepo, statusRepo: StatusRepo)
        =
        taskResult {
            let! morphoto = morphotoRepo.register morphoto
            let! status = statusRepo.getStatus morphoto.parent_id
            let! _ = statusRepo.updateStatus { status with is_done = true }

            return morphoto
        }

    let getMorphoto (parent_id: string) (morphotoRepo: MorphotoRepo) =
        taskResult {
            let! morphoto = morphotoRepo.getMorphoto parent_id
            return morphoto
        }

    let getAllMorphotos (morphotoRepo: MorphotoRepo) =
        taskResult {
            let! morphotos = morphotoRepo.getAllMorphotos ()
            return morphotos
        }

    module private TaskResult =
        let unwrap (tr: TaskResult<_, _>) =
            tr.Wait()
            tr.Result

    let inference
        (mlInput: MorphotoInferenceReq)
        (morphotoRepo: MorphotoRepo,
         statusRepo: StatusRepo,
         gcsRepo: GCPRepo,
         mlRepo: MLRepo)
        =
        let regex =
            System.Text.RegularExpressions.Regex("data:image/(.*);base64,(.*)")

        let parent_id = mlInput.parent_id

        gcsRepo.downloadBase64 parent_id
        |> Async.RunSynchronously
        |> function
            | Error e -> Error "parent_idが登録されていません"
            | Ok base64 ->
                let morphoto =
                    morphotoRepo.getMorphoto parent_id |> TaskResult.unwrap

                printfn "morphoto: %A" morphoto

                match morphoto with
                | Ok o -> Ok o // <=> status.is_done
                | Error _ ->
                    let status =
                        statusRepo.getStatus parent_id |> TaskResult.unwrap

                    printfn "status: %A" status

                    match status with
                    | Ok status when not status.is_done -> Error "Mophing中です"
                    | _ ->
                        taskResult {
                            let! status =
                                statusRepo.registerStatus {
                                    parent_id = parent_id
                                    is_done = false
                                    view_count = 0
                                    created_at = System.DateTime.Now
                                }

                            let! child_id, mlResp =
                                asyncResult {
                                    let! ml_morphoto =
                                        mlRepo.inference mlInput base64

                                    let! registered =
                                        gcsRepo.upload
                                            ml_morphoto.converted_image

                                    return registered.Name, ml_morphoto
                                }

                            let! morphoto =
                                morphotoRepo.register {
                                    parent_id = parent_id
                                    child_id = child_id
                                    prompt = mlResp.prompt
                                    strength = mlInput.strength
                                }

                            let! _ =
                                statusRepo.updateStatus {
                                    status with
                                        is_done = true
                                }

                            return morphoto

                        }
                        |> TaskResult.unwrap
