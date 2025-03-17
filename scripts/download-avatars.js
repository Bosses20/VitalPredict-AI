const https = require('https');
const fs = require('fs');
const path = require('path');

const avatars = [
    {
        name: 'mike',
        url: 'https://api.dicebear.com/7.x/personas/svg?seed=mike&backgroundColor=b6e3f4&radius=50'
    },
    {
        name: 'emma',
        url: 'https://api.dicebear.com/7.x/personas/svg?seed=emma&backgroundColor=ffdfbf&radius=50'
    },
    {
        name: 'sarah',
        url: 'https://api.dicebear.com/7.x/personas/svg?seed=sarah&backgroundColor=c0aede&radius=50'
    },
    {
        name: 'james',
        url: 'https://api.dicebear.com/7.x/personas/svg?seed=james&backgroundColor=bde0fe&radius=50'
    },
    {
        name: 'lisa',
        url: 'https://api.dicebear.com/7.x/personas/svg?seed=lisa&backgroundColor=ffd6ff&radius=50'
    },
    {
        name: 'david',
        url: 'https://api.dicebear.com/7.x/personas/svg?seed=david&backgroundColor=caffbf&radius=50'
    }
];

const downloadAvatar = (url, filename) => {
    const filepath = path.join(__dirname, '..', 'public', 'images', 'avatars', filename);
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${filename}`);
        });
    }).on('error', (err) => {
        fs.unlink(filepath);
        console.error(`Error downloading ${filename}:`, err.message);
    });
};

avatars.forEach(avatar => {
    downloadAvatar(avatar.url, `${avatar.name}.svg`);
});
