import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { db } from '../firebase';
import { AuthContext } from '../FirebaseDB/Auth';
import { LogWithGoogle } from '../components/Googlelogin';
import { SectionTitle } from '../components/SectionTitle';
import { Button, Input } from 'react-rainbow-components';
import { Box } from '@chakra-ui/react';
import { Center, Container } from '@chakra-ui/react';
import styled from '@emotion/styled';

const inputStyle = {
    maxWidth: 700,
    border: 1,
    paddingBottom: 20
};

const buttonStyles = {
    paddingLeft: 30,
    paddingRight: 30
};

const StyledDiv = styled.div`
    padding: 10px;
    font-weight: 400;
    font-size: 14px;
    line-height: 40px;
`;
const StyledLink = styled.a`
    padding: 10px;
    font-weight: 400;
    font-size: 14px;
    line-height: 40px;
    color: #01b6f5;
    cursor: pointer;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 2500px;
`;

const MainWrapper = styled.div`
    padding: 32px 19px 117px;
`;

const Login = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await db.app.auth().signInWithEmailAndPassword(email.value, password.value);
                history.push('/');
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <MainWrapper>
            <div style={{ backgroundColor: '#E5E5E5', margin: '-32px -19px 0 -19px', padding: '32px 21px' }}>
                <SectionTitle
                    subtitle="Rozpocznij swoją podróż wypełniając poniższe pola lub kliknij:"
                    title="Rejestracja"
                />
            </div>
            <Wrapper>
                <LogWithGoogle />
                <form onSubmit={handleLogin}>
                    <Input label="Email" labelAlignment="left" style={inputStyle} name="email" type="email" />
                    <Input label="Hasło" labelAlignment="left" style={inputStyle} name="password" type="password" />
                    <Center pt={10}>
                        <Button style={buttonStyles} shaded label="Zaloguj" variant="brand" type="submit" />
                    </Center>
                    <Box d="flex" position="relative" w="100%" justifyContent="center" paddingTop="20px">
                        <StyledDiv>Nie masz konta?</StyledDiv>
                        <StyledLink href="/rejestracja">Zarejestruj się</StyledLink>
                    </Box>
                </form>
            </Wrapper>
        </MainWrapper>
    );
};

const SignIn = withRouter(Login);

export { SignIn as Login };