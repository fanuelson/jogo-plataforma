var connect = require('connect'),
    serveStatic = require('serve-static');
var app = connect();
app.use(serveStatic("."));
app.listen(8000);
console.log(require('os').networkInterfaces());

