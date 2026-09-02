async function clearOld(db){
    setInterval(async()=>{
        console.log("[\x1b[1;34mChecking for trashes in database...\x1b[0m]");
        
     var Deleted = await db.prepare("DELETE FROM Store WHERE received_at < Datetime('now','-1 day')").run();
        
        if(Deleted.changes > 0){
      console.log("[\x1b[1;36mDatabase trash Clean_up was successful...\x1b[0m]");
};
        
  },1000 * 60 * 60 * 25);
  
};








export default clearOld;
