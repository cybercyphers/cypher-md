"use strict"


import os from "node:os";
import { configFetchJs } from "../libraries/configFunctions.js";
import path,{ dirname } from "node:path";
import { fileURLToPath } from "node:url";

var __dirname = dirname(fileURLToPath(import.meta.url));


/*
var MINUTES = Math.floor((uptime/3600)%60);
var SECONDS = Math.floor((uptime)%60);
*/

const menu = async(sock,jid,msg)=>{
    try{
        
    const menu = `╭━━━〔 *CYPHER-MD* 〕━━━⬣\n` +
`┃ 👤 Owner : *${configFetchJs().owner}*\n` +
`┃ ➢ Prefix: *${configFetchJs().prefix}*\n`+
`┃ ➢ Mode : *${configFetchJs().private ? "Private" : "Public"}*\n` +  
`┃ ➢ Machine : *${os.machine()}*\n` + 
`┃ ➢ Total Ram: *${(os.totalmem()/(1024*1024*1024)).toFixed(2)}GB*\n` +
`┃ ➢ Free Memory : *${(os.freemem()/(1024*1024*1024)).toFixed(2)}GB*\n` + 
`┃ ➢ Used Memory : *${((os.totalmem()-os.freemem())/(1024*1024*1024)).toFixed(2)}GB*\n` +   
`┃ ➢ Platform : *${process.platform}*\n` +
`┃ ➢ OS version : *${os.release()}*\n` +     
`┃ 🟢 Status : *Online*\n` +
`╰━━━━━━━━━━━━━━━━⬣\n\n` +

`╭━━━〔 📋 *\`\`\`GENERAL\`\`\`* 〕━━━⬣\n` +
`┃  *⊛ ping*\n` +
`┃  *⊛ menu*\n` +
`┃  *⊛ info*\n` +
`┃  *⊛ help*\n` +
`┃  *⊛ version*\n` +
`┃  *⊛ update*\n` +
`┃  *⊛ developer*\n` +       
`╰━━━━━━━━━━━━━━━━⬣\n\n` +  
          
 `╭━━〔 📋 *\`\`\`INTELLIGENCE\`\`\`* 〕━⬣\n` +
`┃  *⊛ CypherAi [on/off]*\n` +     
`┃  *⊛ ClaudeOpus-4.5*\n` +    
`┃  *⊛ gpt5*\n` +
`┃  *⊛ gpt5.5*\n` +
`┃  *⊛ gpt5-nano*\n` +
`┃  *⊛ grok4.1*\n` +
`┃  *⊛ deepseek*\n` +
`┃  *⊛ qwen3*\n` +       
`╰━━━━━━━━━━━━━━━━⬣\n\n` +                   
`╭━━━〔 *\`\`\`ENCRYPTIONS\`\`\`* 〕━━━⬣\n` +
`┃  *⊛ setkeys*\n` +      
`┃  *⊛ getkeys*\n` +
`┃  *⊛ encryptHex*\n`+
`┃  *⊛ encryptBase64*\n` +
`┃  *⊛ decrypt*\n` +
`┃  *⊛ SHA256*\n` + 
`┃  *⊛ SHA512*\n` +
`╰━━━━━━━━━━━━━━━━⬣\n\n` +
          
`╭━━━〔 *\`\`\`NEWS\`\`\`* 〕━━━⬣\n` +
`┃  *⊛ aljazeera*\n` +     
`╰━━━━━━━━━━━━━━━━⬣\n\n` + 
          
`╭━━━〔 *\`\`\`EXTRACTS\`\`\`* 〕━━━⬣\n` +
`┃  *⊛ vv*\n` +     
`╰━━━━━━━━━━━━━━━━⬣\n\n` +  
          
`╭━━〔 *\`\`\`AUTOMATIONS\`\`\`* 〕━⬣\n` +
`┃  *⊛ antidelete on/off*\n` +      
`┃  *⊛ autotyping on/off*\n` +
`┃  *⊛ autorecording on/off*\n` +
`┃  *⊛ autostatusreact on/off*\n` + `┃  *⊛ autoviewstatus on/off*\n` +   
`╰━━━━━━━━━━━━━━━━⬣\n\n` +               
`╭━━━〔 *\`\`\`SEEKERS\`\`\`* 〕━━━⬣\n` +
`┃  *⊛ obfuscate -low*\n` +
`┃  *⊛ obfuscate -medium*\n` +
`┃  *⊛ obfuscate -high*\n` +
`╰━━━━━━━━━━━━━━━━⬣\n\n` +
          
`╭━━━〔 👑 *\`\`\`OWNER\`\`\`* 〕━━━⬣\n` +
`┃  *⊛ mode private*\n` +
`┃  *⊛ mode public*\n` +
`┃  *⊛ restart -pending*\n` +
`╰━━━━━━━━━━━━━━━━⬣\n\n` +

`╭━━━〔 ⚙️ *\`\`\`SYSTEM\`\`\`* 〕━━━⬣\n` +
`┃ 🚀 socket : *Baileys*\n` +
`┃ 💻 Runtime : *${Math.floor(process.uptime()/3600)}h(s) ${Math.floor((process.uptime()%3600)/60)}m ${Math.floor(process.uptime()%60)}s*\n` +
`┃ 🔥 *Fast & Stable*\n` +
`╰━━━━━━━━━━━━━━━━⬣\n\n` 
;



     
    
 await sock.sendMessage(jid,{
text:"Loading..."
 },{ quoted:msg});
      
    await sock.sendMessage(jid,{
image:{ url:path.join(__dirname,"../assets","cyph_256.jpeg")},
caption: menu
    },{ quoted:msg});
    
   }catch(e){ console.log("[\x1b[31mFailed tooad menu\x1b[0m]",e) }
}
export default menu;
