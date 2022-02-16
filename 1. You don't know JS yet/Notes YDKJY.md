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

There is also a mention that, scopes are up to the closest variable it finds, it it isn't found in such context it will go to the next context and continue like that until it finds itself in the global scope. In the case no declaration is found, then it can go two ways:

  * If strict mode is disabled, it will create the variable on the global scope (window)
  * If strict mode is enabled, it could just throw an error.

