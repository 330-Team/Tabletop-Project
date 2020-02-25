let current_data = ""
let weapons = []

fetch('weapons/manifest.json')
  .then((response) => response.json())
  .then(manifest => {
    for(file of manifest.files) {
      fetch(`weapons/${file}.json`)
      .then(response => response.json())
      .then(spell_data => {
        document.querySelector("spell-box").innerHTML += `
        <button id = "${spell_data.spell}" class = "spell" type = "button" onclick = "spell_click('${spell_data.spell}')" value = "0">
        ${spell_data.spell}
        </button>
        `

        weapons.push(spell_data)
      })
    }
  })

const spell_click = (ev_id) =>{
  let spell_elements = document.getElementsByClassName("spell");
  for(i = 0; i<spell_elements.length; i++){
    spell_elements[i].value = "0";
  }

  for (spell of weapons) {
    if (spell.spell == ev_id) {
      data = spell
    }
  }

  const spell_box = document.getElementById(ev_id);
  const spell_info = document.getElementById("info");
  if(spell_box.value == "0"){
    button = document.getElementById("add");
    spell_info.innerHTML = "";
    spell_box.value = "1";
    spell_info.style = "display:normal";

    Object.keys(data.stats).forEach(function (key) {
      spell_info.innerHTML += `
      <p>${data.stats[key]}</p>
      `;
    });

    Object.keys(data.attributes).forEach(function (attribute) {
      spell_info.innerHTML += `
      <div class = "attribute">
        <b>${data.attributes[attribute].name}</b>
        <p>${data.attributes[attribute].description}</p>
      </div>
      `
    });
    current_data = spell_info.innerHTML;
    spell_info.appendChild(button);
  }
}

const add_to_pad = () =>{
  localStorage.setItem("spell", current_data);
  alert("Added to notepad");
}

const notepad = () =>{
  window.location.href = "http://0.0.0.0:8000/notepad.html";
}
