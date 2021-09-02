import fetch from "node-fetch"
import fs from "fs"
import dotenv from "dotenv"

dotenv.config();

let rawdata = fs.readFileSync('moduleList.json');
let modules = JSON.parse(rawdata);

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

async function getModuleInfos() {
    let modulesInfos = []
    for (var module of modules) {
        console.log(`https://intra.epitech.eu/${process.env.INTRANET_AUTOLOGIN}/module/2021/${module.codemodule}/${module.codeinstance}/?format=json`);
        let data = await fetch(`https://intra.epitech.eu/${process.env.INTRANET_AUTOLOGIN}/module/2021/${module.codemodule}/${module.codeinstance}/?format=json`);
        let json = await data.json();
        modulesInfos.push({
            name: json.title,
            start: json.begin,
            end_register: json.end_register,
            end: json.end,
            credits: json.credits,
            color: await getRandomColor()
        });
    }
    
    fs.writeFileSync(`modulesInfos.js`, "moduleInfos = " + JSON.stringify(modulesInfos, null, 4));
    
}

getModuleInfos();