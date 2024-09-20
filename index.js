require("dotenv").config();
const express = require("express");
const fs = require("fs").promises;
const app = express();

const PORT = parseInt(process.env.USE_PORT, 10) || 3000;

async function readFile(filePath) {
    try {
        return fs.readFile(filePath, 'utf8')
    } catch (error) {
        console.log(error)
    }
}

app.get('*', async (req, res) => {
    try {
        const pathname = req.path === '/' ? './index.html' : `.${req.path}.html`;
        console.log(pathname)
        const content = await readFile(pathname)
        res.type('html').send(content);
    } catch (error) {
        res.status(404)
        try {
            const errorContent = await readFile('./404.html')
            res.type('html').send(errorContent);
        } catch (error) {
            res.end('could not open error page');
        }
    }
})

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`))