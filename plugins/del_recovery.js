import { fileURLToPath } from "node:url";
import path,{ dirname } from "node:path";
import fs from "node:fs";
import { configFetchJs } from "../libraries/configFunctions.js";

var __dirname = dirname(fileURLToPath(import.meta.url))


const anti_del = async()=>{
     
    
    var pastConf = await import(path.join(__dirname,"../configurations","config.js"))
    
    if(pastConf.default.antidelete){
        pastConf.default.antidelete = false;
}else{ 
        pastConf.default.antidelete = true;
};
    var duringStringing = JSON.stringify(pastConf.default,null,2.2)
    var stringedIt =  duringStringing.replace(/"([^"]+)":/g, '$1:'); 
    
    /*console.log(stringedIt)
    return;*/
   fs.writeFileSync(path.join(__dirname,"../configurations/config.js"),`export default${stringedIt}`);
    return true;
}


export default anti_del;
