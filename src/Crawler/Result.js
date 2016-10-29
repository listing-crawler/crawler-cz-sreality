'use strict';

class Result
{
    constructor(stream)
    {
        this.stream = stream;
    }

    url(url)
    {
        this.write('url', url);
    }

    listing(listing)
    {
        this.write('listing', listing);
    }

    write(type, object)
    {
        const json = JSON.stringify({'type': type, 'data': object});
        this.stream.write(json + "\n");
    }
}

module.exports = Result;
