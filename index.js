require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const https = require('https');
const mountRoutes = require('./server/routes');
const app = express();
const port = process.env.PORT || 5000;
const myLiffId = process.env.MY_LIFF_ID;
const redirectUri = process.env.REDIRECT_URI;

mountRoutes(app);
app.use(express.static('public'));

app.get('/send-id', function(req, res) {
    res.json({id: myLiffId, redirectUri });
});

if (process.env.NODE_ENV === 'development') {
    const devCert = fs.readFileSync(
        path.resolve(__dirname, 'cert/localhost.pem')
    );
    const devKey = fs.readFileSync(
        path.resolve(__dirname, 'cert/localhost-key.pem')
    );
    const server = https.createServer({
        key: devKey,
        cert: devCert
    }, app);
    server.listen(8000, function() {
        console.log(`https listening on port 8000!`);
    });
}
app.listen(port, () => console.log(`http listening on port ${port}!`));