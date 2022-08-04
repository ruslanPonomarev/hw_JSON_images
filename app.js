const http = require('http');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

const server = http.createServer((req, res) => {

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html'});
        res.end('<h1>Home</h1>');
    }

    if (req.url === '/api/users') {
        const users = [
            { name: 'Bob Smith', age: 40 },
            { name: 'Jon Doe', age: 30 }
        ];
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify(users));
    }

    if (req.url === '/download') {
        let filename = `hello.jpg`;
        console.log(mime.lookup(filename));
        let fileContType = mime.lookup(filename);
        if (fileContType) {
            if (fileContType === `image/jpeg`) {
                res.writeHead(200, { 'Content-Type': "image/jpeg"});
                fs.readFile("./"+filename, (err, image) => {
                res.end(image);});
            } else {
                res.writeHead(200, { 'Content-Type': fileContType, "Content-Disposition": "attachment; filename="+filename
                });
                fs.createReadStream('./'+filename).pipe(res);
            }            
        }
    }

});



const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));