const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

//Test endpoint
app.get('/', (req, res) => {
    res.send('API Running')
})

app.listen(PORT, () => {
    console.log(`Server running on ${8000}`)
})