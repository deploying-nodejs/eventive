"use strict";

const Env = use("Env");

module.exports = {
    connection: 'bull',
    bull: Env.get('REDIS_CONNECTION_URL')
};
