const redis = require('./client');
// redis
const WriteSketch = (request, response) => {
    let dateTime = new Date();
    // dateTime = dateTime.toJSON();
    let obj = {
        'textPUB': request.params.text,
        'Time': {'day': dateTime.getDate(), 'month': dateTime.getMonth()+1, 'hour': dateTime.getHours(), 'minute': dateTime.getMinutes()} 
    }
    console.log(obj)
    redis.set(request.params.usrID, JSON.stringify(obj), 'EX', 7200)
    response.status(200).send('OK')

};

const ReadSketch = (request, response) => {
    //console.log(request.params.usrID)
    redis.get(request.params.usrID).then(function (result) {
        console.log(result);
        if(result != null){
            response.status(200).json(JSON.parse(result.toString()))
        }
        else{
            response.status(200).send('null')
        }
        
    });
};

const DeleteSketch = (request, response) => {
    redis.del(request.params.usrID)
    response.status(200).send('OK')
};


module.exports = {WriteSketch, ReadSketch, DeleteSketch};