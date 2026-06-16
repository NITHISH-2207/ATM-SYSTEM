const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

connectDB();

const app = express();



app.use(cors({
    origin: ["http://localhost:5173",
            "https://atm-system-n1av.vercel.app/"]
}));

app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: err.message,
  });
});
app.use("/api/atm", require("./routes/atmRoutes"));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Running");
});