import React, { useCallback, useState } from 'react';
import { withRouter } from 'react-router';
import { db } from '../firebase';
import 'firebase/auth';
import { LogWithGoogle } from '../components/Googlelogin';
import { SectionTitle } from '../components/SectionTitle';
import { Button, Input } from 'react-rainbow-components';
import { Center } from '@chakra-ui/react';
import styled from 'styled-components';
import { Routes } from '../routing/router';
import { AiOutlineConsoleSql } from 'react-icons/ai';

const SignUp = ({ history }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const [firstname, setName] = useState('');
    const [lastname, setLastName] = useState('');

    const inputStyle = {
        maxWidth: 700,
        border: 1,
        paddingBottom: 20
    };

    const buttonStyles = {
        paddingLeft: 30,
        paddingRight: 30
    };

    const Wrapper = styled.div`
        display: flex;
        flex-direction: column;
        border-radius: 2500px;
    `;

    const MainWrapper = styled.div`
        padding: 32px 19px 117px;
    `;

    const handleSignUp = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            setName(event.target[0].value);
            setLastName(event.target[1].value);
            try {
                await db.app
                    .auth()
                    .createUserWithEmailAndPassword(email.value, password.value)
                    .then(
                        db.app.auth().onAuthStateChanged(user => {
                            if (user) {
                                setCurrentUser(user.uid);
                            }
                        })
                    );
                history.push(Routes.Setup);
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const insertDetails = async e => {
        await db.app.auth().onAuthStateChanged(user => {
            e.preventDefault();
            if (user) {
                setCurrentUser(user.uid);
                db.collection('Users').add({ email: user.email, displayName: firstname + ' ' + lastname });
            }
        });
    };

    return (
        <MainWrapper>
            <div style={{ backgroundColor: '#E5E5E5', margin: '-32px -19px 0 -19px', padding: '32px 21px' }}>
                <SectionTitle
                    subtitle="Rozpocznij swoj?? podr???? wype??niaj??c poni??sze pola lub kliknij:"
                    title="Rejestracja"
                />
            </div>
            <Wrapper>
                <LogWithGoogle />
                <form onSubmit={handleSignUp}>
                    <Input labelAlignment="left" label="Imi??" style={inputStyle} name="firstname" type="text" />
                    <Input labelAlignment="left" label="Nazwisko" name="lastName" style={inputStyle} type="text" />
                    <Input label="Email" labelAlignment="left" style={inputStyle} name="email" type="email" />
                    <Input label="Has??o" labelAlignment="left" style={inputStyle} name="password" type="password" />
                    <Center pt={10}>
                        <Button
                            shaded
                            style={buttonStyles}
                            label="Do????cz"
                            onClick={insertDetails}
                            variant="brand"
                            type="submit"
                        />
                    </Center>
                </form>
            </Wrapper>
        </MainWrapper>
    );
};

const Registration = withRouter(SignUp);

export { Registration };
