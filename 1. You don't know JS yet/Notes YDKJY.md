# Report / Notes YDKJY

## Chapter 1

This chapter talks about how Javascript is a language that most people wrongly take just as interpreted, when in fact, it has a previous lexical parsing before execution.

This lexical parsing can throw errors before executing _any_ function, which "contradicts" the interpreted principle. Now, Javascript can't either be considered a compiled language, as source instructions are necessary and bytecode/optimization depends on the engine.

There is a way to workaround this optimization, like when using `eval()` to assign a variable or create a function before calling or printing them.

```javascript
function laterAssign() {
    eval("var testVar = '1234';");
    console.log('The value of testVar is', testVar);
}
```

## Chapter 2

This chapter goes deeper in the scope, comparing how there could be marbles and buckets, classifying every marble within their corresponding bucket as it could be about the scope with variables and functions.

There is also a mention that, scopes are up to the closest variable (or function, class, etc) it finds, if it isn't found in such context it will go to the next context and continue like that until it finds itself in the global scope. In the case no declaration is found, then it can go two ways:

  * If strict mode is disabled, it will create the variable on the global scope (window)
  * If strict mode is enabled, it could just throw an error.

## Chapter 3

This is kind of a join between chapter 1 and chapter 2, it starts out clarifying the "scope lookup" as described in those chapters, is more of a concept than the actual working way, where JS engines might or might not create a scope in the lexical parsing phase, as sometimes other imported files or environments might declare/assign them without the analyzer knowing it first.

Next part is the "shadowing" of lexical names, about how this

```javascript
var sameName = "Foo";

function printVar(sameName) {
  sameName = sameName.toUpperCase();
  console.log(sameName);
}
```

  * Will print
    * `"BAR"` when called with `printVar("bar")`  
    * `"FOO"` when called with `printVar(sameName)`
    * `"Foo"` when printing the var from outside

And how this is actually an intended behavior in JS due to the scoping, while not recommended. There's also a mention about how this can be avoided by using the `window` object to access the global scope, but neither recommending to, as code gets confusing.

### NAMED VS ANONYMOUS FUNCTIONS

This section talks about the different ways to create a function, whose simplest declaration is in the form of `function doSomething() {...}` (this is a named function). This is _not_ the only way to create functions in Javascript, and pretty much every of them have different uses.

Methods to create functions include

**ANONYMOUS FUNCTIONS**
```javascript
var doSomething = function() {

}
```

```javascript
var doSomething = () => {

}
```

and a initually-confusing one (which is also named)

```javascript
var doSomething = function somethingElse() {

}
```
This last one might seem like it creates the `somethingElse()` function on the global scope, but it is not the case as it gets into an "implied scope" in `doSomething`.

There is, for example, no difference between arrow functions and the standard definition (`function`) functions in terms of scope.

## Chapter 4

The chapter talks about how there's often a misconception on that the global context should _not_ be used, and that it is a bad practise, but explains there are cases even in complex systems such as bundlers, they do use them in order to modules working as expected.

Next, there is the aclaration, that for browser API's, DOM objects and other helpers, the global context _is_ unavoidable.

### ENVIRONMENT DIFFERENCES

The book states that, depending on where is JS being run, there might be some differences on wheter it is run standalone (as in Node) or in a web browser, the later will provide a "pure", yet somehow confusing environment, with the following oddities:

  * It has the `window` object available..
  * Browser globals _can_ be "shadowed" too.
  * True global variables need to use `var` to avoid being oddly excluded.
  * The variable `window.name` behaves strangely even when being shadowed.
  * Every element with an `id` property can have a global created for it (yet it is not recommended to use them).

In the case JS is run inside a _Web Worker_, there is no window object and global context is only available inside `self`.

In the case of Node, there is an especific object literally called `global`, that while it doens't expose any browser related API's (some of them have been reimplemented, though), it exposes globally to all modules as expected.

## Chapter 5

This part starts making a common example for many JS developers, that just as it says, usually nobody questions why, and the reason would be called "hoisting".

Hoisting is a feature/benefit from the lexical parser phase of the script running, which does "move" function and variable declarations to the top, so they can be used anywhere within the scope. It can be considered usually a "rewrite" of the original script.

Hoisting, however, does take very special (and somehow surprising) behaviors in many cases, like in the following example:

```javascript
var preAssignedVar = "Hey";
console.log(preAssignedVar); // will print "Hey"

var preAssignedVar;
```
The logic might say that if we call `console.log(preAssignedVar)` at the end, the value might be `undefined`, but that is not the case. The value `"Hey"` will be kept, because such assignation has no subsecuent call and `preAssignedVar` was already initiallized, making the following declaration a no-op.

Shall there be another redeclaration (with assignation) to such variable, like
```javascript
var preAssignedVar = undefined;
```
then the value would change for the following lines when called. This reassignation can _only_ be done with `var`, not `let` and even more impossibly with `const`.

A following section explains there is only a declaration when using `var` inside loops, but the reasignation is what makes the value change, like in their example:

```javascript
var keepGoing = true; 
while (keepGoing) {
  var value = Math.random(); 
  if (value > 0.5) {
    keepGoing = false;
  }
}
```
`value` is not redeclared, because of how `var` and hoisting works.

The same will keep true using `let` or `const` in `for` cycles, but make an exception with `const` when doing incremental cicles, because the increment will try to change the constant value.

Last part goes with a warning, which says that `let` and `const`do also hoist, but without being initialized with a value like with , so they're there, just not available to do something with their values. An advice from the author is that these variables should be put at the start of the scope, as a "standard" code would.

## Chapter 6

Now, this book as been talking about how the scopes can mix up things and some advantages/disadvantages of it, but this chapter in particular, now its more about how to limit the exposure or privilege of the variables, as it is considered a _good practise_. The concept reviewed here in particular is POLP (_Principle of Lease Privilege_).

POLP treats variables as something that might get collisions, unexpected behavior/results or non-wanted dependency. All of this relies precisely on how scopes work, like the first paragraph asks: why can't just every variable be on the global scope? The reason is something we've naturally come to avoid as our minds get to understand the code and can be stressed into just one word: problems.

A common way to protect the scope of variables is wrapping their declarations only within functions that return their actual function after wrapping the "global" variables it uses. An example of this is:

```javascript
function wrappedFnWithGlobals() {
  var wrappedResults = {};
  
  function doCalc(n) {
    if (n == 1) return 1;
    if (!wrappedResuls[n]) {
      wrappedResults[n] = n * Math.PI;
    }
    return wrappedResults[n];
  }
  
  return doCalc;
}
```

## Chapter 7

Closure is, in short, the ability or advantage to access objects or variables outside their scope within functions. This is exemplified in the book with:

```javascript
function lookupStudent(studentID) {
  var students = [
      { id: 14, name: "Kyle" },
      { id: 73, name: "Suzy" },
      { id: 112, name: "Frank" },
      { id: 6, name: "Sarah" }
  ];
  return function greetStudent(greeting) {
      var student = students.find(
          student => student.id == studentID
      );
      return `${greeting}, ${student.name}!`;
  };
}
var chosenStudents = [
  lookupStudent(6),
  lookupStudent(112)
];
```

In this part, the peculiarity to this code is the fact that the `studentId` is kept along with the `students` even when a function declaration is returned. The common conception is that the students variable would be deleted by the garbage collector once executed, but instead, it is kept because of the reference inside the closure.

Closure also follows POLP, as the needed variables are _not_ getting modified unintentionally after of the moment they're set up from outside (which may be intended or not). Subsequent calls also keep using the enclosed values so, for example, a counter will only increase or decrease only by the calls inside.

Setting up event listeners is also something that can benefit from closures, as references are used/kept within the setup function.

## Chapter 8

Just like the introduction of this chapter begins with, the Modules are the mix of all that has been thaught here: closures and scopes.

Modules should respect visibility to be called like that: private members (which access should _not_ be exposed outside) and public members (which _can_ and should be exposed outside).

Modules have 3 ways to be declared in Javascript:

* **Clasic Modules**
  It can be done using IIFE or Instance-like definitions.

* **CommonJS Modules**
  (Only available for Node) These modules are defined within their own file, and can use "global" variables or functions inside those files, which won't be output to the global scope unless they're exported using `module.exports`.
  Later they can be imported inside an object by using

  ```javascript
  var Manager = require('path/to/managerModule.js');
  ```

* **ESM **
