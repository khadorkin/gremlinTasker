GremlinTasker
==============

This is my little nodejs playground todo application.

Uses:

- Express
- GraphQL
- Sequelize
- ReactJS
- Docker/Docker Compose
- Vagrant

Dev Info:

- Username: Admin
- Password: password

Commands:

- Docker:
  - Windows:
    - ```docker-machine create```
    - ```FOR /f "tokens=*" %i IN ('docker-machine env default') DO %i```
    - ```docker-compose up -d```
    - (migrations) ```docker exec -it [container-id] /bin/bash```
    - (migrations) ```npm run build```
    - go to http://docker-host/
- Vagrant
  - Windows:
    - ```vagrant up```
    - ```vagrant ssh```
    - ```cd /vagrant```
    - ```npm run dev-init``` for development.
    - ```sudo npm start``` Need ```sudo``` since port 80 is a privledged port.
    - go to http://localhost/ to view results.