var MAINAPP = (function(app) {
    "use strict";

    const BASE_URL = 'https://jsonplaceholder.typicode.com';

    (async function() {
        try {
            const fetchPromises = [
                fetch(`${BASE_URL}/posts`).then(res => res.json()),
                fetch(`${BASE_URL}/comments`).then(res => res.json()),
                fetch(`${BASE_URL}/todos`).then(res => res.json()),
            ]

            const [posts, comments, todos] = await Promise.all(fetchPromises);

            app.posts = posts;
            app.comments = comments;
            app.todos = todos;
        } catch (error) {
            console.error('Failed to retreive posts', error);
        }
    })();

    return app;
})(MAINAPP || {});