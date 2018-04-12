const redisConnection = require('./redis-connection');
const axios = require('axios');

console.log("Worker has started");

redisConnection.on("pic-search-request", async (data, channel) => {
    let results = await axios.default.get(`https://pixabay.com/api/?key=8606250-48c458c4bc06aed462d8c59f7&q=${data.search}&per_page=4`);
    images = [];
    results.data.hits.forEach(hit => {
        images.push(hit.previewURL);
    });
    data.images = images;
    redisConnection.emit("pic-search-response", data);
});

