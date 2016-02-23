GremlinTasker
==============

This is my little nodejs playground todo application.

Uses:

- Express
- Sequelize
- Docker/Docker Compose

Commands:

- Windows:
  - docker-machine create
  - FOR /f "tokens=*" %i IN ('docker-machine env default') DO %i
  - docker-compose up
  - (migrations) docker exec -it [container-id] /bin/bash
  - (migrations) npm run build
  - go to http://docker-host/