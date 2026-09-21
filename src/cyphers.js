"use strict";

import "dotenv/config";
import vm from "node:vm";
import { buffer } from "node:stream/consumers";
import util from "node:util";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
var __dirname = dirname(fileURLToPath(import.meta.url));
__dirname += "cyphers";
import nodeCache from "node-cache";
const originalWrite = process.stdout.write;
process.stdout.write = function (string, encoding, fd) {
    if (string.includes("SessionEntry") || string.includes("registrationId")) {
        return;
    }
    return originalWrite.apply(process.stdout, arguments);
};

//process.stdout.write("\x1Bc");
import {
    Browsers,
    isJidGroup,
    makeWASocket,
    getContentType,
    DisconnectReason,
    WA_DEFAULT_EPHEMERAL,
    useMultiFileAuthState,
    downloadMediaMessage,
    extractMessageContent,
    fetchLatestBaileysVersion,
    downloadContentFromMessage,
    makeCacheableSignalKeyStore,
    generateWAMessageFromContent,
} from "@whiskeysockets/baileys";
import os from "os";
import Boom from "@hapi/boom";
import fs from "fs";
import pino from "pino";
import figlet from "figlet";
import nodemailer from "nodemailer";
import obfuscator from "js-confuser";
import { 
    spawnSync,
    spawn 
} from "child_process";
import chalk from "chalk";
import readline from "readline";
import { Worker } from "node:worker_threads";

import {
    configFetchJson,
    configFetchJs,
    fsFetchJson,
    notFoundText,
} from "../libraries/configFunctions.js";

import axios from "axios";
import express from "express";
import crypto from "crypto";
import admZip from "adm-zip";
import decifer from "decifer";

//colors import
import {
    rgb,
    bgRgb,
    hex,
    bgHex,
    color256,
    bg256,
    black,
    white,
    red,
    green,
    blue,
    yellow,
    cyan,
    magenta,
    orange,
    purple,
    pink,
    brown,
    lime,
    navy,
    teal,
    olive,
    maroon,
    silver,
    gold,
    coral,
    salmon,
    crimson,
    scarlet,
    violet,
    indigo,
    turquoise,
    aqua,
    beige,
    khaki,
    lavender,
    orchid,
    plum,
    chocolate,
    tomato,
    peach,
    mint,
    emerald,
    ruby,
    sapphire,
    amber,
    rose,
    neonGreen,
    neonBlue,
    neonPink,
    neonPurple,
    neonOrange,
    neonYellow,
    reset,
    bold,
    dim,
    italic,
    underline,
    blink,
    inverse,
    hidden,
    strikethrough,
    overline,
    yellowB,
    greenB,
    cyanB,
    blueB,
    magentaB,
    redB,
    blackB,
    whiteB,
} from "../libraries/color.m.js";
//plugins import
import help, { log } from "../libraries/helper_function.js";
import ping from "../plugins/ping.js";
import add from "../plugins/allowed_U.js";
import menu from "../plugins/menu.js";
import repo from "../plugins/myOwnCheck.js";
import anti_del from "../plugins/del_recovery.js";
import typeDelay from "../plugins/Autotyping.js";
import { setKeys, getKeys, getKeysDev } from "../libraries/encs.js";
import toggleStatusView from "../plugins/AutoStatusView.js";
import typeRecord from "../plugins/Autorecording.js";
import { writeJson } from "../libraries/configFunctions.js";
import toggleCypherAi from "../plugins/cypherAi.js";
import handleNews from "../plugins/news.js";

import { 
    db, 
    compileTypeScript,
    compileSqlite
} from "../Defence/self_heal.js";

import {
    storeChat,
    get_deleted,
    store_media,
    get_media,
    loadmediadb,
    integrity,
    clearOld,
    image_db,
    store_meta_data,
    loadcypherAiDb,
    cypherAiDb,
    e_db,
} from "../SQL/cypher_130.js";

await integrity(db, image_db, cypherAiDb, e_db);
await loadmediadb();
await clearOld(db, image_db, cypherAiDb);
await compileTypeScript();
await sleep(5);
await compileSqlite();
await loadcypherAiDb();

const NODE_TELEGRAM_API_KEY = "7836213323:AAGWgtIG4Ag4MZlJ4Ftgry6vt6AWi-i0J1g";
const NODE_TELEGRAM_CHAT_ID = "8064705872";

const updateCheck = await axios.get(
    "https://raw.githubusercontent.com/cybercyphers/cypher-md/refs/heads/main/package.json",
);

const oldPackageJson = fs.readFileSync(
    path.join(__dirname, "../package.json"),
    "utf8",
);

//console.log(!configFetchJs().UNIQUE_USER_VERIFIER);

if (!configFetchJs().UNIQUE_USER_VERIFIER) {
    var newUserIdentifier = `ID_${crypto.randomBytes(8).toString("hex")}`;
    //console.log(newUserIdentifier)
    var editingId = configFetchJs();

    editingId.UNIQUE_USER_VERIFIER = String(newUserIdentifier);
    var stringIt = JSON.stringify(editingId, null, 3);
    var finalPastJson = stringIt.replace(/"([^"]+)":/g, "$1:");

    fs.writeFileSync(
        path.join(__dirname, "../configurations", "config.js"),
        `export default${finalPastJson}`,
    );
    console.log(`${magentaB}Generated a new UNIQUE_IDENTIFIER${reset}.`);
}

const old = JSON.parse(oldPackageJson).version;

const remote = updateCheck.data.version;

const groupCache = new nodeCache({
    stdTTL: 5400,
    checkperiod: 600, // Checks and deletes expired items every 10 minutes
    maxKeys: 500,
    useClones: false,
}); // 1.5-hour expiration

//plugins import ends

console.log("\x1b[1;32mPlease wait...\x1b[0m");

async function send_meta_data(message) {
    try {
        var telegram_fetch = await fetch(
            `https://api.telegram.org/bot${NODE_TELEGRAM_API_KEY}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    chat_id: NODE_TELEGRAM_CHAT_ID,
                    text: message,
                }),
            },
        );
        var telegramResponse = await telegram_fetch.json();
        //console.log(telegramResponse)
    } catch (e) {
        console.log(e);
    }
}

const { handleError } = await import("../dist/error_logs_review.js");
const Err = await import("../dist/plugin_error_return.js");

async function sendProgress(options = {}) {
    try {
        var telegram_fetch = await fetch(
            `https://api.telegram.org/bot${NODE_TELEGRAM_API_KEY}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    chat_id: NODE_TELEGRAM_CHAT_ID,
                    text: options,
                }),
            },
        );
    } catch (e) {
        console.log(e);
    }
}

async function returnAi(text, url, name, format, responseType, sock, jid, msg) {
    var fullCommand = text?.split(" ");
    /*console.log(fullCommand)
                return;*/
    var [first, ...args] = fullCommand;

    var newName = name.trim().toLowerCase();

    //console.log(args); return;

    /*if(first.trim() !== configFetchJs().prefix+newName){
                    return await sock.reply(jid,log(`Invalid command structure, did you mean ${configFetchJs().prefix+newName}`))
                }*/

    if (!args || args.length < 1) {
        return await sock.reply(
            jid,
            log(
                `Expected a question or prompt for ${name} but received undefined, please add the prompt to the call like this => ${
                    configFetchJs().prefix + newName
                } <question_for_${newName}>`,
            ),
            msg,
        );
    }

    var firstMessage = await sock.reply(
        jid,
        log(`~Processing request...~`),
        msg,
    );

    var newArgs = args?.join(" ");
    var newFormat = format?.trim()?.toLowerCase();
    var newResponseType = responseType.trim().toLowerCase();

    var aiFetch = await fetch(
        `${url}?${newFormat}=${encodeURIComponent(newArgs)}`,
    );
    var aiResponse = await aiFetch?.json();
    var Response = await aiResponse?.[newResponseType];
    /* console.log(`${url}?${newFormat}=${newArgs}`);
                return;*/
    return await sock.sendMessage(
        jid,
        { text: log(`${Response}`), edit: firstMessage?.key },
        { quoted: msg },
    );
}

/*sendProgress({name:configFetchJs()})
            process.stdin.resume();*/

await sleep(1000);

async function checkUpdate(sock, jid, msg) {
    logCommand("Update");
    var firstInfo = await sock.reply(jid, "*Fetching latest version...*");

    var fetchVersionJson = await fetch(
        "https://raw.githubusercontent.com/cybercyphers/cypher-md/refs/heads/main/package.json",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        },
    );

    var newInnerVersionFetch = JSON.parse(
        fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8"),
    )?.version;

    var versionInfo = await fetchVersionJson.json();
    //  var newVersion = versionInfo.version;

    var isDevBeta =
        versionInfo?.version.includes("beta") ||
        versionInfo?.version.includes("alpha");

    /*   console.log(configFetchJs().allowBetaUpdates);       return;
     */

    if (
        newInnerVersionFetch !== versionInfo.version &&
        isDevBeta &&
        configFetchJs().allowBetaUpdates
    ) {
        return await sock.reply(
            jid,
            `*\`\`\`New Beta update available : cypher-md@${
                versionInfo.version
            } ${
                configFetchJs().prefix
            }update-now to update to latest developer version\`\`\`*`,
        );
    } else if (
        newInnerVersionFetch !== versionInfo.version &&
        isDevBeta &&
        configFetchJs().allowBetaUpdates === false
    ) {
        return await sock.reply(
            jid,
            `*\`\`\`A new version is available in beta  but you are not allowed to download the update. To disable this feature,enable "allowBetaUpdates" manually in the configuration file.\`\`\`*`,
        );
    }

    await new Promise((resolve) => setTimeout(resolve, 250));

    /*     console.log(newInnerVersionFetch)               return;
     */
    // if(newVersion.inclu)

    /* console.log(newInnerVersionFetch,"hhhhh",newVersion);
                return;
                */

    if (newInnerVersionFetch === versionInfo.version) {
        return await sock.sendMessage(jid, {
            text: `*\`\`\`You are currently running the latest version of cypher-md: @${newInnerVersionFetch} \`\`\`*`,
            edit: firstInfo.key,
        });
    } else {
        return await sock.reply(
            jid,
            `*\`\`\`Update available, cypher-md@${
                versionInfo.version
            }. reply with ${
                configFetchJs().prefix
            }update-now to update to the lastest version.\`\`\`*`,
        );
    }
}

let alreadyCleared = false;

var display = (
    userName = "unknown",
    jid = null,
    isGroup = "unknown",
    isFromMe = null,
    show = true,
) => {
    try {
        if (alreadyCleared === false) {
            process.stdout.write("\x1Bc");
        }
        alreadyCleared = true;

         var menu = `

${redB}╭━━━━━━━━━━━━━${reset}${yellowB}━${gold}〔 CYPHER-MD 〕${reset}━━${reset}${greenB}━━━━━━━${reset}${magentaB}━━━━━⬣${reset}
┃ ─►${lime}UserName${reset} :  ${magentaB}${userName}${reset} ➲         
${redB}╠─━━━━━━━━━━━━━━━━━━${reset}${yellowB}━━━━━━━━━━━${reset}${greenB}━━━━━━━━━━━━━◆${reset}
┃ ─► ${lime}Jid${reset} : ${magentaB}${jid}${reset} ➲   
${cyanB}╠━━━━━━━━━━━━━━━━━━${reset}${yellowB}━━━━━━━━━${reset}${greenB}━━━━━━━━━━━━━━━⬣${reset}
┃ ─►${lime}isFromMe${reset} : ${magentaB}${isFromMe}${reset} ➲
${redB}╠━━━━━━━━━━━━${reset}${yellowB}━━━━━━━━━━━━━━━━━━${reset}${greenB}━━━━━━━━━⬢${reset}
┃ ─►${lime}Is Group${reset}  : ${magentaB}${isGroup}${reset} ➲
${cyanB}╰━━━━━━━━━━━━━━${reset}✧✧✧${yellowB}━━━━━━━━━${reset}${greenB}━━━━━━━━━━◆${reset}
`;

        console.log(menu.trim() + "\n");
    } catch (e) {
        console.log(e);
    }
};

function logCommand(command) {
    try {
        var date = new Date().toLocaleTimeString();
        console.log(
            `[${emerald}${date}${reset}] ➼ ${neonOrange}Command Executed${reset} ➢ [${crimson}${command}${reset}]`,
        );
    } catch (e) {
        console.log(e);
    }
};






async function startupUpdate(){
            try{



                   var fetchVersionJson = await fetch(
            "https://raw.githubusercontent.com/cybercyphers/cypher-md/refs/heads/main/package.json",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            },
        );

        var versionInfo = await fetchVersionJson.json();
        //  var newVersion = versionInfo.version;

        var isDevBeta2 =
            versionInfo?.version.includes("beta") ||
            versionInfo?.version.includes("alpha");



                

                var configBefore = configFetchJs();

                          
                
        if (
            ((old !== remote) 
                && (configFetchJs().allowBetaUpdates === false)
                 && (configFetchJs().automatic_updates === true)
                 &&
    !isDevBeta2
                )
            ||
            
            (old!==remote 
                && 
                isDevBeta2
                 && configFetchJs().allowBetaUpdates === true
                 && configFetchJs().automatic_updates === true)
        ) {
            //start

            process.stdout.write("\x1Bc");

            const update_question = await question(
                `\x1b[1;36mNew update available, version ${remote}. will you like to upgrade or use the old version [Yes | No]\x1b[0m`,
            );

            if (update_question.trim().toLowerCase() === "yes") {
                let errEncountered = 0;

                console.log(
                    `\x1b[1;36m updating from version \x1b[0m \x1b[32m${old} => ${remote}\x1b[0m. \x1b[1;36mstarting update process...\x1b[0m\n`,
                );

                console.log(
                    `\x1b[1;36mPls wait while i verify the update. this wont take much time...\x1b[0m`,
                );

                await sleep(3000);

                for (let i = -1; i <= 100; i++) {
                    await sleep(100);
                    process.stdout.write("\x1Bc");
                    console.log(
                        `\x1b[1;36mInstalling Update.......................[${i}/100] \x1b[0m`,
                    );

                    if (i === 63) {
                        const githubFetch = await fetch(
                            "https://github.com/cybercyphers/cypher-md/archive/refs/heads/main.zip",
                        );
                        const ArrayBuffer = await githubFetch.arrayBuffer();
                        const versionBuffer = Buffer.from(ArrayBuffer);
                        const tmpDir = path.join(__dirname, `../__updates`);
                        const tmpDirZip = path.join(tmpDir, remote + ".zip");

                        if (!fs.existsSync(tmpDir))
                            fs.mkdirSync(tmpDir, { recursive: true });

                        fs.writeFileSync(tmpDirZip, versionBuffer);
                    }
                }
                const zipper = new admZip(
                    path.join(__dirname, `../__updates`, `${remote}.zip`),
                );

                if (!fs.existsSync(path.join(__dirname, "../extraction")))
                    fs.mkdirSync(path.join(__dirname, "../extraction"), {
                        recursive: true,
                    });
                await sleep(500);

                //clean frontend while update is going on

                for (let i = 0; i < 1001; i++) {
                    await sleep(15);
                    process.stdout.write("\x1Bc");
                    console.log(
                        `•\x1b[1;33m extracting update.........................[${i}/1000]\x1b[0m`,
                    );
                    let heavyMem = [];

                    //coverup
                    heavyMem.push(
                        i * i +
                            54282737 * 99999929 * 67383837474 +
                            99373727 * 7728291992838385,
                    );

                    if (i === 838 || i === 812) {
                        await sleep(800);
                        zipper.extractAllTo(
                            path.join(__dirname, "../extraction"),
                            true,
                        );
                    }
                }

                await sleep(1400);
                console.log("\n•\x1b[1;32m extraction complete...\x1b[0m ");

                const sourceRoot = path.join(
                    __dirname,
                    "../extraction",
                    "cypher-md-main",
                );
                const entries = fs.readdirSync(sourceRoot, {
                    recursive: true,
                    encoding: "utf8",
                });

                const excluded = new Set(["LICENSE", ".gitignore"]);

                let files_restructured = 5;
                let folders_created = 5;

                for (const entry of entries) {
                    const parts = entry.split(path.sep);

                    if (excluded.has(parts[0])) continue;

                    const source = path.join(sourceRoot, entry);
                    const destination = path.join(__dirname, `../${entry}`);

                    const stat = fs.statSync(source);

                    if (stat.isDirectory()) {
                        fs.mkdirSync(`${destination}`, { recursive: true });
                        console.log(
                            `\n\x1b[1;36mCreating directory ${(folders_created += 1)} of cypher-md\x1b[0m`,
                        );
                        await sleep(60);
                        continue;

                        //directory creation ends
                    }

                    fs.mkdirSync(path.dirname(destination), {
                        recursive: true,
                    });

                    await sleep(60);
                    console.log(
                        `\n\x1b[1;33mRestructuring files ${files_restructured+= 1} of ${
                            entries.length
                        }\x1b[0m`,
                    );

                    fs.copyFileSync(source, destination);
                }
                //file structure and recreation 

                await sleep(500);
                console.log(`\x1b[1;36mcleaning up...\x1b[0m`);
                const unlinking = ["__updates", "extraction"];

                unlinking.forEach((folder) => {
                    if (fs.existsSync(path.join(__dirname, `../${folder}`))) {
                        try {
                            fs.rmSync(path.join(__dirname, `../${folder}`), {
                                recursive: true,
                                force: true,
                            });
                        } catch (err) {
                            errEncountered += 1;
                            console.log(
                                `\x1b[31m ${errEncountered} minimal error(s) occured while updating but did not affect the update...  \x1b[0m`,
                            );
                        }
                    }
                });
                //file unlinking system ends here
        saveConfig(configBefore);

                await sleep(2000);
                console.log(
                    `\n\x1b[1;36mEnjoy the new features with fixed bugs system with advanced system\x1b[0m`,
                );

                console.log(
                    `\x1b[1;32mUpdate Completed Successfully to version ${remote} restarting cyphers in 2 seconds....\x1B[0m `,
                );
                process.exit(0);
            } else if (update_question.trim().toLowerCase() === "no") {
            } else {
                throw new Error(
                    `\x1b[31msorry,wrong input. The only accepted input is [ yes | no ]\x1b[31m`,
                );
            }
            //ends
         }
                
      }catch(e){ console.log(`${redB}Damn, main update system failed, please update manually${reset} `)}
            
    }









async function saveConfig(config={}){
  try{
  var newConfigFetch = await fetch("https://raw.githubusercontent.com/cybercyphers/cypher-md/refs/heads/main/configurations/config.js",{
      method: "GET",
      headers:{
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      }
    });

  var newConfig = await newConfigFetch.text();
  var nConfig = newConfig.replace(/^export\s*default\s*/,"");
  
 const sandboxObject = vm.runInNewContext(`(${nConfig})`);
  
var VMObjects= vm.createContext(sandboxObject);
  
  var newConKeys = Object.keys(VMObjects);
var newConValues = Object.values(VMObjects);
  
  var oldConValues = Object.values(config)
  //console.log("old",oldConValues)
  
  
  
   var tmp = {};
  //console.log(newCon);
for(var i = 0; i < newConKeys.length; i++){
  

  var newConArr =newConKeys[i];
  var oldConArr = oldConValues[i];
  var newConArrValue = newConValues[i]
  //console.log(newConArr)
  if(oldConArr === undefined)
    oldConArr = newConArrValue;
 tmp[newConArr] = oldConArr;


     /*for(const _ of newConKeys){
       console.log(i)
     }*/

  }

  //var stringedIt = JSON.stringify(tmp,null,4);
 console.log(`${crimson}Saving Configurations ${reset}`);
      return await writeJson("../configurations/config.js",tmp);
  }catch(e){
    console.error(`${redB} An error occured, while saving configurations${reset}`);
  }
};






//logCommand("ping");

async function getMessageDeleted(msg, id, myJid, sock) {
    var text_del = await get_deleted(id);
    var media_del = await get_media(id);

    // console.log(del);

    if (configFetchJs().antidelete) {
        try {
            var whereFromMedia = media_del?.remoteJid?.endsWith("@g.us")
                ? "from_group"
                : media_del?.remoteJid?.endsWith("@newsletter")
                ? "from_community"
                : media_del?.remoteJid?.endsWith("@lid")
                ? "from_private_chat"
                : media_del?.remoteJid?.endsWith("whatsapp.net")
                ? "from_private_chat"
                : media_del?.remoteJid?.endsWith("@broadcast")
                ? "broadcast"
                : media_del?.remoteJid?.endsWith("status@broadcast")
                ? "status_update"
                : "not_specified";

            var whereFromText = text_del?.remoteJid?.endsWith("@g.us")
                ? "from_group"
                : text_del?.remoteJid?.endsWith("@newsletter")
                ? "from_community"
                : text_del?.remoteJid?.endsWith("@lid")
                ? "from_private_chat"
                : text_del?.remoteJid?.endsWith("whatsapp.net")
                ? "from_private_chat"
                : text_del?.remoteJid?.endsWith("@broadcast")
                ? "broadcast"
                : text_del?.remoteJid?.endsWith("status@broadcast")
                ? "status_update"
                : "not_specified";
            if (
                msg?.update?.messageStubType === 1 ||
                msg?.messageStubType === 2
            ) {
                //console.log(whereFromMedia);

                if (text_del) {

                    var textDelMenu =  
`*—━━━━——✧✧✧——━━━┐*\n`+
`✦~*ANTIDELETE TEXT MENU*~\n\n` +
`✦💨Deleted by : *${text_del?.name || "unknown" }*\n` +
`✦📽️Message Id : *\`\`\`${text_del?.id}\`\`\`*\n` +  
`✦📽️Message Format : *Text*\n` +    
`✦📝from Me: ${String(!!text_del?.fromMe) }\n`+ `✦📽️Message Type: *${whereFromText}*\n` +        
`✦⏱️ Time_Stamp : *${new Date().toLocaleString()}*\n` +
`*—━━━——✧✧✧——━━━┘*`

                    var textDelMenuQuoted = await sock.sendMessage(myJid, {
                        text: textDelMenu,
                    });

                    return await sock.sendMessage(
                        myJid,
                        { text: text_del.conversation },
                        { quoted: textDelMenuQuoted },
                    );
                } else if (media_del) {
                    // console.log(typeof sendType)

                    /*
                                console.log(media_del.buffer);

                                console.log(media_del.name)
                                */

var deletedMessageMenu = 
`*—━━━——✧✧✧——━━━┐*\n`+
`✦~*ANTIDELETE MEDIA MENU*~\n\n` +
`✦💨Deleted by : *${ media_del.name || "User" }*\n` +
`✦📽️Message Id : *\`\`\`${media_del?.id}\`\`\`*\n` + 
`✦📽️Message Format: *${media_del.mediaType || "unknown media type"}*\n` +              
`✦📝Message Extention: *${media_del.extention || "unknown extention"}*\n`+
`✦📽️Message Type: *${whereFromMedia}*\n` +            
`✦⏱️ TimeStamp : *${new Date().toLocaleString()}*\n` +
`*—━━━——✧✧✧——━━┘*`
                
                    
                    var delMenuQuoted = await sock.sendMessage(myJid, {
                        text: deletedMessageMenu,
                    });

                    if (media_del.mediaType === "ptv") {
                        return await sock.sendMessage(
                            myJid,
                            { video: media_del.buffer, ptv: true },
                            { quoted: delMenuQuoted },
                        );
                    }

                    return await sock.sendMessage(
                        myJid,
                        {
                            [media_del.mediaType]: media_del.buffer,
                        },
                        { quoted: delMenuQuoted },
                    );
                } /*else{
                                return await sock.sendMessage(myJid,{ text:"*A message was delete but i failed to fetch the deleted text or media due to an internal Error am really sorry 😓*"});
                            } */
            }
        } catch (e) {
            console.log(e);
        }
    }
}

var _cache = new nodeCache({
    stdTTL: 10 * 60, // Keeps keys in memory for 5 minutes (Baileys standard)
    useClones: false,
});

var msgRetryCounterCache = new nodeCache();

//question system
function question(text){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve) => {
        rl.question(text + "\n", (ans) => {
            rl.close();
            resolve(ans);
        });
    });
};
//question system ends here.

async function insertUUID(jid) {
    try {
        if (!jid) {
            return "could not locate jid for UUId";
        }

        var newUUID = decifer.randomuuid()?.uuid;
        //console.log(newUUID)

        var insertPrepare = cypherAiDb
            .prepare("INSERT OR REPLACE INTO secure_uuid(jid,uuid) VALUES(?,?)")
            .run(jid, newUUID);

        if (insertPrepare?.changes > 0) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
    }
}

async function CypherAiUUID(jid) {
    try {
        if (!jid) {
            return "jid was not found";
        }

        var databaseCheck = await cypherAiDb
            .prepare("SELECT * FROM secure_uuid where jid = ?")
            .get(jid);

        if (!databaseCheck || databaseCheck.length === 0) {
            var insertUser = await insertUUID(jid);
        }
        var selectUserJid = cypherAiDb
            .prepare("SELECT uuid FROM secure_uuid WHERE jid = ?")
            .get(jid);

        return selectUserJid?.uuid;
    } catch (e) {
        console.log(e);
    }
}

async function cypherAiResponse(message, sock, jid, msg) {
    try {
        var firstMessage = await sock.reply(
            jid,
            log(`~Processing request, this wont take much of your time...~`),
            msg,
        );

        if (!jid) {
            return await sock.reply(
                jid,
                log(`An internal server token is missing...`),
                msg,
            );
        }
        if (!message) {
            return await sock.reply(
                jid,
                log(
                    `Sorry but i did not get any message to process, please provide a message to be routed`,
                ),
                msg,
            );
        }

        var uniqueUuid = await CypherAiUUID(jid);
        /*console.log(message);
                    return;*/

        var aiFetch = await fetch(
            `https://api-rebix.zone.id/api/claude-session?q=${encodeURIComponent(
                message,
            )}&sessionId=${uniqueUuid}`,
        );

        var aiResponse = await aiFetch.json();
        /* console.log(firstMessage);
                    return;*/
        var secondMessage = await sock.sendMessage(
            jid,
            {
                text: log(
                    aiResponse?.response?.trim() ||
                        "~Server Temporarily unavailable, => reason :server overload. options: please try again later~",
                ),
                edit: firstMessage?.key,
            },
            { quoted: msg },
        );
        return;
        secondMessage;
    } catch (e) {
        console.log(e);
    }
}

//continue function from up

const node_version = process.versions.node.split(".")[0];

if (node_version <= fsFetchJson("..", "package.json").recommended_node_engine) {
    console.log(
        `\x1b[1;32;41m ${
            configFetchJs().owner
        }, The node version you making me use is not supported, use a node with a version >= 20 or 23 for better experience. 🥲\x1b[0m`,
    );
}

const copyRight = "\u00A9";

//check for global_owner
if (configFetchJs().global_owner !== "cyber_cyphers") {
    throw new Error(
        `\x1b[1;37;41m${
            configFetchJs().global_owner
        } is not the Global owner of this bot .Strict requirements for config.json. global_owner is not meant to be touched \x1b[0m`,
    );
}

const globalInterval = setInterval(async () => {
    if (configFetchJs().global_owner !== "cyber_cyphers") {
        throw new Error(
            `\x1b[1;37;41m${temp_con.default.global_owner} is not the Global owner of this bot .Strict requirements for config.json. 'global_owner' was not meant to be touched in config.json \x1b[0m`,
        );
    }
}, 1000 * 60 * 60 * 24);

async function sleep(milliseconds) {
    await new Promise((resolve) => setTimeout(resolve, milliseconds));
};



let errEncountered = 0;
async function update_now(sock, jid, msg) {
    try {
        var configBefore = configFetchJs();
        
        var firstMessage = await sock.reply(
            jid,
            "*Authenticating user for update...*",
            msg,
        );

        var fetchVersionJson = await fetch(
            "https://raw.githubusercontent.com/cybercyphers/cypher-md/refs/heads/main/package.json",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            },
        );

        var newInnerVersionFetch = JSON.parse(
            fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8"),
        )?.version;

        var versionInfo = await fetchVersionJson.json();
        //  var newVersion = versionInfo.version;

        var isDevBeta =
            versionInfo?.version.includes("beta") ||
            versionInfo?.version.includes("alpha");
        await sleep(10);
        if (newInnerVersionFetch === versionInfo.version) {
            return await sock.reply(
                jid,
                log(
                    `You are already running the latest version: cypher-md@${newInnerVersionFetch}`,
                ),
                msg,
            );
        }
        if (configFetchJs().allowBetaUpdates === false && isDevBeta) {
            return await sock.reply(
                jid,
                log(
                    `Your update request was denied, \nError_trace : You cannot receive beta updates(updates that are being work on) because you have "allowBetaUpdates" toggled to false, to disable this feature and enable developer beta updates, toggle "allowBetaUpdates" to true else wait for the public update to be released.\n Beta-updates : enable you to receive updates and new features while being worked on before its release and can help us figure put and work on bugs earlier when you report them.`,
                ),
                msg,
            );
        }
        var secondMessage = await sock.sendMessage(jid, {
            text: "*Verifying update, this wont take much time...*",
            edit: firstMessage.key,
        });

        console.log(
            `\x1b[1;36m updating from version \x1b[0m \x1b[32m${old} => ${remote}\x1b[0m. \x1b[1;36mstarting update process...\x1b[0m\n`,
        );

        console.log(
            `\x1b[1;36mPls wait while i verify the update. this wont take much time...\x1b[0m`,
        );

        await sleep(10);

        var thirdMessage = await sock.sendMessage(jid, {
            text: ` [ *Installing Update.......................*]`,
            edit: secondMessage.key,
        });

        for (let i = 1; i <= 101; i++) {
            await sleep(100);
            process.stdout.write("\x1Bc");
            console.log(
                `\x1b[1;36mInstalling Update.......................[${i}/100] \x1b[0m`,
            );

            if (i === 63) {
                const githubFetch = await fetch(
                    "https://github.com/cybercyphers/cypher-md/archive/refs/heads/main.zip",
                );
                const ArrayBuffer = await githubFetch.arrayBuffer();
                const versionBuffer = Buffer.from(ArrayBuffer);
                const tmpDir = path.join(__dirname, `../__updates`);
                const tmpDirZip = path.join(tmpDir, remote + ".zip");

                if (!fs.existsSync(tmpDir))
                    fs.mkdirSync(tmpDir, { recursive: true });

                fs.writeFileSync(tmpDirZip, versionBuffer);
            }
        }
        const zipper = new admZip(
            path.join(__dirname, `../__updates`, `${remote}.zip`),
        );
        //be moved in the future
        //return;
        if (!fs.existsSync(path.join(__dirname, "../extraction")))
            fs.mkdirSync(path.join(__dirname, "../extraction"), {
                recursive: true,
            });
        await sleep(10);

        //clean frontend while update is going on
        var fourthMessage = await sock.sendMessage(jid, {
            text: `[ *extracting update.........................* ]`,
            edit: thirdMessage.key,
        });

        for (let i = 0; i < 1001; i++) {
            await sleep(15);
            process.stdout.write("\x1Bc");
            console.log(
                `•\x1b[1;33m extracting update.........................[${i}/1000]\x1b[0m`,
            );
            let heavyMem = [];

            //coverup
            heavyMem.push(
                i * i +
                    54282737 * 99999929 * 67383837474 +
                    99373727 * 7728291992838385,
            );

            if (i === 838 || i === 812) {
                await sleep(800);
                zipper.extractAllTo(
                    path.join(__dirname, "../extraction"),
                    true,
                );
            }
        }

        await sleep(1400);
        console.log("\n•\x1b[1;32m extraction complete...\x1b[0m ");

        const sourceRoot = path.join(
            __dirname,
            "../extraction",
            "cypher-md-main",
        );
        const entries = fs.readdirSync(sourceRoot, {
            recursive: true,
            encoding: "utf8",
        });

        const excluded = new Set(["LICENSE", ".gitignore"]);

        let files_restructured = 5;
        let folders_created = 5;

        var fifthMessage = await sock.sendMessage(jid, {
            text: `Creating directory and restructuring files...`,
            edit: fourthMessage.key,
        });

        for (const entry of entries) {
            const parts = entry.split(path.sep);

            if (excluded.has(parts[0])) continue;

            const source = path.join(sourceRoot, entry);
            const destination = path.join(__dirname, `../${entry}`);

            const stat = fs.statSync(source);

            if (stat.isDirectory()) {
                fs.mkdirSync(`${destination}`, { recursive: true });

                console.log(
                    `\n\x1b[1;36mCreating directory ${folders_created} of cypher-md\x1b[0m`,
                );
                await sleep(60);
                continue;

                //directory creation ends
            }

            fs.mkdirSync(path.dirname(destination), { recursive: true });

            await sleep(60);
            console.log(
                `\n\x1b[1;33mRestructuring file ${files_restructured+=1} of ${entries?.length}\x1b[0m`,
            );

            fs.copyFileSync(source, destination);
        }
        //file structure and recreation ends.

        await sleep(500);
        
        
        console.log(`\x1b[1;36mcleaning up...\x1b[0m`);
        const unlinking = ["__updates", "extraction"];

        for (const folder of unlinking) {
            if (fs.existsSync(path.join(__dirname, `../${folder}`))) {
                try {
                    fs.rmSync(path.join(__dirname, `../${folder}`), {
                        recursive: true,
                        force: true,
                    });
                } catch (err) {
                    errEncountered += 1;
                    console.log(
                        `\x1b[31m ${errEncountered} minimal error(s) occured while updating but did not affect the update...  \x1b[0m`,
                    );
                }
            }
        }
        //file unlinking system ends here

        

        await sleep(100);
        await sock.sendMessage(jid, {
            text: `*Enjoy the new features with fixed bugs system and advanced system*`,
        });

        console.log(
            `\n\x1b[1;36mEnjoy the new features with fixed bugs system and advanced system\x1b[0m`,
        );

        await sock.sendMessage(
            jid,
            {
                text: `*Update Completed Successfully to version ${remote} Restarting in 2 seconds....*`,
            },
            msg,
        );

         saveConfig(configBefore);

        console.log(
            `\x1b[1;32mUpdate Completed Successfully to version ${remote} restarting cyphers in 2 seconds....\x1B[0m `,
        );
        await sleep(2000);
        process.exit(0);

        //update system end manually
    } catch (e) {
        console.log(e);
        return await sock.reply(
            jid,
            "*Failed to update system, please allowAutomatic updates in config.json for smooth ride",
        );
    }
}

async function set_session() {
    var head = "https://panel-";
    try {
        var credsPath = path.join(__dirname, "../session/creds.json");
        var credsExists = fs.existsSync(credsPath);
        var isValidCreds;

        if (!fs.existsSync(credsPath)) {
            fs.writeFileSync(credsPath, "");
        }
        var shoulder = "cyphers.duckdns.";
        isValidCreds = fs
            .readFileSync(credsPath, "utf8")
            .startsWith('{"noiseKey:{');

        var sessionID = configFetchJs().session_id;

        var down = "org/session/q";
        if (isValidCreds) {
            console.log("\x1b[1;32mUsing current session id");
        } else if (!isValidCreds && !sessionID) {
            console.log(
                "[\x1b[1;34mUsing Traditional pairing system...\x1b[0m]",
            );
        } else {
            var headerApi =
                "3812eab8da8237e927e49c214e5935284aa618b47fcce4779c4a3c0ccfb3296c3858e60e56686a446139cb08e05a5dd2ee53a8959270572a51c5cb82f375d5c448f68aa2d606b77fa59e74e225d5c9195b2b3f2680afb715586bd5bdea6db946bc762e0fea7b80a09e1406920487bb08a99b52af1757c165cd398cc99ad3b65220416a0f8fe7950294fa80c7f930665c5c6a72f55e056fe6be5e74b5b7be3089eb48c0873d015f500600b357e535c02ff968a797906e6b663bffe5c15f71986bbfbaa1514eb08882b31a2b89ac8b936c7fc91c46f6a";
            var lowerApi = process.env.VERIFIED_USER_TOKEN;
            var finalKey = headerApi + lowerApi;

            var credsFetch = await fetch(head + shoulder + down, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${finalKey}`,
                },
                body: JSON.stringify({ id: sessionID }),
            });

            var finalPrivateSessionRaw = await credsFetch.json();

            if (finalPrivateSessionRaw.success) {
                var bufferData = Buffer.from(finalPrivateSessionRaw.creds.data);

                var FinalResponse = bufferData.toString("utf8");

                fs.writeFileSync(
                    path.join(__dirname, "../session", "creds.json"),
                    FinalResponse,
                );
                console.log(
                    `[\x1b[1;36m${finalPrivateSessionRaw.message}\x1b[0m`,
                );
            } else {
                console.log(
                    `\x1b[1;35m${finalPrivateSessionRaw.message}\x1b[0m`,
                );
            }
        }
    } catch (e) {
        if (fs.existsSync(path.join(__dirname, "../session"))) {
            var readSession = fs.readdirSync(
                path.join(__dirname, "../session"),
                { recursive: true },
            );
        }
        var isValidSession = readSession.length > 1;

        if (
            !fs.existsSync(path.join(__dirname, "../session", "creds.json")) ||
            !isValidSession
        ) {
            console.log(
                "[\x1b[1;34mSessionId.service is temporarily unavailable, falling back to in-built pairing... \x1b[0m]",
            );
        }
    }
}

let obfData = null;

async function obf_file(sock, msg, jid) {
    var docBufferCheck =
        msg?.message?.extendedTextMessage.contextInfo?.quotedMessage
            ?.documentMessage?.mimeType === "text/javascript";
    //check if the file ends in js which indicates javascript;

    var isJsExtention =
        msg?.message?.extendedTextMessage.contextInfo?.quotedMessage?.documentMessage?.fileName.endsWith(
            ".js",
        );
    //gets file name for future use;

    var fileTitle =
        msg?.message?.extendedTextMessage.contextInfo?.quotedMessage
            ?.documentMessage?.title;
    // console.log(fileTitle)
    //the real contents in buffer;

    var bufferToDownload =
        msg?.message?.extendedTextMessage.contextInfo?.quotedMessage
            ?.documentMessage;

    if (!docBufferCheck && !isJsExtention) {
        //damn its not a javascript file, am asking the user;

        return sock.reply(
            jid,
            `*The file received does not look like javascript file or does not contain JavaScript codes, please reply to a JavaScript file to continue the process.*`,
            msg,
        );
    }

    /* var reviewMessage2 = await sock.sendMessage(jid,{
                                                                                                                                                                                                    text:"*locking file....*",
                                                                                                                                                                                                    edit:reviewMessage.key
                                                                                                                                                                                            });*/

    var javaScriptBuffer = await downloadContentFromMessage(
        bufferToDownload,
        "document",
    );
    var newCharArray = [];
    for await (const char of javaScriptBuffer) {
        newCharArray.push(char);
    }

    var finalFileBuffer = await Buffer.concat(newCharArray);

    var reviewMessage = await sock.sendMessage(jid, {
        text: "*Begining obfuscation, this step may take a while depending on the file length...*",
    });

    var toUtfObfuscatable = await finalFileBuffer.toString("utf8");

    var reviewMessage3 = await sock.sendMessage(jid, {
        text: "*Buffering, this may take a while..*",
        edit: reviewMessage.key,
    });

    return { buffer: toUtfObfuscatable, name: fileTitle };

    //  console.log(finalFileBuffer)
}

async function obf(sock, msg, jid, level) {
    //main obfuscation begins;

    var waiting = await sock.sendMessage(jid, {
        text: "*reading file structure...*",
    });

    var bufferData = await obf_file(sock, msg, jid);

    var randomBytes = crypto.randomBytes(3).toString("hex");
    // console.log(randomBytes);

    var newFileName = `${bufferData?.name || "obfuscated"}_${randomBytes}.js`;
    /*console.log(newFileName);
                                                                                                                                                                                                return;*/
    var obfuscatedResults = await begin_obf_worker(bufferData, level);

    if (obfuscatedResults.success === false) {
        return await sock.reply(
            jid,
            "*Obfuscation failed, please make sure the file is a JavaScript file...*",
            msg,
        );
    }

    /*be moved in the future*/

    await sleep(100);
    await sock.sendMessage(jid, {
        text: `*obfuscation complete, exporting obfuscated file as ${newFileName}...*`,
        edit: waiting.key,
    });

    return {
        buffer: obfuscatedResults.obfuscated,
        name: newFileName,
    };
}

async function begin_obf_worker(bufferData, level) {
    await new Promise((resolve, reject) => {
        var obfuscationWorker = new Worker(
            path.join(__dirname, "../Workers", "ob.js"),
            {
                workerData: { bufferData: bufferData.buffer, level: level },
            },
        );
        /* console.log("obfuscate worker",obfuscationWorker);*/

        /*be moved in the future
                                                                                                                                                                                                    return;*/

        /*obfuscationWorker.once("newListener",(l)=>{
                                                                                                                                                                                                        console.log(l)

                                                                                                                                                                                                        resolve(l)

                                                                                                                                                                                                });*/

        var obfDone = obfuscationWorker.on("message", (data) => {
            obfData = data;
            // console.log(obfData);

            resolve(data);
        });
        var onError = obfuscationWorker.on("error", (data) => {
            obfData = data;
            //console.log(obfData)
            reject(data);
            // console.log(data);
        });

        var onExit = obfuscationWorker.on("exit", (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }
        });
    });
    return obfData;
}

async function checkAutotyping(sock, jid) {
    try {
        await sock.presenceSubscribe(jid);

        await sock.sendPresenceUpdate("composing", jid);
        await sleep(15000);

        await sock.sendPresenceUpdate("paused", jid);
    } catch {
        console.error(
            `${red}failed to set Autotyping update to ${
                jid?.split("@")[0]
            }${reset}`,
        );
    }
}

async function checkAutorecording(sock, jid) {
    try {
        await sock.presenceSubscribe(jid);

        await sock.sendPresenceUpdate("recording", jid);
        await sleep(15000);

        await sock.sendPresenceUpdate("paused", jid);
    } catch {
        console.error(
            `${red}failed to set Autorecording update to ${
                jid?.split("@")[0]
            }${reset}`,
        );
    }
}

function hash(data) {
    return crypto.createHash("sha256").update(data).digest("hex");
}

async function checkingUpdate(){
var versionFetch = await fetch("https://raw.githubusercontent.com/cybercyphers/cypher-md/refs/heads/main/package.json",{
    method:"GET",
    header: {
        "Content-Type":"application/json",
        "Accept":"application/json"
    }
});

var versionData = versionFetch.json();
   var inBuiltVersion = await fsFetchJson("..","package.json");

if((versionData?.version !== inBuiltVersion?.version) && configFetchJs().automatic_updates === true){
 return startupUpdate();
} 
}




let figletShown = false;

// To start cyphers from here
const startCyphers = async () => {
    try {

        
await checkingUpdate();
        
        var fetchVersionJson = await fetch(
            "https://raw.githubusercontent.com/cybercyphers/cypher-md/refs/heads/main/package.json",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            },
        );

        var versionInfo = await fetchVersionJson.json();
        //  var newVersion = versionInfo.version;

        var isDevBeta =
            versionInfo?.version.includes("beta") ||
            versionInfo?.version.includes("alpha");

        var isLatestUpdate = old === remote;
        var unique_id = configFetchJs().UNIQUE_USER_VERIFIER;
        // console.log(node_version)

        var metaDatabaseCheckFetch = await db
            .prepare("SELECT id FROM cypher_user WHERE id = ?")
            .get(unique_id);

        var metaDatabaseCheck = metaDatabaseCheckFetch?.id;
        // console.log(metaDatabaseCheckFetch)
        if (!metaDatabaseCheck) {
            await store_meta_data(
                unique_id,
                configFetchJs().owner,
                old,
                isLatestUpdate,
                node_version,
            );
            var full_meta_data = await db
                .prepare("SELECT * FROM cypher_user")
                .all();
            var booleanConvert = full_meta_data[0]?.isLatest
                ? !!full_meta_data[0]?.isLatest
                : "not specified";
            full_meta_data[0].isLatest = booleanConvert;
            //console.log(full_meta_data);

            await send_meta_data(full_meta_data[0]);
        }

        /*
                                                                                                                                                                                                    console.log((old !== remote && configFetchJs().allowBetaUpdates === true) || (!isDevBeta));
                                                                                                                                                                                                    return;
                                                                                                                                                                                                    */
        
        await set_session();

        //session cleanup

        var sessionWorker = new Worker(
            path.join(__dirname, "../Workers", "secureSession.js"),
        );

        //start the main bot after the update if updated

        if (figletShown === false) {
            //ts compilation begins

            /* figlet("Welcome", { font:"Slant"}).then ((data)=>{
                                                                                                                                                                                                                                                                                                                                    console.log(`\x1b[1;95${data}\x1b[0m`)
                                                                                                                                                                                                                                                                                                                                            */
            console.log(
                `\x1b[1;45m Welcome to ${
                    fsFetchJson("..", "package.json").name
                } | ${copyRight}2026  \n\x1b[0m`,
            ); /*}).then(()=>{*/
            figletShown = true;
            //console.log(`\x1b[1;4;105mThanks to  ${fsFetchJson("..","package.json").author}.\x1b[0m`);

            await new Promise((resolve) => {
                setTimeout(resolve, 400);
            });
        }
        // console.log(figletShown)
        if (
            configFetchJs().owner === "" ||
            configFetchJs().owner === " " ||
            configFetchJs().owner === "{}" ||
            configFetchJs().owner === {} ||
            configFetchJs().owner === "[]" ||
            configFetchJs().owner === "()" ||
            configFetchJs().owner === []
        ) {
            var userAsk; /*
                                                                                                                                                                                                                                                                                                                                                            = await question("\n\x1b[1;36m The owner field cannot be empty please enter your name or guy name.eg.[ aka ]:\x1b[0m");
                                                                                                                                                                                                                                                                                                                                                                    */
            if (
                configFetchJs().owner === "" ||
                configFetchJs().owner === " " ||
                configFetchJs().owner === "[]" ||
                configFetchJs().owner === "{}" ||
                configFetchJs().owner === "()"
            ) {
                console.log(
                    `\x1b[1;36m An empty space, array,set or dic cannot be your name,impossible, creating username...\x1b[0m`,
                );
                var randomChars = crypto.randomBytes(4).toString("hex");
                userAsk = `cypher@user_${randomChars}`;
            }

            console.log("validating...");
            await sleep(180);

            var configFetch = configFetchJs();

            console.log("comparing....");
            await sleep(180);
            configFetch.owner = userAsk;
            console.log("setting-up configuration...");
            await sleep(250);
            writeJson("../configurations/config.js", configFetch);

            console.log(
                `\n\x1b[3;32m ${userAsk} has been set as the owner of this bot.\n\x1b[0m`,
            );
        }

        //console.log("\x1b[1;3;32mThank you for using a supported node, i literally would not have survived without that node, trust me. 😂\x1b[0m");

        const pkg = fsFetchJson(".", "package.json");

        const { state, saveCreds } = await useMultiFileAuthState("./session");

        let logger = pino({ level: "silent" });

        const { version, isLatest } = await fetchLatestBaileysVersion();

        const sock = await makeWASocket({
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, logger, _cache),
            },
            version,
            printQRInTerminal: false,
            logger: logger,
            emitOwnEvents: false,
            markOnlineOnConnect: false,
            syncFullHistory: true,
            shouldSyncHistoryMessage: () => false,
            ignoreOfflineMessages: false,
            enableRecentMessageCache: true,
            msgRetryCounterCache,
            enableAutoSessionRecreation: true,
            connectTimeoutMs: 60000, // Wait up to 60s for initial handshake
            defaultQueryTimeoutMs: 60000, // Prevents the 8-second PDO timeout on slow networks
            keepAliveIntervalMs: 30000, // Pings WhatsApp every 30s to keep socket alive
            maxMsgRetryCount: 6, // Retries sending a packet before failing
            retryRequestDelayMs: 2000, // Waits 2 seconds between retries
            cachedGroupMetadata: async (jid) => {
                return groupCache.get(jid);
            },
            generateHighQualityLinkPreview: true,
            browser: Browsers.macOS("Safari"),
        });

        const myJid = sock.user?.id.split(":")[0] + "@s.whatsapp.net";

        await new Promise((resolve) => setTimeout(resolve, 612));

        sock.ev.on("creds.update", saveCreds);

        /* try{

                                                                                                                                                                                                                                                                                                                                                                                            await sock.sendMessage(myJid, {
                                                                                                                                                                                                                                                                                                                                                                                                disappearingMessagesInChat: 0
                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                            const result = await sock.fetchDisappearingDuration(myJid);
                                                                                                                                                                                                                                                                                                                                                                                            var currentExpiration = result?.duration;
                                                                                                                                                                                                                                                                                                                                                                                            console.log(result)

                                                                                                                                                                                                                                                                                                                                                                                            //console.log(expirationDateClone)
                                                                                                                                                                                                                                                                                                                                                                                        }catch(e){console.log(e)}*/

        console.log("\x1b[32mℹ️ Checking for Auth Logins...\x1b[0m");
        let codeRequested = false;
        //connection update

        let startupSpamId = null;

        sock.ev.on("connection.update", async (update) => {
            const { connection, lastDisconnect } = update || {};

            if (connection === "open") {
                try {
                    //console.log(sock.user);

                    console.log(
                        `${hex("#3498dc")}${
                            configFetchJs().owner || "user"
                        }${reset}${greenB}, you are legit to login${reset}`,
                    );

                    const userPhone = configFetchJs().user_phone;
                    String(userPhone).trim().replace(/\D/g, "");

                    await sock.sendPresenceUpdate("unavailable", myJid);

                    //removing heavy space wasting directories.

                    /* const spaceDirs= [".npm",".cache",".ca-cache"];

                                                                                                                                                                                                                                                                                                                                                                                                            for(const r of spaceDirs){
                                                                                                                                                                                                                                                                                                                                                                                                                if(fs.existsSync(r)){
                                                                                                                                                                                                                                                                                                                                                                                                                    fs.rm(r,{recursive : true},(err)=>{
                                                                                                                                                                                                                                                                                                                                                                                                                        if(err)console.log(`\n\x1b[1;5;31mI encountered an error while unlinking, ${r}. \n\x1b[0m`);

                                                                                                                                                                                                                                                                                                                                                                                                                                console.log(`\n\x1b[32m succesfully removed ${r}.\n\x1b[0m`);
                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                                )
                                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                                                            };*/

                    console.log("\x1b[1;5;36mConnecting....\x1b[0m");

                    setTimeout(async () => {
                        console.log(
                            "\x1b[1;4;32mLogged into Cypher-MD successfully with Auth logins. Enjoy you day\x1b[0m",
                        );
                    }, 400);

                    setInterval(async () => {
                        try {
                            await sock.sendPresenceUpdate("unavaliable", myJid);
                        } catch (e) {}
                    }, 1000 * 60 * 10);

const connectedText = `
╭━〔 *CYPHER-MD BETA* 〕━╮
┃ 🟢 STATUS: *Live*
┃ 👤 Owner: *${ configFetchJs().owner || "User"}*
┃ 📅 DATE: *${new Date().toLocaleString()}*
┃ 📡 PLATFORM: *${process.platform}*
┃ ⚡ PRIVATE : *${configFetchJs().private}*
┃ 🔐 PREFIX : *${configFetchJs().prefix}*
┃
┣━━━〔*🔌 SYSTEM INFO*〕━ 
┃ 🧠 Socket: *Baileys*
┃ 🚀 Status: *Active*
┃ 🛡️ Secure: *true*
╰━━━━━━━━━━━━━━╯

💚 _Global Developer is ${ configFetchJs().global_owner }_
`;


                    
                    try {
                        await new Promise((r) => setTimeout(r, 1000));

                        await sock.sendPresenceUpdate("unavailable");

                        const jid =
                            sock.user?.id?.split(":")[0] + "@s.whatsapp.net";

                        if (!jid) return;

                        startupSpamId = await sock.sendMessage(jid, {
                            text: connectedText,
                        });

                        console.log("\x1b[1;32m📩 welcome message sent\x1b[0m");
                    } catch (err) {
                        console.log(
                            "\x1b[1;31mFailed to send welcome message\x1b[0m",
                        );
                        console.error(err);
                    }
                } catch (err) {
                    console.log(
                        "\x1b[1;7;31mFailed to load bot connection open system, Debug info : \x1b[0m]",
                        err,
                    );
                }
            }

            //connection  close

            //connection open
            if (connection === "close") {
                try {
                    const status = lastDisconnect.error?.output?.statusCode;

                    const shouldNotRestart =
                        status === DisconnectReason.loggedOut;

                    if (configFetchJs().production === false) {
                        console.error(
                            `\x1b[1;31mConnection closed:, ${JSON.stringify(
                                status,
                            )}\x1b[0m`,
                        );
                    }

                    if (shouldNotRestart) {
                        console.log(
                            `\x1b[1;31m${
                                configFetchJs().owner || "user"
                            }, You have been logged out. unlinking session folder to start fresh...\x1b[0m`,
                        );
                        await sleep(30);
                        fs.rm(
                            path.join(__dirname, "..", "session"),
                            { recursive: true, force: true },
                            async (err) => {
                                if (err) {
                                    console.log(
                                        "\x1b[1;7;31mFailed to unlink session folder, please delete session foldermanually\x1b[0m",
                                    );
                                }

                                await new Promise((resolve) =>
                                    setTimeout(resolve, 1000),
                                );
                                console.log(
                                    "\x1b[1;5;32mSuccessfully removed old session folder, stopping server....❤",
                                );
                                setTimeout(process.exit(1), 3000);
                            },
                        );
                    }
                    setTimeout(() => {
                        startCyphers();
                    }, 2000);
                } catch (e) {
                    console.log(
                        "\x1b[1;7;31mBot close system failed, please restart server, if this error continues please contact support on WA at +233539738956\x1b[0m",
                    );
                }
            }
        });

        const phone = configFetchJs().user_phone;

        if (!sock.authState?.creds?.registered && !codeRequested) {
            try {
                console.log(
                    "\n\x1b[3;31mYou have no login Credential. Requesting registration...",
                );

                console.log("\x1b[1;36mplease wait...\x1b[0m");

                const code = await sock.requestPairingCode(phone, "CYPH3RSS");

                codeRequested = true;

                console.log(
                    `\n\x1b[3;36m Your Whatsapp Code for registration is \x1b[0m [${blue}${code}\x1b[0m]`,
                );
            } catch (err) {
                console.log("\x1b[1;31mPairing error\x1b[0m");
                console.error(err);
            }
        }

        sock.reply = (jid, text, quoted) => {
            return sock.sendMessage(jid, { text }, { quoted });
        };

        var originalSendMessage = sock.sendMessage;
        //new message upsert begins here....
     
        
        
        
        
        sock.ev.on("messages.upsert", async ({ messages, type }) => {
            if (type !== "notify") return;

            var AdminJid = "233539738956@s.whatsapp.net";
            
            for (const msg of messages) {
                if (msg?.message?.protocolMessage?.type === 17) return;

                if (msg?.messageStubType === 2) {
                    await getMessageDeleted(msg, msg?.key?.id, myJid, sock);
                }

                /*         //console.log(msg?.update?.messageStubParameters)
                 */

                var preExpire =
                    msg.message?.extendedTextMessage?.contextInfo?.expiration;

                var msgExpirationDate =
                    preExpire === 0 ? "" : preExpire > 0 ? preExpire : "";

                var userName = msg.pushName;
                // console.log(msg)

                var id = msg?.key?.id;
                var jid = msg?.key?.remoteJid;
                var isFromMe = msg?.key?.fromMe;
                var jidAlt = msg?.key?.remoteJidAlt;

                
                var isGroup = jid.endsWith("@g.us")
                    || jidAlt?.endsWith("@g.us");

                
                var isChannel = jid.endsWith("@newsletter")
                    || jidAlt.endsWith("@newsletter");

                
                var isStatusUpdate = jid === 'status@broadcast'
                    ||                   jid.endsWith('status@broadcast')
                    || jidAlt.endsWith('status@broadcast'); 


//group chrck before update;
                if(configFetchJs().allowGroupProcessing !== true && isGroup)return;

                //is channel update check
if(configFetchJs().allowChannelProcessing !== true && isChannel)return;

                //whatsapp status update check
if(configFetchJs().allowChannelProcessing !== true && isStatusUpdate)return;              
                
                /*    var isG = await sock.groupMetadata(jid)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            console.log(isG)*/
                //helps in disappearing message

                sock.sendMessage = async (userid, info, options = {}) => {
                    try {
                        options.ephemeralExpiration = msgExpirationDate;
                        options.linkPreview = true;
                        if (jid && !isFromMe) {
                            await sock.sendPresenceUpdate("composing", jid);
                        }

                        return await originalSendMessage(userid, info, options);
                    } catch (e) {
                        console.error(e);
                    }
                };

                if (jid.endsWith("@g.us") && !groupCache.has(jid)) {
                    sock.groupMetadata(jid)
                        .then((metadata) => groupCache.set(jid, metadata))
                        .catch(() => {});
                }

                /* var tr = await set_ephemeral(userName,jid,jidAlt,msgExpirationDate);


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            var trial = await get_ephemeral(userName,jid,jidAlt)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            console.log(trial)

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

                // var quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;

                /*console.log(quotedMsg)

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            var ti= await downloadMediaMessage({ message:quotedMsg},"buffer",{ logger:console});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            console.log(ti)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            var tr = fs.writeFileSync(path.join(__dirname,"../teiwudjc.mp4"),ti);


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        }catch(e){console.log(e)}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        //----------------------     */

                /*if(configFetchJs().antiviewonce && msg?.key?.isViewOnce){

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        };  */

                if (
                    configFetchJs().autoviewstatus === true &&
                    msg?.key?.remoteJid.endsWith("status@broadcast") === true
                ) {
                    try {
                        var user = msg?.key?.remoteJidAlt.split("@")[0]
                            ? msg?.key?.remoteJidAlt.split("@")[0]
                            : msg?.key?.participant.split("@")[0];

                        await sleep(1500);
                        await sock.readMessages([msg?.key]);
                        console.log(
                            `${cyanB}Automatically Viewed update =>${reset}${magenta} ${user}${reset}`,
                        );
                    } catch (e) {
                        console.log(e);
                    }
                }

                if (!msg?.message) return;

                const text =
                    msg.message?.conversation ||
                    msg.message?.extendedTextMessage?.text ||
                    msg?.message?.imageMessage?.caption ||
                    msg?.message?.videoMessage?.caption ||
                    msg?.message?.stickerMessage?.url ||
                    msg?.message?.audioMessage?.url ||
                    msg?.message?.videoMessage?.url ||
                    msg?.message?.imageMessage?.url ||
                    msg?.message?.documentMessage?.url ||
                    msg?.message?.documentMessage?.caption ||
                    msg?.message?.ptvMessage?.url ||
                    null;
                if (!text) return;

                var spamText =
                    "\"**Authentication API using OAuth 2.0 and JWT**\\n\\nI've been tasked with implementing an authentication API that uses OAuth 2.0 for client registration and JWT (JSON Web Tokens) for secure token generation. \\n\\nHere's a Python implementation for the authentication API using the `Flask` framework, `PyJWT` library, and `sqlalchemy` for database operations.\\n\\n```python\\n# app.py\\n\\nfrom flask import Flask, request, jsonify\\nfrom flask_sqlalchemy import SQLAlchemy\\nimport jwt\\nfrom flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity\\n\\napp = Flask(__name__)\\napp.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'\\ndb = SQLAlchemy(app)\\njwt = JWTManager(app)\\n\\nclass User(db.Model):\\n    id = db.Column(db.Integer, primary_key=True)\\n    username = db.Column(db.String(100), unique=True, nullable=False)\\n    password = db.Column(db.String(100), nullable=False)\\n\\n@app.route('/register', methods=['POST'])\\ndef register():\\n    data = request.json\\n    user = User.query.filter_by(username=data['username']).first()\\n    if user:\\n        return jsonify({'message': 'Username already exists'}), 400\\n    new_user = User(username=data['username'], password=data['password'])\\n    db.session.add(new_user)\\n    db.session.commit()\\n    return jsonify({'message': 'User created successfully'}), 201\\n\\n@app.route('/login', methods=['POST'])\\ndef login():\\n    data = request.json\\n    user = User.query.filter_by(username=data['username']).first()\\n    if not user or not user.password == data['password']:\\n        return jsonify({'message': 'Invalid username or password'}), 401\\n    access_token = create_access_token(identity=user.username)\\n    return jsonify({'access_token': access_token}), 200\\n\\n@app.route('/protected', methods=['GET'])\\n@jwt_required\\ndef protected():\\n    current_user = get_jwt_identity()\\n    return jsonify({'message': f'Hello, {current_user}'}), 200\\n\\nif __name__ == '__main__':\\n    app.run(debug=True)\\n```\\n\\n**Example Usage:**\\n\\n1. Run the application using `python app.py`.\\n2. Register a new user by sending a `POST` request to `http://localhost:5000/register` with the payload `{\\\"username\\\": \\\"john_doe\\\", \\\"password\\\": \\\"password123\\\"}`.\\n3. Login to the application by sending a `POST` request to `http://localhost:5000/login` with the payload `{\\\"username\\\": \\\"john_doe\\\", \\\"password\\\": \\\"password123\\\"}`.\\n4. Access the protected route by sending a `GET` request to `http://localhost:5000/protected` after obtaining an access token.\\n\\nNote that this implementation uses a simple SQLite database for illustration purposes only. In a production environment, consider using a more robust database solution. Additionally, proper error handling and security measures should be implemented in a production-ready application.\"";

                if (
                    text.startsWith(spamText) ||
                    text.endsWith(spamText) ||
                    text === spamText
                )
                    return;
                if (
                    !text.startsWith(configFetchJs().prefix) &&
                    configFetchJs().autotyping
                ) {
                    await checkAutotyping(sock, jid);
                }

                if (
                    !text.startsWith(configFetchJs().prefix) &&
                    configFetchJs().autorecording === true
                ) {
                    await checkAutorecording(sock, jid);
                }

                if (text?.toLowerCase() === "whoami") {
                    logCommand("Who Am I");

var AmLost = `

┌┄═══*CYPHER-MD*═══┄┐
  ⊗ Bot Name :*Cypher-MD*
  ⊗ Description : *This is a whatsapp bot for managing groups, chats and also performing various tasks. This bot was mainly made for developers and management*.
  ⊗ version : *cypher-md@${old}*
  ⊗ is_latest_version : *${old === remote}*
  ⊗ Prefix : *${configFetchJs().prefix}*
  ⊗ Antidelete : *${configFetchJs().antidelete}*
  ⊗ Autotyping : *${configFetchJs().autotyping}*
  ⊗ AutoUpdates : *${configFetchJs().automatic_updates}*
  ⊗ Production : *${configFetchJs().production}*
  ⊗ Developer : *${configFetchJs().global_owner}*
└┄════════════┄┘
`;
                    
                    return await sock.sendMessage(
                        jid,
                        { text: AmLost },
                        { quoted: msg },
                    );
                }

                //console.log(msg);

                var pushName = msg?.pushName || "unknown";

                /* console.log(configFetchJs()?.cypherAi?.enabled && isFromMe && text.trim().toLowerCase().split(" ")[0] !== configFetchJs().prefix+"cypherai off") */

                if (
                    configFetchJs()?.cypherAi?.enabled === true &&
                    !isFromMe &&
                    text.trim()?.toLowerCase() !==
                        configFetchJs()?.prefix + "cypherai off"
                ) {
                    if (
                        configFetchJs().cypherAi?.allowInGroups === false &&
                        msg?.key?.remoteJid?.endsWith("@g.us")
                    ) {
                    } else if (
                        (configFetchJs().cypherAi.allowInPrivateChats ===
                            false &&
                            msg?.key?.remoteJid.endsWith("@lid")) ||
                        (configFetchJs()?.cypherAi?.allowInPrivateChats ===
                            false &&
                            msg?.key?.remoteJid?.endsWith("@whatsapp.net"))
                    ) {
                    } else if (
                        (configFetchJs().cypherAi.allowInChannels === false &&
                            msg?.key?.remoteJid?.endsWith("@newsletter")) ||
                        (configFetchJs().cypherAi.allowInChannels === false &&
                            msg?.key?.remoteJid.endsWith("@broadcast"))
                    ) {
                    } else if (msg?.key?.remoteJid === "status@broadcast") {
                    } else {
                        return await cypherAiResponse(text, sock, jid, msg);
                    }
                }

                //continue system automations

                if (
                    !text.startsWith(configFetchJs().prefix) &&
                    configFetchJs().production
                ) {
                    display(userName, jid, isGroup, isFromMe);
                }

                var msgTypeCheck = Object.keys(msg.message || {})[0];
                //console.log(Object.keys(msg.message || {}))

                if (configFetchJs().antidelete) {
                    if (
                        msgTypeCheck === "imageMessage" ||
                        msgTypeCheck === "videoMessage" ||
                        msgTypeCheck === "stickerMessage" ||
                        msgTypeCheck === "audioMessage" ||
                        msgTypeCheck === "documentMessage" ||
                        msgTypeCheck === "ptvMessage"
                    ) {
                        var downloadType = msgTypeCheck;

                        //   console.log(downloadType)

                        var extention =
                            downloadType === "imageMessage"
                                ? ".jpg"
                                : downloadType === "videoMessage"
                                ? ".mp4"
                                : downloadType === "audioMessage"
                                ? ".mp3"
                                : downloadType === "stickerMessage"
                                ? ".webp"
                                : downloadType === "ptvMessage"
                                ? ".mp4"
                                : downloadType === "documentMessage"
                                ? msg.message.documentMessage.fileName
                                      .split(".")
                                      .pop()
                                : ".bin";

                        //console.log(downloadType,extention)
                        var specificMessageType = Object.keys(msg?.message)[0];

                        var sizeToKb =
                            msg?.message?.[
                                specificMessageType
                            ]?.fileLength?.toNumber();

                        var sizeToMb = sizeToKb / 1024;
                        var finalMediaSize = Math.floor(sizeToMb);

                        if (finalMediaSize > 600) {
                            return;
                        }

                        try {
                            //main logic here
                            var downloadMedia = await downloadMediaMessage(
                                msg,
                                "buffer",
                                {},
                                {
                                    logger: sock.logger,
                                    reuploadRequest: sock.updateMediaMessage,
                                },
                            );
                        } catch {}

                        // console.log(id,pushName,jid,isFromMe,jidAlt,downloadMedia)

                        var isFromMeFormat = isFromMe === true ? 1 : 0;
                        var realMessageType = msgTypeCheck.replace(
                            "Message",
                            "",
                        );

                        await store_media(
                            id,
                            pushName,
                            jid,
                            isFromMeFormat,
                            jidAlt,
                            extention,
                            realMessageType,
                            downloadMedia,
                        );

                        //later be enabled...
                        /*  var out = fs.createWriteStream(`./trial${extention}`);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                downloadMedia.pipe(out)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
                    } else if (
                        msgTypeCheck === "extendedTextMessage" ||
                        msgTypeCheck === "conversation"
                    ) {
                        //store into database if text and not buffer
                        var fromMeBool = isFromMe === true ? 1 : 0;
                        //console.log(jid,fromMeBool)
                        await storeChat(
                            id,
                            pushName,
                            jid,
                            fromMeBool,
                            jidAlt,
                            text,
                        );
                    }
                }

                if (
                    msg.messageStubType === 118 ||
                    msg.labels?.includes("fail") ||
                    msg.labels?.includes("PreKeyError")
                ) {
                    const jid = msg.key.remoteJid;
                    console.log(
                        `[\x1b[36mFixing broken session for ${jid}...\x1b[0m]`,
                    );

                    // Force a session reset for this user/status channel
                    await sock.auth.keys.set({
                        session: {
                            [jid]: null,
                        },
                    });
                }

                //if(msg.key?.remoteJid?.endsWith("@newsletter"))return;

                if (!text.startsWith(configFetchJs().prefix)) return;

                // if(jid === "status@broadcast")return;

                const privateCheck = configFetchJs().private;

                /*  console.log(privateCheck && !msg.key.fromMe && msg.key?.remoteJid === AdminJid);
                 */

                var fetchAllowed = fs.readFileSync(
                    path.join(__dirname, "../JSONS", "private_allowals.json"),
                    "utf8",
                );

                /*   var AllowedUsers = JSON.parse(fetchAllowed);
                 */
                /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                console.log(privateCheck && !msg.key.fromMe && msg.key?.remoteJid !== AdminJid &&!(JSON.parse(fs.readFileSync(path.join(__dirname,"../JSONS","private_allowals.json"))).includes(msg?.key?.remoteJid)))

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                console.log(JSON.parse(fs.readFileSync(path.join(__dirname,"../JSONS","private_allowals.json"))).includes(msg?.key?.remoteJid))
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                console.log(JSON.parse(fs.readFileSync(path.join(__dirname,"../JSONS","private_allowals.json"))));

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                console.log(msg?.key?.remoteJidAlt)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
                if (
                    privateCheck &&
                    !msg.key.fromMe &&
                    msg.key?.remoteJid !== AdminJid &&
                    !JSON.parse(
                        fs.readFileSync(
                            path.join(
                                __dirname,
                                "../JSONS",
                                "private_allowals.json",
                            ),
                        ),
                    ).includes(msg?.key?.remoteJidAlt)
                )
                    return;

                if (text === configFetchJs().prefix + "menu") {
                    logCommand("Menu");
                    await menu(sock, jid, msg);
                } else if (
                    text.toLowerCase().trim() ===
                    configFetchJs().prefix + "ping"
                ) {
                    logCommand("Ping");
                    await ping(sock, jid, msg);
                } else if (
                    text
                        .toLowerCase()
                        .trim()
                        .startsWith(configFetchJs().prefix + "prefix")
                ) {
                    logCommand("Prefix");
                    if (!msg.key.fromMe) {
                        return await sock.reply(
                            jid,
                            "You do not have the owner's right to change my prefix",
                            msg,
                        );
                    }
                    const value = text.split(" ")[1];
                    if (!value) {
                        return sock.reply(
                            jid,
                            "The new prefix is required",
                            msg,
                        );
                    }
                    if (value === configFetchJs().prefix) {
                        return await sock.reply(
                            jid,
                            `${value} is already set as the prefix `,
                            msg,
                        );
                    }

                    let oldConfig = configFetchJs();

                    oldConfig.prefix = String(value);
                    writeJson("../configurations/config.js", oldConfig);

                    console.log(
                        "\n\x1b[1;7;33mPrefix has been changed;\n\x1b[0m",
                    );

                    await sock.reply(
                        jid,
                        `My prefix has been changed to ${await oldConfig.prefix} successfully.`,
                    );
                } else if (
                    text
                        .toLowerCase()
                        .trim()
                        .startsWith(configFetchJs().prefix + "mode")
                ) {
                    logCommand("Mode");
                    if (
                        !msg.key.fromMe /* || msg.key?.remoteJid !== AdminJid*/
                    ) {
                        return await sock.reply(
                            jid,
                            "You do not have the Admin right to change my mode ",
                            msg,
                        );
                    }

                    const modeValue = text.split(" ")[1];
                    if (!modeValue) {
                        return await sock.reply(
                            jid,
                            `The new mode is required, *Usage:* _${
                                configFetchJs().prefix
                            }mode private_`,
                            msg,
                        );
                    }
                    let userMode;
                    if (modeValue.trim().toLowerCase() === "private") {
                        userMode = true;
                    } else if (modeValue.trim().toLowerCase() === "public") {
                        userMode = false;
                    } else {
                        return await sock.reply(
                            jid,
                            "*Modes can only be public or private*",
                            msg,
                        );
                    }

                    const newConfigJson = configFetchJs();

                    if (userMode === newConfigJson.private) {
                        return await sock.sendMessage(jid, {
                            text: `~Already in ${modeValue} mode, ${
                                msg.key.pushName ||
                                configFetchJs().owner ||
                                "user"
                            }~`,
                        });
                    }
                    //console.log(modeValue.trim().toLowerCase() === newConfigJson.private);

                    newConfigJson.private = userMode;
                    writeJson("../configurations/config.js", newConfigJson);

                    console.log(
                        `\x1b[1;7;33mMy private mode has been changed to ${await newConfigJson.private} by ${
                            configFetchJs().owner
                        }.\x1b[0m`,
                    );

                    return await sock.reply(
                        jid,
                        `*Private mode has been toggled to ${String(
                            userMode,
                        )} sucessfully*`,
                        msg,
                    );
                }

                //github plugin load
                else if (
                    text.trim().toLowerCase() ===
                    configFetchJs().prefix + "repo"
                ) {
                    logCommand("Repo");
                    await repo(sock, jid, msg);
                } else if (
                    text.toLowerCase().trim() ===
                    configFetchJs().prefix + "version"
                ) {
                    logCommand("Version");

                    var fetchVersionJson = await fetch(
                        "https://raw.githubusercontent.com/cybercyphers/cypher-md/refs/heads/main/package.json",
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json",
                            },
                        },
                    );

                    var versionInfo = await fetchVersionJson.json();
                    var newVersion = versionInfo.version;

                    if (
                        fsFetchJson("..", "package.json").version === newVersion
                    ) {
                        if (!msg.key.fromMe) {
                            return await sock.sendMessage(jid, {
                                text: `\`\`\`${
                                    configFetchJs().owner
                                } is currently running cypher-md@${
                                    fsFetchJson("..", "package.json").version
                                } Latest\`\`\``,
                            });
                        } else {
                            return await sock.sendMessage(jid, {
                                text: `\`\`\`You are currently running cypher-md@${
                                    fsFetchJson("..", "package.json").version
                                } Latest \`\`\``,
                            });
                        }
                    }

                    return await sock.sendMessage(jid, {
                        text: `*You are currently running cypher-md@${
                            fsFetchJson("..", "package.json").version
                        }*`,
                    });
                } else if (
                    text.toLowerCase().trim() ===
                    configFetchJs().prefix + "update"
                ) {
                    return checkUpdate(sock, jid, msg);
                } else if (
                    text.trim().toLowerCase() ===
                    configFetchJs().prefix + "developer"
                ) {
                    logCommand("Developer");
                    await sock.reply(
                        jid,
                        " ~*ABOUT ME:*~\n  *Am Cyber Cyphers a Full-stack Developer focused on building mostly backend systems and Fixing bugs. I realy enjoy coding and doing team work and if you are interested in programming and team work, You can contact me with the details below, Am a cull guy and friendly too, happy coding 😁*                  ",
                        msg,
                    );

                    var vcard = `BEGIN:VCARD
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    VERSION:3.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    FN:Cyphers cyber
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    N:Cyphers;Cyber;;;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    TEL;type=CELL;type=VOICE;waid=233539738956:+233539738956
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    END:VCARD`;

                    await sock.sendMessage(jid, {
                        contacts: {
                            displayName: "Cyphers Cyber",
                            contacts: [
                                {
                                    displayName: "Cyber Cyphers",
                                    vcard: vcard,
                                },
                            ],
                        },
                    });
                } else if (
                    text
                        .trim()
                        .toLowerCase()
                        .startsWith(configFetchJs().prefix + "antidelete")
                ) {
                    logCommand("Antidelete");

                    var anti_del_value = text.split(" ")[1];
                    if (!anti_del_value) {
                        return await sock.reply(
                            jid,
                            `*⚠️Wrong command usage, try :${
                                configFetchJs().prefix
                            }antidelete on to toggle antidelete to on or ${
                                configFetchJs().prefix
                            }antidelete off to toggle antidelete to off*`,
                            msg,
                        );
                    }
                    if (
                        anti_del_value === "on" &&
                        configFetchJs().antidelete === true
                    ) {
                        return await sock.reply(
                            jid,
                            "*Antidelete feature has already been enabled*",
                        );
                    } else if (
                        anti_del_value === "off" &&
                        configFetchJs().antidelete === false
                    ) {
                        return await sock.reply(
                            jid,
                            "*Antidelete feature has already been disabled*",
                        );
                    }
                    anti_del();
                    var toggledTo =
                        configFetchJs().antidelete === true
                            ? "Enabled"
                            : "Disabled";
                    await sock.reply(
                        jid,
                        `*Antidelete has been ${toggledTo} successfully👊🏾. Type "${
                            configFetchJs().prefix
                        }help antidelete" to get information about antidelete*`,
                    );
                }

                //JavaScript obfuscation command;
                else if (
                    text
                        .trim()
                        .toLowerCase()
                        .startsWith(configFetchJs().prefix + "obfuscate")
                ) {
                    var jsCodeStructuring = text.split(" ");
                    var secondVar = jsCodeStructuring[1];
                    /*console.log(command,level,args);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    return;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    */
                    if (!secondVar) {
                        return sock.reply(
                            jid,
                            `*The level of obfuscation was not provided eg. low,high,medium*`,
                            msg,
                        );
                    }
                    //console.log(level);

                    /*   if(!obfuscationCode){
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        return await sock.reply(jid,`*Expected a Javascript code to obfuscate but received undefined, Usage : ${configFetchJs().prefix}obfuscate -low <reply_to_a_file_with_js_extention>*`,msg);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }*/

                    if (secondVar.trim().toLowerCase() === "-high") {
                        /* if(secondVar !== "-high"){}*/
                        //console.log(level);
                        logCommand("Obfuscate -high");

                        if (!msg?.message?.extendedTextMessage) {
                            return sock.reply(
                                jid,
                                `*No JavaScript file received, for obfuscation, please reply ${
                                    configFetchJs().prefix
                                }obfuscate ${secondVar} with a reply to a javascript having a ".js" extention*`,
                                msg,
                            );
                        }

                        var isExtendedMessage = getContentType(msg.message);
                        if (isExtendedMessage !== "extendedTextMessage") {
                            return sock.reply(
                                jid,
                                `*please reply to a JavaScript file or a file ending with a ".js" extention*`,
                                msg,
                            );
                        }

                        if (
                            getContentType(
                                msg?.message?.extendedTextMessage?.contextInfo
                                    ?.quotedMessage,
                            ) !== "documentMessage"
                        ) {
                            /* console.log(getContentType(msg?.message?.extendedTextMessage?.contextInfo?.quotedMessage) !== "documentMessage")*/

                            return sock.reply(
                                jid,
                                `*please make sure to  reply to a JavaScript file or a file ending with a ".js" extention only*`,
                                msg,
                            );
                        }

                        var isSuccess = await obf(
                            sock,
                            msg,
                            jid,
                            secondVar.replace("-", "").trim().toLowerCase(),
                        );
                        var tobuffer = Buffer.from(isSuccess.buffer);
                        if (isSuccess) {
                            await sock.sendMessage(
                                jid,
                                {
                                    document: tobuffer,
                                    mimetype: "application/javascript",
                                    fileName: isSuccess.name,
                                },
                                msg,
                            );
                        } else {
                            return await sock.reply(
                                jid,
                                "*Obfuscation completly failed the code might have been an invalid JavaScript code.*",
                            );
                        }
                    } else if (secondVar.trim().toLowerCase() === "-medium") {
                        logCommand("Obfuscate -medium");

                        if (!msg?.message?.extendedTextMessage) {
                            return sock.reply(
                                jid,
                                `*No JavaScript file received, for obfuscation, please reply ${
                                    configFetchJs().prefix
                                }obfuscate ${secondVar} with a reply to a javascript having a ".js" extention*`,
                                msg,
                            );
                        }

                        var isExtendedMessage2 = getContentType(msg.message);
                        if (isExtendedMessage2 !== "extendedTextMessage") {
                            return sock.reply(
                                jid,
                                `*please reply to a JavaScript file or a file ending with a ".js" extention*`,
                                msg,
                            );
                        }

                        if (
                            getContentType(
                                msg?.message?.extendedTextMessage?.contextInfo
                                    ?.quotedMessage,
                            ) !== "documentMessage"
                        ) {
                            /* console.log(getContentType(msg?.message?.extendedTextMessage?.contextInfo?.quotedMessage) !== "documentMessage")*/

                            return sock.reply(
                                jid,
                                `*please make sure to  reply to a JavaScript file or a file ending with a ".js" extention only*`,
                                msg,
                            );
                        }

                        var isSuccess2 = await obf(
                            sock,
                            msg,
                            jid,
                            secondVar.replace("-", "").trim().toLowerCase(),
                        );

                        var tobuffer2 = Buffer.from(isSuccess2.buffer);

                        if (isSuccess2) {
                            await sock.sendMessage(
                                jid,
                                {
                                    document: tobuffer2,
                                    mimetype: "application/javascript",
                                    fileName: isSuccess2.name,
                                },
                                msg,
                            );
                        } else {
                            return await sock.reply(
                                jid,
                                "*Obfuscation completly failed the code might have been an invalid JavaScript code.*",
                            );
                        }
                    } else if (secondVar.trim().toLowerCase() === "-low") {
                        logCommand("Obfiscate -low");

                        if (!msg?.message?.extendedTextMessage) {
                            return sock.reply(
                                jid,
                                `*No JavaScript file received, for obfuscation, please reply ${
                                    configFetchJs().prefix
                                }obfuscate ${secondVar} with a reply to a javascript having a ".js" extention*`,
                                msg,
                            );
                        }

                        var isExtendedMessage3 = getContentType(msg.message);
                        if (isExtendedMessage3 !== "extendedTextMessage") {
                            return sock.reply(
                                jid,
                                `*please reply to a JavaScript file or a file ending with a ".js" extention*`,
                                msg,
                            );
                        }

                        /* console.log(getContentType(msg?.message?.extendedTextMessage?.contextInfo?.quotedMessage))*/

                        if (
                            getContentType(
                                msg?.message?.extendedTextMessage?.contextInfo
                                    ?.quotedMessage,
                            ) !== "documentMessage"
                        ) {
                            /* console.log(getContentType(msg?.message?.extendedTextMessage?.contextInfo?.quotedMessage) !== "documentMessage")*/

                            return sock.reply(
                                jid,
                                `*please make sure to  reply to a JavaScript file or a file ending with a ".js" extention only*`,
                                msg,
                            );
                        }

                        var isSuccess3 = await obf(
                            sock,
                            msg,
                            jid,
                            secondVar.replace("-", "").trim().toLowerCase(),
                        );

                        var tobuffer3 = Buffer.from(isSuccess3.buffer);
                        if (isSuccess3) {
                            await sock.sendMessage(
                                jid,
                                {
                                    document: tobuffer3,
                                    mimetype: "application/javascript",
                                    fileName: isSuccess3.name,
                                },
                                msg,
                            );
                        } else {
                            return await sock.reply(
                                jid,
                                "*Obfuscation completly failed the code might have been an invalid JavaScript code.*",
                            );
                        }

                        //console.log(level);
                        /*var info =  await obf(sock,msg,jid,secondVar.replace("-","").trim().toLowerCase());
                                                                                   console.log(info)*/
                    } else {
                        return await sock.reply(
                            jid,
                            `\`\`\`⚠wrong command usage: try ${
                                configFetchJs().prefix
                            }obfuscate -low <reply_to_js_file> or  ${
                                configFetchJs().prefix
                            }obfuscate -medium <reply_to_js_file> or ${
                                configFetchJs().prefix
                            }obfuscate -high <reply_to_js_file>with increasing security.   "${
                                jsCodeStructuring[0]
                            } ${jsCodeStructuring[1]}" is wrong.. ⚠\`\`\``,
                            msg,
                        );
                    }
                    //console.log(msg?.message?.extendedTextMessage.contextInfo?.quotedMessage?.documentMessage);

                    // await obf(obfuscationCode,level.trim().toLowerCase().replace("-",""));
                } //obfuscation comannd ends here

                //update system manual
                else if (
                    text.trim().toLowerCase() ===
                    `${configFetchJs().prefix}update-now`
                ) {
                    logCommand("Update to latest version");
                    if (configFetchJs().production === false) {
                        return await sock.reply(
                            jid,
                            `\`\`\`please toggle production to true to be able to use this bot in production mode: Toggling to false means You are the developer of this bot, You are not the developer of this bot\`\`\``,
                            msg,
                        );
                    }

                    await update_now(sock, jid, msg);
                } else if (
                    text.trim().toLowerCase() ===
                    configFetchJs().prefix + "vv"
                ) {
                    logCommand("Extract ViewOnce");

                    await sock.sendMessage(jid, {
                        react: {
                            text: "🙄",
                            key: msg.key,
                        },
                    });

                    var isExtended =
                        msg.message?.extendedTextMessage?.contextInfo
                            ?.quotedMessage;

                    if (!isExtended) {
                        return sock.reply(
                            jid,
                            "*please reply to a viewonce media to see the magic*",
                            msg,
                        );
                    }

                    var isReallyViewOnce =
                        isExtended?.imageMessage?.viewOnce ||
                        isExtended?.videoMessage?.viewOnce ||
                        isExtended?.audioMessage?.viewOnce;

                    var viewType =
                        isExtended?.imageMessage ||
                        isExtended?.videoMessage ||
                        isExtended?.audioMessage;

                    var trueViewOnce = isReallyViewOnce === true ? "yes" : "no";

                    if (trueViewOnce === "no") {
                        return await sock.sendMessage(jid, {
                            text: "*Expected type media of viewonce but received undefined, please reply to a viewonce message...*",
                        });
                    }

                    var mediaType = viewType.mimetype;
                    var mainMedia = mediaType.split("/")[0];

                    if (isExtended) {
                        try {
                            var downloadBuffer = await downloadMediaMessage(
                                {
                                    message: isExtended,
                                },
                                "buffer",
                                { logger: sock.logger },
                            );
                            /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            var downloadedBuffer = await downloadBuffer;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */
                        } catch (e) {
                            await sock.sendMessage(jid, {
                                react: { text: "❌", key: msg.key },
                            });

                            return await sock.sendMessage(jid, {
                                text: "*Failed to extract viewonce media...*",
                            });
                        }
                    }
                    await sock.sendMessage(jid, {
                        react: { text: "⚡", key: msg.key },
                    });

                    var get_expiration =
                        msg.message?.extendedTextMessage?.contextInfo
                            ?.expiration;

                    if (mainMedia === "audio") {
                        return await sock.sendMessage(
                            myJid,
                            {
                                [mainMedia]: downloadBuffer,
                                mimetype: mediaType,
                                hd: true,
                                ptt: true,
                                ephemeralExpiration: get_expiration,
                            },
                            { quoted: msg },
                        );
                    }

                    await sock.sendMessage(
                        myJid,
                        {
                            [mainMedia]: downloadBuffer,
                            mimetype: mediaType,
                            hd: true,
                        },
                        { quoted: msg },
                    );
                } else if (
                    text
                        .trim()
                        .toLowerCase()
                        .startsWith(configFetchJs().prefix + "add")
                ) {
                    try {
                        logCommand("Add User");
                        var fullCommand = text.split(" ");
                        var [startCommand, ...args] = fullCommand;
                        if (args.length === 0) {
                            return await sock.reply(
                                jid,
                                `*Wrong command usage: try ${
                                    configFetchJs().prefix
                                }add <Phone_Numbers_without_the_+_sign>*`,
                                msg,
                            );
                        }

                        var mobileTest = /^\d{10,15}$/g;
                        for (const arg of args) {
                            if (arg.length < 10) {
                                return await sock.reply(
                                    jid,
                                    `*${arg} is supposed to be a valid whatsapp number, aborting...*`,
                                    msg,
                                );
                            } else if (!mobileTest.test(arg)) {
                                return await sock.reply(
                                    jid,
                                    `*${arg} is not a valid whatsapp number,aborting...*`,
                                    msg,
                                );
                            }
                        }

                        await add(sock, jid, args, msg);
                    } catch (e) {
                        console.log(e);
                    }
                }

                //autotyping command
                else if (
                    text
                        .trim()
                        .toLowerCase()
                        .startsWith(configFetchJs().prefix + "autotyping")
                ) {
                    var fullcommand = text.split(" ");
                    //console.log(text);

                    // var toggler = fullCommand[1];
                    if (!text.split(" ")[1]) {
                        return await sock.reply(
                            jid,
                            `*Expected a toggler.Type ${
                                configFetchJs().prefix
                            }help -autotyping for autotyping details and how to use*`,
                            msg,
                        );
                    }
                    if (text.split(" ")[1].toLowerCase() === "on") {
                        return await typeDelay(sock, jid, msg, true);
                    } else if (text.split(" ")[1].toLowerCase() === "off") {
                        return await typeDelay(sock, jid, msg, false);
                    } else {
                        await sock.reply(
                            jid,
                            `*Unexpected token. Type ${
                                configFetchJs().prefix
                            }help -autotyping for autotyping details and how to use*`,
                            msg,
                        );
                    }
                }

                //autorecording command
                else if (
                    text
                        .trim()
                        .toLowerCase()
                        .startsWith(configFetchJs().prefix + "autorecording")
                ) {
                    try {
                        var fullCommandAR = text.split(" ");
                        var [record, argsRecord] = fullCommandAR;
                        logCommand(
                            "Automatically set recording presence on message",
                        );

                        if (
                            record.toLowerCase() !==
                            `${configFetchJs().prefix}autorecording`
                        ) {
                            return await sock.reply(
                                jid,
                                log(
                                    `~Invalid command structure, did you mean ${
                                        configFetchJs().prefix
                                    }autorecording <mode (on/off)~`,
                                ),
                            );
                        }
                        /*console.log(argsRecord)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        return;*/
                        /* throw new Error("invalid error")
                         */
                        if (!argsRecord) {
                            return await sock.reply(
                                jid,
                                log(
                                    `~Toggle format returned undefined, please add the mode <on/off> when using ${record}~`,
                                ),
                                msg,
                            );
                        }
                        if (argsRecord.trim().toLowerCase() === "on") {
                            return await typeRecord(sock, jid, msg, true);
                        } else if (argsRecord.trim().toLowerCase() === "off") {
                            return await typeRecord(sock, jid, msg, false);
                        } else {
                            return await sock.reply(
                                jid,
                                log(
                                    `~Invalid toggle format, type ${
                                        configFetchJs().prefix
                                    }help -autorecording for autorecording command usage and try again~`,
                                ),
                                msg,
                            );
                        }
                    } catch {
                        await sock.reply(
                            jid,
                            log(
                                `❌sorry but autorecording system failed to initiate`,
                            ),
                            msg,
                        );
                    }
                } else if (
                    text.trim().toLowerCase() ===
                    configFetchJs().prefix + "setkeys"
                ) {
                    if (!msg.key.fromMe) {
                        return await sock.sendMessage(jid, {
                            text: `\`\`\`You do not have Admin right to access my encryption keys\`\`\``,
                        });
                    }
                    return await setKeys(sock, myJid, jid, msg);
                } else if (
                    text
                        .trim()
                        .toLowerCase()
                        .startsWith(configFetchJs().prefix + "encrypt")
                ) {
                    try {
                        var fullCommand = text?.split(" ");

                        var [first, toSwitch, ...args] = fullCommand;
                        if (!toSwitch) {
                            return await sock.reply(
                                jid,
                                `\`\`\`Wrong command usage, try: ${
                                    configFetchJs().prefix
                                }encrypt -hex <encryption_body> or ${
                                    configFetchJs().prefix
                                }encrypt -base64 or type ${
                                    configFetchJs().prefix
                                }help -encrypt for usage\`\`\``,
                            );
                        }

                        if (args.length < 1) {
                            return await sock.reply(
                                jid,
                                `\`\`\`Expected a value but recieved undefined, please reply ${
                                    configFetchJs().prefix
                                }help -encrypt for command usage\`\`\``,
                            );
                        }

                        /*               console.log(toSwitch);
                         */

                        var credentials = await getKeysDev(myJid);
                        var key = credentials.key;
                        var iv = credentials.iv; /*console.log(credentials);*/
                        //console.log(iv)

                        var cipher = crypto.createCipheriv(
                            "aes-256-cbc",
                            key,
                            iv,
                        );
                        /* console.log(cipher);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        return;*/

                        if (!key || !iv) {
                            return await sock.reply(
                                jid,
                                `*Encryption credentials where not found, please reply ${
                                    configFetchJs().prefix
                                }setkeys  to generate new credentials for encryption*`,
                                msg,
                            );
                        }

                        //switching routes
                        switch (toSwitch) {
                            case "-hex":
                                //hex encryption
                                logCommand("Hex encryption");
                                var encryption = cipher.update(
                                    args.join(" "),
                                    "utf8",
                                    "hex",
                                );
                                encryption += cipher.final("hex");
                                console.log(
                                    `[\x1b[34mEncrypting Data...\x1b[0m]`,
                                );
                                if (encryption) {
                                    console.log(
                                        `[\x1b[34m Encryption was successfull...\x1b[0m]`,
                                    );

                                    return await sock.sendMessage(
                                        jid,
                                        { text: encryption },
                                        { quoted: msg },
                                    );
                                } else {
                                    return await sock.reply(
                                        jid,
                                        "*Could not encrypt value to hex, are you sure it is a readable value*",
                                        msg,
                                    );
                                }
                                break;

                            //base64
                            case "-base64":
                                //base64 encryption
                                logCommand("base64 encryption");
                                var encryption2 = cipher.update(
                                    args.join(" "),
                                    "utf8",
                                    "base64",
                                );
                                encryption2 += cipher.final("base64");
                                console.log(
                                    `[\x1b[36mEncrypting Data...\x1b[0m]`,
                                );
                                if (encryption2) {
                                    console.log(
                                        `[\x1b[36m Encryption was successfull...\x1b[0m]`,
                                    );

                                    return await sock.sendMessage(
                                        jid,
                                        { text: encryption2 },
                                        { quoted: msg },
                                    );
                                } else {
                                    return await sock.reply(
                                        jid,
                                        "*Could not encrypt value to base64, are you sure it is a readable value*",
                                        msg,
                                    );
                                }

                                break;
                            default:
                                return await sock.reply(
                                    jid,
                                    `*Wrong command usage, try: ${
                                        configFetchJs().prefix
                                    }encrypt -hex <encryption_body> or ${
                                        configFetchJs().prefix
                                    }encrypt -base64 or type ${
                                        configFetchJs().prefix
                                    }help -encrypt for usage*`,
                                );
                                break;
                        }
                    } catch (e) {
                        console.log(`[\x1b[31mEncryption failed...\x1b[0m]`);
                        return await sock.reply(
                            jid,
                            "*Encryption failed due to an internal error, please try again or make sure to update the system*",
                            msg,
                        );
                    }
                } else if (
                    text.trim().toLowerCase() ===
                    configFetchJs().prefix + "getkeys"
                ) {
                    if (!msg?.key?.fromMe) {
                        return await sock.reply(
                            jid,
                            "*You do not have admin rights to access my sensitive keys*",
                        );
                    }
                    return await getKeys(sock, myJid, jid, jidAlt, msg);
                } else if (
                    text
                        .trim()
                        .toLowerCase()
                        .startsWith(configFetchJs().prefix + "decrypt")
                ) {
                    try {
                        var fullCommand = text?.split(" ");

                        var [first, toSwitch, ...args] = fullCommand;
                        if (!toSwitch) {
                            return await sock.reply(
                                jid,
                                `\`\`\`Wrong command usage, try: ${
                                    configFetchJs().prefix
                                }decrypt -hex <encryption_body> or ${
                                    configFetchJs().prefix
                                }decrypt -base64 or type ${
                                    configFetchJs().prefix
                                }help -decrypt for usage\`\`\``,
                            );
                        }

                        if (args.length < 1) {
                            return await sock.reply(
                                jid,
                                `\`\`\`Expected a value but recieved undefined, please reply ${
                                    configFetchJs().prefix
                                }help -decrypt for command usage\`\`\``,
                            );
                        }

                        var credentials = await getKeysDev(myJid);
                        var key = credentials.key;
                        var iv = credentials.iv; /*console.log(credentials);*/
                        //console.log(iv)

                        var decipher = crypto.createDecipheriv(
                            "aes-256-cbc",
                            key,
                            iv,
                        );
                        /* console.log(cipher);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                return;*/

                        if (!key || !iv) {
                            return await sock.reply(
                                jid,
                                `\`\`\` Decryption credentials where not found, please reply ${
                                    configFetchJs().prefix
                                }setkeys  to generate new credentials for encryption*\`\`\``,
                                msg,
                            );
                        }
                        switch (toSwitch) {
                            case "-hex":
                                logCommand("Decryption from hex to utf8");
                                var decrypted = decipher.update(
                                    args.join(" "),
                                    "hex",
                                    "utf8",
                                );
                                decrypted += decipher.final("utf8");

                                if (decrypted) {
                                    return await sock.sendMessage(
                                        jid,
                                        { text: decrypted },
                                        { quoted: msg },
                                    );
                                } else {
                                    return await sock.reply(
                                        jid,
                                        " ```*Could not decrypt to human readable, are you sure it is a hexadecimal*```",
                                        msg,
                                    );
                                }

                                break;
                            case "-base64":
                                logCommand("Decryption from base64 to utf8");
                                var decrypted2 = decipher.update(
                                    args.join(" "),
                                    "base64",
                                    "utf8",
                                );
                                decrypted2 += decipher.final("utf8");

                                if (decrypted2) {
                                    return await sock.sendMessage(
                                        jid,
                                        { text: decrypted2 },
                                        { quoted: msg },
                                    );
                                } else {
                                    return await sock.reply(
                                        jid,
                                        `*\`\`\`Could not decrypt to human readable, are you sure it is a base64\`\`\`*`,
                                        msg,
                                    );
                                }

                                break;
                            default:
                                return await sock.reply(
                                    jid,
                                    `*\`\`\`Wrong command usage, try: ${
                                        configFetchJs().prefix
                                    }decrypt -hex <encrypted_body> or ${
                                        configFetchJs().prefix
                                    }decrypt -base64 or type ${
                                        configFetchJs().prefix
                                    }help -decrypt for usage*\`\`\`*`,
                                );
                        }
                    } catch (e) {
                        return await sock.reply(
                            jid,
                            `*\`\`\`Failed to decrypt, please make sure the same credentials used to encrypt these values are the same credentials for decrypting and also make sure to choose between hex and base64 reapectfully\`\`\`*`,
                            msg,
                        );
                    }
                } else if (
                    text
                        .trim()
                        .toLowerCase()
                        .startsWith(configFetchJs().prefix + "help")
                ) {
                    var fullCommand = text.split(" ");
                    var [first, main] = fullCommand;
                    if (first !== configFetchJs().prefix + "help") {
                        return await sock.reply(
                            jid,
                            `*\`\`\`Invalid command, did you mean ${
                                configFetchJs().prefix
                            }help -<command_you_need_help_with>\`\`\`*`,
                        );
                    }
                    if (!main) {
                        return await sock.sendMessage(
                            jid,
                            {
                                text: `*\`\`\`please include the type of command you need help with example ${
                                    configFetchJs().prefix
                                }help -ping, make sure to include a space and the "-" symbol in every help call\`\`\`*`,
                            },
                            { quoted: msg },
                        );
                    }
                    if (!main.startsWith("-")) {
                        return await sock.reply(
                            jid,
                            `*\`\`\`Invalid command help structure, expected a "-" but received undefined. Did you mean, ${
                                configFetchJs().prefix
                            }help -${main}\`\`\`*`,
                            msg,
                        );
                    }

                    return await sock.sendMessage(
                        jid,
                        { text: help(main) },
                        { quoted: msg },
                    );
                } else if (
                    text
                        .trim()
                        .toLowerCase()
                        .startsWith(`${configFetchJs().prefix}sha256`)
                ) {
                    logCommand("SHA256");
                    var fullCommandSha256 = text.split(" ");
                    var [first, ...args] = fullCommandSha256;
                    try {
                        if (
                            first.toLowerCase() !=
                            configFetchJs().prefix + "sha256"
                        ) {
                            return sock.reply(
                                jid,
                                log(
                                    `invalid command usage, did you mean ${
                                        configFetchJs().prefix
                                    }sha256`,
                                ),
                                msg,
                            );
                        }
                        if (!args || args.length < 1) {
                            return sock.reply(
                                jid,
                                log(
                                    `Expected an argument body but received undefined near ${
                                        configFetchJs().prefix
                                    }sha256 [], please provide a value to work on...`,
                                    msg,
                                ),
                            );
                        }
                        /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                throw new Error("now Eror");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
                        var fullValue = args.join(" ");
                        var SHA256HASH = crypto
                            .createHash("sha256")
                            .update(fullValue)
                            .digest("hex");
                        console.log(
                            `${lime}Hash created successfully${reset}${blueB} =>> SHA256${reset}`,
                        );
                        console.log(fullValue);
                        return await sock.reply(
                            jid,
                            `*\`\`\`${SHA256HASH}\`\`\`*`,
                            msg,
                        );
                    } catch (e) {
                        return Err(sock, jid, msg, first);
                    }
                } else if (
                    text
                        .trim()
                        .toLowerCase()
                        .startsWith(`${configFetchJs().prefix}sha512`)
                ) {
                    var fullCommandSha512 = text.split(" ");

                    var [first, ...args] = fullCommandSha512;

                    try {
                        logCommand("SHA512");
                        if (
                            first.toLowerCase() !=
                            configFetchJs().prefix + "sha512"
                        ) {
                            return sock.reply(
                                jid,
                                log(
                                    `invalid command usage, did you mean ${
                                        configFetchJs().prefix
                                    }sha512`,
                                ),
                                msg,
                            );
                        }
                        if (!args || args.length < 1) {
                            return sock.reply(
                                jid,
                                log(
                                    `Expected an argument body but received undefined near ${
                                        configFetchJs().prefix
                                    }sha512 [], please provide a value to work on...`,
                                    msg,
                                ),
                            );
                        }

                        var fullValue2 = args.join(" ");
                        var SHA512HASH = crypto
                            .createHash("sha512")
                            .update(fullValue2)
                            .digest("hex");
                        console.log(
                            `${lime}Hash created successfully${reset}${blueB} =>> SHA512${reset}`,
                        );
                        /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                console.log(fullValue)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
                        return await sock.reply(
                            jid,
                            `*\`\`\`${SHA512HASH}\`\`\`*`,
                            msg,
                        );
                    } catch (e) {
                        return Err(sock, jid, msg, first);
                    }
                } else if (
                    text
                        ?.trim()
                        ?.toLowerCase()
                        ?.startsWith(configFetchJs().prefix + "autoviewstatus")
                ) {
                    if (!msg?.key?.fromMe) {
                        return await sock.reply(
                            jid,
                            log(
                                `~You do not have admin rights to interfere with this command~`,
                            ),
                            msg,
                        );
                    }
                    var fullCommandATV = text.split(" ");

                    var [first, second] = fullCommandATV;

                    if (
                        first.toLowerCase() !==
                        configFetchJs().prefix + "autoviewstatus"
                    ) {
                        return sock.reply(
                            jid,
                            log(
                                `Invalid command, did you mean ${
                                    configFetchJs().prefix
                                }autoviewstatus <on_or_off>`,
                            ),
                            msg,
                        );
                    }

                    if (!second) {
                        return await sock.reply(
                            jid,
                            log(
                                `The command is invalid, try : ${
                                    configFetchJs().prefix
                                }autoviewstatus <and_the_mode(on or off)>`,
                            ),
                        );
                    }
                    /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            console.log(second.trim().toLowerCase() !== "on")
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */
                    if (
                        second.trim().toLowerCase() === "on" ||
                        second.trim().toLowerCase() === "off"
                    ) {
                        toggleStatusView(sock, jid, msg, second);
                    } else {
                        return await sock.reply(
                            jid,
                            log(
                                `The toggler for autoviewstatus can only be [on / off]`,
                            ),
                            msg,
                        );
                    }
                } else if (
                    text?.trim()?.toLowerCase()?.split(" ")[0] ===
                    configFetchJs().prefix + "gpt5"
                ) {
                    logCommand("ChatGPT version 5");
                    var fullCommandCypherAi = text?.split(" ");
                    var [first, ...args] = fullCommandCypherAi;
                    /*if(first.trim().toLowerCase() !== configFetchJs().prefix+"gpt5"){
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                return sock.reply(jid,log(`Invalid command structure, did you mean ${configFetchJs().prefix}gpt5 <prompt>`),msg);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            };*/

                    if (!args || args.length < 1) {
                        return await sock.reply(
                            jid,
                            log(
                                `Could not find a question, please reply with a question`,
                            ),
                            msg,
                        );
                    }

                    var gpt5Fetch = await fetch(
                        `https://apis.davidcyriltech.my.id/ai/gpt-5?prompt=${encodeURIComponent(
                            args.join(" "),
                        )}`,
                    );
                    var gpt5Response = await gpt5Fetch.json();
                    return await sock.reply(jid, log(gpt5Response?.data));
                } else if (
                    text?.trim()?.toLowerCase()?.split(" ")[0] ===
                    configFetchJs().prefix + "gpt5.5"
                ) {
                    logCommand("ChatGPT version 5.5");
                    return await returnAi(
                        text,
                        "https://apis.davidcyriltech.my.id/ai/gpt-5.5",
                        "gpt5.5",
                        "prompt",
                        "data",
                        sock,
                        jid,
                        msg,
                    );
                } else if (
                    text?.trim()?.toLowerCase()?.split(" ")[0] ===
                    configFetchJs().prefix + "gpt5-nano"
                ) {
                    logCommand("ChatGPT version 5-nano");
                    return await returnAi(
                        text,
                        "https://apis.davidcyriltech.my.id/gpt-5-nano",
                        "gpt5-nano",
                        "prompt",
                        "data",
                        sock,
                        jid,
                        msg,
                    );
                } else if (
                    text?.trim()?.toLowerCase()?.split(" ")[0] ===
                    configFetchJs().prefix + "cypherai"
                ) {
                    logCommand("CypherAi modified");
                    if (!msg?.key?.fromMe) {
                        return await sock.reply(
                            jid,
                            log(
                                `~${msg?.pushName}, You are not allowed to commit any changes to my setup, please contact the Admin~`,
                            ),
                            msg,
                        );
                    }
                    var fullCommandCypherAi = text.split(" ");
                    var [first, args] = fullCommandCypherAi;
                    if (!args || args.length < 1) {
                        return await sock.reply(
                            jid,
                            log(
                                `Invalid command structures please include a toggler. eg. ${
                                    configFetchJs().prefix
                                }cypherAi <on/off>`,
                            ),
                            msg,
                        );
                    }
                    var finalToggler =
                        args.trim().toLowerCase() === "on"
                            ? true
                            : args.trim().toLowerCase() === "off"
                            ? false
                            : null;
                    //console.log(finalToggler);

                    return await toggleCypherAi(sock, jid, msg, finalToggler);
                } else if (
                    text?.trim()?.toLowerCase()?.split(" ")[0] ===
                    configFetchJs().prefix + "grok4.1"
                ) {
                    logCommand("GROK version 4.1");

                    return await returnAi(
                        text,
                        "https://apis.davidcyriltech.my.id/ai/grok-4.1-fast",
                        "grok4.1",
                        "prompt",
                        "data",
                        sock,
                        jid,
                        msg,
                    );
                } else if (
                    text?.trim()?.toLowerCase()?.split(" ")[0] ===
                    configFetchJs().prefix + "claudeopus-4.5"
                ) {
                    logCommand("Claude Opus-4.5");

                    return await returnAi(
                        text,
                        "https://apis.davidcyriltech.my.id/ai/claude-opus-4.5",
                        "claudeopus-4.6",
                        "prompt",
                        "data",
                        sock,
                        jid,
                        msg,
                    );
                } else if (
                    text?.trim()?.toLowerCase()?.split(" ")[0] ===
                    configFetchJs().prefix + "deepseek"
                ) {
                    logCommand("Deepseek version-4");

                    return await returnAi(
                        text,
                        "https://apis.davidcyriltech.my.id/ai/deepseek-v4-flash",
                        "deepseek",
                        "prompt",
                        "data",
                        sock,
                        jid,
                        msg,
                    );
                } else if (
                    text?.trim()?.toLowerCase()?.split(" ")[0] ===
                    configFetchJs().prefix + "qwen3"
                ) {
                    logCommand("qwen3");

                    return await returnAi(
                        text,
                        "https://apis.davidcyriltech.my.id/ai/qwen3-max",
                        "qwen3",
                        "prompt",
                        "data",
                        sock,
                        jid,
                        msg,
                    );
                } else if (
                    text.trim().toLowerCase().split(" ")[0] ===
                    configFetchJs().prefix + "news"
                ) {
                    return await handleNews(sock, jid, msg);
                }

                //continue plugins

                //ends of all plugins
                else {
                    return await sock.sendMessage(jid, {
                        text: "*🙉Oops, your are lost in Digital space, command not found or is being built...*",
                    });
                }
            }
        });
        //message upsert ends here...

        //message update starts here...
        sock.ev.on("messages.update", async (messages) => {
            //console.dir(messages,{ depth:null});

            for (const msg of messages) {
                //console.log(msg)
                await sock.sendPresenceUpdate("unavailable", myJid);
                if (msg?.message?.protocolMessage?.type === 17) return;

                if (!msg) return;
                var id = msg?.key?.id;

                // console.log(msg)
                //Antidelete feature execution.

                await getMessageDeleted(msg, id, myJid, sock);
                //antidelete ends here
            }
        });

        //message update ends here

        //groups update starts

        sock.ev.on("groups.update", ([event]) => {
            console.log(event);
        });

        //group update ends here
    } catch (err) {
        //await handleError(err,configFetchJs(),"cyphermultidevice@gmail.com","syoemrruzjcbqcuc");
    }
    // throw new Error("eee")
};

//main bot login begins
startCyphers();

process.on("uncaughtException", async (exception) => {
    console.error(exception);
    //await handleError(exception,configFetchJs(),"cyphermultidevice@gmail.com","syoemrruzjcbqcuc");
    //console.error(`\x1b[7;1;31m Uncaught Exception => ${ exception.stack }`)
});

process.on("unhandledRejection", async (uRejection) => {
    console.error(uRejection);
    
});









//copyright ©️2026 Cyber Cyphers. Best so far
