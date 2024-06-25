
import InitDB from "./db/init";
import createServer from "./server";

const port=8080
InitDB()
const app = createServer();
app.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`);
});