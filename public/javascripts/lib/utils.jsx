'use strict';

import Moment from 'moment';

/**
 * This will format a date string into "1:29 AM on Tuesday, December 2nd 2086"
 *
 * @export
 * @param {String} dateString - A String of date time.
 * @returns {String} - The formated string.
 */
export function formatDisplayDate(dateString) {
  return Moment(dateString).format('h:mm A on dddd, MMMM do YYYY');
};