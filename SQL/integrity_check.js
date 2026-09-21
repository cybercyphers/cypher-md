import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url"
var __dirname = dirname(fileURLToPath(import.meta.url));
import { unlinkSync,copyFileSync, mkdir } from "node:fs";

async function integrity(db,image_db,cypherAiDb,e_db){
   var databases = [db,image_db,cypherAiDb,e_db];
    let counter=0;
    for(const store of databases){
        try{
  var integrity_ok  = store.pragma("integrity_check",{ simple:true })
  
    if(integrity_ok === 'ok'){
counter++
  console.log(`\x1b[1;34mDatabase ${counter} returned status ok: operational.\x1b[0m`); 
}
    
        else{
counter++
   console.log(`\x1b[1;31mDatabase ${counter} has been corrupted, self-healing process...\x1b[0m`);
}
    }catch(e){
    console.log(`\x1b[1;31mReadonly database ${counter+1} has been corrupted.The database is not meant to be edited, it is a read-only system. restarting process\x1b[0m`);
        unlinkSync(path.join(__dirname,`../Databases/${store}`),{force:true, recursive :true });
        process.exit(1);
  }   
 }
};




export default integrity;
