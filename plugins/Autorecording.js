import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { configFetchJs } from "../libraries/configFunctions.js";
var __dirname = dirname(fileURLToPath(import.meta.url));
import { log } from "../libraries/helper_function.js";

var typeRecord = async (sock, jid, msg, toggler) => {
    try {
        var configPath = path.join(__dirname, "../configurations", "config.js");

        if (toggler === "") {
            return await sock.reply(
                jid,
                log(
                    `Invalid command syntax, type ${
                        configFetchJs().prefix
                    }help -autorecording for more usage`,
                ),
                msg,
            );
        }
        if (configFetchJs().autorecording === true && toggler === true) {
            return await sock.reply(
                jid,
                log("~AutoRecording has already already been Enabled~"),
                msg,
            );
        } else if (
            configFetchJs().autorecording === false &&
            toggler === false
        ) {
            return await sock.reply(
                jid,
                "~Autorecording has already been disabled~",
                msg,
            );
        } else if (
            configFetchJs().autorecording === true &&
            toggler === false
        ) {
            var newConfigImport = await import(
                `${configPath}?update=${Date.now()}`
            );
            var newConfig = newConfigImport.default;
            newConfig.autorecording = toggler;
            var newConfigPaste = JSON.stringify(newConfig, null, 2);
            var pastableObj = newConfigPaste.replace(/"([^"]+)":/g, "$1:");
            fs.writeFileSync(configPath, `export default ${pastableObj}`);

            return await sock.reply(
                jid,
                `*Autorecording has been Disabled...*`,
                msg,
            );
        } else if (
            configFetchJs().autorecording === false &&
            toggler === true
        ) {
            var newConfigImport2 = await import(
                `${configPath}?update=${Date.now()}`
            );
            var newConfig2 = newConfigImport2?.default;
            /* console.log(newConfigImport)
            return;*/
            newConfig2.autorecording = toggler;
            var newConfigPaste2 = JSON.stringify(newConfig2, null, 2);
            var pastableObj2 = newConfigPaste2.replace(/"([^"]+)":/g, "$1:");
            fs.writeFileSync(configPath, `export default ${pastableObj2}`);

            return await sock.reply(
                jid,
                `*Autorecording has been Enabled...*`,
                msg,
            );
        }
    } catch (e) {
        await sock.reply(
            jid,
            log("❌Autorecording system failed to initiate..."),
            msg,
        );
        console.log(e);
    }
};

export default typeRecord;
