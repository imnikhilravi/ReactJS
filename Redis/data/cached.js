const redis = require("redis");
const bluebird = require("bluebird");

const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

async function getCachedUserById(id) {
    let user = await client.getAsync(id);
    user = JSON.parse(user);
    return user;
}

async function addUserToCache(user) {
    const cacheString = JSON.stringify(user);
    const result = await client.multi().set(user.id, cacheString).lpush("UsersCached", cacheString).execAsync();
    return result;
}

async function getCacheUsers() {
    const cachedUserSize = await client.llenAsync("UsersCached");
    if (cachedUserSize === 0)
        return "There are no users present"

    const usersJsonList = [];
    let usersList;

    if (cachedUserSize > 20)
    usersList = await client.lrangeAsync("UsersCached", 0, 20);
    else usersList = await client.lrangeAsync("UsersCached", 0, cachedUserSize - 1);
    
    while (usersList.length > 1)
    usersJsonList.push(JSON.parse(usersList.shift()));
    return usersJsonList;
}

module.exports = { getCachedUserById, addUserToCache, getCacheUsers };