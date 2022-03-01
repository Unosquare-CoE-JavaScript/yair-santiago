var MAINAPP = (function(app) {
    "use strict";
    
    const API_KEY = 's2bgjn6me0inyj7cwj239iqsvlyd3mje7o4see13n6rq181o9';
    const getUrl = (word) => `https://api.wordnik.com/v4/word.json/${word}/scrabbleScore?api_key=${API_KEY}`;
    
    let scrabbleVal = '';
    const field = document.querySelector('#word');
    const btn = document.querySelector('#submitBtn');
    const results = document.querySelector('#results');

    const getValue = (word) => {
        fetch(getUrl(word))
            .then(res => res.json())
            .then(data => {
                results.textContent = data.value;
            })
    }

    btn.addEventListener('click', function(e) {
        word = field.value;
        getValue(word);
    });

    app.scrabbleVal = scrabbleVal;
})(MAINAPP || {});


