FROM mcr.microsoft.com/dotnet/core/sdk:3.1.100-preview3-bionic AS build-env
WORKDIR /src

# Copy sln and csproj files and restore as distinct layers
COPY *.sln ./
COPY ./Pipelines.Dashboard.Framework/Pipelines.Dashboard.Framework.csproj ./Pipelines.Dashboard.Framework/Pipelines.Dashboard.Framework.csproj
COPY ./Pipelines.Dashboard.WebAPI/Pipelines.Dashboard.WebAPI.csproj ./Pipelines.Dashboard.WebAPI/Pipelines.Dashboard.WebAPI.csproj

RUN dotnet restore

# Copy project folders
COPY ./Pipelines.Dashboard.Framework ./Pipelines.Dashboard.Framework
COPY ./Pipelines.Dashboard.WebAPI ./Pipelines.Dashboard.WebAPI
RUN dotnet publish "./Pipelines.Dashboard.WebAPI/Pipelines.Dashboard.WebAPI.csproj" -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1.0-preview3-bionic as runtime
WORKDIR /app
COPY --from=build-env /src/out ./
EXPOSE 80
ENTRYPOINT ["dotnet", "Pipelines.Dashboard.WebAPI.dll"]

# docker build -t upg-dashboard-webapi .
# docker run -d -p 8080:80 --rm --name upg-dashboard-webapi upg-dashboard-webapi:latest
