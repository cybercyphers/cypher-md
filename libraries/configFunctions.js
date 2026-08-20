import fs from 'node:fs';
import path,{ dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));



export function fsFetchJson(dir, file) {
    const filePath = path.join(__dirname, dir, file);
    if (!fs.existsSync(filePath)) return null;

    try {
        const readJson = JSON.parse(fs.readFileSync(filePath, "utf8"));
        return readJson;
    } catch (e) {
        console.trace(e);
    }
}


export function configFetchJs(folder="../configurations",file="config.js"){
   return  import(`${path.join(__dirname,folder,file)}?update=${Date.now()}`)
};




const configFetchJson = async(data)=>{
    
    var obj = await configFetchJs().default;
     const finalObj = obj[data]

    return finalObj;
}


export configFetchJson;
