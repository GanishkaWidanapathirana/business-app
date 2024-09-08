require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const businessRoutes = require('./routes/business');
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());

app.use(cors());
const allowedOrigins = ['https://fa67b0b9-a16a-42c3-bc61-2aa2354cf580.e1-us-cdp-2.choreoapps.dev'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
// Routes
app.use('/api/businesses', businessRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});