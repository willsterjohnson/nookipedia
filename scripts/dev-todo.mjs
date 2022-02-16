/**
 * @param {string} f
 */
export default (f) => f.replace(/\s*?(\*|\/\/)\s*?(@dev|TODO).+?\n/g, "\n");
