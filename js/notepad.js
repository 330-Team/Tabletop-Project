window.onload = function() {
  document.getElementById("race").innerHTML = "Race".bold().fontsize(6) + localStorage.getItem("race");
  document.getElementById("class").innerHTML += "Class".bold().fontsize(6) + localStorage.getItem("class");
  document.getElementById("weapon").innerHTML += "Weapon".bold().fontsize(6) + localStorage.getItem("weapon");
  document.getElementById("spell").innerHTML += "Spell".bold().fontsize(6) + localStorage.getItem("race");
}
