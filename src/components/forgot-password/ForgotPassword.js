// App.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../core/button/Button.styled';
import Link from '../core/link/Link.styled';
import SignupText from '../core/signup-text/SignupText.styled';
import TextInput from '../core/text-input/TextInput.styled';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

function ForgotPasswordScreen() {
  const navigate = useNavigate();
  
  const loginButtonClicked = () =>{
    navigate("/");
  }
    return (
        <div style={{display: 'flex', justifyContent: "center", alignItems:'center', height: '100vh'}}>
                <Form>
                    <Title>Forgot Password</Title>
                    <TextInput type="email" placeholder="Email Address" />
                    <Button type="submit">Send Email</Button>
                    <SignupText>
                        Already have an account?   <Link to="/" role="button" onClick={loginButtonClicked}>Login</Link>
                    </SignupText>
                </Form>
        </div>
    );
}

export default ForgotPasswordScreen;
