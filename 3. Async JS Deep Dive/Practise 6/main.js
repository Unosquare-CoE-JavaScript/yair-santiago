"use strict";

const ADD_TODO_URL = 'https://jsonplaceholder.typicode.com';

async function addTodo(todoData) {
    try {
        const req = await fetch(`${ADD_TODO_URL}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todoData)
        })
        const result = await req.json();

        console.log('Todo added', result);
    } catch (error) {
        console.error('Error ocurred', error);
    }
}

addTodo({
    completed: true,
    userId: 1,
    title: 'Do the chores'
})