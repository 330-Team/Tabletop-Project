window.onload = function() {
  console.log(localStorage.race)
  document.getElementById("race").innerHTML = localStorage.getItem("race");
}
