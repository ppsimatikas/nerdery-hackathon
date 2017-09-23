require('./justparked.scss');
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
    alert('An email was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <Grid className="park">
         <Row className="park-header">
            <Col xs={3}></Col>
            <Col xs={6}>
            <img src="/static/SweepAlert.png"/>
            <h1 className="welcome">Sweep Alert Chicago</h1>
            <h3>enter your email to get notifications</h3>
               <form onSubmit={this.handleSubmit}>
                 <label>
                    Email: <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <br/>
                    <input type="submit" value="JUST PARKED" className="submit"/>
                </form>
            </Col>
           <Col xs={3}></Col>
        </Row>
     </Grid>
    );
  }
}

export default Justparked;
