'use strict';


const bookmarksList = (function(){

    function generateBookmarkElement(bookmark) {
        return `
        <li class="bookmark js-bookmark" data-bookmark-id="${bookmark.id}">
            <p class="bookmark-title js-bookmark-title">${bookmark.title}
                <button type="button" class="delete-button js-delete-button">Delete</button>
            </p>
            <p class="bookmark-description js-bookmark-description hidden">${bookmark.desc}</p>
            <p class="bookmark-link js-bookmark-link hidden"><a href="${bookmark.url}">Visit Site</a></p>
            <p class="bookmark-rating js-bookmark-rating">Rating: ${bookmark.rating} Star(s)
                <button type="button" class="expand-button js-expand-button">Expand</button>
            </p>
        </li>`

        // return `
        // <li class="bookmark js-bookmark" data-bookmark-id="${bookmark.id}">
        //     <p class="bookmark-title js-bookmark-title">${bookmark.title}
        //         <button type="button" class="delete-button js-delete-button">Delete</button>
        //     </p>
        //     <p class="bookmark-rating js-bookmark-rating">Rating: ${bookmark.rating} Stars
        //         <button type="button" class="expand-button js-expand-button">Expand</button>
        //     </p>
        // </li>`
    };

    // function generateExpandedBookmarkElement(bookmark) {
    //     return `
    //     <li class="bookmark js-bookmark" data-bookmark-id="${bookmark.id}">
    //         <p class="bookmark-title js-bookmark-title">${bookmark.title}
    //             <button type="button" class="delete-button js-delete-button">Delete</button>
    //         </p>
    //         <p class="bookmark-description js-bookmark-description">${bookmark.desc}</p>
    //         <p><a href="${bookmark.url}">Visit Site</a></p>
    //         <p class="bookmark-rating js-bookmark-rating">Rating: ${bookmark.rating} Star(s)
    //             <button type="button" class="expand-button js-expand-button">Expand</button>
    //     </p>`
    // };

    function generateAddFormElement() {
        return `
        <div class="add-form-container js-add-form-container">
            <h3>Add Bookmark</h3>
            <form id="js-add-bookmark-form">
                <label for="bookmark-title">Title:</label>
                <input type="text" name="bookmark-title" class="bookmark-title-input js-bookmark-title-input" placeholder="Google"><br>

                <label for="bookmark-url">URL:</label>
                <input type="url" name="bookmark-url" class="bookmark-url-input js-bookmark-url-input" placeholder="https://www.google.com/"><br>

                <label for="bookmark-description">Description:</label>
                <input type="text" name="bookmark-description" class="bookmark-description-input js-bookmark-description-input" placeholder="Use google to search for stuff"><br>

                <label for="bookmark-rating">Rating:</label><br>
                <input type="radio" name="bookmark-rating" class="bookmark-rating-input js-bookmark-rating-input" value="1"> 1 Star<br>
                <input type="radio" name="bookmark-rating" class="bookmark-rating=input js-bookmark-rating-input" value="2"> 2 Stars<br>
                <input type="radio" name="bookmark-rating" class="bookmark-rating-input js-bookmark-rating-input" value="3"> 3 Stars<br>
                <input type="radio" name="bookmark-rating" class="bookmark-rating-input js-bookmark-rating-input" value="4"> 4 Stars<br>
                <input type="radio" name="bookmark-rating" class="bookmark-rating-input js-bookmark-rating-input" value="5"> 5 Stars<br>

                <button type="submit" class="add-bookmark-submit">Add Bookmark</button>
                <button type="button" class="cancel-button js-cancel-button">Cancel</button>
            </form>
        </div>`
    }

    function generateBookmarksString(bookmarksList) {
        //  generate a bookmark string that can be passed into render function
        const bookmarks = bookmarksList.map((bookmark) => generateBookmarkElement(bookmark));
        return bookmarks.join('');
    };

    function generateErrorElement() {
        //  generate html template for errors
    };

    function render(){
        //  render to DOM
        let bookmarks = [ ...store.bookmarks ]
        console.log('`render` ran')
        const bookmarksListString = generateBookmarksString(bookmarks);

        $('.js-bookmarks-list').html(bookmarksListString);
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

    function getBookmarkId(bookmark) {
        return $(bookmark)
            .closest('.js-bookmark')
            .data('bookmark-id');
    }

    function handleBookmarkExpandClicked() {
        // listen for click on bookmark expand button and toggle detailedView property in store
        $('.js-bookmarks-list').on('click', '.js-expand-button', event => {
            store.toggleExpand();
            render();
        });
    };

    function handleBookmarkDeleteClicked() {
        // listen for click on bookmark delete button and delete bookmark
        $('.js-bookmarks-list').on('clicked', '.js-delete-button', event => {
            const id = getBookmarkId(event.currentTarget);

            api.deleteBookmark(id)
                .then(() => {
                    store.findAndDelete(id);
                    render();
                })
                .catch(error => {
                    store.error = error.message;
                    render();
                });
        });
    };



    function bindEventListeners() {
        handleAddBookmarkClicked();
        handleNewBookmarkSubmit();
        handleNewBookmarkCancelClicked();
        handleBookmarkExpandClicked();
        handleBookmarkDeleteClicked();
    };

    return {
        render,
        bindEventListeners,
    };
}());