'use strict';


const bookmarksList = (function(){

    function generateBookmarkElement(bookmark) {
        const expandClass = bookmark.expand ? '' : 'hidden';
        const expandButtonName = bookmark.expand ? 'Close' : 'Expand';

        return `
        <li class="bookmark js-bookmark" data-bookmark-id="${bookmark.id}">
            <p class="bookmark-title js-bookmark-title">${bookmark.title}
                <button type="button" class="delete-button js-delete-button">Delete</button>
            </p>
            <p class="bookmark-description js-bookmark-description ${expandClass}">${bookmark.desc}</p>
            <p class="bookmark-link js-bookmark-link ${expandClass}"><a href="${bookmark.url}">Visit Site</a></p>
            <p class="bookmark-rating js-bookmark-rating">Rating: ${bookmark.rating}
                <button type="button" class="expand-button js-expand-button">${expandButtonName}</button>
            </p>
        </li>`
    };

    function generateAddFormElement() {

        return `
        <div class="add-form-container js-add-form-container">
            <h2>Add Bookmark</h2>
            <form aria-label="Add Bookmark Form" id="js-add-bookmark-form" novalidate>
                <div class="title-container">
                    <label for="bookmark-title">Title:</label><br>
                    <input type="text" name="title" id="bookmark-title" class="bookmark-title-input js-bookmark-title-input">
                </div>

                <div class="url-container">
                    <label for="bookmark-url">URL:</label><br>
                    <input type="url" name="url" id="bookmark-url" class="bookmark-url-input js-bookmark-url-input">
                </div>

                <div class="description-container">
                    <label for="bookmark-description">Description:</label><br>
                    <textarea name="desc" id="bookmark-description" class="bookmark-description-input js-bookmark-description-input"></textarea>
                </div>
                
                <fieldset class="rating-container">
                    <legend id="rating-options">Rating:</legend>
                    <input type="radio" name="rating" aria-labelledby="rating-options" id="bookmark-rating-1" class="bookmark-rating-input js-bookmark-rating-input" value="1"> 1<br>

                    <input type="radio" name="rating" aria-labelledby="rating-options" id="bookmark-rating-2" class="bookmark-rating-input js-bookmark-rating-input" value="2"> 2<br>

                    <input type="radio" name="rating" aria-labelledby="rating-options" id="bookmark-rating-3" class="bookmark-rating-input js-bookmark-rating-input" value="3"> 3<br>

                    <input type="radio" name="rating" aria-labelledby="rating-options" id="bookmark-rating-4" class="bookmark-rating-input js-bookmark-rating-input" value="4"> 4<br>

                    <input type="radio" name="rating" aria-labelledby="rating-options" id="bookmark-rating-5" class="bookmark-rating-input js-bookmark-rating-input" value="5"> 5<br>
                </fieldset>

                <div class="form-buttons js-form-buttons">
                    <button type="submit" class="add-bookmark-submit">Add Bookmark</button>
                    <button type="button" class="cancel-button js-cancel-button">Done</button>
                </div>
            </form>
        </div>`
    };

    function generateErrorElement(error) {
        return `
            <p class="error-message js-error-message">Unable to add:<br>${error}<button id="error-cancel">X</button></p>`
    };

    function generateDefaultButtonsElement() {
        return `
        <div class="top-container js-top-container ">
        <button class="add-bookmark-button js-add-bookmark-button" type="button">Add Bookmark</button>

        <label for="ratings-select" class="min-rating-label js-min-rating-label">Minimum Rating:
            <select id="ratings-select" name="min-ratings">
                <option class="js-rating-selected" value="1" selected>1</option> 
                <option class="js-rating-selected" value="2" >2</option>
                <option class="js-rating-selected" value="3">3</option>
                <option class="js-rating-selected" value="4">4</option>
                <option class="js-rating-selected" value="5">5</option>
            </select>
        </label>
    </div>`
    };

    function generateBookmarksString(bookmarksList) {
        //  generate a bookmark string that can be passed into render function
        const bookmarks = bookmarksList.map((bookmark) => generateBookmarkElement(bookmark));
        return bookmarks.join('');
    };

    // function generateErrorElement() {
    //     //  generate html template for errors
    // };

    function render(){
        //  render to DOM
        let bookmarks = [ ...store.bookmarks ];

        if (store.adding) {
            $('.js-top-container').replaceWith(generateAddFormElement())
        } else {
            $('.js-add-form-container').replaceWith(generateDefaultButtonsElement());
        };

        if (store.error) {
            $('.js-error-container').html(generateErrorElement(store.error));
        } else {
            $('.js-error-container').empty();
        };

        if (store.minRating !== 0) {
            bookmarks = bookmarks.filter(bookmark => bookmark.rating >= store.minRating);
        }

        const bookmarksListString = generateBookmarksString(bookmarks);

        $('.js-bookmarks-list').html(bookmarksListString);
    };

    function handleAddBookmarkClicked() {
        //  listen for click on add bookmark button and change adding property of store to true
        $('.js-main').on('click', '.js-add-bookmark-button', event => {
            store.toggleAdding();
            render();
        });
    };

    $.fn.extend({
        serializeJson: function () {
            const formData = new FormData(this[0]);
            const obj = {};
            formData.forEach((val, name) => obj[name] = val);
            return JSON.stringify(obj);
        }
    });

    function handleNewBookmarkSubmit() {
        // listen for submit of add bookmark form and post new bookmark then add to store or catch error and set message in store
        $('.js-main').on('submit', '#js-add-bookmark-form', event => {
            event.preventDefault();
            const newBookmarkData = $(event.currentTarget).serializeJson();

            api.createBookmark(newBookmarkData)
                .then(bookmark => {
                    store.addBookmark(bookmark);
                    render();
                })
                .catch(error => {
                    store.error = error.message;
                    render();
                });
            
            $('#bookmark-title, #bookmark-url, #bookmark-description').val('');
            $('input[name="rating"]').prop('checked', false);
            render();
        });
    };

    function handleNewBookmarkCancelClicked() {
        //  listen for click on add bookmark form cancel button and change adding bookmark property of store to false
        $('.js-main').on('click', '.js-cancel-button', event => {
            store.toggleAdding();
            render();
        });
    };

    function handleBookmarkFilter() {
        $('.js-main').on('change', '#ratings-select', event => {
            const filteredRating = $('#ratings-select').val();
            store.setMinRating(filteredRating);
            render();
        });
    };

    function getBookmarkId(bookmark) {
        return $(bookmark)
            .closest('.js-bookmark')
            .data('bookmark-id');
    };

    function handleBookmarkExpandClicked() {
        // listen for click on bookmark expand button and toggle detailedView property in store
        $('.js-bookmarks-list').on('click', '.js-expand-button', event => {
            const id = getBookmarkId(event.currentTarget);
            const bookmark = store.findById(id);
            const toggleExpand = !bookmark.expand;

            store.findAndUpdate(id, {expand: toggleExpand});
            render();
        });
    };

    function handleBookmarkDeleteClicked() {
        // listen for click on bookmark delete button and delete bookmark
        $('.js-bookmarks-list').on('click', '.js-delete-button', event => {
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

    function handleErrorCancelClicked() {
        $('.js-error-container').on('click', '#error-cancel', event => {
            store.error = null;
            render();
        });
    }



    function bindEventListeners() {
        handleAddBookmarkClicked();
        handleNewBookmarkSubmit();
        handleNewBookmarkCancelClicked();
        handleBookmarkExpandClicked();
        handleBookmarkDeleteClicked();
        handleBookmarkFilter();
        handleErrorCancelClicked();
    };

    return {
        render,
        bindEventListeners,
    };
}());