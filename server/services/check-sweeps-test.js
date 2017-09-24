var handler = require('../../sweep-alert/handler').check
handler({
    "email": "ppsimatikas@gmail.com",
    "phone": "2243459693",
    "location": {
        "lat": 41.851913,
        "lng": -87.695410
    }
}, null, console.log)
