require("dotenv").config();
require("./db/mongoose");

/** Express */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
/* **Socket IO */
const app = express();
const server = require("http").Server(app);

const logger = require('morgan')
app.use(logger('dev'))

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const orderRoutes = require("./routes/order")
const bulkOrderRoutes = require("./routes/bulkOrder")
const addressRoutes = require("./routes/address")
const razorpayRoutes = require("./routes/razorpay")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const allowedOrigins = ['http://localhost:3000', 'http://16.171.24.125', 'http://13.210.82.75', 'https://shopfrombharat.com'];

app.use(cors({
  // origin: function (origin, callback) {
  //   // Allow requests with no origin (like mobile apps, curl, etc.)
  //   if (!origin) return callback(null, true);

  //   if (allowedOrigins.indexOf(origin) === -1) {
  //     const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
  //     return callback(new Error(msg), false);
  //   }
  //   return callback(null, true);
  // },
  origin: true,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/api/auth", authRoutes);
app.use("/api/bulk-order", bulkOrderRoutes);

const middleware = require("./middleware/verifyToken");
app.use(middleware);

app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/razorpay", razorpayRoutes);

if (process.env.NODE_ENV !== "test") {
  server.listen(process.env.PORT || 4000, () => {
    console.info(`[LOG=SERVER] Server started on port ${process.env.PORT}`);
  });
}

module.exports = { app };
