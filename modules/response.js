var resonse = {

    create:createResponse

};

function  createResponse(response,status) {

    if (!status){
        status = '200';
    }

    return {
        statusCode: status,
        body: JSON.stringify(response),
        headers: {
            'Content-Type': 'application/json'
        }
    };
}
module.exports = resonse;