var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var mysql = require('mysql')
let con = mysql.createConnection({
  host: 'host',
  user: 'user',
  password: 'pwd',
  database: 'db'
});

io.on('connection', function(socket){
  console.log('Nova conexão');
  socket.on('search', (data) => {
    typeAhead(data, socket)
  })
});

http.listen(2020, function(){
  console.log('Socket Server *:2020');
});

function typeAhead (str, socket) {
  let query = "SELECT * FROM `produtos` WHERE `nome` LIKE '%"+str+"%' LIMIT 6"
  con.query(query, (err, result, field) => {
    if (err) {
      // fudeu
      console.log('fudeu')
    } else {
      console.log('sucesso')
      console.log(result)
      socket.emit('searchAnswer', result)
    }
  })
}