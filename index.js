require("dotenv").config();
const express = require("express");
const fs = require("fs").promises;
const app = express();

const PORT = parseInt(process.env.USE_PORT, 10) || 3000;

app.get('*', async (req, res) => {
    try {
        const pathname = req.path === '/' ? './index.html' : `.${req.path}.html`;
        console.log(pathname)
        const content = await fs.readFile(pathname, 'utf8')
        res.type('html').send(content);
    } catch (error) {
        res.status(404)
        try {
            const errorContent = await fs.readFile('./404.html', 'utf8')
            res.type('html').send(errorContent);
        } catch (error) {
            res.end('could not open error page');
        }
    }
})

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/`))