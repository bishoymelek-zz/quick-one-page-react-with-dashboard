import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  async login(e) {
    e.preventDefault();
    var resLogin = await fetch("/api/auth/login", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    });
    if (resLogin.status === 200) {
      this.props.history.push('/home');
    } else {
      const error = new Error(resLogin.error);
      console.log(error);
    }
  }


  render() {
    return (
      <div id="sAdminAuth">
        <Form
          onSubmit={e => this.login(e)}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.handleInputChange} value={this.state.email} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleInputChange} value={this.state.password} />
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
