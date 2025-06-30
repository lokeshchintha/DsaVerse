// generate-programs.js

const fs = require('fs');
const https = require('https');

const options = {
  hostname: 'programming-challenges.p.rapidapi.com',
  path: '/api/ziza/programming-challenges/get/all',
  method: 'GET',
  headers: {
    'x-rapidapi-key': '65b88dcaffmshb89be45b7c240d0p1cab1fjsnaf98335909e6',
    'x-rapidapi-host': 'programming-challenges.p.rapidapi.com'
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', chunk => {
    data += chunk;
  });

  res.on('end', () => {
    const challenge = JSON.parse(data);

    const fileContent = `export const challenge = ${JSON.stringify(challenge, null, 2)};`;

    fs.writeFileSync('programs.js', fileContent);
    console.log('✅ Challenge saved to programs.js');
  });
});

req.on('error', (error) => {
  console.error('❌ Error fetching challenge:', error);
});

req.end();
