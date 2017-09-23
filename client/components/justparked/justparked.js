import React, { Component } from 'react';
import { Grid, Row, Col, ButtonToolbar, Button, Form } from 'react-bootstrap';

class Justparked extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
    this.setState({value: event.target.value});
  }

    handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <Grid className="home">
         <Row className="home-header">
            <Col xs={3}></Col>
            <Col xs={6}>
            <h1>Welcome to Sweep Alert Chicago</h1>
            <h6>enter your email to get notifications</h6>
               <form onSubmit={this.handleSubmit}>
                 <label>
                    Email:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                    <input type="submit" value="Submit" />
                </form>
            </Col>
           <Col xs={3}></Col>
        </Row>
     </Grid>
    );
  }
}

export default Justparked;
