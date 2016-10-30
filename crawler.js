const Result = require('./src/Crawler/Result.js');

var url;
if (process.argv.length > 2) {
    url = process.argv[2];
} else {
    process.stderr.write("Crawler expects URL\n");
    process.stderr.write("list url example: https://www.sreality.cz/api/cs/v2/estates?category_main_cb=1&category_type_cb=1&page=0&per_page=60\n");
    process.stderr.write("detail url example: https://www.sreality.cz/api/cs/v2/estates/2541089116\n");
    process.exit(1);
}

const got = require('got');
const result = new Result(process.stdout);

if (url.match(/v2\/estates\/\d/)) {
    const DetailCrawler = require('./src/DetailCrawler.js');
    const detailCrawler = new DetailCrawler(got, result);
    detailCrawler.crawl(url, result);
} else {
    const ListCrawler = require('./src/ListCrawler.js');
    const listCrawler = new ListCrawler(got, result);
    listCrawler.crawl(url, result);
}
