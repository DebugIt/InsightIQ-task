const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser"); 
const csrf = require("csurf");
const app = express();
const PORT = process.env.PORT || 3000;
require("dotenv").config();

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'https://insight-iq-task.vercel.app/'];

app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


const csrfProtection = csrf({ cookie: true }); 
app.use(csrfProtection); 

// DB
require("./DB/connection");

// routes
const userRouter = require("./routes/user");

// endpoints
app.use("/api/v1/user", userRouter);

// getting the csrf token
app.get("/csrf-token", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken()); 
    res.status(200).json({ 
        csrfToken: req.csrfToken() 
    });
});

app.get("/", async (req, res) => {
  return res.status(200).json({
    success: true,
    status: 200,
    message: "Hello World",
    data: null,
  });
});

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
