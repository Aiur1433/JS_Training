let liveServer = require("live-server");
let params = {
    port: 8888,
    host: "localhost",
    open: true,
    file: "/ThreeJs/index.html",
    wait: 1000,
    logLevel: 2
    // proxy: [['/api','http://www.abc.com/api/']]
};
liveServer.start(params);