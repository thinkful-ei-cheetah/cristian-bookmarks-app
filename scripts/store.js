'use strict';


const store = (function(){

    const addBookmark = function(bookmark) {
        // add new bookmarks to bookmarks array
        this.bookmarks.push(bookmark);

        for (let i=0; i < store.bookmarks.length; i++) {
            store.bookmarks[i].expand = false;
        }
    };

    const findAndDelete = function(id) {
        // use id to find a bookmark and remove it from bookmarks array
        this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
    }

    const toggleExpand = function() {
        this.expand = !this.expand;
    }

    return {
        bookmarks: [],
        addingBookmark: false,
        error: null,
        minRating: 0,

        addBookmark,
        findAndDelete,
        toggleExpand,
    }

}());