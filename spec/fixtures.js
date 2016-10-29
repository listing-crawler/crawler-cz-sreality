class FixtureUpdater {
}

class Request {
    constructor(http, https) {
        this.http = http;
        this.https = https;
    }

    get(url, callback) {
        let request = /^https:\/\//i.test(url) ? https : http;
        request.get(url, callback);
    }
}


let fs = require("fs");
let http = require('http');
let https = require('https');
let request = new Request(http, https);
let content = fs.readFileSync("/app/test/fixtures.json");
let jsonContent = JSON.parse(content);

for (urlData of jsonContent.urls) {
    let name = urlData.name;
    let url = urlData.url;

    request.get(url, (res) => {
        let response = '';
        console.log(`[${name}] start`);

        res.on('data', (d) => {
            response += d;
        });

        res.on('end', () => {
            fs.writeFileSync('/app/test/fixtures/' + name, response);
            console.log(`[${name}] done`);
        });
    });
}
