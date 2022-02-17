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