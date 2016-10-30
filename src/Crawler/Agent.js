'use strict';

class Agent {
    constructor() {
        this.www = null;
        this.email = null;
        this.name = null;
        this.phones = [];
    }

    addPhone(phone)
    {
        this.phones.push(phone);
    }
}

module.exports = Agent;
