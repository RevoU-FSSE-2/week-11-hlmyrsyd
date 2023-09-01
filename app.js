const express = require('express')
const swaggerUi = require('swagger-ui-express');
// const path = require('path');
const yaml = require('yaml');
const fs = require('fs');

const openApiPath = "./docs/openapi.yaml";
const file = fs.readFileSync(openApiPath, "utf-8");
const swaggerDocument = yaml.parse(file);
const authenticationUser = require('./middleware/authentication')

// ROUTERS
const app = express();
const tasks = require('./routes/tasks')
const users = require('./routes/user')

const mainRouter = require('./routes/main')

const notFound = require('./middleware/not-found')

// DB
const connectDB = require('./db/connect')
require('dotenv').config()

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)

        // LISTEN 
        app.listen(port, () => {
            console.log(`test on ${port}`);
        });
    } catch (error) {
        console.log(error)
    }
}

start()

// PORT 
const port = process.env.PORT || 3033

// SERVE SWAGGER UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// MIDDLEWARE
// app.use(express.static())
app.use(express.json())

// ROUTES

app.use('/api/v1/user', users) //user
app.use('/api/v1/tasks', authenticationUser, tasks) //Task

app.use('/api/v1', mainRouter)

app.use(notFound)
