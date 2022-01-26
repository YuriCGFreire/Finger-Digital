# Finger Digital
Sistema desenvolvido para o processo seletivo na Finger Digital
**Desenvolvido para o processo seletivo de estágio fullstack na Finger Digital.**

Para iniciar o projeto você precisa primeiro rodar o comando "npm install" para instalar as dependências utilizadas no desenvolvimento do projeto.
Tanto na pasta backend, quanto na frontend.

Em seguida precisa configuar a conexão com o banco de dados, no arquivo app.module que ficando dentro do backend.

```json
{
    type: "postgres",
    host: "localhost",
    port: porta em que o db esta funcionando,
    username: "user name do seu db",
    password: "password do db",
    database: 'nome do db',
    autoLoadEntities: true,
    synchronize: true    
}
```

**Obs: Projeto desenvolvido com Postgresql, para isso precisa ser um DB Postgres.**

Comandos finais para rodar o projeto: 

"npm run start:dev" no backend. Irá rodar na porta 3000

"ng s" no frontend. Irá rodar na porta 4200

