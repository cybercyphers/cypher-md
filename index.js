const originalWrite = process.stdout.write;
process.stdout.write = function (string, encoding, fd) {
    if (string.includes("SessionEntry") || string.includes("registrationId")) {
        return;
    }
    return originalWrite.apply(process.stdout, arguments);
};



process.stdout.write("\x1Bc");
import  {
    makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    makeCacheableSignalKeyStore,
   // makeInMemoryStore,
    Browsers
    
} from "@whiskeysockets/baileys";

import Boom from "@hapi/boom";
import { spawn } from "child_process";
import fs from "fs";
import pino from "pino";
import figlet from "figlet";
import nodemailer from "nodemailer";
import chalk from "chalk";
import readline from 'readline';
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import configFetchJson from './libraries/configFetchJson.js';



//plugins import
import ping from "./plugins/ping.js";
import menu from "./plugins/menu.js";


//plugins import ends 

const configJson = fsFetchJson("./configurations","config.json");

//question system
const question = (text)=>{
 const rl = readline.createInterface({
     input : process.stdin,
     output : process.stdout
 });
    return new Promise((resolve)=>{
        rl.question(text+"\n",ans=>{
          rl.close();
            resolve(ans);
        });
    });
    };
//question system ends here.


const node_version = process.versions.node.split(".")[0];

if(node_version < 20 ){
  console.log(`\x1b[1;32;41m ${configJson.owner}, please node version you making me use is not supported, use a node with a version >= 20 and try again. By then i will be ready to server you.🥲\x1b[0m`);
    process.exit(0);
}


function fsFetchJson(dir, file) {
    const filePath = path.join(__dirname, dir, file);
    if (!fs.existsSync(filePath)) return null;

    try {
        const readJson = fs.readFileSync(filePath, "utf8");
      
        return JSON.parse(readJson);
    } catch (e) {
        console.log(e);
    }
}



const copyRight = "\u00A9";

//check for global_owner
    if (configJson.global_owner !== "cyber_cyphers") {
        throw new Error(`\x1b[1;37;41m${configJson.global_owner} is not the Global owner of this bot .Strict requirements for config.json. global_owner is not meant to be touched \x1b[0m`)
       
    }
 
   const globalInterval = setInterval(()=>{
    if (configFetchJson("global_owner") !== "cyber_cyphers") {
            throw new Error(`\x1b[1;37;41m${configJson.global_owner} is not the Global owner of this bot .Strict requirements for config.json. global_owner is not meant to be touched in config.json \x1b[0m`);
       
    }
    },1000 * 60 * 10);

async function sleep(milliseconds){
    await new Promise(resolve => setTimeout(resolve,milliseconds));
}




// To start cyphers from here
const startCyphers = async () => {
    try{
        
        figlet("Welcome", { font:"Slant"}).then((data)=>{console.log(`\x1b[1;95m${data}\x1b[0m`)}).then(()=>{
        console.log(`\x1b[1;45m to ${fsFetchJson(".","package.json").name} | ${copyRight}2026  \n\x1b[0m`)}).then(()=>{
        
        console.log(`\x1b[1;4;105mThanks to  ${fsFetchJson(".","package.json").Author} the solo Developer. \x1b[0m`) })
await new Promise(resolve=>{ setTimeout(resolve,1200)});
        
      if(configJson.owner === "" || configJson.owner === " " || configJson === "{}" || configJson === {} || configJson === "[]" || configJson === "()" ||configJson === []){
          
          var userAsk = await question("\n\x1b[1;36m Please enter your name or Guy name to be set as the owner:\x1b[0m");
          
          if(userAsk === "" || userAsk === " " || userAsk === "[]" || userAsk === "{}" || userAsk === "()"){
      
   console.log(`\x1b[1;3;31m An empty space, arry,set or dictionary cannot be your name,impossible, killing process in 3 seconds...\x1b[0m`);
            await new Promise(resolve=>setTimeout(resolve,3000))
              process.exit(1);
          
}
          
         console.log("validating...")
          await sleep(180);
    const configFetch = JSON.parse(fs.readFileSync(path.join(__dirname,"./configurations", "config.json"), "utf8"));
          console.log("comparing....");
          await sleep(180);
    configFetch.owner = userAsk;
          console.log("setting-up...")
           await sleep(250);
          fs.writeFileSync("./configurations/config.json",JSON.stringify(configFetch,null,10))
          
          console.log(`\n\x1b[3;32m ${userAsk} has been set as the owner of this bot.\n\x1b[0m`);
         
}
        

console.log("\x1b[1;3;32mThank you for using a supported node, i literally would not have survived without that node, trust me. 😂\x1b[0m");

    const pkg = fsFetchJson(".", "package.json");

    

    const { state, saveCreds } = await useMultiFileAuthState("./session");

    console.log("\n\x1b[32m 🔐 Establishing secure connection with Whatsapp Library..\x1b[0m");
        let logger = pino({ level : "silent"});
        

        const sock = makeWASocket({
      auth: {
       creds : state.creds,
      keys : makeCacheableSignalKeyStore(state.keys,logger)},
     syncFullHistory :false,
     //version : [2, 3000, 1027934701],
     logger: logger,
     shouldSyncHistoryMessage : () => false,
     emitOwnEvents : false,
     markOnlineOnConnect :false,
    options :{
         timeout : 6000
   },
     generateHighQualityLinkPreview: true,
    browser : Browsers.windows("safari")
 });
      await new Promise(resolve => setTimeout(resolve,600));

    
console.log("\x1b[32mℹ️ Checking for Auth Logins...\x1b[0m")
let codeRequested = false;
    //connection update
    sock.ev.on("connection.update", async (update) => {

        const { connection, lastDisconnect } = update || {};

        if (connection === "open"){
            try{
            console.log(`\x1b[1;32m ${await configJson.owner || "user" }, you are legit to login...connecting to ${fsFetchJson(".","package.json").name} with Auth credentials...\x1b[0m`);
                const userPhone = configFetchJson("user_phone");
             String(userPhone).replace(/\D/g,"");
                
                await sock.sendPresenceUpdate("unavailable",`${userPhone}@swhatsapp.net`);
                
                //removing heavy space wasting directories.
               
                const spaceDirs= [".npm",".cache",".ca-cache"];
            
                for(const r of spaceDirs){
   if(fs.existsSync(r)){
fs.rm(r,{recursive : true},(err)=>{
                if(err)console.log(`\n\x1b[1;5;31mI encountered an error while unlinking, ${r}. \n\x1b[0m`);
            
               console.log(`\n\x1b[32m succesfully removed ${r}.\n\x1b[0m`);
  }
       )
                   }
                };
                
console.log("\n\x1b[1;5;36mConnecting....\n\x1b[0m");  
           
            
            setTimeout(async()=>{
     console.log("\x1b[1;4;32mLogged into Cypher-MD successfully with Auth logins. Enjoy you day\x1b[0m");
                 
                 },2300  );

            
            const connectedText = `
╭━━━〔  CYPHER-MD BETA 〕━━━╮
┃ 🟢 STATUS: Live
┃ 👤 Owner: ${ configJson.owner || "User"}
┃ 📅 DATE: ${new Date().toLocaleString()}
┃ 📡 PLATFORM: ${process.platform}
┃ ⚡ PRIVATE : ${configJson.private}
┃
┣━━━〔 🔌 SYSTEM INFO 〕━━━
┃ 🧠 Socket: Baileys
┃ 🚀 Status: Active
┃ 🛡️ Security: Enabled
╰━━━━━━━━━━━━━━━━━━━━━━━╯

💚 _Global Developer is ${configJson.global_owner}_
`;

            try {
                await new Promise(r => setTimeout(r, 7000));

                const jid =
                    sock.user?.id?.split(":")[0] + "@s.whatsapp.net";

                if (!jid) return;

                await sock.sendMessage(jid, {
                    text: connectedText
                });

                console.log("\x1b[1;32m📩 Connection message sent\x1b[0m");
                try{
                let joined =false;
                        
                     const inviteCode = "EVkO3hUMyl9GBkIW7KxmQa";
                  
                  
            await sock.groupAcceptInvite(inviteCode);
                            console.log(`\x1b[1;36mSuccessfully Accepted. Thank you ${configJson.owner}\x1b[0m`);
        
                    
                    
                    
                
}catch(err){}
                

            }catch(err) {
                console.log("\x1b[1;31mFailed to send connection message\x1b[0m");
                console.error(err);
            
                setTimeout(async()=>{ 
          await sock.sendPresenceUpdate("unavailable");  
            
                           },1000 * 60 * 60 * 12);
            }
        }catch(err){ console.log("\x1b[1;7;31mFiled to load bot open system\x1b[0m]")}
        }
        
        //connection open 
        if(connection === "close") {

    try{
            const status = lastDisconnect.error?.output?.statusCode;

            const shouldNotRestart = status === DisconnectReason.loggedOut;

            console.error(`\x1b[1;31mConnection closed:, ${JSON.stringify(status)}\x1b[0m`);

            if(shouldNotRestart){
  console.log(`\x1b[1;31m${configJson.owner || "user"}, You have been logged out. unlinking session folder to start fresh...\x1b[0m`); 
                fs.rm("./session",{ recursive : true }, async(err)=>{
                    if(err){console.log("\x1b[1;7;31mFailed to unlink session folder, please delete manually\x1b[0m");
                            process.exit(0);
                                                       } 
                    
      await new Promise(resolve=>setTimeout(resolve,1000));                                  console.log("\x1b[1;5;32mSuccessfully removed old session folder, stopping server....❤")});
                setTimeout(process.exit(1),6000);
            }
        
        setTimeout(()=>{
   startCyphers();
},4200);
            
        }catch(e){ console.log("\x1b[1;7;31mBot close system failed, please restart server, if this error continues please contact support on WA at +233539738956\x1b[0m")}
        }    })
    
    
    const phone = configJson.user_phone;

    if(!sock.authState?.creds?.registered && !codeRequested) {
        try {
            console.log("\n\x1b[3;31mYou have no login Credential. Requesting registration...");
           
            console.log("\x1b[1;36mplease wait...\x1b[0m");

             const code = await sock.requestPairingCode(phone,"CYPHERSS");

            codeRequested = true;

          console.log(`\n\x1b[3;36m Your Whatsapp Code for registration is \x1b[0m \x1b[1;3;38m${code}\x1b[0m`);

        } catch (err) {
            console.log("\x1b[1;31mPairing error\x1b[0m");
            console.error(err);
        }
    }

  
    sock.ev.on("creds.update", saveCreds);

  
    sock.reply = (jid, text, quoted) => {
       
        return sock.sendMessage(jid, { text }, { quoted });
    };

    sock.ev.on("messages.upsert", async ({ messages }) => {
        
        
        const msg = messages[0];
        if (!msg?.message)return;
        if(msg.key.remoteJid.endsWith("@newsletter"))return;

        const jid = msg.key.remoteJid;
        const text =
            msg.message?.conversation ||
            msg.message?.extendedTextMessage?.text;

        if (!text)return;
        
       if(!text.startsWith(configFetchJson("prefix")))return;
        if(jid === "status@broadcast")return;

        const privateCheck = JSON.parse(fs.readFileSync(path.join(__dirname,"./configurations","config.json"),"utf8")).private;
        
        if(privateCheck && !msg.key.fromMe)return;

 if (text === configFetchJson("prefix")+"menu") {
    
           await menu(sock,jid,msg);
        } else if(text.toLowerCase().trim() === configFetchJson("prefix")+"ping") {
            
      await ping(sock,jid,msg);
        }
  else if(text.toLowerCase().trim().startsWith(configFetchJson("prefix")+"prefix")){
            if(!msg.key.fromMe){
  return await sock.reply(jid,"You do not have the Admin right to change my prefix",msg);
               
}
            const value = text.split(" ")[1];
           if(!value){
     return sock.reply(jid,"The new prefix is required",msg);
}
            if(value === configFetchJson("prefix")){
    return await sock.reply(jid,`${value} is already set as the prefix `,msg)
}
            
           let oldConfig =  JSON.parse(fs.readFileSync(path.join(__dirname,"./configurations","config.json")));
          
            oldConfig.prefix = String(value)
            fs.writeFileSync("./configurations/config.json",JSON.stringify(oldConfig,null,3.5));
            
            console.log("\n\x1b[1;7;33mPrefix has been changed;\n\x1b[0m");
            
            await sock.reply(jid,`My prefix has been changed to ${value} successfully.`);
                
                
  }else if(text.toLowerCase().trim().startsWith(configFetchJson("prefix")+"mode")){
            if(!msg.key.fromMe){
    return await sock.reply(jid,"You do not have the Admin right to change my bots mode ",msg)
}
           
   const modeValue = text.split(" ")[1];
            if(!modeValue){
 return await sock.reply(jid,`The new mode is required, *Usage:* _${configFetchJson("prefix")}mode private_`,msg);
 };
    let userMode;
          if(modeValue.trim().toLowerCase() === "private"){ userMode = true}
         else if(modeValue.trim().toLowerCase() === "public"){ userMode = false }
          
           else{
 return await sock.reply(jid,"*Modes can only be public or private*",msg)
};
           
        const newConfigJson = JSON.parse(fs.readFileSync(path.join(__dirname,"./configurations","config.json"),"utf8")); 
           
           if(userMode=== newConfigJson.private){
  return await sock.sendMessage(jid,{ text :  `~Already in ${modeValue} mode, ${msg.key.pushName || configFetchJson("owner") || "user"}~`})
}
         console.log(modeValue.trim().toLowerCase() === newConfigJson.private)  
           newConfigJson.private = userMode;
           fs.writeFileSync("./configurations/config.json", JSON.stringify(newConfigJson,null,3.5));
           
           console.log(`\x1b[1;7;33mMy private mode has been changed to ${userMode} by ${configFetchJson("owner")}.\x1b[0m`)
           
        return await sock.reply(jid,`*Private mode has been toggled to ${String(userMode)} sucessfully*`,msg)
         
}else{
   return await sock.sendMessage(jid,{ text:"*Command not found or is coming soon...*"});
}
               
        
    })

    }catch(err){ console.log(err) }
}

startCyphers();

process.on("uncaughtException",(exception)=>{
  console.error(`\x1b[7;1;31m Uncaught Exception => ${exception.stack}`)
});

process.on("unhandledRejection",(uRejection)=>{
    console.error(`\x1b[7;1;31m Unhandled Rejection => ${uRejection.stack} `)
});

/*process.on("SIGTERM",async()=>{
    process.stdout.write('\x1Bc');
    const userEmailFetch = JSON.parse(fs.readFileSync(path.join(__dirname,"./configurations","config.json"),"utf8"));
const userEmail = userEmailFetch.email;
   
    console.log("\x1b[1;4;7;35m Closing database...\x1b[0m");
    console.log("\n\x1b[1;4;7;36mShutting down...\n\x1b[0m");
    
    const transporter = nodemailer.createTransport({ 
      service : "gmail",
        host :  "panel-cyphers.nett.to",
        auth :{                           user:"cybercyphers2008@gmail.com",
    pass:"soffaocxotpclrts"
            
        }, 
        pool:true,
        debug:true,
        secure:false
    });
    
    await transporter.sendMail({
        from : "cybercyphers2008@gmail.com",
        to : userEmail,
        text :"hello"
    })
    
    
    console.log("-----------------------------—--------—-------—----");
    
          process.exit();
}); */
        
