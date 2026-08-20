import fs from 'node:fs';
import path,{ dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));





export async function configFetchJs(folder="../configurations",file="config.js"){
   return await import(`${path.join(__dirname,folder,file)}?update=${Date.now()}`)
};




const configFetchJson = async(data)=>{
    
    var obj = await configFetchJs().default;
     const finalObj = obj[data]

    return finalObj;
}


export default configFetchJson;
