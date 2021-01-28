import React, {Component} from 'react';
import { ReactFormBuilder, ElementStore } from 'react-form-builder2';

class FormBuilder extends  Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    };
    const update = this._onChange.bind(this);
    ElementStore.subscribe(state => update(state.data));
  }

  _onChange(data) {
    this.setState({
      data,
    });
  }

  render() {

    console.log(this.state.data);

    return (
      <div className="site-section">
          <div className="container">
              <div className="row">
                <div className="col-md-12 heading-section">
                  <h1>Formbuilder</h1>
                  <ReactFormBuilder data={this.state.data} />
            </div>
          </div>
        </div>
      </div>
  )
  }
  
}

export default FormBuilder;