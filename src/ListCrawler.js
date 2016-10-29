const Crawler = require('./Crawler/Crawler.js');

class ListCrawler {
    constructor(got) {
        this.got = got;
    }

    crawl(url, result) {
        this.got(url)
            .then(response => {
                let responseJson = JSON.parse(response.body);
                let page = parseInt(url.match(/page=(\d+)/)[1]);
                let perPage = parseInt(url.match(/per_page=(\d+)/)[1]);
                let nextPage = page + 1;
                if ((perPage * nextPage) < responseJson.result_size) {
                    result.url(url.replace(/page=\d+/, "page=" + nextPage));
                }

                for (let data of responseJson._embedded.estates) {
                    let listing = this.map(data);
                    result.url(listing.urlDetail);
                    result.listing(listing);
                }
            })
            .catch(error => {
                console.log(error.response.body);
            });
    }

    map(data) {
        var listing = new Crawler.Listing(data.hash_id);
        listing.gps = new Crawler.Gps(data.gps.lon, data.gps.lat);
        listing.address = data.locality;
        listing.country = 'CZ';
        listing.name = data.name;
        listing.urlDetail = 'https://www.sreality.cz/api' + data._links.self.href;
        for (let image of data._links.images) {
            listing.addImage(new Crawler.Image('listing', image.href));
        }

        if (data.hasOwnProperty('price_czk')) {
            listing.price = new Crawler.Price(data.price_czk.value_raw, 'CZK');
        }

        if (data._embedded.hasOwnProperty('company') && data._embedded.company.hasOwnProperty('www')) {
            let agent = new Crawler.Agent();
            agent.www = data._embedded.company.www;
            listing.agent = agent;
        }

        return listing;
    }
}

module.exports = ListCrawler;

