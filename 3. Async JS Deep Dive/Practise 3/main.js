"use strict";

const massiveProcess = function(num) {
    return new Promise(res => {
        let result = 0;
        setTimeout(function() {
            for (let i = num ** 7; i >= 0; i--) {        
                result += Math.atan(i) * Math.tan(i);
            };
            res(result);
        }, 0);
    })
}

massiveProcess(10)
    .then(val => console.log('massive val result', val))
console.log('simple calc', 12*10*5);