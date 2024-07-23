// App.js
import React from 'react';
import styled from 'styled-components';
import Button from '../core/button/Button.styled';
import Link from '../core/link/Link.styled';
import SignupText from '../core/signup-text/SignupText.styled';
import TextInput from '../core/text-input/TextInput.styled';

const Container = styled.div`
    display: flex;
    height: 100vh;
    align-items: center;
`;

const LeftSection = styled.div`
  flex: 1;
  background: linear-gradient(to bottom right, #3b8bd4, #1e64a3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 20px;
  text-align: center;
`;

const Logo = styled.div`
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Tagline = styled.div`
  font-size: 1.5em;
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 1em;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;


function RegisterScreen() {
    return (
        <Container>
                <Form>
                    <Title>Log In</Title>
                    <TextInput type="email" placeholder="Email Address" />
                    <Button type="submit">Register</Button>
                    <SignupText>
                        You will receive an invite to login <Link to="/">Email</Link>
                    </SignupText>
                </Form>
        </Container>
    );
}

export default RegisterScreen;
