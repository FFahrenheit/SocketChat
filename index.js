const express = require('express');
const port =  process.env.PORT || 4000;

let app = express();

let server = app.listen(port, () => {
    console.log('Running server on port ' + port);
});

app.use(express.static('public'));