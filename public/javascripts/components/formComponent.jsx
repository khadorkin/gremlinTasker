'use strict';

import React from 'react';

export default class FormComponent extends React.Component {

  constructor(props) {
    super(props);

    // Bind the local instance to the methods.
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(fieldName) {
    return (event) => {
      let state = {};
      state[fieldName] = event.target.value;
      this.setState(state);
    };
  }
}