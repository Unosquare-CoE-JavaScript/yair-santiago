"use strict";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

async function getPostsFromUserID(userID) {
    let posts = await fetch(POSTS_URL).then(res => res.json());
    return posts.filter(post => post.userId === userID);
}

(async function() {
    const userPosts = await getPostsFromUserID(10);
    console.log('posts from user 10 are', userPosts);
})();