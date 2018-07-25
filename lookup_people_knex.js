
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'development',
    password : 'development',
    database : 'test_db'
  }
});

let name = process.argv[2]

knex.select('first_name', 'last_name', 'birthdate')
  .from('famous_people')
  .where('first_name', name)
  .asCallback((err, rows) => {
    if (err) return console.error(err);
    console.log(`Found ${rows.length} person(s) by the name ${name}`)
    rows.forEach(function(row, i) {
      const formattedBday = row.birthdate.toISOString().slice(0,10)
      console.log(
        `- ${i+1}: ${row.first_name} ${row.last_name}, born '${formattedBday}'`
      )
    })
    knex.destroy();
  }); 
  

    
     //let number = 1;
    //console.log(`Found ${res.length} person(s) by the name ${process.argv[2]}`)
        //number += 1
       // console.log(`- ${number}: ${rows.first_name} ${rows.last_name}, born '${res.birthdate.toISOString().slice(0,10)}'`);
