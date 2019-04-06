'use strict';


const store = (function(){

    const addBookmark = function(bookmark) {
        // add new bookmarks to bookmarks array
        this.bookmarks.push(bookmark);

        for (let i = 0; i < store.bookmarks.length; i++) {
            store.bookmarks[i].expand = false;
        }
    };

    const findById = function(id) {
        return store.bookmarks.find(bookmark => bookmark.id === id);
    };

    const findAndDelete = function(id) {
        // use id to find a bookmark and remove it from bookmarks array
        this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
    };

    const findAndUpdate = function(id, newData) {
        const found = this.bookmarks.find(bookmark => bookmark.id === id);
        Object.assign(found, newData);
    };

    const toggleAdding = function() {
        store.adding = !store.adding;
    };

    const setMinRating = function(value) {
        this.minRating = value;
    };

    return {
        bookmarks: [],
        adding: false,
        error: null,
        minRating: 0,

        addBookmark,
        findById,
        findAndDelete,
        findAndUpdate,
        toggleAdding,
        setMinRating,
    }

}());