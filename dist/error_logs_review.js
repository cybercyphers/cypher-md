//error handlers in typesScipt for edficiency and no need for handling error on error handlers, that will be insane;
//time to brainstorm...
import { createTransport } from "nodemailer";
//import type SMTPTransporr from "../node_modules/@types/nodemailer/lib/smtp-transport/index.d.ts";
import os from "node:os";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync, appendFileSync, mkdirSync, writeFileSync } from "node:fs";
var __dirname = dirname(fileURLToPath(import.meta.url));
async function sleep(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}
;
async function handleError(err, configFetchJs, email = "cyphermultidevice@gmail.com", inner) {
    try {
        var errorPath = path.join(__dirname, "../Bugs");
        /*
    var errorInfo:object|string|undefined = err.stack || err.message || String(err);
    
   
    
    
    if(allowReviews){
      var requestSend = await fetch("panel-cyphers.nett.to/session/code1", { method:"POST", headers:{
          "Content-Type":"application/json",
          "Accept":"application/json"
      },
              body: JSON.stringify({ "error": errorInfo})                                                            });
        
        var responseFromServer = await requestSend.json();
        console.log(`[\x1b[1;34m${responseFromServer.response}\x1b[0m ]`)
        return true;
        
       // console.log("[\x1b[34mThank your for supporting by providing us with information that will help, A new Update will be coming...\x1b[0m]");

}
    return true;
    }catch(e){
     
        if(errorInfo){   */
        var allowReviews = configFetchJs.allowBugsReview;
        console.log("[\x1b[1;31m A big Bug has been spotted in my source code.\x1b[0m]");
        if (allowReviews) {
            console.log("[ \x1b[1;34m Allow BugReviews has been Enabled, sending to administration for review\x1b[0m ]");
            var newError = typeof err === 'object' ? JSON.stringify(err.stack || err.message) : String(err.stack || err.message);
            if (!existsSync(errorPath)) {
                mkdirSync(errorPath, { recursive: true });
            }
            ;
            var error_date = String(new Date().toLocaleString());
            var formatDatePath = error_date.split(" ").join("").replaceAll(",", "-").replaceAll(":", "-").replaceAll("/", "-") + ".txt";
            var newErrorPath = errorPath + `/${formatDatePath}`;
            writeFileSync(newErrorPath, `DATE: ${error_date}\n\n${newError}\n\n\n
 Note this file will be transport after 1 week if the bot is still like for improvement;
To disable this feature, toggle "allowBugsReview" to false
`);
            var transportation = await createTransport({
                service: "gmail",
                secure: false,
                pool: true,
                auth: {
                    user: email,
                    pass: inner
                },
            });
            var allLegalInfo = `

<div style="font-family:--apple-system, sans-serif;
  font-weight: bold;
   background-color: burlywood;
  padding:8px;
  border-radius: 22px;
  text-align: center;
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border:solid 3px red;
  ">
<h1 style="color:red">🦠Cypher-md Bug information</h1>
<h4>📝cypher-md-user: <strong>${String(configFetchJs.owner) || "N/A"}</strong></h4>
<h4>📇Error_name : ${String(err.name) || "no Error Name"}</h4>
<h4>📄Error_code : ${String(err.code) || String(err.errno) || "unknown code"}</h4>
<h4>🫥Error_cause : ${String(err.cause) || JSON.stringify(err.cause) || "no cause"}</h4>
<h4>ℹ️Error_message : ${String(err.stack) || String(err.stack) || JSON.stringify(err.stack) || JSON.stringify(err.message) || JSON.stringify(err.trace) || "no message"}</h4>
<h4>⏱️Error_Timestamp : ${String(new Date().toLocaleString())} </h4>

  <div style="width:100%; border-top:solid 2px green;">
     <ul>
      <h2 style ="color:red;">📝User_Legal_Info_Debug</h2>  
       <li style="color:orange;">platform: ${os.platform()}</li>
       <li style="color:orange;">   Architecture: ${os.arch()}</li>
       <li style="color:gold;" >Machine: ${os.machine()}</li>
       <li  style="color:orange;"  >Version : ${os.version()}</li>
       <li    style="color:orange;">Total_memory : ${os.totalmem()}</li>
       <li  style="color:gold;"   >Memory_left : ${os.freemem()}</li>
       <li style="color:orange;"   >Type : ${os.type()}</li>
<li style="color:orange;">Uptime : ${os.uptime()}</li>
       </ul> 
  </div>
  <p>copyright &copy;2026 cyber_cyphers</p>
</div>
       `;
            //html ends
            var sendEmail = await transportation.sendMail({
                from: '"cypher-md" <cyphermultidevice@gmail.com>', to: "cybercyphers2008@gmail.com",
                subject: "Cypher-Md Debug information for improvement",
                text: "Cypher_Md_Debug_User_info ",
                html: allLegalInfo
            });
            await sleep(800);
            console.log("\x1b[1;36mDebug information has been sent for review, thank you for participating?, i really appreciate 👊...");
        }
    }
    catch (e) {
        console.log("Typescript Compilation Error:", e);
    }
    ;
}
export { handleError, sleep };
//# sourceMappingURL=error_logs_review.js.map
