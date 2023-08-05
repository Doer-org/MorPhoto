module Infra

open Domain
open FsToolkit.ErrorHandling

module Repo =

    type UserRepo =
        abstract member users: unit -> Result<User[], string>

    type MorphotoRepo =
        abstract member register: Morphoto -> TaskResult<Morphoto, string>
        abstract member getMorphoto: string -> TaskResult<Morphoto, string>
        abstract member getMorphotos: unit -> TaskResult<Morphoto[], string>
        abstract member getTimeline: unit -> TaskResult<Morphoto[], string>
        abstract member getLog: string -> TaskResult<MorphotoLog, string>

        abstract member updateLog:
            MorphotoLog -> TaskResult<MorphotoLog, string>

module Database =

    open System.Data
    open Dapper
    open Dapper.FSharp.MySQL
    open MySql.Data.MySqlClient

    type DBEnv =
        { DB_HOST: string
          DB_USER: string
          DB_PASSWORD: string
          DB_DATABASE: string }

    let conn (env: DBEnv) : IDbConnection =
        let connStr =
            $"Server={env.DB_HOST};Port=3306;Database={env.DB_DATABASE};user={env.DB_USER};password={env.DB_PASSWORD}"

        new MySqlConnection(connStr)

    let raw env =
        (conn env).Query<User>(@"SELECT * FROM User")

    let sugared env =
        select {
            for _ in table<User> do
                selectAll
        }
        |> (conn env).SelectAsync<User>

    let userRepo env =
        { new Repo.UserRepo with
            member _.users() =
                try
                    raw env |> Seq.toArray |> Ok
                with e ->
                    sprintf "%A" e |> Error }

    let morphotoRepo env =
        { new Repo.MorphotoRepo with

            member _.getLog
                (morphoto_id: string)
                : TaskResult<MorphotoLog, string> =
                try
                    let conn = conn env

                    select {
                        for m in table<Morphoto> do
                            where (m.morphoto_id = morphoto_id)
                            take 1
                    }
                    |> conn.SelectAsync<MorphotoLog>
                    |> Task.map (Seq.head >> Ok)
                with e ->
                    Error e.Message |> Task.singleton

            member _.getMorphoto
                (morphoto_id: string)
                : TaskResult<Morphoto, string> =
                try
                    let conn = conn env

                    select {
                        for m in table<Morphoto> do
                            where (m.morphoto_id = morphoto_id)
                            take 1
                    }
                    |> conn.SelectAsync<Morphoto>
                    |> Task.map (Seq.head >> Ok)
                with e ->
                    Error e.Message |> Task.singleton

            // Todo: 検索条件(view_count, created_at)
            member _.getMorphotos() : TaskResult<Morphoto[], string> =
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

            // Todo: implement
            member _.getTimeline() : TaskResult<Morphoto array, string> =
                failwith "not implemented"

            member _.register
                (morphoto: Morphoto)
                : TaskResult<Morphoto, string> =
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

            member _.updateLog
                (log: Domain.MorphotoLog)
                : TaskResult<MorphotoLog, string> =
                try
                    let conn = conn env

                    update {
                        for m in table<MorphotoLog> do
                            set log
                            where (m.morphoto_id = log.morphoto_id)
                    }
                    |> conn.UpdateAsync
                    |> Task.map (fun _ -> Ok log)
                with e ->
                    Error e.Message |> Task.singleton }
