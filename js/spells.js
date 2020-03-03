let current_data = ""
let spells = []

fetch('spells/manifest.json')
  .then((response) => response.json())
  .then(manifest => {
    for(file of manifest.files) {
      fetch(`spells/${file}.json`)
      .then(response => response.json())
      .then(spell_data => {
        document.querySelector("spell-box").innerHTML += `
        <button id = "${spell_data.spell}" class = "spell" type = "button" onclick = "spell_click('${spell_data.spell}')" value = "0">
        ${spell_data.spell}
        </button>
        `

        spells.push(spell_data)
      })
    }
  })

const spell_click = (ev_id) =>{
  let spell_elements = document.getElementsByClassName("spell");
  for(i = 0; i<spell_elements.length; i++){
    spell_elements[i].value = "0";
  }

  for (spell of spells) {
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

    spell_info.innerHTML += `
    <p>${"Level: " + data.level}</p>
    `;

    Object.keys(data.properties).forEach(function (p) {
      spell_info.innerHTML += `
      <div class = "property">
        <b>${data.properties[p].name}</b>
        <p>${data.properties[p].value}</p>
      </div>
      `
    });

    spell_info.innerHTML += `
    <p>${"Description: " + data.description}</p>
    `;

    current_data = spell_info.innerHTML;
    spell_info.appendChild(button);
  }
}

const add_to_pad = () =>{
  let user = localStorage.getItem("curr");

  localStorage.setItem(user + "spell", current_data);
  localStorage.setItem("track-spell", "1");
  if(localStorage.getItem("done") != "1" && localStorage.getItem("track-class") == "1" && localStorage.getItem("track-weapon") == "1" && localStorage.getItem("track-race") == "1"){
    alert("Character creation achievement earned! \n You have created your very first character. See your notepad for more details.");
    localStorage.setItem("done", "1");
  }
  alert("Added to notepad");
}

const notepad = () =>{
  window.location.href = "http://0.0.0.0:8000/notepad.html";
}
