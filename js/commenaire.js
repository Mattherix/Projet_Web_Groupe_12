function setTabToLocalStorage(table) {
  localStorage.setItem("comments", JSON.stringify(table));
}

function getTabFromLocalStorage() {
  var data = localStorage.getItem("comments");
  if (data) {
    return JSON.parse(localStorage.getItem("comments"));
  } else {
    var defaultData = [
      ["Linus Torvalds", "Non Richard, non ..."],
      ["RMS", "Ce n'est pas Linux mais GNU/Linux"]
    ];
    setTabToLocalStorage(defaultData);
    return getTabFromLocalStorage();
  } 
}

function loadComments() {
  var tab = getTabFromLocalStorage();
  document.getElementById("commentaires").rows.length;
  tab.forEach(element => {
    addRowToTable(...element);
  });
}

function addRowToTable(pseudo, comment) {
  var comments = document.getElementById("commentaires");
  var row = comments.insertRow(1);

  var p = row.insertCell(0);
  var c = row.insertCell(1);

  p.innerHTML = pseudo;
  c.innerHTML = comment;
}

function newComment(pseudo, comment) {
  setTabToLocalStorage([[pseudo, comment], ...getTabFromLocalStorage()]);
  addRowToTable(pseudo, comment);
}

function addCommentForm(form) {
  var pseudo = form.elements["pseudo"].value;
  var comment = form.elements["comment"].value;

  if (pseudo && comment) {
    newComment(pseudo, comment);
  } else {
    alert("Merci de remplir les champs !");
  }
  
  form.elements["comment"].value = "";

  // To disable form
  return false;
}
