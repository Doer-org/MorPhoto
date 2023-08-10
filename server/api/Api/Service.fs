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
