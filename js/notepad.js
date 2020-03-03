window.onload = function() {
  let user = localStorage.getItem("curr");
  document.getElementById("race").innerHTML = "Race".bold().fontsize(6) + localStorage.getItem(user + "race");
  document.getElementById("class").innerHTML += "Class".bold().fontsize(6) + localStorage.getItem(user + "class");
  document.getElementById("weapon").innerHTML += "Weapon".bold().fontsize(6) + localStorage.getItem(user + "weapon");
  document.getElementById("spell").innerHTML += "Spell".bold().fontsize(6) + localStorage.getItem(user + "spell");
}
