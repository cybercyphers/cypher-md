import { proto } from "@whiskeysockets/baileys";
import { configFetchJs } from "../libraries/configFunctions.js";
export default async function Err(sock, jid, msg, command) {
    try {
        var c_convert = command.replace(configFetchJs().prefix, "");
        var errorInfoReturn = `*🙄Oops, A Bug was caught in my code while processing ${c_convert}, I will send the error to administration for review anytime now.*`;
        return await sock.reply(jid, errorInfoReturn, msg);
    }
    catch {
        console.log("Error system failed to send....");
        return "failed";
    }
}
//# sourceMappingURL=plugin_error_return.js.map
