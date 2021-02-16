var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var bookmarkContainer;


if (localStorage.getItem("bookmarks") == null) {
    bookmarkContainer = [];
} else {
    bookmarkContainer = JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmarks();
}

function addWebsite() {
    if (siteName.value == "" && siteURL.value == "") {
        document.getElementById("showName").style.display = "block";
        document.getElementById("showURL").style.display = "block";
    } else if (siteName.value == "") {
        document.getElementById("showName").style.display = "block";
        document.getElementById("showURL").style.display = "none";
    } else if (siteURL.value == "") {
        document.getElementById("showURL").style.display = "block";
        document.getElementById("showName").style.display = "none";
    } else {
        var website = {
            name: siteName.value,
            url: siteURL.value
        }

        bookmarkContainer.push(website);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarkContainer));
        displayBookmarks();
        clearForm();
        document.getElementById("showName").style.display = "none";
        document.getElementById("showURL").style.display = "none";
        document.getElementById("websiteData").style.display = "block";
    }

}

function clearForm() {
    siteName.value = "";
    siteURL.value = "";
}

function displayBookmarks() {
    var cartoona = ``;

    for (var i = 0; i < bookmarkContainer.length; i++) {
        cartoona += `<h2>${[i+1]}</h2><h2>${bookmarkContainer[i].name}</h2>
        <button onClick="visit(${i})" class="btn mr-5 btn-primary">Visit</button>
        <button onClick="deleteBookmark(${i})" class="btn ml-5 btn-danger">Delete</button><br>`
    }

    document.getElementById("websiteData").innerHTML = cartoona;
}

function visit(bookmarkIndex) {

    var url = "http://" + bookmarkContainer[bookmarkIndex].url;
    window.open(url);

}

function deleteBookmark(bookmarkIndex) {
    bookmarkContainer.splice(bookmarkIndex, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkContainer));
    if (bookmarkContainer == 0) {
        document.getElementById("websiteData").style.display = "none";
    } else {
        displayBookmarks();
    }

}
