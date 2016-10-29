'use strict';

const Agent = require('./Agent.js');

class Listing {
    constructor(id)
    {
        this.id = id;
        this.price = null;
        this.gps = null;
        this.adress = null;
        this.country = null;
        this.name = null;
        this.price = null;
        this.agent = null;
        this.urlDetail = null;
        this.images = [];
    }

    addImage(image)
    {
        this.images.push(image);
    }
}

module.exports = Listing;
