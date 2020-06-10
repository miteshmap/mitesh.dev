---
title: "Cache promise api request"
path: "/promise-api-request-cache"
date: "2020-03-01"
author: "Mitesh Patel"
excerpt: "React Fetcher with cache for axios request, based on a talk of Dan Abramov: https://youtu.be/nLF0n9SACd4?t=877"
tags: ["javascript", "react.js"]
---

This blog is Just a try to mimic what Dan Abramov did in one of his talk.

`youtube: nLF0n9SACd4?t=877`

First we create a class `CacheSearch`, which will cache the search result based on argument we pass.

`CacheSearch.js`
```javascript
/**
 * Cache class for search.
 *
 * Avoid unnecessary api request by caching the results.
 */
class CacheSearch {
  constructor() {
    this.query = '';
    this.queryCount = 0;
    this.cache = {};
    this.cacheHits = 0;
    this.cacheHitsHistory = [];
  }

  getResults(query) {
    this.query = JSON.stringify(query);
    if (this.cache[this.query]) {
      this.cacheHits = this.cacheHits + 1;
      this.queryCount = this.queryCount + 1;
      this.cacheHitsHistory.concat(this.query);
      return this.cache[this.query];
    }
    return null;
  }

  cacheResult(results) {
    this.cache[this.query] = results;
    this.queryCount = this.queryCount + 1;
    return results;
  }
}

export default CacheSearch;
```

Now, we use that class to create and save a cach object, so next time whenever the same function with same argument make a fetch request we can return the same result to avoid any api call.

`cache-objects.js`
```javascript
import CacheSearch from "./CacheSearch";

let tempCacheObjects = {};
/**
 * Helper function to initiate only single object
 * for any given promise function name.
 */
export const createCacheObject = func => {
  if (typeof tempCacheObjects[func.name] === "undefined") {
    tempCacheObjects[func.name] = new CacheSearch();
  }
  return tempCacheObjects[func.name];
};
```

Helper function to handle api request for GET method for now.

Created helper method to avoid error handling everytime we make api requests. This general function will always be used to make api request, and it handles caching, returns error correctly so on usage does not have to do comoplicated condition check and returns data in promise.

`createFetcher.js`
```javascript
import { createCacheObject } from "./cache-objects";

export const createFetcher = promiseFunc => {
  return {
    read: arg => {
      // Initiate cache and cache responses of stores to avoid
      // Duplicate api calls.
      let cachedObj = createCacheObject(promiseFunc);
      let cachedResults = cachedObj.getResults(arg);
      if (!cachedResults) {
        try {
          return promiseFunc(arg).then(
            response => {
              if (!response) {
                return { error: "error!" };
              }

              if (typeof response.data !== "object") {
                return { error: "error!" };
              }

              if (!response.data.error && response.data.error) {
                console.error(cart_result.error_message);
                return { error: "error!" };
              }

              cachedObj.cacheResult(response.data);
              return response.data;
            },
            reject => {
              return { error: reject };
            }
          );
        } catch (error) {
          return new Promise(resolve => resolve({ error: error }));
        }
      }
      // read: should always return promise, so that we don't have to
      // check at api call point if it's a promise or not.
      return new Promise(resolve => resolve(cachedResults));
    }
  };
};
```

And finally the usage:

Fairly simple, you create a function to make an api request, pass that function to createFetcher, which will return a class object. in which you can pass the argument with `.read`

```javascript
export const fetchItems = arg => {
  const GET_ITEMS = url(`fetch/item/${arg.id}`);
  return Axios.get(GET_ITEMS);
};

const newFetcher = createFetcher(fetchItems);
// this will trigger api request.
let list = newFetcher.read({id: 1});

list.then(
  response => {
    if (typeof response.error !== 'undefined') {
     // Track errors..
     console.error(response.error);
    }
    else {
       this.setState({item: response});
    }
  }
);
```
