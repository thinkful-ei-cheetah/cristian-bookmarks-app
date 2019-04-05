'use strict';


const api = (function() {
    
    const baseURL = 'https://thinkful-list-api.herokuapp.com/cristian'

    const fetchList = function(...args) {
        let error;
        return fetch(...args)
            .then(res => {
                if (!res.ok) {
                    error = {code: res.status};
                }
                return res.json();
            })
            .then(jsonData => {
                if (error) {
                    error.message = jsonData.message;
                    return Promise.reject(error);
                }
                return jsonData;
            });
    };

    // get method tested and working
    const getBookmarks = function() {
        return fetchList(`${baseURL}/bookmarks`);
    };

    const createBookmark = function(title, url, desc, rating) {
        const newBookmark = JSON.stringify({title, url, desc, rating});

        return fetchList(`${baseURL}/bookmarks`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: newBookmark
        });
    };

    const deleteBookmark = function(id) {
        return fetchList(`${baseURL}/bookmarks/${id}`, {method: 'DELETE'});
    };

    
    return {
        getBookmarks,
        createBookmark,
        deleteBookmark,
    };

}());