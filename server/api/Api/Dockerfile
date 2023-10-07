#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Api.fsproj", "."]
RUN dotnet restore "Api.fsproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "Api.fsproj" -c Release -o /app/build

# https://learn.microsoft.com/ja-jp/dotnet/core/deploying/deploy-with-cli
FROM build AS publish
RUN dotnet publish "Api.fsproj" -o /app/publish -r linux-x64 --self-contained true -p:PublishTrimmed=true

FROM mcr.microsoft.com/dotnet/runtime-deps:7.0
WORKDIR /app
EXPOSE 80
COPY --from=publish /app/publish .
ENTRYPOINT ["./Api"]