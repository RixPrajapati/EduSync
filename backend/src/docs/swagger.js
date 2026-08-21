import swaggerJsdoc from 'swagger-jsdoc';
import config from '../config/config.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EduSync API',
      version: '1.0.0',
      description: 'API documentation for the EduSync College Management Portal',
    },
    servers: [
      {
        url: config.app_url || `http://localhost:${config.port}`,
        description: config.app_url ? 'API server' : 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/models/*.js'], // files containing annotations
};

const specs = swaggerJsdoc(options);

export default specs;
