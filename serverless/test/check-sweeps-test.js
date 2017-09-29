var handler = require('../../serverless/handler').create
handler({
    'body-json': {
        "email": "ppsimatikas@gmail.com1",
        "phone": "2243459693",
        "location": {
            "lat": 41.851913,
            "lng": -87.695410
        }
    }
}, null, console.log);
