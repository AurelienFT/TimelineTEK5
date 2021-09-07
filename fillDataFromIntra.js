import fetch from "node-fetch"
import fs from "fs"
import dotenv from "dotenv"

dotenv.config();

let rawdata = fs.readFileSync('moduleList.json');
let modules = JSON.parse(rawdata);

function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';

	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

async function getModuleInfos() {
	let modulesInfos = []
	for (const module of modules) {
		let data = await fetch(`https://intra.epitech.eu/${process.env.INTRANET_AUTOLOGIN}/module/2021/${module.codemodule}/${module.codeinstance}/?format=json`);
		let json = await data.json();
		console.log(json.title)
		console.log(module.codemodule)
		console.log(json.activites[0].type_code)
		console.log(json.activites[0].type_code === "tp" ? json.activites[0].begin : json.activites[1].begin)
		modulesInfos.push({
			name: json.title,
			code: module.codemodule,
			start: json.activites[0].type_code === "tp" ? json.activites[0].begin : json.activites[1].begin,
			end: json.end,
			credits: json.credits,
			color: await getRandomColor()
		});
		console.log(" ")
	}

	fs.writeFileSync(`modulesInfos.js`, "moduleInfos = " + JSON.stringify(modulesInfos, null, 4));

}

getModuleInfos();
