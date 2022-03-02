let students = [
    { name: "Mary", score: 90, school: "East" },
    { name: "James", score: 100, school: "East" },
    { name: "Steve", score: 40, school: "East" },
    { name: "Gabe", score: 90, school: "West" },
    { name: "Rachel", score: 85, school: "East" },
    { name: "Rochelle", score: 95, school: "West" },
    { name: "Lynette", score: 75, school: "East" }
];

let processStudents = function (data, callback) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].school.toLowerCase() === "east") {
            if (typeof callback === "function") {
                callback(data[i]);
            }
        }
    }
}

console.log("Pre-call");

let determineTotal = function () {
    let total = 0, count = 0;

    processStudents(students, obj => {
        total += obj.score;
        count++;
    });

    console.log(`Calculation results: ${total}, count: ${count}`);
}

setTimeout(determineTotal, 0);
console.log("After call.")
