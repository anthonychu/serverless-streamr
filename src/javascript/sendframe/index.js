module.exports = async function (context, req) {
    const frame = req.body;
    return {
        target: 'newFrame',
        arguments: [ frame ]
    };
};