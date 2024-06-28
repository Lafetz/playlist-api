import config from "./config/env.config";
import InitDB from "./repository/init";
import createServer from "./web/server";
import mongoose from "mongoose";
const port=config.PORT 
const app = createServer();


const server=app.listen(port, async () => {
  await InitDB()
  console.log(`running at http://localhost:${port}`);
});
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received.');
    server.close(async () => {
		try{
			await mongoose.disconnect()
			process.exit(0);
		}catch(err){
			console.error(err)
			process.exit(1);
		}
        
    });
});
