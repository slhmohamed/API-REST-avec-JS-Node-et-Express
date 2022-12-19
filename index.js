const express = require("express");
const path = require("path");
require("dotenv").config();
const config = require("./config")
const PORT = config.port || 3000;
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { connect } = require("./db/connectDB");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { baseUrl } = require("./config")

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Library API",
        version: "1.0.0",
        description: "A simple Express Library API",
      },
      servers: [
        {
          url: baseUrl,
        },
      ],
    },
    apis: ["./routes/*.js", "./routes/schemas/*.js"],

  };
  
  const specs = swaggerJsDoc(options);
  
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
//routes
const routes=require("./routes/index");

app.use("/api",routes);

connect();

app.listen(PORT,()=>{
    console.log(`app running on port ${PORT}`);
})