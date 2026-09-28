import { connectDB } from './config/db.js';
import {app} from "./app.js";
import { env } from './config/env.js';

  connectDB();

  app.listen(5000, ()=>{
    console.log("CLIENT URL: " + env.clientUrl);
    console.log("SERVER IS RUNNING ON PORT: " + env.port);
  });
