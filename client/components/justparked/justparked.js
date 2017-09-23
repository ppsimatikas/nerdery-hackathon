require('./justparked.scss');
import React, { Component } from 'react';
import { Grid, Row, Col, ButtonToolbar, Button, Form } from 'react-bootstrap';

class Justparked extends Component {

    constructor(props) {
        super(props);
        this.state = {phone: '', email: ''};
    }

  handleChangePhone = (event) => {
    this.setState({phone: event.target.value});
  }

    handleChangeEmail = (event) => {
    this.setState({email: event.target.value});
  }

  handleSubmit = (event) => {
    //alert('A phone number was submitted: ' + this.state.value);
    event.preventDefault();

    this.props.justParked(this.state);
  }

  render() {
    return (
      <Grid className="park">
         <Row className="park-header">
            <Col xs={12}>
                <h3>Enter your email / mobile number to get notifications</h3>
               <form onSubmit={this.handleSubmit}>
               <label>
                    Email: <input type="text" value={this.state.email} onChange={this.handleChangeEmail} />
                </label>
                 <label>
                    Mobile: <input type="text" value={this.state.phone} onChange={this.handleChangePhone} />
                </label>
                <br/>
                    <input type="submit" value="JUST PARKED" className="submit"/>
                </form>
            </Col>
        </Row>
     </Grid>
    );
  }
}

export default Justparked;
