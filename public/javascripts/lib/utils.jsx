'use strict';

import Moment from 'moment';
import _ from 'lodash';

/**
 * This will format a date string into "1:29 AM on Tuesday, December 2nd 2086"
 *
 * @export
 * @param {String} dateString - A String of date time.
 * @returns {String} - The formated string.
 */
export function formatDisplayDate(dateString) {
  return Moment(dateString).format('h:mm A on dddd, MMMM do YYYY');
}

/**
 * This will extract that value(s) from the subject
 * passed on the path given.
 * Lets say that I want an array of tasks.
 * EX.
 * ****************************
 * Subject = [
 *  {
 *    id: 1,
 *    tasks: [
 *      {
 *        id: 1,
 *        name: 'Test'
 *      },
 *      {
 *        id: 2,
 *        name: 'Test 2'
 *      }
 *    ]
 *  },
 *  {
 *    id: 2,
 *    tasks: [
 *      {
 *        id: 16,
 *        name: 'yay!'
 *      },
 *      {
 *        id: 28,
 *        name: 'my task'
 *      }
 *    ]
 *  }
 * ];
 *
 * path = '*.tasks.*';
 * *****************************
 * This will get you an array of tasks.
 *
 * @param {Object|Array} subject The haystack.
 * @param {string} pathStr The path to the needle.
 */
export function extract(subject, pathStr) {
  const path = _.split(pathStr, '.');
  const next = _.head(path);
  const remainder = _.size(path);
  const tail = _.join(_.tail(path), '.');

  if (next == '*' && remainder > 1) {
    return _.reduce(subject, (carry, item) => {
      carry = carry.concat(extract(item, tail));
      return carry;
    }, []);
  }

  if (next == '*' && remainder == 1) {
    return subject;
  }

  if (remainder > 1) {
    return extract(subject[next], tail);
  }

  return subject[next];
}