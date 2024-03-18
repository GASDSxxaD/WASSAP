const Discord = require("discord.js-selfbot-v13");
const { Client } = require('discord.js-selfbot-v13');
const client = new Discord.Client({
    checkUpdate: false
});
const express = require('express')
const app = express();
const port = 8000;

const largeImages = [
    'https://media.discordapp.net/attachments/1175250115221532713/1219269832034222080/image.gif?ex=660ab084&is=65f83b84&hm=99b7f2d0d9f175b4871937a7d3e1a7932bbe424d695288669b3d45d44e347630&=',
    'https://media.discordapp.net/attachments/1175250115221532713/1219269832558772295/image3.gif?ex=660ab085&is=65f83b85&hm=b9db8d7615870a6e6a8c467a93b074dcefdd2f0c4e25fac0a8e8e8061a44c08f&=',
    'https://media.discordapp.net/attachments/1175250115221532713/1219269832965357689/image2.gif?ex=660ab085&is=65f83b85&hm=da84bcd72e7213b64f0051b22d94bf529db0088b6f94946430709812538fcc14&=;',
    'https://media.discordapp.net/attachments/1175250115221532713/1219269833443770448/image1.gif?ex=660ab085&is=65f83b85&hm=41da9cd32a71fe73ed8de0150f15e5ce15e5664febc274f8569bdcc9d4c57c55&='
    // Add more large image URLs as needed
];

const stateTexts = [
    '「 𝕀 𝕛𝕦𝕤𝕥 𝕨𝕒𝕟𝕟𝕒 𝕝𝕠𝕧𝕖 𝕪𝕠𝕦 𝕝𝕚𝕜𝕖 𝕀 𝕕𝕠  」'
    // Add more state texts as needed
];

const nameTexts = [
  '꒦꒷ 𝕐𝕠𝕦"𝕣𝕖 𝕤𝕨𝕖𝕖𝕥 𝕝𝕚𝕜𝕖 𝕔𝕒𝕟𝕕𝕪~ ♡'
  // Add more state texts as needed
];


let currentStateIndex = 0; // Index to track the current state text

let currentLargeImageIndex = 0;

let currentnameTextsIndex = 0;

app.get('/', (req, res) => res.send('ทำงานเรียบร้อยแล้ว'))
app.listen(port, () =>
  console.log(`Your app is listening at http://localhost:${port}`)
);

client.on("ready", async () => {
  var startedAt = Date.now();
  console.log(`${client.user.username} เม็ดม่วงทำงานเรียบร้อยแล้ว !`);

  setInterval(() => {
      const currentTime = getCurrentTime();
      const currentDate = getCurrentDate();

      const r = new Discord.RichPresence()
          .setApplicationId('1121867777867788309')
          .setType('STREAMING')
          .setURL('https://www.youtube.com/watch?v=sVaQQRx6-es')
          .setState(stateTexts[currentStateIndex])
          .setName(nameTexts[currentnameTextsIndex])
          .setDetails(` ﹝ ⌚ ${currentTime} | 💬 ${client.user.username} ﹞ `)
          .setStartTimestamp(startedAt)
          .setAssetsLargeText(`﹝ 📅 ${currentDate}  | 🛸 0 m/s ﹞`)
          .setAssetsLargeImage(largeImages[currentLargeImageIndex])
          .setAssetsSmallText('🦊')
          .addButton('✧ My favorite song ~ ♡', 'https://youtu.be/MW79zgnSF40?si=tKU2OONAJNnR2c90')
          .addButton('꒰🍰 ⤾ Where you at ~ ♡', 'https://youtu.be/sE1GQ6wM9qM?si=Afyeho2F6nfJ68Sc')

      client.user.setActivity(r);

      currentLargeImageIndex = (currentLargeImageIndex + 1) % largeImages.length;
      currentStateIndex = (currentStateIndex + 1) % stateTexts.length;
      currentnameTextsIndex = (currentnameTextsIndex + 1) % nameTexts.length;
  }, 5000); // Change large image and state text every 1 second
});

function getCurrentDate() {
  const a = new Date(Date.now());
  const c = { timeZone: "Asia/Bangkok", day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = a.toLocaleDateString("en-US", c);
  const [month, day, year] = formattedDate.split('/');
  return `${day}/${month}/${year}`;
}

function getCurrentTime() {
  const a = new Date(Date.now());
  const c = { timeZone: "Asia/Bangkok", hour: "numeric", minute: "numeric", hour12: false };
  return a.toLocaleTimeString("th-TH", c);
}

client.login(process.env.token);
