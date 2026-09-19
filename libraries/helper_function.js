import { configFetchJs } from "./configFunctions.js";

export function log(m){
 return `*\`\`\`${m}\`\`\`*`;
}

export default function helpWhat(type){
  if(!type){
    throw new Error("The type of plugin to give help documentation to was not declared");
  };
    if(type=== "-"){
   return log("Expected a command name but received undefined, please make sure to include the command name after the - symbol");
}
    
    var finalType = type.replace("-","").trim().toLowerCase();
    
  switch(finalType){
    case "ping":
    var ping = `*\`\`\`*The ping command enable you to detect the speed of your bot in milli-seconds the bot might be slow depending on various factors  such as network, vps ping time and many more. To try the command type ${configFetchJs().prefix}ping and you will get a response\`\`\`*`;
    return ping;
    break;
   
      case "menu":
          return `*\`\`\`The menu enables you to see all available commands you can call and also show some meta information about your bot and hosting platform suck as type of operating system and memory and also the version of operating system running\`\`\`*`;
          break;
      case "version":
          return log("The version command fetching the version currently running, and compares with fhe lastest version on the web to bring a response of the version "); 
          break;
          
      case "update":
          return log(`The update command enable users to check for updates available. This feature will enable you to check if your bot us up to date or not. This feature also includes, beta update check. By default you wont get developer beta update, but if you want to override this function, you can change 'allowBetaUpdates' in the configuration file and you will be able to get developer beta updates before anyone try ${configFetchJs().prefix}update to run the command `);
          
      case "developer" :
          return log("This command contains information about my developer and also provides his contact details");
        break;  
      case "setkeys" :
          return log(`The setkeys command is used to set users credentials for the encryption and decryption command, if these keys are not set, encryption and decryption of data connot be done. To run this command, you enter your prefix the bot is listening on + setkeys. ie. ${configFetchJs().prefix}setkeys and all will be done in the background`);
  break;
      
      case "getkeys" :
          return log(`After the setkeys command is called, and the encryption keys are generated, it is a good practice to store these keys in a very safe place to avoid  loosing the path or keys for encryption. For this, the getkeys command will fetch the encryption keys and safely amd store them in a markdown file to be sent to your private chat for security reasons, to run this command, we call the getkeys command statung with the prefix the bot is listeneing on eg . ${configFetchJs().prefix}getkeys`);
          break;
          
      case "encrypt" :
          return log(`Before accessing this command, please make sure to run ${configFetchJs().prefix}getkeys to generate the keys, The encryption command is in two types namely hex and base64, so you can encrypt to hex(hexadecimal) or base64 to use this command, you first call your prefix + encrypt + space + the '-' symbol to indicate its a subcommand and not a normal string  + the type of encryption algorithm then space + the value to be encrypted . example ${configFetchJs().prefix}encrypt -<options(hex or base64)> <value_to_encrypt>`);
          break;
          
      case "decrypt" :
          return log(`please make sure to call ${configFetchJs().prefix}setkeys to generate necessary keys. The decrypt function returns readable data using the same keys for encryption. To use the command call your prefix + decrypt + space + the '-' symbol to indicate its a subcommand and not a normal string  + the type of encryption encoding used(hex ot base64) then space + the value to be decrypted . example ${configFetchJs().prefix}decrypt -<options(hex or base64)> <hex_or_base64_to_decrypt>.If the keys are not the same ones used to encrypt the data , the decryption will fail and end up in mixed or gibberish characters even if one character is changes or misplaced, the whole show will fall. For this reason, your keys are stored safely out of sight and cannot be edited manually only by the system if a breach has occured and only with your permission.`)
      break;   
    
      case "sha256" :
          return log(`The SHA256 function is to convert data into a 64 character hexadecimals, you can use it by calling your prefix and "SHA256" together, a space then your text to be converted. eg. ${configFetchJs().prefix}SHA256 <text_to_be_converted>`);
          break;
        
      case "sha512" :
         return log(`The SHA512 function is to convert data into a 128 character hexadecimals, you can use it by calling your prefix and "SHA512" together, a space then your text to be converted. eg. ${configFetchJs().prefix}SHA512 <text_to_be_converted>. There are difference the SHA256 and SHA512, SHA256 generates a 64 bit hexadecimal and SHA512 generates a 128 bit hexadecimal and can be proofed by dividing 512 by 4 or 256 by 4. Each hexadecimal character stores 4 bit on computer binary system. `);
     break;     
          
          
      default: 
          return "*🙉 sorry but i could not find any helper function with such name, the command's helper function might not be available or is now being documented*"
  }
};
//console.log(helpWhat("-ping"))
