let elf = "";
let dwarf = "";
let data = "";
let human = "";

fetch('races/elf-high.json')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    elf = myJson;
  });

fetch('races/dwarf.json')
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      dwarf = myJson;
    });

  fetch('races/human.json')
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          human = myJson;
        });


const race_click = (race) =>{
  let races = document.getElementsByClassName("race");
  for(i = 0; i<races.length; i++){
    races[i].value = "0";
  }
  if(race == "elf"){
    data = elf;
  }
  if(race == "dwarf"){
    data = dwarf;
  }
  if(race == "human"){
    data = human;
  }
  let race_box = document.getElementById(race);
  let race_info = document.getElementById("info");
  if(race_box.value == "0"){
    race_info.innerHTML = "";
    race_box.value = "1";
    race_info.style = "display:normal";

    Object.keys(data.stats).forEach(function (key) {
      race_info.innerHTML += data.stats[key] + "<br />";
    });

    Object.keys(data.attributes).forEach(function (key) {
      Object.keys(data.attributes[key]).forEach(function (key2) {
        race_info.innerHTML += data.attributes[key][key2] + "<br />";
      });});
    }
}
