'use strict';

import React from 'react';
import { render } from 'react-dom';

export function setPageTitle(title) {
  const Template = (props) => <h3>{props.title}</h3>;
  render(<Template title={title} />, document.getElementById('pageTitle'));
}
