function* randomValue(end) {
    while ( true ) {
        yield (Math.floor(Math.random() * end) + 1);
    }
}

let rand50 = randomValue(50);
let rand20 = randomValue(20);

console.log('random values from generator function', rand50.next(), rand20.next());