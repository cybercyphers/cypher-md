import { seek } from "../libraries/brainiac.m.js"
import { parentPort, workerData } from "worker_threads";

//console.log(seek)
var { bufferData,level } = workerData;
//console.log(bufferData,level)
 //main obfuscation logic begins 
    try{
    //obfuscation logic ends;
        //console.log("obfuscating...")
    var obfuscated = await seek(bufferData,level);
        
parentPort.postMessage({ success:true, obfuscated: obfuscated })
    }catch(err){
        //console.error(err);
        
    parentPort.postMessage({ success:false, obfuscated:"failed"})
}
