const { cmd } = require("../command");
const { sleep } = require("../lib/functions");
const config = require("../config");

cmd({
    pattern: "update",
    alias: ["upgrade", "sync", "restart"],
    desc: "Update and restart the bot system",
    category: "owner",
    react: "🚀",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // ✅ OWNER CHECK (HEROKU SAFE)
        const ownerJid = config.OWNER_NUMBER.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
        const senderJid = m.sender || m.key.participant;

        if (senderJid !== ownerJid) {
            return reply(`
╭━━〔 🧠 MATRIX SECURITY 🧠 〕━━╮
│ 🚫 COMMAND RESTRICTED
│ 🟩 VIP ACCESS REQUIRED
│ ⚡ SYSTEM BLOCKED
╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯

> 🟢 ADEEL-XMD • SECURITY CORE 🟢
`);
        }

        // ⏳ START MESSAGE
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
            await conn.relayMessage(from, {
                protocolMessage: {
                    key: msg.key,
                    type: 14,
                    editedMessage: {
                        conversation: `
*╭─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
*│ ╌ ᗩᗪᗴᗴᒪ-᙭ᗰᗪ ╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│${step}*
*╰┄─̣┄─̇─̣┄─̇┄─̇─̣┄─̇─̣─̇─̣─᛭*
`
                    }
                }
            }, {});
        }

        // ✅ FINISH MESSAGE
        await conn.sendMessage(from, {
            text: `
*╭─̣┄─̇─̣┄─̇─̣┄─̇─̣┄─̇─̣─̇─̣─᛭*
*│ ╌─̇ ᗩᗪᗴᗴᒪ-᙭ᗰᗪ ─̇─̣╌*
*│─̇─̣┄┄┄┄┄┄┄┄┄┄┄┄─̇─̣*
*│✅ 𝐔𝐩𝐝𝐚𝐭𝐞 𝐂𝐨𝐦𝐩𝐥𝐞𝐭𝐞*
*│🔁 Restarting bot...*
*╰┄─̣┄─̇─̣┄─̇─̣┄─̣┄─̇─̣─̇─̣─᛭*

> 📌 ᴘᴏᴡᴇʀ ʙʏ ᴍᴀғɪᴀ ᴀᴅᴇᴇʟ
`
        }, { quoted: mek });

        await sleep(1000);

        // 🔁 HEROKU SAFE RESTART
        process.exit(0);

    } catch (e) {
        console.error("UPDATE ERROR:", e);
        reply("❌ Update failed, check logs.");
    }
});
