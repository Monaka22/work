const controller = {};
var fs = require('fs');
// const bodyPar = require('../app');
// controller.use(bodyPar());

controller.list = (req, res) => {
    res.writeHead(404,{'Content-Type':'text/html'});
        var myStream= fs.createReadStream(__dirname+"/"+'../404notfond.html','utf8');
        myStream.pipe(res);
};

controller.listById = (req, res) => {
    res.writeHead(404,{'Content-Type':'text/html'});
    var myStream= fs.createReadStream(__dirname+"/"+'../404notfond.html','utf8');
    myStream.pipe(res);
};


controller.save = (req, res) => {
    res.writeHead(404,{'Content-Type':'text/html'});
    var myStream= fs.createReadStream(__dirname+"/"+'../404notfond.html','utf8');
    myStream.pipe(res);
};

controller.update = (req, res) => {
    res.writeHead(404,{'Content-Type':'text/html'});
    var myStream= fs.createReadStream(__dirname+"/"+'../404notfond.html','utf8');
    myStream.pipe(res);
};

controller.delete = (req, res) => {
    res.writeHead(404,{'Content-Type':'text/html'});
    var myStream= fs.createReadStream(__dirname+"/"+'../404notfond.html','utf8');
    myStream.pipe(res);
}

module.exports = controller;