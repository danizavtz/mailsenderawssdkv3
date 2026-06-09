const express = require('express');
const app = express();
const cors = require('cors');
const allowedOrigins = [
    "https://danizavtz.com.br",
    "https://app.danizavtz.com.br"
];

app.use(express.json());
app.use(cors({
    origin: allowedOrigins,
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: false
}));
app.use(require('./server/index'));
module.exports = app;