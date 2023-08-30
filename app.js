const express = require('express')
const swaggerUi = require('swagger-ui-express');
// const path = require('path');
const yaml = require('yaml');
const fs = require('fs');

const openApiPath = "./docs/openapi.yaml";
const file = fs.readFileSync(openApiPath, "utf-8");
const swaggerDocument = yaml.parse(file);

const app = express();
const tasks = require('./routes/tasks')

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
const port = 3033

// SERVE SWAGGER UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// MIDDLEWARE

app.use(express.json())

// ROUTES

app.use('/api/v1/tasks', tasks)

