"use strict";

var MAINAPP = (function(nsp) {
    const BASE_URL = 'https://jsonplaceholder.typicode.com';

    fetch(`${BASE_URL}/posts`)
        .then(res => res.json())
        .then(data => nsp.posts = data);

    fetch(`${BASE_URL}/comments`)
        .then(res => res.json())
        .then(data => nsp.comments = data);

    fetch(`${BASE_URL}/todos`)
        .then(res => res.json())
        .then(data => nsp.todos = data);

    return nsp;
})(MAINAPP || {});