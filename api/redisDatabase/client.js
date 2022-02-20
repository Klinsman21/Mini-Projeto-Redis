const Redis = require("ioredis");

const client = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST)

client.on("connect", function (error){
    console.log("conectado")
})
client.on("error", function (error){
    console.log(error)
    throw error
})


module.exports = client;