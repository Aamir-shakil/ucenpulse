/**
 * Swagger Configuration
 *
 * Sets up OpenAPI (Swagger) documentation for the UCENPulse API.
 * This allows developers to view, test, and understand available
 * endpoints, request formats, and authentication requirements.
 */

const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "UCENPulse API",
      version: "1.0.0",
      description: "Server-side API for UCENPulse fitness and wellness tracking application",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;