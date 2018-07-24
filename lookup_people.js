const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

//const query = "SELECT * FROM famous_people"

client.connect()

function getActorByName(first_name) {
  const query = "SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name=$1::text";
  const value = [first_name];

client.query(query, value, (err, res) => {
    if (err) {
      return console.error(err.stack);
      return false;
    }
    let number = 1;
    console.log('Searching...')
    console.log(`Found ${res.rows.length} person(s) by the name ${first_name}`)
    res.rows.forEach((res) => {console.log(`- ${number}: ${res.first_name} ${res.last_name}, born '${res.birthdate.toISOString().slice(0,10)}'`);
    number += 1
    });
    client.end();
  });
}


getActorByName(process.argv.slice(2)[0])