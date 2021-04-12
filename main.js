import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import v1 from "./apis/v1/index.js";
import dotenv from 'dotenv';
import cors from "cors";

(async function buildServer() {
  "use strict";
  dotenv.config();
  console.log("Xemithus server is starting up.");

  const app = express();
  app.use(express.json());
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(cors());

  // routes
  app.use('/v1', v1);
  app.use('/v2', v1);

  app.listen(process.env.PORT, () => {
    const data = {
      port: process.env.PORT,
      message: "server successfully started.",
      time: new Date().toISOString()
    }
    console.table(data);
  });
})();