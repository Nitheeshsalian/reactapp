
import React, { useState } from 'react';

import { Container, Form, Button, Alert, Card } from 'react-bootstrap'

import './signup.css';
import { useHistory } from "react-router-dom";

function Signup(props) {
  let history = useHistory();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [errmessage, setErrmessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setError(true);
    } else {
      if (password !== confirmpassword) {
        setError(true)
        setErrmessage("Passwords won't match")
      } else {
        (async () => {
          setLoading(true)
          const rawResponse = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
          });
          const response = await rawResponse.json();
          setLoading(false)
          console.log(response);

          if (response.statusCode && response.statusCode === 200)
            history.push("/home")
          else {
            setError(true)
            setErrmessage(response.message)
          }

        })();
      }
    }
  };

  function login() {
    history.push("/");
  }

  return (
    <Container className="container" noValidate validated={error} >
      <Card body>
        <Form onSubmit={handleSubmit} className="form">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control required type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control required type="password" placeholder="Password" value={confirmpassword} onChange={e => setConfirmpassword(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="btngroup">
            <Button variant="primary" type="submit" disabled={loading} className="button">
              {loading ? 'Loading…' : 'Signup'}
            </Button>
            {error ?
              <Alert variant="danger">
                {errmessage}
              </Alert> : null}
          </Form.Group>
        </Form>
        <div className="accountrow">
          Already have account ?
         <div className='signuptext' onClick={login}> Login</div >
        </div>
      </Card>
    </Container>
  );
}


export default Signup;