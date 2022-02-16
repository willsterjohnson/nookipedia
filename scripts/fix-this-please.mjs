/**
 * @param {string} f
 */
export default (f) => f.replace('/// <reference types="package/types" />', '/// <reference types="./types" />');
