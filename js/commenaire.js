/* Data is formated using JsOn
 It's an array of comments
[
  [username, comment],
]
*/

function loadComments() {
  var tab = getCommentsFromLocalStorage();
  document.getElementById("commentaires").rows.length;
  tab.forEach(element => {
    addRowToTable(...element);
  });
}

function setCommentsToLocalStorage(table) {
  localStorage.setItem("comments", JSON.stringify(table));
}

function getCommentsFromLocalStorage() {
  var data = localStorage.getItem("comments");
  if (data) {
    return JSON.parse(localStorage.getItem("comments"));
  } else {
    var defaultData = [
      ["RMS", "J'en doute voici mes arguments https://wiki.installgentoo.com/index.php/Interjection"],
      ["Linus Torvalds", "Non Richard, c'est 'Linux', pas 'GNU/Linux' ..."],
      ["RMS", "Ce n'est pas Linux mais GNU/Linux"]
    ];
    for (let index = 0; index < defaultData.length; index++) {
      defaultData[index][1] = replaceUrl(defaultData[index][1]);
    }
    setCommentsToLocalStorage(defaultData);
    return getCommentsFromLocalStorage();
  } 
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
  comment = replaceUrl(comment);
  setCommentsToLocalStorage([[pseudo, comment], ...getCommentsFromLocalStorage()]);
  addRowToTable(pseudo, comment);
}

async function shortenUrl(url) {
  let response = await fetch('https://hideuri.com/api/v1/shorten', {
    method: 'POST',
    mode: 'no-cors',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body: "url=" + encodeURIComponent(url)
  });

  if (response.ok == 0) {
    console.error("Can't access shorten url due to CORS (see. MDN). But request sent, see network tab")
    return url;
  }

  if (!response.ok) {
    console.error("Http Error: ", response.status);
    return url;
  }

  let json = await response.json();
  console.log(json)
  return json['result_url'];
}

function replaceUrl(text) {
  return text.replace(/(https?:\/\/[^\s]+)/g, function(url) {
    return "<a href=\"" + url + "\">" + url + "</a>"
    /*return shortenUrl(url).then((data) => {
        console.log("We have shorten: " + url + " to " + data);
        return data;
      })*/
  });
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
