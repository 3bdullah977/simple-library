import express from "express";
import "dotenv/config";
import bookRoutes from "./routes/bookRoutes.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

const PORT = process.env.PORT || 8080;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API with Swagger",
      version: "0.1.0",
      description:
        "A simple Library API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json());
app.use("/api/v1/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Hello From The Server</h1>");
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
