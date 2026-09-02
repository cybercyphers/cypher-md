import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url"
var __dirname = dirname(fileURLToPath(import.meta.url));
import { copyFileSync, mkdir } from "node:fs";

async function integrity(db,image_db){
   var databases = [db,image_db];
    let counter=0;
    for(const store of databases){
  var integrity_ok  = store.pragma("integrity_check",{ simple:true })
  
    if(integrity_ok === 'ok'){
++counter
  console.log(`[\x1b[1;34mDatabase ${counter} returned status ok: operational...\x1b[0m]`); 
}
    
        else{
++counter
   console.log(`[\x1b[1;31mDatabase ${counter} has been corrupted, self-healing process...\x1b[0m]`);
}
    };
    
};





export default integrity;
