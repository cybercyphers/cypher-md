async function clearOld(db,image_db,cypherAiDb){
    
    var databases = [db,image_db,cypherAiDb];
    
    setInterval(async()=>{
        console.log("[\x1b[1;36m🗑️Searching for trashes in database...\x1b[0m]");
  
   for(const store of databases){
       store.pragma("wal_checkpoint(TRUNCATE)");
       store.prepare("VACUUM").run();
       
    store.prepare("DELETE FROM Store WHERE received_at < Datetime('now','-1 day')").run();
       
       if(store.changes > 0 ){
      console.log("[\x1b[1;36m🚮Database trash Clean_up was successful...\x1b[0m]");
}else{
    console.log("[\x1b[1;36m The Databases are clean, aborting...\x1b[0m]");  
} 

 }
              
  },1000 * 60 * 60 * 24);
  
};



