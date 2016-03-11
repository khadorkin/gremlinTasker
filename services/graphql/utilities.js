'user strict';

import _ from 'lodash';

/**
 * This will build out the items needed for a query for sequalize.
 *
 * @param {Object} model - A sequalize model.
 * @param {Object} requestParams - A GraphQL resolve args.
 * @return {Object} A sequalize query object.
 */
export function buildQueryArgs(model, requestParams) {
  const attributes = model.attributes;
  const query = {
    where: {}
  };

  // Sort out what belongs where.
  _.forIn(requestParams, (value, key) => {
    // If an attribute of the model, put it in the where clause.
    // Else it's a query attribute (limit, order, offset);
    if (_.has(attributes, key)) {
      query.where[key] = value;
    } else {
      query[key] = value;
    }
  });

  return query;
}