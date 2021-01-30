const {createServer} = require("http");
const data = require('./data.json');
createServer(function(req, res){
if(req.url.indexOf("/login/") == 0) {
  const [email, pass] = req.url.replace("/login/", "").split('/');
  for(let i = 0; i < data.length; i++){
    if (data[i].email == email && data[i].password == pass) {res.end('{"login": true}'); return;}
  }
  res.end('{"login": false}');
}else res.writeHead(404)
}).listen(80);
