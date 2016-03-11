'use strict';

/**
 * This will define the Query part of the graphql.
 */
import Db from './../../../../models';
import { MainUser } from './schemas';

const fields = {};

export default fields;

// Build out the user query.
fields.user = {
  type: MainUser,
  resolve (root, args, { rootValue: { session } }) {
    return Db.user.findById(session.user.id);
  }
};
