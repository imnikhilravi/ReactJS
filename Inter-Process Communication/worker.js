const axios = require("axios");

const redis = require("redis");
const redisConnection = require('./redis-connection');

const client = redis.createClient();

const bluebird = require("bluebird");
bluebird.promisifyAll(redis.RedisClient.prototype);

console.log("Worker initialized");

const loadData = async () => {
    if (!await client.existsAsync('users')) {
        const httpResponse = await axios.default.get("https://gist.githubusercontent.com/philbarresi/5cf15393d245b38a2d86ce8207d5076c/raw/d529fb474c1af347702ca4d7b992256237fa2819/lab5.json");
        const users = httpResponse.data;
        users.forEach(async (user) => {
            await client.setAsync(user.id, JSON.stringify(user));
        });
    }
}

redisConnection.on('find-user', async (data, channel) => {
    if (await client.existsAsync(data.userId))
        redisConnection.emit('layout', JSON.parse(await client.getAsync(data.userId)));
    else redisConnection.emit('layout', { 'error': `User with id ${data.userId} could not be found!` });
});

redisConnection.on('add-user', async (user, channel) => {
    if (isNaN(user.id))
        redisConnection.emit('layout', { 'error': 'ID should be a number' });
    else {
        user.id = parseInt(user.id, 10);
        if (await client.existsAsync(user.id))
            redisConnection.emit('layout', { 'error': `User with the id ${user.id} already exists!` });
        else {
            let lost = [];
            if (!user.first_name)
                lost.push('first_name');
            if (!user.last_name)
                lost.push('last_name');
            if (!user.email)
                lost.push('email');
            if (!user.gender)
                lost.push('gender');
            if (!user.ip_address)
                lost.push('ip_address');
            if (lost.length > 0) {
                if (lost.length == 1)
                    redisConnection.emit('layout', { 'error': `${lost[0]} is required to create.` });
                else redisConnection.emit('layout', { 'error': `${lost.toString()} are required to create.` });
            } else {
                await client.setAsync(user.id, JSON.stringify(user));
                redisConnection.emit('layout', user);
            }
        }
    }
});

redisConnection.on('remove-user', async (data, channel) => {
    if (await client.existsAsync(data.userId)) {
        await client.del(data.userId);
        redisConnection.emit('layout', { 'message': `User with id ${data.userId} deleted!` });
    }
    else
        redisConnection.emit('layout', { 'error': `User with id ${data.userId} could not be found!` });
});

redisConnection.on('update-user', async (user, channel) => {
    if (isNaN(user.id))
        redisConnection.emit('layout', { 'error': 'ID should be of numeric value.' });
    else {
        user.id = parseInt(user.id, 10);
        if (await client.existsAsync(user.id)) {
            let lost = [];
            if (!user.first_name)
                lost.push('first_name');
            if (!user.last_name)
                lost.push('last_name');
            if (!user.email)
                lost.push('email');
            if (!user.gender)
                lost.push('gender');
            if (!user.ip_address)
                lost.push('ip_address');
            if (lost.length > 0) {
                if (lost.length == 1)
                    redisConnection.emit('layout', { 'error': `${lost[0]} is required.` });
                else redisConnection.emit('layout', { 'error': `${lost.toString()} are required.` });
            } else {
                await client.setAsync(user.id, JSON.stringify(user));
                redisConnection.emit('layout', user);
            }
        }
        else
            redisConnection.emit('layout', { 'error': `User with id ${user.id} could not be found!` });
    }
});

loadData();