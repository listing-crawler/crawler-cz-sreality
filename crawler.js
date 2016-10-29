// Listing URL https://www.sreality.cz/api/cs/v2/estates?category_main_cb=1&category_type_cb=1&page=2&per_page=60&tms=1477596417028
// Listing URL Brno-Mesto, Brno-Venkov https://www.sreality.cz/api/cs/v2/estates?category_main_cb=1&category_type_cb=1&locality_district_id=72%7C73&locality_region_id=14&page=2&per_page=60&tms=1477596549978
// Detail URL https://www.sreality.cz/api/cs/v2/estates/2541089116
// TODO, basic logic.
// node crawler.js https://www.sreality.cz/api/cs/v2/estates?category_main_cb=1&category_type_cb=1&page=2&per_page=60 should return CrawlerResult

const ListCrawler = require('./src/ListCrawler.js');
const Result = require('./src/Crawler/Result.js');

// TODO listing result: list of simple listings + list of urls to be crawled

// class Mapper {

// }

var url;
if (process.argv.length > 2) {
    url = process.argv[2];
} else {
    url = 'https://www.sreality.cz/api/cs/v2/estates?category_main_cb=1&category_type_cb=1&page=0&per_page=1';
}

const got = require('got');
const result = new Result(process.stdout);
const listCrawler = new ListCrawler(got, result);
listCrawler.crawl(url, result);
