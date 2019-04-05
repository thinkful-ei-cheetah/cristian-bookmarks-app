'use strict';


const store = (function(){

    const addBookmark = function(bookmark) {
        // add new bookmarks to bookmarks array
        this.bookmarks.push(bookmark);
    };

    const findAndDelete = function(id) {
        // use id to find a bookmark and remove it from bookmarks array
        return this.bookmarks.filter(bookmark => bookmark.id !== id);
    }

    const toggleDetailed = function() {
        this.detailedView = !this.detailedView;
    }

    return {
        bookmarks: [],
        addingBookmark: false,
        detailedView: false,
        error: null,
        minRating: 0,

        addBookmark,
        findAndDelete,

    }

}());