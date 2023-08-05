module Domain

open System

type User =
    { user_id: string
      user_name: string
      image_url: string }

type Morphoto =
    { morphoto_id: string
      img_url: string
      parent_id: string }

type MorphotoLog =
    { morphoto_id: string
      view_count: int
      created_at: DateTime }
