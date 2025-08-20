import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "Simple CRUD API documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:5001",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // optional, just to show it's a JWT
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Apply globally to all routes
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to route files with Swagger comments
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
