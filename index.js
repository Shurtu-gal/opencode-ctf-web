const pg = require('pg');
const dotenv = require('dotenv');
const ejs = require('ejs');
const fs = require('fs');
const querystring = require('querystring');

dotenv.config();

const dbConfig = {
  connectionString: process.env.DB_URL,
};

const client = new pg.Client(dbConfig);
client.connect();

const http = require('http');
const server = http.createServer((req, res) => {
  if(req.url === '/' || req.url === '/problems/' || req.url === '/problems'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    const html = fs.readFileSync(__dirname + '/views/index.html', 'utf8');
    if(html){
      res.write(html);
      res.end();
    } else{
      res.write('No file found');
      res.end();

    }
  }

  else if ((req.url === '/question-1' || req.url === '/problems/question-1') && req.method === 'GET') {
    const html = fs.readFileSync(__dirname + '/views/question-1.ejs', 'utf8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    if(html){
      const rendered = ejs.render(html, {title: 'Question 1', flag: 'flag{50m3t!m35_w3_n33d_2_g3t_!ns!de}'});
      res.write(rendered);
      res.end();
    } else{
      res.write('No file found');
      res.end();
    }
  }

  else if ((req.url === '/login' || req.url.includes('/problems/login')) && req.method === 'GET') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      // body is a string of the form 'username=foo&password=bar'
      const { username, password } = querystring.parse(body);
      const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
      client.query(query, (err, result) => {
        if (err) {
          console.log(err);
          res.writeHead(500, {'Content-Type': 'text/html'});
          res.write('Internal server error');
          res.end();
        } else {
          if (result.rows.length === 0) {
            res.writeHead(401, {'Content-Type': 'text/html'});
            res.write('Unauthorized');
            res.end();
          } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            var html = fs.readFileSync(__dirname + '/views/users.ejs', 'utf8');
            var rendered = ejs.render(html, {users: result.rows, username: username});
            res.write(rendered);
            res.end();
          }
        }
      });
    });
  }

  else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write('Page not found');
    res.write('<br>');
    res.write('Try /problems/login');
    res.end();
  }
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on http://localhost:${process.env.PORT || 3000}`);
});