/**
 * Remove comments marked `// TODO` or `* @dev`.
 *
 * Does not remove comments marked `* @todo` as the info should be helpful to the user.
 * @param {string} f
 */
export default function devTodoComments(f) {
  return f.replace(/\s*?(\*|\/\/)\s*?(@dev|TODO).+?\n/g, "\n");
}
