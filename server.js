const {createServer} = require("http");
const data = require('./data.json');
createServer((req, res) => {
if(req.url.indexOf("/login/") == 0) {const [email, pass] = req.url.replace("/login/", "").split('/');
for(let i = 0; i < data.length; i++){
if (data[i].email == email && data[i].password == password) res.end('{"login": true}')
}
res.end('{"login": false}')
}
}).listen(80)
