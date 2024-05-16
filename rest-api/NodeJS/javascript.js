const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 2000;
const serviceport = 2500;

app.use(bodyParser.json());

app.get('/', async(req, res) => {
    const {data} = await axios.get(`http://localhost:${serviceport}`);
    res.json(data)
    
});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
