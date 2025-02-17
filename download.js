const ftp = require("basic-ftp");
const fs = require("fs");

async function downloadImages() {
    const client = new ftp.Client();
    try {
        await client.access({
            host: "ftp.mirandola2.it",
            user: process.env.FTP_USER,
            password: process.env.FTP_PW,
        });

        await client.downloadToDir("public/img", "/htdocs/img");
    } catch (err) {
        console.error(err);
    }
    client.close();
}

downloadImages();
