const json2md = require("json2md")
const fs = require('fs')
const readline = require('readline');

json2md.converters.boardData = function (input, json2md) {
    return json2md.converters.h1(input.name, json2md);
};

json2md.converters.cards = function(input, json2md) {
	let cardsText = "";
	input.forEach((value, index, array) => {
		cardsText += json2md.converters.card(value, json2md);
		cardsText += "\n\n";
	});
	return cardsText;
}

json2md.converters.card = function(input, json2md) {
	let cardText = ""
	cardText += json2md.converters.h3(input.name, json2md);
	cardText += "\n";
	cardText += `List: ${input.list}\n`;
	cardText += `Labels: ${input.labels}\n\n`;
	cardText += input.description;
	if (input.checklists) {
		input.checklists.forEach((value, index, array) => {
			cardText += json2md.converters.checklist(value, json2md);
		});
	}
	return cardText
}

json2md.converters.checklist = function(input, json2md) {
	let checklistText = "\n"
	checklistText += json2md.converters.h4(input.name, json2md);
	checklistText += "\n\n";
	input.items.forEach((value, index, array) => {
		checklistText += " * ";
		checklistText += value;
		checklistText += "\n";
	});
	return checklistText
}
  
var file = 'cards.json';

async function processLineByLine() {
  const fileStream = fs.createReadStream(file)
  	.on('error', (err) => console.log(`Error reading file ${file}: ${err}`));

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  let data = "";
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    data += line;
    
  }
  
  console.log(json2md(JSON.parse(data)));
  
}

processLineByLine();
