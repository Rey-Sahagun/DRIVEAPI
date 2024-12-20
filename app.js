const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '-.apps.googleusercontent.com';
const CLIENT_SECRET = '-';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground/';

const REFRESH_TOKEN = '1//-';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

const filePath = path.join(__dirname, 'DAVIDBOWIE.jpg');

async function uploadFile() {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: 'DAVIDBOWIE.jpg',
                mimeType: 'image/jpg',
            },
            media: {
                mimeType: 'image/jpg',
                body: fs.createReadStream(filePath),
            },
        });

        console.log('File uploaded successfully:', response.data);
    } catch (error) {
        console.error('Error uploading file:', error.message);
    }
}

//uploadFile();
async function deleteFile() {
    try {

        const response = await drive.files.delete({
            fileId: '18WVVrC0nvUXEd59Om68829mFkinJskkW',
        });

        console.log(response.data, response.status);
    } catch (error) {
        console.error('Error deleting file:', error.message);
    }
}

//deleteFile();

async function generatePublicUrl() {
    try {
        const fileId = '1pcQEfysBJvGYcnDH2woAuCuUOVtcGf3X';

        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink',
        });

        console.log('Public URL:', result.data);
    } catch (error) {
        console.error('Error generating public URL:', error.message);
        console.error('Full Error:', error);
    }
}

generatePublicUrl();
