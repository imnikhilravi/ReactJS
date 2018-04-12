const redis = require("redis");
const bluebird = require("bluebird");
const axios = require("axios");
const cached = require("./cached");
const fs = require('fs');

const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);

async function getUser(id) {
    await sleep(5000);
    const data = fs.readFileSync("peopledata.txt");;
    if (id <= 0 || id > data.length)
        throw "User with id " + id + " could not be found";
    const user = data[id - 1];
    return user;
}
 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getUserById(id) {
    try {
        if (!id)
            throw "Id is not provided.";
        let user;
        if (await client.existsAsync(id) === 1)
            user = await cached.getCachedUserById(id);
        else user = await getUser(id);
        await cached.addUserToCache(user);
        return user;
    }
    catch (error) {
        throw error;
    }
}

module.exports = { getUserById };