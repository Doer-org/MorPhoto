module Infra.Database

open Domain
open FsToolkit.ErrorHandling

open System.Data
open Dapper.FSharp.MySQL
open MySql.Data.MySqlClient

OptionTypes.register ()

type DBEnv = {
    IS_DEV: bool
    DB_HOST: string
    DB_USER: string
    DB_PASSWORD: string
    DB_DATABASE: string
}

let conn (env: DBEnv) : IDbConnection =
    let connStr =
        if env.IS_DEV then
            $"Server={env.DB_HOST};Port=3306;Database={env.DB_DATABASE};user={env.DB_USER};password={env.DB_PASSWORD}"
        else
            $"Server={env.DB_HOST};Port=3306;Database={env.DB_DATABASE};user={env.DB_USER};password={env.DB_PASSWORD};SslMode=VerifyFull"

    new MySqlConnection(connStr)

(*
    複雑なクエリはこのように叩く
    let sql = SELECT * FROM Morphoto WHERE morphoto_id = @morphoto_id   
    try
        let conn = conn env

        conn.QueryAsync<Morphoto>(
            sql,
            {| morphoto_id = morphoto_id |}
        )
        |> Task.map (Seq.toArray >> Ok)
    with e ->
        Error e.Message |> Task.singleton 
*)

let statusRepo env = {
    registerStatus =
        fun (status: Status) ->
            try
                let conn = conn env

                insert {
                    into table<Status>
                    value status
                }
                |> conn.InsertAsync
                |> Task.map (fun _ -> Ok status)
            with e ->
                Error e.Message |> Task.singleton

    getStatus =
        fun (parent_id: string) ->
            try
                let conn = conn env

                select {
                    for s in table<Status> do
                        where (s.parent_id = parent_id)
                        take 1
                }
                |> conn.SelectAsync<Status>
                |> Task.map (
                    Seq.tryHead
                    >> function
                        | Some s -> Ok s
                        | None -> Error "not found"
                )
            with e ->
                Error e.Message |> Task.singleton
    updateStatus =
        fun (arg1: Status) ->
            try
                let conn = conn env

                update {
                    for s in table<Status> do
                        set arg1
                        where (s.parent_id = arg1.parent_id)
                }
                |> conn.UpdateAsync
                |> Task.map (fun _ -> Ok arg1)
            with e ->
                Error e.Message |> Task.singleton
}

let morphotoRepo env = {
    register =
        fun morphoto ->
            try
                let conn = conn env

                insert {
                    into table<Morphoto>
                    value morphoto
                }
                |> conn.InsertAsync
                |> Task.map (fun _ -> Ok morphoto)
            with e ->
                Error e.Message |> Task.singleton
    getMorphoto =
        fun parent_id ->
            try
                let conn = conn env

                select {
                    for m in table<Morphoto> do
                        where (m.parent_id = parent_id)
                        take 1
                }
                |> conn.SelectAsync<Morphoto>
                |> Task.map (
                    Seq.tryHead
                    >> function
                        | Some s -> Ok s
                        | None -> Error "not found"
                )
            with e ->
                Error e.Message |> Task.singleton
    getAllMorphotos =
        fun () ->
            try
                let conn = conn env

                select {
                    for m in table<Morphoto> do
                        selectAll
                }
                |> conn.SelectAsync<Morphoto>
                |> Task.map (Seq.toArray >> Ok)
            with e ->
                Error e.Message |> Task.singleton

}
