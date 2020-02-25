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
        <button id = "${class_data.class}" class = "classes" type = "button" onclick = "class_click('${class_data.class}')" value = "0">
        ${class_data.class}
        </button>
        `

        classes.push(class_data)
      })
    }
  })

const class_click = (ev_id) =>{
  let class_elements = document.getElementsByClassName("class");
  for(i = 0; i<class_elements.length; i++){
    class_elements[i].value = "0";
  }

  for (class of classs) {
    if (class.class == ev_id) {
      data = class
    }
  }

  const class_box = document.getElementById(ev_id);
  const class_info = document.getElementById("info");
  if(class_box.value == "0"){
    button = document.getElementById("add");
    class_info.innerHTML = "";
    class_box.value = "1";
    class_info.style = "display:normal";

    Object.keys(data.stats).forEach(function (key) {
      class_info.innerHTML += `
      <p>${data.stats[key]}</p>
      `;
    });

    Object.keys(data.attributes).forEach(function (attribute) {
      class_info.innerHTML += `
      <div class = "attribute">
        <b>${data.attributes[attribute].name}</b>
        <p>${data.attributes[attribute].description}</p>
      </div>
      `
    });
    current_data = class_info.innerHTML;
    class_info.appendChild(button);
  }
}

const add_to_pad = () =>{
  localStorage.setItem("class", current_data);
  alert("Added to notepad");
}

const notepad = () =>{
  window.location.href = "http://0.0.0.0:8000/notepad.html";
}
