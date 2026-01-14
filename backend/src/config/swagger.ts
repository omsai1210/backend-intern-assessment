import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Backend Intern Assessment API',
            version: '1.0.0',
            description: 'API documentation for the Task Management System',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
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
    apis: ['./src/routes/*.ts'], // Path to the API docs
};

export const specs = swaggerJsdoc(options);
