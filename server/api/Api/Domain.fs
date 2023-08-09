module Domain

open System

type Morphoto = {
    morphoto_id: string
    img_url: string
    parent_id: string option
}

type MorphotoLog = {
    morphoto_id: string
    view_count: int
    created_at: DateTime
}
