const { cmd } = require("../command");
const { sleep } = require("../lib/functions");
const config = require("../config");

cmd({
    pattern: "update",
    alias: ["upgrade", "sync", "restart"],
    desc: "Update and restart bot",
    category: "owner",
    react: "🚀",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {

    // ✅ OWNER CHECK
    const ownerJid = config.OWNER_NUMBER.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    if ((m.sender || m.key.participant) !== ownerJid) {
        return reply(`
╭━━〔 🧠 MATRIX SECURITY 🧠 〕━━╮
│ 🚫 COMMAND RESTRICTED
│ 🟩 VIP ACCESS REQUIRED
│ ⚡ SYSTEM BLOCKED
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

> 🟢 ADEEL-XMD • SECURITY CORE 🟢
`);
    }

    // 🚀 START MESSAGE
    const msg = await conn.sendMessage(from, {
        text: `
╭━〔 🧠 MATRIX UPDATE CORE 🧠 〕━╮
│ 🚀 SYSTEM UPDATE STARTED
│ 🟩 LOADING MODULES...
│ ⚡ AI CORE RESTARTING
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯
`
    }, { quoted: mek });

    const steps = [
        "🔍 Checking system files...",
        "🛠️ Applying updates...",
        "📦 Optimizing modules...",
        "⚡ Finalizing changes...",
        "♻️ Restarting services..."
    ];

    for (const step of steps) {
        await sleep(1500);
        await conn.sendMessage(from, {
            text: `
*╭─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
*│ ${step}*
*╰┄─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
`,
            edit: msg.key
        });
    }

    // ✅ COMPLETE MESSAGE
    await conn.sendMessage(from, {
        text: `
*╭─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
*│ ✅ UPDATE COMPLETE*
*│ 🔁 Restarting bot...*
*╰┄─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*

> 📌 POWERED BY MAFIA ADEEL
`
    }, { quoted: mek });

    await sleep(2000);

    // 🔥 HEROKU SAFE RESTART
    process.exit(1); // IMPORTANT
});
