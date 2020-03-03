let current_data = ""
let weapons = []

fetch('items/manifest.json')
  .then((response) => response.json())
  .then(manifest => {
    for(file of manifest.files) {
      fetch(`items/${file}.json`)
      .then(response => response.json())
      .then(weapon_data => {
        document.querySelector("weapon-box").innerHTML += `
        <button id = "${weapon_data.item}" class = "weapon" type = "button" onclick = "weapon_click('${weapon_data.item}')" value = "0">
        ${weapon_data.item}
        </button>
        `

        weapons.push(weapon_data)
      })
    }
  })

const weapon_click = (ev_id) =>{
  let weapon_elements = document.getElementsByClassName("weapon");
  for(i = 0; i<weapon_elements.length; i++){
    weapon_elements[i].value = "0";
  }

  for (weapon of weapons) {
    if (weapon.item == ev_id) {
      data = weapon
    }
  }

  const weapon_box = document.getElementById(ev_id);
  const weapon_info = document.getElementById("info");
  if(weapon_box.value == "0"){
    button = document.getElementById("add");
    weapon_info.innerHTML = "";
    weapon_box.value = "1";
    weapon_info.style = "display:normal";

    weapon_info.innerHTML += `
    <p>${"Damage:  " + data.damage}</p>
    `;

    Object.keys(data.properties).forEach(function (p) {
      weapon_info.innerHTML += `
      <div class = "attribute">
        <b>${data.properties[p].name}</b>
        <p>${data.properties[p].value}</p>
      </div>
      `
    });
    current_data = weapon_info.innerHTML;
    weapon_info.appendChild(button);
  }
}

const add_to_pad = () =>{
  let user = localStorage.getItem("curr");

  localStorage.setItem(user + "weapon", current_data);
  localStorage.setItem("track-weapon", "1");
  if(localStorage.getItem("done") != "1" && localStorage.getItem("track-class") == "1" && localStorage.getItem("track-weapon") == "1" && localStorage.getItem("track-spell") == "1"){
    alert("Character creation achievement earned! \n You have created your very first character. See your notepad for more details.");
    localStorage.setItem("done", "1");
  }
  alert("Added to notepad");
}

const notepad = () =>{
  window.location.href = "http://0.0.0.0:8000/notepad.html";
}
