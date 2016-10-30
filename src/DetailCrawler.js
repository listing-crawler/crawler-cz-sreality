const Crawler = require('./Crawler/Crawler.js');

class DetailCrawler
{
    constructor(got)
    {
        this.got = got;
    }

    crawl(url, result)
    {
        this.got(url)
            .then(response => {
                let responseJson = JSON.parse(response.body);
                let listing = this.map(responseJson);
                listing.urlDetail = url;
                result.listing(listing);
            })
            .catch(error => {
                console.log(error.response.body);
            });
    }

    map(data)
    {
        let id;
        for (var item of data.items) {
            if (item.name == 'ID') {
                id = item.value;
            }
        }
        let listing = new Crawler.Listing(id);
        listing.gps = new Crawler.Gps(data.map.lon, data.map.lat);
        listing.address = data.locality.value;
        listing.country = 'CZ';
        listing.description = data.text.value;
        listing.name = data.name.value;
        this.mapItems(data.items, listing);

        let agent = new Crawler.Agent();
        agent.name = data.contact.name;
        agent.email = data.contact.email;
        for (let phone of data.contact.phones) {
            agent.addPhone("+" + phone.code + "" + phone.number);
        }
        listing.agent = agent;

        for (let image of data._embedded.images) {
            listing.addImage(new Crawler.Image('listing', image._links.self));
        }

        if (data.hasOwnProperty('price_czk')) {
            listing.price = new Crawler.Price(data.price_czk.value_raw, 'CZK');
        }

        return listing;
    }

    mapItems(items, listing)
    {
        let mappings = {
            'level': 'Podlaží',
            'area': 'Plocha podlahová',
            'ownership': 'Vlastnictví',
        };

        for (var item of items) {
            for (var mapping in mappings) {
                if (item.name == mappings[mapping]) {
                    listing[mapping] = item.value;
                }
            }
        }
    }
}

module.exports = DetailCrawler;

