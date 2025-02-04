const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "DC - REST API",
    version: "1.0.0",
    description: "This is a REST API application made with Express",
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1",
      description: "Dev server v1",
    },
  ],
  components: {
    securitySchemes: {
      token: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {},
  },
  security: [{ token: [] }],
  tags: [
    {
      name: "Judges",
    },
    {
      name: "Law Firms",
    },
    {
      name: "Lawyer",
    },
    {
      name: "DocketStatus",
    },
  ],
  paths: {},
};
export default swaggerDefinition;
