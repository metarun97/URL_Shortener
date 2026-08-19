/* Imported elements */
import dotenv from "dotenv";
import app from './src/app.js';
import dns from "dns";
import connectToDb from './src/db/db.js';


/* Configure env file data */
dotenv.config();

/* Set server dns menually */
dns.setServers(["1.1.1.1", "8.8.8.8"]);

/* Connect to mongodDb database */
connectToDb();

const port = process.env.PORT || 3000;


app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

/* Server started */
app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:${port}`);
})
