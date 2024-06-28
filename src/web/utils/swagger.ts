import swaggerJSDoc from "swagger-jsdoc";

//const version =require("../../../package.json")
const options: swaggerJSDoc.Options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API Docs",
        version:""
      },
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
    apis: ["./src/web/routes/*.ts"],
  };
  export default options