const modname = "beername";

const fetch = require("node-fetch");

var  beer_name;
var  beer_style;

exports.random_beer_name = function () {
  var beer_name_first = 'Smiley';
  var beer_name_middle = 'Potatoe';
  var beer_style = 'Saison';

  var name = beer_name_first + ' ' + beer_name_middle + ' ' + beer_style;
  return "You should name your beer: \"" + name + "\""
}

exports.random_name_api = async function () {
  
  let response = await fetch("https://www.craftbeernamegenerator.com/api/api.php?type=trained");
  
  try {
    console.log(response.status);
    console.log(response.statusText);
  
    if (response.status === 200) {
      let data = await response.json();
      console.log(data.data.name + " " + data.data.style);
      beer_name = data.data.name;
      beer_style = data.data.style;
      return "Your AI inspired Beer Results!: Beer Name: \"" + beer_name + "\" Style: \"" + beer_style + "\"";
    } else {
        return "Something horrible happened and I cannot connect to CraftBeerName Generator :cry:";
    }
  } catch(error) {
      console.log(error);
      return error;
  }
};