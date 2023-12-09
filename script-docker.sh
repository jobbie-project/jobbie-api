# Cria a rede Docker
docker network create jobbie-net

# Cria o serviço postgres
docker run --name=postgres --net jobbie-net -e POSTGRES_PASSWORD=lipao2002 -e POSTGRES_DB=jobbie -e POSTGRES_USER=postgres -p 5440:5432 -d postgres:latest

# Executa a API
docker run --name=jobbie-api --net jobbie-net --env-file .env -p 1337:1337 -d felipegbot/jobbie-api:1.0

# Executa o aplicativo
docker run --name=jobbie-app --net jobbie-net -e VITE_BACKEND_URL=jobbie-api:1337 -p 3000:3000 -d felipegbot/jobbie-app:1.0

