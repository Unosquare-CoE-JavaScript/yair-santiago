"use strict";

var MAINAPP = (function(nsp) {
    const BASE_URL = 'https://jsonplaceholder.typicode.com';

    const f1 = fetch(`${BASE_URL}/posts`) .then(res => res.json())
    const f2 = fetch(`${BASE_URL}/comments`) .then(res => res.json())
    const f3 = fetch(`${BASE_URL}/todos`) .then(res => res.json())

    Promise.all([f1, f2, f3])
        .then(([posts, comments, todos]) => {
            nsp.posts = posts;
            nsp.comments = comments;
            nsp.todos = todos;
        })

    return nsp;
})(MAINAPP || {});