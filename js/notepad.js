window.onload = function() {
  let user = localStorage.getItem("curr");

  document.getElementById("username").innerHTML += localStorage.getItem("curr");

  document.getElementById("race").innerHTML = "Race".bold().fontsize(6)
  if (localStorage.getItem(user + "race")) {
    document.getElementById("race").innerHTML += localStorage.getItem(user + "race");
  }

  document.getElementById("class").innerHTML = "Class".bold().fontsize(6)
  if (localStorage.getItem(user + "class")) {
    document.getElementById("class").innerHTML += localStorage.getItem(user + "class");
  }

  document.getElementById("weapon").innerHTML = "Weapon".bold().fontsize(6)
  if (localStorage.getItem(user + "weapon")) {
    document.getElementById("weapon").innerHTML += localStorage.getItem(user + "weapon");
  }

  document.getElementById("spell").innerHTML = "Spell".bold().fontsize(6)
  if (localStorage.getItem(user + "spell")) {
    document.getElementById("spell").innerHTML += localStorage.getItem(user + "spell");
  }
}
