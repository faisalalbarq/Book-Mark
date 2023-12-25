var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var tableContent = document.getElementById("tableContent");
var searchInput = document.getElementById("searchInput");
var boxInfo = document.getElementById("boxInfo");

var bookmarkContainer;

if (localStorage.getItem("myBookmark") != null) {
  bookmarkContainer = JSON.parse(localStorage.getItem("myBookmark"));
  displayBookmark(bookmarkContainer);
} else {
  bookmarkContainer = [];
}

function addBookmark() {
  if (
    validteNameBookmark(bookmarkName.value) &&
    validteurlBookmark(bookmarkURL.value)
  ) {
    var bookmark = {
      name: bookmarkName.value,
      url: bookmarkURL.value,
    };

    bookmarkContainer.push(bookmark);

    localStorage.setItem("myBookmark", JSON.stringify(bookmarkContainer));
    console.log(bookmarkContainer);

    clearBookmark();
    displayBookmark(bookmarkContainer);
  } else {
    boxInfo.classList.remove("d-none");
  }
}

function clearBookmark() {
  bookmarkName.value = "";
  bookmarkURL.value = "";
}

function displayBookmark(bookmarkContainer) {
  var container = "";

  if (bookmarkContainer.length > 0) {
    for (var i = 0; i < bookmarkContainer.length; i++) {
      container += `
    <tr>
    <td>${i + 1}</td>
    <td class="text-capitalize">${bookmarkContainer[i].name}</td>
    <td><a href="//${
      bookmarkContainer[i].url
    }" target="_blank"><button class="btn bg-success text-white visit"> <i class="fa-regular fa-eye"></i> Visit</button></a></td>
    <td><button onclick="deleteBookmark(${i})" class="btn btn-danger text-white"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>`;
    }
    tableContent.innerHTML = container;
  } else {
    tableContent.innerHTML = `
    <tr>
    <td>-</td>
    <td class="text-capitalize">-</td>
    <td>-</td>
    <td>-</td>
    </tr>
    `;
  }
}

function searchBookmark(searchTerm) {
  var searchResult = [];

  for (var i = 0; i < bookmarkContainer.length; i++) {
    if (
      bookmarkContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      searchResult.push(bookmarkContainer[i]);
    }
    displayBookmark(searchResult);
  }
}

function deleteBookmark(indexBookmark) {
  bookmarkContainer.splice(indexBookmark, 1);
  console.log(indexBookmark);
  localStorage.setItem("myBookmark", JSON.stringify(bookmarkContainer));
  displayBookmark(bookmarkContainer);
}

function deleteAll() {
  bookmarkContainer.splice(0, bookmarkContainer.length);
  localStorage.setItem("myBookmark", JSON.stringify(bookmarkContainer));
  displayBookmark(bookmarkContainer);
}

function validteNameBookmark(name) {
  var nameRegex = /^\w{3,}(\s+\w+)*$/;
  if (nameRegex.test(name)) {
    bookmarkName.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    bookmarkName.classList.add("is-invalid");
    return false;
  }
}

function validteurlBookmark(url) {
  var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
  if (urlRegex.test(url)) {
    bookmarkURL.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    bookmarkURL.classList.add("is-invalid");
    return false;
  }
}

function closeWindow() {
  boxInfo.classList.add("d-none");
}
