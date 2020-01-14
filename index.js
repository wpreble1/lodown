'use strict';

// YOU KNOW WHAT TO DO //

/**
 * identity: Returns the value unchanged.
 * 
 * @param {Any Value} value: Any value
 * 
 * @return {Any Value}: The input value unchanged
**/

function identity(value) {
    return value;
}

module.exports.identity = identity;

/**
 * first: Returns the first number of items of an array. 
 * 
 * @param {Array} array: An array of values.
 * @param {Number} number: The number of values to return from the beginning of the given array.
 * 
 * @return {Array}: An array of values from the beginning of the given array with the same 
 * length as the number given.
**/

function first(array, number) {
    if (!Array.isArray(array) || number < 0) return [];
    if (typeof number !== 'number' || number === 1) return array[0];
    if (number >= array.length) return array;
    let shortArr = [];
    for (let i = 0; i < number; i++) {
        shortArr.push(array[i]);
    }
    return shortArr;
}

module.exports.first = first;

/**
 * last: Returns the last number of items of an array.
 * 
 * @param {Array} array: An array of values.
 * @param {Number} number: The number of values to return from the end of the given array.
 * 
 * @return {Array}: An array of values from the end of the given array with the same length
 * as the number given.
**/

function last(array, number) {
    if (!Array.isArray(array) || number < 0) return [];
    if (typeof number !== 'number') return array[array.length - 1];
    if (number >= array.length) return array;
    let shortArr = [];
    for (let i = array.length - number; i < array.length; i++) {
        shortArr.push(array[i]);
    }
    return shortArr;
}

module.exports.last = last;

/**
 * indexOf: Returns the first index of the array at which the value is located.
 * 
 * @param {Array} array: An array over which to search for the given value.
 * @param {Any Value} value: Any value that may be contained in the given array.
 * 
 * @return {Index of the Value}: The first index of the array at which the value is located. 
 * If the value is not found in the array, return -1.  
**/

function indexOf(array, value) {
    for (let i = 0; i < array.length; i++) {
        if (value === array[i]) return i;
    }
    return -1;
}

module.exports.indexOf = indexOf;

/**
 * contains: Uses indexOf to check if a given value is found in the given array.
 * 
 * @param {Array} array: An array in which to search for the value.
 * @param {Any Value} value: Any value that may be contained in the given array.
 * 
 * @return {Boolean}: Returns true if the value is found and false if not.
**/

function contains(array, value) {
    return (indexOf(array, value) !== -1) ? true : false;
}

module.exports.contains = contains;

/**
 * each: Loops over a collection, Array or Object, and applies the Function to each value in 
 * the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} func: The Function to be applied to each value in the collection.
**/

function each(collection, func) {
    if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
            func(collection[i], i, collection);
        }
    } else {
        for (let key in collection) {
            func(collection[key], key, collection);
        }
    }
}

module.exports.each = each;

/**
 * unique: Loops over an Array and return a new Array with duplicates removed.
 * 
 * @param {Array} array: An Array to iterate through.
 * 
 * @return {Array}: The Array of only unique elements. 
**/

function unique(array) {
    let uniqueArray = [];
    for (let element of array) {
        if (!contains(uniqueArray, element)) {
            uniqueArray.push(element);
        }
    }
    return uniqueArray;
}

module.exports.unique = unique;


/**
 * filter: Loops over an Array, and returns an Array of values for which the calling Function 
 * returns true.
 * 
 * @param {Array} array: An Array to iterate through.
 * @param {Function} func: The Function to be applied to each value in the Array. 
 * 
 * @return {Array}: An Array of values which resolved to truthy when passed to the Function.
**/

function filter(array, func) {
    let filterArray = [];
    for (let i = 0; i < array.length; i++) {
        if (func(array[i], i, array)) {
            filterArray.push(array[i]);
        }
    }
    return filterArray;
}

module.exports.filter = filter;

/**
 * reject: Loops over an Array, and returns an Array of values for which calling the Function
 * returns false.
 * 
 * @param {Array} array: An Array to iterate through.
 * @param {Function} func: The Function to be applied to each value in the Array. 
 * 
 * @return {Array}: An Array of values which resolved to falsy when passed to the Function.
**/

function reject(array, func) {
    const filterArray = filter(array, func);
    const rejectArray = [];
    for (let ele of array) {
        if (!contains(filterArray, ele)) rejectArray.push(ele);
    }
    return rejectArray;
}

module.exports.reject = reject;

/**
 * partition: Loops over an Array and sorts elements into a filtered array and a rejected 
 * array.
 * 
 * @param {Array} array: An Array to iterate through.
 * @param {Function} func: A Function to be applied to the elements of the Array.
 * 
 * @return {Array}: An Array of 2 Sub-Arrays one of which contains filtered 
 * elements, the other which contains rejected elements.
**/

function partition(array, func) {
    return [filter(array, func), reject(array, func)];
}

module.exports.partition = partition;

/**
 * map: Calls a Function for each element in a collection, saves the return value in a new 
 * Array, and returns the new Array.
 * 
 * @param {Array or Object} collection: An Array or Object to iterate across.
 * @param {Function} func: A Function to be applied to the elements of the Array or Object.
 * 
 * @return {Array}: An Array of return values of the callback Function. 
**/

function map(collection, func) {
    let mapArr = [];
    each(collection, (element, position, collection) => mapArr.push(func(element, position, collection)));
    return mapArr;
}

module.exports.map = map;

/**
 * pluck: Loops through an Array of Objects and returns the values of a given Property.
 * 
 * @param {Array} arrOfObj: An Array of Objects to be iterated through.
 * @param {String} property: A String representing a property.
 * 
 * @return {Array}: An Array containing the value of property for every element in the Array 
 * of Objects.
**/

function pluck(arrOfObj, property) {
    return map(arrOfObj, (obj) => obj[property]);
}

module.exports.pluck = pluck;

/**
 * every: Determines if every element of a collection resolves to a truthy value when the 
 * callback Function is applied. 
 * 
 * @param {Array or Object} collection: A collection to iterate through.
 * @param {Function} func: The Function to be applied to every element of the collection.
 * 
 * @return {Boolean}: Returns true if the function call of every element return truthy. 
 * Returns false if at least one function call of an element returns falsy. If a callback 
 * function is not provided, Every will return true if every element in the collection is a 
 * truthy value. Returns false if at least one element is falsy.
**/

function every(collection, func) {
    if (typeof func !== 'function') return (contains(collection, false)) ? false : true;
    let mapArr = map(collection, (ele, position, collection) => func(ele, position, collection));
    return (contains(mapArr, false)) ? false : true;
}

module.exports.every = every;

/**
 * some: Determines if a single element of a collection resolves to a truthy value when the 
 * callback Function is applied.
 * 
 * @param {Array or Object} collection: A collection to iterate through.
 * @param {Function} func: The Function to be applied to every element of the collection.
 * 
 * @return {Boolean}: Returns true if the function call of at least one element return truthy. 
 * Returns false if the function call of every element returns falsy. If a callback function 
 * is not provided, Some will return true if at least one element in the collection is a 
 * truthy value. Returns false if all elements in the collection are falsy values.
**/

function some(collection, func) {
    if (typeof func !== 'function') return (contains(collection, true)) ? true : false;
    let mapArr = map(collection, (element, position, collection) => func(element, position, collection));
    return (contains(mapArr, true)) ? true : false;
}

module.exports.some = some;

/**
 * reduce: Resolves an entire Array to a single value by applying a callback Function to each 
 * element.
 * 
 * @param {Array} array: An Array of Numbers to be reduced by applying the callback Function.
 * @param {Function} func: A callback Function designed to accept a current value, a current 
 * element, and the index of the current element and return a single accumulated value.
 * @param {Number or String} seed: A Number that represents a starting value.
 * 
 * @return {Number}: The result of the function call on the final element after accumulating 
 * the results of all previous elememnts.
**/

function reduce(array, func, seed) {
    let current = seed;
    if (current === undefined) {
        current = array[0];
        for (let i = 1; i < array.length; i++) {
            current = func(current, array[i], i);
        }
        return current;
    }
    for (let i = 0; i < array.length; i++) {
        current = func(current, array[i], i);
    }
    return current;
}

module.exports.reduce = reduce;

/**
 * extend: Takes multiple objects and returns a single object with all the properties of the 
 * given objects.
 * 
 * @param {Any Amount of Objects} ...objects: The spread operator (...) will convert any number
 * of objects given as arguments into an array of objects. 
 * 
 * @return {Object}: The result of assigning all properties of the given Objects to a single 
 * Object using the reduce function and Object.assign method.
**/

function extend(...objects) {
    return reduce(objects, (current, obj) => Object.assign(current, obj));
}

module.exports.extend = extend;