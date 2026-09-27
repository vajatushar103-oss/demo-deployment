import { connectDB } from './src/config/db.js';
import {app} from "./src/app.js";
import { env } from './src/config/env.js';

  connectDB();

  app.listen(env.port, ()=>{
    console.log("CLIENT URL: " + env.clientUrl);
    console.log("SERVER IS RUNNING ON PORT: " + env.port);
  });
