'use strict';


const bookmarksList = (function(){

    function generateBookmarkElement(bookmark) {
        //  generate html template for bookmarks in list
    };

    function generateBookmarkString() {
        //  generate a bookmark string that can be passed into render function
    };

    function generateErrorElement() {
        //  generate html template for errors
    };

    function render(){
        //  render to DOM
    };

    function handleAddBookmarkClicked() {
        //  listen for click on add bookmark button and change adding bookmark property of store to true
    };

    function handleNewBookmarkSubmit() {
        // listen for submit of add bookmark form and post new bookmark then add to store or catch error and set message in store
    };

    function handleNewBookmarkCancelClicked() {
        //  listen for click on add bookmark form cancel button and change adding bookmark property of store to false
    };

    function handleBookmarkDetailedViewClicked() {
        // listen for click on bookmark expand button and toggle detailedView property in store
    };

    function handleBookmarkDeleteClicked() {
        // listen for click on bookmark delete button and delete bookmark
    }



    function bindEventListeners() {
        handleAddBookmarkClicked();
        handleNewBookmarkSubmit();
        handleNewBookmarkCancelClicked();
        handleBookmarkDetailedViewClicked();
        handleBookmarkDeleteClicked();
    };

    return {
        render,
        bindEventListeners,
    };
}());