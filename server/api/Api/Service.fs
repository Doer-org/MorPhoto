module Service

module Usecase =
    open FsToolkit.ErrorHandling

    let getAllUsers (userRepo: Infra.Repo.UserRepo) =
        result {
            let! users = userRepo.users ()
            users |> printfn "%A"
            return users
        }

module Handler =

    open Falco
    open Microsoft.Extensions.DependencyInjection

    let getAllUsers: HttpHandler =
        fun ctx ->
            let userRepo = ctx.RequestServices.GetService<Infra.Repo.UserRepo>()

            Usecase.getAllUsers userRepo
            |> function
                | Ok users -> ctx |> Response.ofJson {| data = users |}
                | Error e ->
                    ctx |> Response.withStatusCode 500 |> Response.ofPlainText e
