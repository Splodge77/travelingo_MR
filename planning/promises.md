# Background to JavaScript Promises

## Why do we need promises?

JavaScript is single threaded: in the browser, user actions like highlighting text are in the same queue as updating styles, and the same queue as JavaScript. A delay in any one thing in a queue will delay all the others.

As a human, the only similar single-threaded activity is a sneeze: everything else stops...

### One solution: Events and Callbacks

If you add an event listener to an element of your page, JavaScript can stop executing until the listener is called.

```JavaScript
var img1 = document.querySelector('.img-1');

img1.addEventListener('load', function() {
  // woo yey image loaded
});

img1.addEventListener('error', function() {
  // argh everything's broken
});
```

But, a simple event listener doesn't allow for events that happen before the event listener starts listening for them, so we have to use something like .complete for images, or "DOMContentLoaded" for documents to start the script.

```JavaScript
var img1 = document.querySelector('.img-1');

function loaded() {
  // woo yey image loaded
}

if (img1.complete) {
  loaded();
}
else {
  img1.addEventListener('load', loaded);
}

img1.addEventListener('error', function() {
  // argh everything's broken
});
```

But that **still** doesn't catch an image which errored before we started listening...  We're stuck.   

### Is there a better way?

Events are useful where you don't care what happened before you attached the listener: keyup, mousedown, onclick etc.

However, events don't work at all well when you need to know if something worked or not aka async success/failure.

In that situation, what you would like to call might look a bit like this:

```JavaScript
img1.callThisIfLoadedOrWhenLoaded(function() {
  // loaded
}).orIfFailedCallThis(function() {
  // failed
});

// and…
whenAllTheseHaveLoaded([img1, img2]).callThis(function() {
  // all loaded
}).orIfSomeFailedCallThis(function() {
  // one or more failed
});
```

or, more simply, using a method "ready" which returns a promise:

```JavaScript
img1.ready().then(function() {
  // loaded
}, function() {
  // failed
});

// and…
Promise.all([img1.ready(), img2.ready()]).then(function() {
  // all loaded
}, function() {
  // one or more failed
});
```

## So wtf is a promise?
A promise is a bit like an event listener, except that:
- a promise can only succeed or fail once
  - it can't switch from fail to success, or vice versa
  - it can't succeed or fail twice
- once you have a result, the promise is immutable
- if a promise has succeeded or failed, and you **later** add a success/failure callback, the correct callback will be called
  - it doesn't matter that the event occurred **before** you added the callback

If you don't need to know **when** something happened, but just **whether** it happened or not, then a promise is what you are looking for.

Put simply, a promise is a _placeholder_ representing the eventual result of an asynchronous operation:
- the promise placeholder will be replaced by the result value (if successful) or reason for failure (if unsuccessful)

Instead of passing callbacks into a function, you attach the callback to the promise - the returned object. This is known as an _asynchronous function call_.

In other words, the pattern you would see if you were working with APIs, reading files, or downloading files: fetch data from various places or in various ways, and then do something once you have all the data in place.

## Promise Terminology
A promise can be:
- fulfilled: The action relating to the promise succeeded
  - the asynchronous operation has completed
  - the promise has a _value_
  - the promise will not change again
- rejected: The action relating to the promise failed
  - the asynchronous operation failed
  - the promise will never be fulfilled
  - the promise has a _reason_ indication why the operation failed
  - the promise will not change again
- pending: Hasn't fulfilled or rejected yet
  - the asynchronous operation hasn't completed yet
  - can transition to fulfilled or rejected

A promise call also be referred to as:
- settled: Has been fulfilled _or_ rejected and is thus _immutable_




## More Detail: How to use a Promise in JavaScript

A promise is always **thenable** i.e. it has a "then()" method which registers callbacks to receive the value/reason on success/failure.


### Generic Usage
#### Create a Promise:
```JavaScript
var promise = new Promise(function(resolve, reject) {
  // do a thing, possibly async, then…
  if (/* everything turned out fine */) {
    resolve("Stuff worked!");
  }
  else {
    reject(Error("It broke"));
  }
});
```
- the promise constructor takes a single argument: a callback with two parameters
```javascript
new Promise(/* executor*/ function (resolve, reject) { ... } );
```
- if everything worked, call resolve(your_success_value)
- if the result fails, call reject(your_fail_value)
- it is a good idea to 'reject' with an Error object, as the stack trace makes debugging easier

**In other words: Mom's promised me a new phone**
Currently, I don't know if I will get the phone or not.
  - the promise is **pending**
There are two potential outcomes:
- I get the phone: the promise is **resolved**
- I don't get the phone: the promise is **rejected**

In code, we create that promise as follows:
```javascript
const isMomHappy = false;

// Promise
const willIGetNewPhone = new Promise(
    function (resolve, reject) {
        if (isMomHappy) {
            const phone = {
                brand: 'Samsung',
                color: 'black'
            };
            resolve(phone); // fulfilled
        } else {
            const reason = new Error('mom is not happy');
            reject(reason); // reject
        }
    }
);
```

#### Consume the Promise:
```JavaScript
promise.then(function(result) {
  console.log(result); // "Stuff worked!"
}, function(err) {
  console.log(err); // Error: "It broke"
});
```
- then() takes two (optional) arguments:
  - a callback for a success case
  - a callback for a failure case
- then() returns a **new** promise

**Will I get my new phone?**
In code, we consume the phone promise like this:
1. askMom() consumes the promise willIgetNewPhone
2. this version uses .catch to handle errors and I don't know why

```javascript
const askMom = function () {
    willIGetNewPhone
        .then(function (fulfilled) {
            // yay, you got a new phone
            console.log(fulfilled);
         // output: { brand: 'Samsung', color: 'black' }
        })
        .catch(function (error) {
            // oops, mom don't buy it
            console.log(error.message);
         // output: 'mom is not happy'
        });
};
askMom();
```

### Chaining promises
You promise your friend that you will show them your new phone when your mum buys it.
#### Create another promise
```javascript
// 2nd promise
const showOff = function (phone) {
    return new Promise(
        function (resolve, reject) {
            const message = 'Hey friend, I have a new ' +
                phone.color + ' ' + phone.brand + ' phone';

            resolve(message);
        }
    );
};
```
Because we're not using reject, we can simply call Promise.resolve to shorten the code
```javascript
// 2nd promise
const showOff = function (phone) {
    const message = 'Hey friend, I have a new ' +
                phone.color + ' ' + phone.brand + ' phone';

    return Promise.resolve(message);
};
```
#### Chain the promises
You can only start the showOff promise after the willIGetNewPhone promise (obviously!) because it depends on your having a new phone...
```javascript
// call our promise
const askMom = function () {
    willIGetNewPhone
    .then(showOff) // chain it here
    .then(function (fulfilled) {
            console.log(fulfilled);
         // output: 'Hey friend, I have a new black Samsung phone.'
        })
        .catch(function (error) {
            // oops, mom don't buy it
            console.log(error.message);
         // output: 'mom is not happy'
        });
};
```
**Care:**
Anything that needs to wait for the fulfilment of promise in order to proceed should be put in .then
In this case, showOff waits to see if the willIGetNewPhone promise results in success or failure before running.

Multiple callbacks can be added by calling .then several times.  The callbacks will be executed in insertion order, but independent of each other.

You can also chain promises after a .catch() i.e. after a failure.




### Hello World and Promises
#### Synchronous function
```javascript
var greeting = sayHello();
console.log(greeting);    // 'hello world’
```

#### Asynchronous function
If sayHello() needs to look up the current greeting from an API then it could return a promise.
Other code could then execute while the greeting was being fetched:
```javascript
var greetingPromise = sayHello();
greetingPromise.then(function (greeting) {
    console.log(greeting);    // 'hello world’
});
```

#### Error Handling
Uses the second argument of the promise's then() method:
```javascript
var greetingPromise = sayHello();
greetingPromise.then(function (greeting) {
    console.log(greeting);    // 'hello world’
}, function (error) {
    console.error('uh oh: ', error);   // 'uh oh: something bad happened’
});
```
Or, alternatively, you can use the syntactic sugar provided by the .catch() method to handle errors:
```javascript
get('story.json').then(function(response) {
  console.log("Success!", response);
}).catch(function(error) {
  console.log("Failed!", error);
})
```
which is the same as the following, but much more readable:
```javascript
get('story.json').then(function(response) {
  console.log("Success!", response);
}).then(undefined, function(error) {
  console.log("Failed!", error);
})
```
This can be very useful when you're chaining together lots of functions, and / or need various layers of error handling, but you'll need to look that up yourself! <https://developers.google.com/web/fundamentals/primers/promises>


### Transforming future values I HAVE NO IDEA WHAT THIS MEANS!
- if the callback function you pass to then() returns a new value, then the final call to then() can be changed by that value.
```javascript
var greetingPromise = sayHello();
greetingPromise.then(function (greeting) {
    return greeting + '!!!!';
}).then(function (greeting) {
    console.log(greeting);    // 'hello world!!!!’
});
```

### Ensuring the correct order of asynchronous operations
A function passed to "then" can return another promise, meaning you can chain the calls together.
This becomes really useful if the input for a subsequent function is the output of an earlier function...

Without promises, you end up in **callback hell** with nested callbacks.

The callback pyramid of doom:
```JavaScript
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```

The promise syntax means you don't need to nest your callbacks, and everything is much easier to read.
Promises to the rescue:
```javascript
doSomething().then(function(result) {
  return doSomethingElse(result);
})
.then(function(newResult) {
  return doThirdThing(newResult);
})
.then(function(finalResult) {
  console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback);
```

Note that ```javascript .catch(failureCallback);``` is short for ```then(null, failureCallback);```

**CARE**
Always return results, otherwise callbacks won't catch the result of a previous promise.


## Modern JavaScript
### ES6 and fat arrow functions

The willIGetNewPhone example looks like this in ES6:
```javascript
/* ES6 */
const isMomHappy = true;

// Promise
const willIGetNewPhone = new Promise(
    (resolve, reject) => { // fat arrow
        if (isMomHappy) {
            const phone = {
                brand: 'Samsung',
                color: 'black'
            };
            resolve(phone);
        } else {
            const reason = new Error('mom is not happy');
            reject(reason);
        }

    }
);

const showOff = function (phone) {
    const message = 'Hey friend, I have a new ' +
                phone.color + ' ' + phone.brand + ' phone';
    return Promise.resolve(message);
};

// call our promise
const askMom = function () {
    willIGetNewPhone
        .then(showOff)
        .then(fulfilled => console.log(fulfilled)) // fat arrow
        .catch(error => console.log(error.message)); // fat arrow
};

askMom();
```
For more on the fat arrow, you can visit ref. <https://strongloop.com/strongblog/an-introduction-to-javascript-es6-arrow-functions/>
<https://developer.ibm.com/node/2015/09/21/an-introduction-to-javascript-es6-arrow-functions/>
### ES7 Async Await
This makes the syntax even prettier, but I'm not going to go into it now!
<https://developers.google.com/web/fundamentals/primers/async-functions>


## Browser support & Compatibility
In Chrome 32, Opera 19, Firefox 29, Safari 8 & Microsoft Edge, promises are enabled by default.
If you want to use them anywhere else, e.g. older browsers, or Node.js, there is a polyfill <https://github.com/jakearchibald/ES6-Promises#readme>
Anything with a _then()_ method is treated as promise-like or _thenable_.
  - any library that returns a Q promise
  - jQuery's deferreds _if_ they are cast to a standard promise: otherwise they are *not* promises at all!




## In Node.js
```
> npm install promise --save
```
```javascript
const Promise = require("promise");
```

The "promise" library also provides a couple of really useful extensions for interacting with node.js
```javascript
var readFile = Promise.denodeify(require('fs').readFile);
// now `readFile` will return a promise rather than
// expecting a callback

function readJSON(filename, callback){
  // If a callback is provided, call it with error as the
  // first argument and result as the second argument,
  // then return `undefined`. If no callback is provided,
  // just return the promise.
  return readFile(filename, 'utf8')
    .then(JSON.parse)
    .nodeify(callback);
}
```

#### Common mistakes when using promises:
<https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html>

#### References:
API reference containing all methods:
<https://developers.google.com/web/fundamentals/primers/promises#promise-api-reference>

Promises Spec: <https://github.com/promises-aplus/promises-spec>

From Scotch.io:
<https://scotch.io/tutorials/javascript-promises-for-dummies>

From MDN:
<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises>

From Google:
<https://developers.google.com/web/fundamentals/primers/promises>

From Spring:
<https://spring.io/understanding/javascript-promises>

From Lindesay:
<https://www.promisejs.org>
