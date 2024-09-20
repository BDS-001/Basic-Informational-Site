const http = require('http')
const fs = require('fs').promises

const PORT = 8080

async function readFile(filePath) {
    try {
        return fs.readFile(filePath, 'utf8')
    } catch (error) {
        console.log(error)
    }
}

async function handleRequest(req, res) {
    try {
        const pathname = req.url === '/' ? './index.html' : `.${req.url}.html`;
        const content = await readFile(pathname)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(content)
        res.end()
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        try {
            const errorContent = await readFile('./404.html')
            res.write(errorContent)
            res.end()
        } catch (error) {
            res.end('404 Not Found');
        }
    }
}


const server = http.createServer(handleRequest)

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
})