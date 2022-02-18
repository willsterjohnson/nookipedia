/**
 * This shouldn't be necessary, but here we are.
 *
 * Please submit a PR if you know how to fix it :)
 * @param {string} f
 */
export default function fixReferences(f) {
  return f
    .replace('/// <reference types="package/types" />', '/// <reference types="./types" />')
    .replace('/// <reference path="./types/index.ts" />', '/// <reference types="./types" />');
}
