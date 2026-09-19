import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { configFetchJs } from "../libraries/configFunctions.js";
var __dirname = dirname(fileURLToPath(import.meta.url));

var typeDelay = async (sock, jid, msg, toggler) => {
    try {
        var configPath = path.join(__dirname, "../configurations", "config.js");

        if (toggler === "") {
            return await sock.reply(
                jid,
                "*Invalid command syntax, type help for more information*",
                msg,
            );
        }
        if (configFetchJs().autotyping === true && toggler === true) {
            return await sock.reply(
                jid,
                "~Autotyping has already already been Enabled~",
                msg,
            );
        } else if (configFetchJs().autotyping === false && toggler === false) {
            return await sock.reply(
                jid,
                "~Autotyping has already been disabled~",
                msg,
            );
        } else if (configFetchJs().autotyping === true && toggler === false) {
            var newConfigImport = await import(
                `${configPath}?update=${Date.now()}`
            );
            var newConfig = newConfigImport.default;
            newConfig.autotyping = toggler;
            var newConfigPaste = JSON.stringify(newConfig, null, 2);
            var pastableObj = newConfigPaste.replace(/"([^"]+)":/g, "$1:");
            fs.writeFileSync(configPath, `export default ${pastableObj}`);

            return await sock.reply(
                jid,
                `*Autotyping has been Disabled...*`,
                msg,
            );
        } else if (configFetchJs().autotyping === false && toggler === true) {
            var newConfigImport2 = await import(
                `${configPath}?update=${Date.now()}`
            );
            var newConfig2 = newConfigImport.default;
            newConfig.autotyping = toggler;
            var newConfigPaste2 = JSON.stringify(newConfig2, null, 2);
            var pastableObj2 = newConfigPaste2.replace(/"([^"]+)":/g, "$1:");
            fs.writeFileSync(configPath2, `export default ${pastableObj2}`);

            return await sock.reply(
                jid,
                `*Autotyping has been Enabled...*`,
                msg,
            );
        }
    } catch (e) {
        await sock.reply(jid, "*Autotyping system failed to initiate...*", msg);
    }
};

export default typeDelay;
