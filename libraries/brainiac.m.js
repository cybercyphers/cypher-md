import reverse from "js-confuser";
async function seek(bufferData,level){
    
   var noLuck = await reverse.obfuscate(bufferData,{ 
     target:"node",
       preset: level,
       stringEncoding : true,
       pack: false,
       calculator:true,
       renameVariables:true,
       stringConcealing:true,
       opaquePredicates:true
     /*  lock: { integrity: true,                           tamperProtection: true }
     */
});

return noLuck.code;
};




export { seek }
