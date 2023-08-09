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
