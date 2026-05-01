# Server Operations

Quick reference for common server, Docker, and deployment tasks used for this project.

## Check What Is Listening

```sh
sudo lsof -i -P -n | grep LISTEN
```

Use this to see which processes are bound to open ports.

## Apache Site Configuration

```sh
cd /etc/apache2/sites-available
sudo nano codeguest.in.conf
```

Update the virtual host file here when domain, proxy, or document-root settings change.

## PM2

```sh
pm2 list
pm2 logs --lines 200
```

Use `pm2 list` to check app status and `pm2 logs --lines 200` to inspect recent logs.

## Docker Build

### Web App

```sh
docker build -f Dockerfile.web -t portfolio-web .
```

### API App

```sh
docker build -f Dockerfile.api -t portfolio-api .
```

## Docker Run

### Web Container

```sh
docker run -d -p 8080:80 --name web-app portfolio-web
```

### API Container

```sh
docker run -d -p 5000:5000 --name api-app portfolio-api
```

## Docker Registry

### Tag Images

```sh
docker tag portfolio-web shubhamstr/portfolio-web:v1
docker tag portfolio-api shubhamstr/portfolio-api:v1
```

### Login and Push

```sh
docker login
docker push shubhamstr/portfolio-web:v1
docker push shubhamstr/portfolio-api:v1
```

## Container Access

```sh
docker exec -it portfolio-api ls
```

Use this to inspect files inside a running container.

## Cleanup

```sh
docker system prune -af
docker volume prune -f
```

These commands remove unused Docker resources. Run them carefully because they can delete images, containers, and volumes that are no longer in use.
