import { times, flatMap } from 'lodash';

module.exports = {
  /**
   * Takes an array of styles and 'multiplies' it using `_.times` until there
   * is enough for all the items to be displayed
   */
  mapStyles: items => styles => {
    const iterations = Math.ceil(items.length / styles.length);
    return flatMap(times(iterations, () => styles));
  },
};
