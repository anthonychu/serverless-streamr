module.exports = async function (context, req) {
    let username = "test";
    if (req.headers && req.headers["x-ms-client-principal"]) {
        const buffer = Buffer.from(req.headers["x-ms-client-principal"], "base64");
        const user = JSON.parse(buffer.toString("ascii"));
        username = user.claims.find(c => c.typ === "nickname").val;
    }

    const ascii = req.body;
    const frame = {
        username,
        ascii,
        connectionId: req.query.connectionId
    };
    return {
        target: 'newFrame',
        arguments: [ frame ]
    };
};