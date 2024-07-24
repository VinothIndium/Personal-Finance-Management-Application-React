// App.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SecurityContext from '../../utils/SecurityContext';
import Button from '../core/button/Button.styled';
import Link from '../core/link/Link.styled';
import SignupText from '../core/signup-text/SignupText.styled';
import TextInput from '../core/text-input/TextInput.styled';

const Container = styled.div`
  display: flex;
  height: 100vh;
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


const LoginScreen = () => {
  const navigate = useNavigate();
  const {setLoggedIn} = useContext(SecurityContext);
  
  const registerButtonClicked = () =>{
    navigate("/register");
  }
  const forgotPasswordButtonClicked = () =>{
    navigate("/forgot-password");
  }

  const loginButtonClicked = () =>{
    setLoggedIn(true);
    localStorage.setItem("loggedIn", "1");
    navigate("/dashboard", {replace: true});
  }
  
    return (
        <Container>
            <LeftSection>
                <Logo>Personal Finance Manager</Logo>
                <Tagline>Say goodbye to financial stress with the help of Finance Manager.</Tagline>
                <Description>Take control of your finances with Finance Manager the quickest and simplest way</Description>
            </LeftSection>
            <RightSection>
                <Form>
                    <Title>Log In</Title>
                    <TextInput type="email" placeholder="Email Address" />
                    <TextInput type="password" placeholder="Password" />
                    <div style={{marginTop:'10px', marginBottom:'10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{alignItems: 'center' }}>
                            <TextInput type="checkbox" />
                            <label style={{ marginLeft: '8px' }}>Remember Me</label>
                        </div>
                        <div style={{ alignItems: 'center' }}>
                        <Link role="button" onClick={forgotPasswordButtonClicked}>
                            Forgot password?
                        </Link>
                        </div>
                    </div>
                    <Button type="submit" onClick={loginButtonClicked}>Login</Button>
                    <SignupText>
                        Don’t have an account?   <Link role="button" onClick={registerButtonClicked}>Register here</Link>
                    </SignupText>
                </Form>
            </RightSection>
        </Container>
    );
}

export default LoginScreen;
