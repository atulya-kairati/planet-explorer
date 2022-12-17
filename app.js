const parse = require("csv-parse")
const fs = require("fs")

const fileStream = fs.createReadStream("./data/KOI_data.csv")

fileStream.on("data", (data) => {
  console.log(data)
  console.log('----------------------')
});

fileStream.on('end', () => {
	console.log("--File end--")
})

fileStream.on('error', (err) => {
	console.log(err)
})
