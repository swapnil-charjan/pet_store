import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pet Store API",
      version: "1.0.0",
      description: "API documentation for the Pet Store",
    },
  },
  apis: ["./routes/*.ts", "./controllers/*.ts"], // adjust paths as needed
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };