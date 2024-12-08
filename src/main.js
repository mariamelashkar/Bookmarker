bookmarkName = document.getElementById("bookmarkName");
bookmarkUrl = document.getElementById("bookmarkUrl");
tBody = document.getElementById("tbody");
alertDivName = document.getElementById("alertDiv-name");
alertDivUrl = document.getElementById("alertDiv-url");


alertDivName.style.display = "none";
alertDivUrl.style.display = "none";


bookmarkList = [];

if (localStorage.getItem("bookmarks")) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarks"));
  display();
}

function addBookmark() {
  if(siteNameValidation()&&siteUrlValidation()){
    var markObj = {
      id: Math.ceil(Math.random() * 2000),
      bmName: bookmarkName.value,
      bmUrl: bookmarkUrl.value,
    };
    var bookmarkNameValue = bookmarkName.value.trim();
    if ((checkName(bookmarkNameValue))) {
      alert("Error: Bookmark name already exists!");
      return;
  }
    bookmarkList.push(markObj);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
    clearForm();
    display();
  }

}

function display() {
  var box = "";
  for (var i = 0; i < bookmarkList.length; i++) {
    box += ` <tr class="bg-base-200">
                    <td>${bookmarkList[i].bmName}</td>
                    <td>🔗${bookmarkList[i].bmUrl}</td>
                <td>
                <button class="btn btn-update rounded text-primary" onclick="visitBookmark('${bookmarkList[i].bmUrl}')">Visit</button>
                <button class="btn btn-delete rounded text-primary" onclick="deleteBookmark(${bookmarkList[i].id})">Delete</button> 
                </td>
              </tr>
        `;
  }
  tBody.innerHTML = box;
}

function clearForm() {
  bookmarkName.value = null;
  bookmarkUrl.value = null;
}

function visitBookmark(url) {
  if (!url.startsWith("https://")) {
    url = `https://${url}`;
  }
  console.log(url);
  window.open(url, "_blank");
}

function deleteBookmark(id) {
  bookmarkList = bookmarkList.filter(function (ele) {
    return ele.id !== id;
  });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
  display();
}

function siteNameValidation() {
  const siteNameRegex = /^[A-Za-z0-9-]{3,63}$/; 
  return validateInput(bookmarkName, siteNameRegex, alertDivName);
}

function siteUrlValidation() {
  const siteUrlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
  return validateInput(bookmarkUrl, siteUrlRegex, alertDivUrl);
}

function validateInput(inputElement, regex, alertDiv) {
  if (regex.test(inputElement.value)) {
      alertDiv.style.display = "none"; 
      return true;
  } else {
      alertDiv.style.display = "block"; 
      return false; 
  }
}

function checkName(name){
    return bookmarkList.some(
        (bookmark) => bookmark.bmName.toLowerCase() === name.toLowerCase()
    );
}