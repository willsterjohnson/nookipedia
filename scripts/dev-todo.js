/**
 * Remove comments marked `// TODO` or `* @dev`.
 *
 * Does not remove comments marked `* @todo` as the info should be helpful to the user.
 * @param {string} f
 */
export default (f) => f.replace(/\s*?(\*|\/\/)\s*?(@dev|TODO).+?\n/g, "\n");
