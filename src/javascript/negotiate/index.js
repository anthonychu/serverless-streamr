module.exports = async function (context, req, connectionInfo) {
    context.res = {
        status: 200,
        headers: {
            'Content-type': 'application/json'
        },
        body: connectionInfo
    };
};