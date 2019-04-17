import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

class Auth extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  login(e){
    e.preventDefault();
    this.props.history.push("/home");
  }


  render() {
    return (
      <div id="sAdminAuth">
        <Form 
          onSubmit={e => this.login(e)}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </Form>
      </div>
    );
  }
}

export default Auth;
