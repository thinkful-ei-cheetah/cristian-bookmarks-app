'use strict';

$(document).ready(function() {
    bookmarksList.bindEventListeners();

    api.getBookmarks()
        .then((bookmarks) => {
            bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
            bookmarksList.render();
        })
        .catch(error => console.log(error.message));
});
// get test working
// api.getBookmarks()
//     .then(data => console.log(data));