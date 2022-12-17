const { parse } = require("csv-parse")
const fs = require("fs")

const fileStream = fs.createReadStream("./data/KOI_data.csv")

const habitablePlanets = []

/**
 * [pipe()]: 
 * Connects readable stream source
 * to writable stream destination.
 */
fileStream.pipe(parse({
  comment: '#',
  columns: true  // This will return a row in form of a k:v pair
}))
  .on("data", (data) => {
    if(isHabitable(data)){
      habitablePlanets.push(data)
    }
  });

fileStream.on('end', () => {
  console.log(`${habitablePlanets.length} habitable planets found!`)
  console.log(habitablePlanets.map((planet) => planet['kepler_name']));
  console.log("--Fin--")
})

fileStream.on('error', (err) => {
  console.log(err)
})

const isHabitable = (planet) => 
  planet['koi_disposition'] === "CONFIRMED" &&
  planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 && // Stellar flux limit
  planet['koi_prad'] < 1.6  // Radii limit in relation to Earth radii 
