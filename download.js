const ftp = require("basic-ftp");
const fs = require("fs");
require("dotenv").config();

async function downloadImages(host, user, pw) {
    const client = new ftp.Client();
    client.ftp.verbose = true

    try {

        await client.access({
            host: host,
            user: user,
            password: pw,
            //secure: false,
        });
        console.log(`Connected to ${process.env.FTP_HOST}`);
        await client.downloadToDir("public/img", "/htdocs/img");
    } catch (err) {
        console.error(err);
    }
    client.close();
}


downloadImages( process.env.FTP_HOST, process.env.FTP_USER, process.env.FTP_PW);
