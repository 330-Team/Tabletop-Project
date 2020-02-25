let current_data = ""
let races = []

fetch('races/manifest.json')
  .then((response) => response.json())
  .then(manifest => {
    for(file of manifest.files) {
      fetch(`races/${file}.json`)
      .then(response => response.json())
      .then(race_data => {
        document.querySelector("race-box").innerHTML += `
        <button id = "${race_data.race}" class = "race" type = "button" onclick = "race_click('${race_data.race}')" value = "0">
        ${race_data.race}
        </button>
        `

        races.push(race_data)
      })
    }
  })

const race_click = (ev_id) =>{
  let race_elements = document.getElementsByClassName("race");
  for(i = 0; i<race_elements.length; i++){
    race_elements[i].value = "0";
  }

  for (race of races) {
    if (race.race == ev_id) {
      data = race
    }
  }

  const race_box = document.getElementById(ev_id);
  const race_info = document.getElementById("info");
  if(race_box.value == "0"){
    button = document.getElementById("add");
    race_info.innerHTML = "";
    race_box.value = "1";
    race_info.style = "display:normal";

    Object.keys(data.stats).forEach(function (key) {
      race_info.innerHTML += `
      <p>${data.stats[key]}</p>
      `;
    });

    Object.keys(data.attributes).forEach(function (attribute) {
      race_info.innerHTML += `
      <div class = "attribute">
        <b>${data.attributes[attribute].name}</b>
        <p>${data.attributes[attribute].description}</p>
      </div>
      `
    });
    current_data = race_info.innerHTML;
    race_info.appendChild(button);
  }
}

const add_to_pad = () =>{
  localStorage.setItem("race", current_data);
  alert("Added to notepad");
}

const notepad = () =>{
  window.location.href = "http://0.0.0.0:8000/notepad.html";
}
