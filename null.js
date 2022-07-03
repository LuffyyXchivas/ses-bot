const Discord = require('discord.js');
const tokens = [
    process.env.token1,
  process.env.token2,
  process.env.token3,
  process.env.token4,
  process.env.token5
];

const chnls = [
    "987819293452419072",
    "987819295687979088",
    "989223905942204497",
    "989223920509014169",
    "989224023240114286",
];

const selamlı = [];
for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index];
    const client = new Discord.Client();
    client.login(token);
    let concon;
    client.on('ready', async () => {
        client.user.setStatus("idle");
        console.log(client.user.username);
        setInterval(() => {
            const am = [
              "✗ Excellente Hoşgeldin!",
    "✗ Excellente Hoşgeldin!",
    "✗ Excellente Hoşgeldin!",
    "✗ Excellente Hoşgeldin!",
    "✗ Excellente Hoşgeldin!",
    "✗ Excellente Hoşgeldin!"

            ];
        const yarrak = Math.floor(Math.random() * (am.length));
        client.user.setActivity(`${am[yarrak]}`, {type: "LISTENING"});
    }, 10000);
        concon = await client.channels.cache.get(chnls[index]).join().catch(err => console.error("Ses kanalına giriş başarısız"));
    });
    let ses;
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.user.bot) return;
        if (cur.channel && (cur.channel.id === chnls[index])) {
            if (cur.channelID === prev.channelID) return;
            if (selamlı.includes(cur.member.id) && (cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get("987819243976400938").rawPosition)) {
                ses = await concon.play('./ses/hg.mp3');
                return;
            }
            if ((cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get("987819243976400938").rawPosition)) {
                ses = await concon.play('./ses/hg.mp3');
                selamlı.push(cur.member.user.id);
                console.log(selamlı);
            } else if (cur.member.roles.highest.rawPosition > cur.guild.roles.cache.get("987819243976400938").rawPosition) {
                ses = await concon.play('./ses/yt.mp3');
                selamlı.push(cur.member.user.id);
                console.log(selamlı);
            }
        }
        if (prev.channel && (prev.channel.id === chnls[index]) && (prev.channel.members.size === 1) && ses) ses.end();
    });
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.id === client.user.id) concon = await client.channels.cache.get(chnls[index]).join();
    })

    client.on('voiceStateUpdate', async (___, newState) => {
        if (
        newState.member.user.bot &&
        newState.channelID &&
        newState.member.user.id == client.user.id &&
        !newState.selfDeaf
        ) {
        newState.setSelfDeaf(true);
        }
        });
}