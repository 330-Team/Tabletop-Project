let current_data = ""
let classes = []

fetch('classes/manifest.json')
  .then((response) => response.json())
  .then(manifest => {
    for(file of manifest.files) {
      fetch(`classes/${file}.json`)
      .then(response => response.json())
      .then(class_data => {
        console.log("HI");
        document.querySelector("class-box").innerHTML += `
        <button id = "${class_data.class}" class = "classes" type = "button" onclick = "class_click('${class_data.class}')" value = "0">
        ${class_data.class}
        </button>
        `

        classes.push(class_data)
      })
    }
  })

const class_click = (ev_id) =>{
  let class_elements = document.getElementsByClassName("classes");
  for(i = 0; i<class_elements.length; i++){
    class_elements[i].value = "0";
  }

  for (c of classes) {
    if (c.class == ev_id) {
      data = c
    }
  }

  const class_box = document.getElementById(ev_id);
  const class_info = document.getElementById("info");
  if(class_box.value == "0"){
    button = document.getElementById("add");
    class_info.innerHTML = "";
    class_box.value = "1";
    class_info.style = "display:normal";

    class_info.innerHTML += `
    <p>${"HP:  " + data.hp}</p>
    `;

    Object.keys(data.proficiencies).forEach(function (key) {
      class_info.innerHTML += `
      <p>${key.charAt(0).toUpperCase() + key.slice(1) + ":  " + data.proficiencies[key]}</p>
      `;
    });

    class_info.innerHTML +=  'Equip options:  ';

    for(i in data['equip-options']){
      if(i == data['equip-options'].length-1){
        class_info.innerHTML +=  data['equip-options'][i];
      }
      else{
        class_info.innerHTML +=  data['equip-options'][i] + ", ";
      }
    }

    class_info.innerHTML += `
    <p>${"Spells".bold().fontsize(5)}</p>
    `;

    Object.keys(data.spells).forEach(function (s) {
      class_info.innerHTML += `
      <div class = "feature">
        <b>${s}</b>
        <p>${data.spells[s]}</p>
      </div>
      `
    });

    class_info.innerHTML += `
    <p>${"Features".bold().fontsize(5)}</p>
    `;

    Object.keys(data.features).forEach(function (feature) {
      class_info.innerHTML += `
      <div class = "feature">
        <b>${data.features[feature].name}</b>
        <p>${data.features[feature].description}</p>
      </div>
      `
    });
    current_data = class_info.innerHTML;
    class_info.appendChild(button);
  }
}

const add_to_pad = () =>{
  localStorage.setItem("class", current_data);
  localStorage.setItem("track-class", "1");
  if(localStorage.getItem("done") != "1" && localStorage.getItem("track-race") == "1" && localStorage.getItem("track-weapon") == "1" && localStorage.getItem("track-spell") == "1"){
    alert("Character creation achievement earned! \n You have created your very first character. See your notepad for more details.");
    localStorage.setItem("done", "1");
  }
  alert("Added to notepad");
}

const notepad = () =>{
  window.location.href = "http://0.0.0.0:8000/notepad.html";
}
