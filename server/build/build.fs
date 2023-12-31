﻿open Fake.Core
open System.IO

let ENV = $"{__SOURCE_DIRECTORY__}/../.env.local"
let DATA_DIR = $"{__SOURCE_DIRECTORY__}/../database/data"
let DOCKER_FILER_DIR = $"{__SOURCE_DIRECTORY__}/../docker"
let DOCKER_COMPOSE_LOCAL = $"{DOCKER_FILER_DIR}/docker-compose.local.yaml"

let DOCKER_COMPOSE_LOCAL_DATABASE =
    $"{DOCKER_FILER_DIR}/docker-compose.local.database.yaml"

let DOCKER_COMPOSE_LOCAL_SERVER =
    $"{DOCKER_FILER_DIR}/docker-compose.local.server.yaml"

let DOCKER_COMPOSE_LOCAL_ML = $"{DOCKER_FILER_DIR}/docker-compose.local.ml.yaml"

let PROJECT_NAME = "morphoto-dev"

module Command =
    [<Literal>]
    let Default = "Default"

    [<Literal>]
    let Up = "Up"

    [<Literal>]
    let Down = "Down"

    [<Literal>]
    let DelData = "DelData"

    [<Literal>]
    let Clean = "Clean"

    [<Literal>]
    let Re = "Re"

open Fake.Core.TargetOperators

let initTargets () =
    Target.create Command.Default (fun _ -> printfn "hello from FAKE!")

    Target.create Command.Up (fun _ ->

        Shell.Exec(
            "docker",
            [
                $"compose -p {PROJECT_NAME}"
                $"-f {DOCKER_COMPOSE_LOCAL}"
                $"-f {DOCKER_COMPOSE_LOCAL_DATABASE}"
                $"-f {DOCKER_COMPOSE_LOCAL_SERVER}"
                // $"-f {DOCKER_COMPOSE_LOCAL_ML}" // TODO: optional
                $"--env-file {ENV}"
                "up -d"
            ]
            |> String.concat " "
        )
        |> ignore

    )

    Target.create Command.Down (fun _ ->
        Shell.Exec(
            "docker",
            [
                $"compose -p {PROJECT_NAME}" 
                "down --rmi all --volumes --remove-orphans"
            ]
            |> String.concat " "
        )
        |> ignore

    )

    Target.create Command.DelData (fun _ ->
        if Directory.Exists(DATA_DIR) then
            Directory.Delete(DATA_DIR, true))

    Target.create Command.Re ignore
    Target.create Command.Clean ignore


    [
        Command.Down ==> Command.Clean
        Command.DelData ==> Command.Clean
        Command.Down ?=> Command.DelData
        Command.Clean ==> Command.Re
        Command.Up ==> Command.Re
        Command.Clean ?=> Command.Up
    ]
    |> ignore

[<EntryPoint>]
let main args =
    Context.FakeExecutionContext.Create false "build.fsx" []
    |> Context.RuntimeContext.Fake
    |> Context.setExecutionContext

    initTargets ()

    try
        match args with
        | [| target |] -> Target.runOrDefault target
        | _ -> Target.runOrDefault Command.Default
    with _ ->
        ()

    0
