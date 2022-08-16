# Trello2md -- Convert Trello JSON outputs to well-formed Markdown

Two scripts that:

1. Preprocess the Trello JSON export to make it more friendly to parse. This script is based on [RealOrangeOne's GIST](https://gist.github.com/RealOrangeOne/c35751ee794e90df512bdfba6f22574d) and uses Python.
2. Convert the friendly JSON into Markdown -- at least for some of the elements in the JSON. This script is based on [IonicaBizau's node module Json2md](https://github.com/IonicaBizau/json2md#readme).

## Run

First, clone this repository. 
Second, make sure that `trelloparse` works as intended. Execute

```
sudo chmod +x trelloparse
```

to make the script executable.
Then run it with

```
./trelloparse trello-export.json cards.json
```

where `trello-export.json` is the input file and `cards.json` is the output file.
And, of course, you are free to substitute your filenames of choice.

Third, get `trello2md.js` to work. Install the json2md and the yargs dependencies:

```
npm install --save json2md
npm install --save yargs
```

You can then check if everything went according to plan by typing

```
node trello2md.js -h
```

which should show you usage instructions. The script expects the pre-processed JSON in `cards.json`. If you want to use a different filename, you can do so using the `-f` parameter:

```
node trello2md.js -f test.json
```

The markdown is then written to the console. If you want to rather have it in a file, just pipe it there!

## Extension to Json2md

The Json2md node module in its current version expects a root node in the JSON construct. The Trello data does not quite look like that. To get the full output, you might need to change the file `node_modules/json2md/lib/index.js` as in [this pull request](https://github.com/IonicaBizau/json2md/pull/88).