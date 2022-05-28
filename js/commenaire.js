/* Data is formated using JsOn
 It's an array of comments
[
  [username, comment],
]
*/

function setCommentsToLocalStorage(table) {
  localStorage.setItem("comments", JSON.stringify(table));
}

function getCommentsFromLocalStorage() {
  var data = localStorage.getItem("comments");
  if (data) {
    return JSON.parse(localStorage.getItem("comments"));
  } else {
    var defaultData = [
      ["Linus Torvalds", "Non Richard, non ..."],
      ["RMS", "Ce n'est pas Linux mais GNU/Linux"]
    ];
    setCommentsToLocalStorage(defaultData);
    return getCommentsFromLocalStorage();
  } 
}

function loadComments() {
  var tab = getCommentsFromLocalStorage();
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
  setCommentsToLocalStorage([[pseudo, comment], ...getCommentsFromLocalStorage()]);
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
