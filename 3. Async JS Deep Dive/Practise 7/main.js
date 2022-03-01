var MAINAPP = (function(app) {
    "use strict";

    const BASE_URL = 'https://jsonplaceholder.typicode.com';

    (async function() {
        try {
            const req = await fetch(`${BASE_URL}/posts`);
            const posts = await req.json();
    
            app.posts = posts;
        } catch (error) {
            console.error('Failed to retreive posts', error);
        }
    })();

    return app;
})(MAINAPP || {});