module Infra

open Domain
open FsToolkit.ErrorHandling

module Repo =

    type MorphotoRepo =
        abstract member register: Morphoto -> TaskResult<Morphoto, string>
        abstract member getMorphoto: string -> TaskResult<Morphoto, string>
        abstract member getMorphotos: unit -> TaskResult<Morphoto[], string>
        abstract member getTimeline: string -> TaskResult<Morphoto[], string>
        abstract member getLog: string -> TaskResult<MorphotoLog, string>

        abstract member regiserLog:
            MorphotoLog -> TaskResult<MorphotoLog, string>

        abstract member updateLog:
            MorphotoLog -> TaskResult<MorphotoLog, string>

module Database =

    open System.Data
    open Dapper
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

    let morphotoRepo env =
        { new Repo.MorphotoRepo with

            member _.getLog
                (morphoto_id: string)
                : TaskResult<MorphotoLog, string> =
                try
                    let conn = conn env
                    printfn "getlog morphoto_id: %s" morphoto_id

                    select {
                        for m in table<MorphotoLog> do
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

            /// Todo:
            member _.getTimeline
                (morphoto_id: string)
                : TaskResult<Morphoto array, string> =
                let sql_toward_parent =
                    @"WITH RECURSIVE MorphotoRecursive AS (
                        SELECT morphoto_id, img_url, parent_id 
                        FROM Morphoto
                        WHERE morphoto_id = @morphoto_id

                        UNION ALL

                        SELECT m.morphoto_id, m.img_url, m.parent_id 
                        FROM Morphoto m 
                        INNER JOIN MorphotoRecursive r ON m.morphoto_id = r.parent_id
                      ) 
                      SELECT morphoto_id, img_url, parent_id 
                      FROM MorphotoRecursive;"


                let sql_toward_children =
                    @"WITH RECURSIVE MorphotoRecursive AS (
                            SELECT morphoto_id, img_url, parent_id 
                            FROM Morphoto
                            WHERE morphoto_id = @morphoto_id
    
                            UNION ALL
    
                            SELECT m.morphoto_id, m.img_url, m.parent_id 
                            FROM Morphoto m 
                            INNER JOIN MorphotoRecursive r ON r.morphoto_id = m.parent_id
                          ) 
                          SELECT morphoto_id, img_url, parent_id 
                          FROM MorphotoRecursive;"

                try
                    let conn = conn env

                    conn.QueryAsync<Morphoto>(
                        sql_toward_parent,
                        {| morphoto_id = morphoto_id |}
                    )
                    |> Task.map (Seq.toArray >> Ok)
                with e ->
                    Error e.Message |> Task.singleton


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

            member _.regiserLog
                (log: Domain.MorphotoLog)
                : TaskResult<MorphotoLog, string> =
                try
                    let conn = conn env

                    insert {
                        into table<MorphotoLog>
                        value log
                    }
                    |> conn.InsertAsync
                    |> Task.map (fun _ -> Ok log)
                with e ->
                    Error e.Message |> Task.singleton


            member _.updateLog
                (arg1: MorphotoLog)
                : TaskResult<MorphotoLog, string> =
                try
                    let conn = conn env

                    update {
                        for m in table<MorphotoLog> do
                            set arg1
                            where (m.morphoto_id = arg1.morphoto_id)
                    }
                    |> conn.UpdateAsync
                    |> Task.map (fun _ -> Ok arg1)

                with e ->
                    Error e.Message |> Task.singleton
        }
