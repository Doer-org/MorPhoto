module Infra

module Repo =
    type UserRepo =
        abstract member users: unit -> Result<Domain.User[], string>

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
        (conn env).Query<Domain.User>(@"SELECT * FROM User")

    let sugared env =
        select {
            for _ in table<Domain.User> do
                selectAll
        }
        |> (conn env).SelectAsync<Domain.User>

    let userRepo env =
        { new Repo.UserRepo with
            member _.users() =
                try
                    raw env |> Seq.toArray |> Ok
                with e ->
                    sprintf "%A" e |> Error

        }
