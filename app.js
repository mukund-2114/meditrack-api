const express = require('express');
const connectDB = require('./config/db');
const app = express();
const userRoutes = require('./routes/userRoute')
const patientRoutes = require('./routes/patientRoute')
const testRoutes = require('./routes/testRoute')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const PORT = process.env.PORT || 3000;
const cors = require('cors');
app.use(cors());
// Connect to MongoDB
connectDB();

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API documentation using Swagger',
      },
      servers: [
        {
          url:`https://meditrack-api-azure-dqc0gdaefebzgrgw.canadacentral-01.azurewebsites.net:${PORT}`,
          description: 'Development server'
        },
      ],
    },
    apis: ['./routes/*.js'],
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  module.exports = { swaggerUi, swaggerDocs };
// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/users',userRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/tests', testRoutes);
app.get('/',(req ,res)=>{
    res.send('Hello from the server!'); 
})





app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
