# How to build locally

1. clone the project: `git clone git@github.com:Ayrat-Kh/email-worker-pet.git`
2. `yarn`
3. `docker-compose.dev.yaml` (wait for db initialization)
4. `yarn db:migrate`
5. `yarn db:generate`
6. `yarn dev`
7. `http:://localhost:3000`, should work

# How to build containerazed

1. clone the project: `git clone git@github.com:Ayrat-Kh/email-worker-pet.git`
2. `docker build -t email-worker:latest .`
3. `docker-compose.yaml`, (probably the app can end up because db haven't started yet. For now, just restart it, please)
4. `http:://localhost:3000`, should work

## Some strange behaviour:

sometimes on my machine it seems like the socket is hanging up. Maybe it related to WSL2, need to check.

## if kafka can not start try to remove zookeper and kafka volumes

`docker volume rm email-worker_kafka_data email-worker_zookeper_data`
