# PROJECT START

### BACKEND

```SHELL
    cd backend
    docker compose up --build --force-recreate
    docker compose exec web npx prisma migrate reset
```

### BACKEND

```SHELL
    cd frontend
    docker compose up --build --force-recreate
```


### PORTS
- backend: http://localhost:1010
- frontend: http://localhost:5173