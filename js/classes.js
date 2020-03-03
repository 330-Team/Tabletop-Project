let current_data = ""
let classes = []

fetch('classes/manifest.json')
  .then((response) => response.json())
  .then(manifest => {
    for(file of manifest.files) {
      fetch(`classes/${file}.json`)
      .then(response => response.json())
      .then(class_data => {
        document.querySelector("class-box").innerHTML += `
        <div class="row">
        <div class="col l1"></div>
        <button id = "${class_data.class}" class = "class btn-large light-blue accent-4 waves-effect col l10 center" type = "button" onclick = "class_click('${class_data.class}')" value = "0">
        ${class_data.class}
        </button>
        </div>
        `

        classes.push(class_data)
      })
    }
  })

window.onload = function() {
  document.getElementById("username").innerHTML += localStorage.getItem("curr");
}

const class_click = (ev_id) =>{
  let class_elements = document.getElementsByClassName("class");
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

    let class_card = ``
    class_card += `
    <div class="card grey lighten-5">
    <div class="card-content">
    <span class="card-title">${data.class}</span>`

    Object.keys(data.stats).forEach(function (key) {
      class_card += `
      <p>${data.stats[key]} </p>`;
    });

    Object.keys(data.attributes).forEach(function (attribute) {
      class_card += `
      <div class = "attribute">
        <b>${data.attributes[attribute].name}</b>
        <p>${data.attributes[attribute].description}</p>
      </div>`
    });

    class_card += `
    </div>`

    class_info.innerHTML += class_card
    current_data = class_card;
    class_card += `
    <div class="card-action">
    <a href="#" onclick = "add_to_pad()" class = "light-blue-text accent-1">Add to Notepad</a>`
    class_info.innerHTML = class_card
  }
}

const add_to_pad = () =>{
  let user = localStorage.getItem("curr");

  localStorage.setItem("track-class", "1");
  if(localStorage.getItem("done") != "1" && localStorage.getItem("track-class") == "1" && localStorage.getItem("track-weapon") == "1" && localStorage.getItem("track-spell") == "1"){
    alert("Character creation achievement earned! \n You have created your very first character. See your notepad for more details.");
    localStorage.setItem("done", "1");
  }
  localStorage.setItem(user + "class", current_data);
  alert("Added to notepad");
}

const notepad = () =>{
  window.location.href = "http://localhost:8000/notepad.html";
}
