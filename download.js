const ftp = require("basic-ftp");
const fs = require("fs");

async function downloadImages() {
    const client = new ftp.Client();
    try {

        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PW,
        });
        console.log(`Connected to ${process.env.FTP_HOST}`);
        await client.downloadToDir("public/img", "/htdocs/img");
    } catch (err) {
        console.error(err);
    }
    client.close();
}

downloadImages();
