# codiuswebshop

Codiuswebshop is a responsive React application which simulates a small webshop, and by using the application, you are able to put the items in the shopping cart and proceed with the checkout process.

# Getting started

## Run the application

1. Clone the repo:

```
git clone https://github.com/urisk333/codiuswebshop
```

## Server side

Follow the next steps to run the server side of the application:

1. Run the server side of the application:

```
cd server
npm i
```

2. Start the PostgreSQL database from your terminal.

3. Create .env file in the models folder, and add the credentials to the file, where your USER and PASSWORD are the ones related to your PostgreSQL database and DATABASE is just a name which you want to give to your database:

```
DATABASE_URL="postgresql://USER:PASSWORD@127.0.0.1:5432/DATABASE"
```

4. In your terminal, inside the models folder, run in the order `npx prisma generate` and `npx prisma migrate dev`, and afterwards delete _node_modules_ from that folder.

5. Run the server:

```
nodemon index.ts
```

## Client side

Follow the next steps to run the client side of the application:

1. Run the application:

```
cd codiuswebshop/webshop
npm i
npm start
```

# Tech stack

- [ReactJS](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [NodeJS](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)

# Author

Ivan Car - [GitHub](https://github.com/urisk333) / [LinkedIn](https://www.linkedin.com/in/ivan-car/)
