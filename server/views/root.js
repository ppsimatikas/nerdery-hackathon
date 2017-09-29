import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
            <html>
            <head lang="en">
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta http-equiv="x-ua-compatible" content="ie=edge" />
                <title>Sweep Alert!</title>
                <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon"/>
                <link rel="stylesheet" href="/static/app.css"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
            </head>
            <body>
            <div id="app"/>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC8KINg5P4Rj_OH5VenHce6DA9sF-PFriE" type="text/javascript"/>
            <script src="/static/app.bundle.js"/>
            </body>
            </html>
        );
    }
}

export default App;
