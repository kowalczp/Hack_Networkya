import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'react-rainbow-components';
import { Input } from 'react-rainbow-components';

import { Select } from 'react-rainbow-components';
import { GoBack } from '../components/GoBack';

const View = styled.div`
    height: 750px;
    padding: 54px;
    background-color: white;
    padding: 5px;
    border-radius: 20px 20px 0px 0px;
    /* align-items: end; */
    position: fixed;
    left: 0;

    right: 0;
    bottom: 0;
`;

const Main = styled.div`
    background: '#E5E5E5';
    height: 100vh;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const inputStyle = {
    maxWidth: 700,
    border: 1,
    paddingBottom: 20,
    color: '#FFFF'
};
const inputStyleTime = {
    Width: 700,
    border: 1,
    paddingBottom: 20
};
const buttonSize = {
    width: '200px'
};

const CustomInput = styled(Input)`
    border: 1px solid #081449;
`;

export const AddObjective = () => {
    const [values, setValues] = useState({
        objective: '',
        starttime: '',
        endtime: '',
        isTime: false,
        prize: '',
        industry: ''
    });

    const onSave = () => {
        // add to FB
        console.log('values', values);
    };

    const options = [
        { value: 'IT', label: 'IT' },
        { value: 'muzyka', label: 'muzyka' },
        { value: 'sport', label: 'sport' }
    ];
    return (
        <Wrapper>
            <Main>
                <GoBack url="Pati page" />
            </Main>
            <View>
                <div style={{ margin: '23px' }}>
                    <h1
                        style={{
                            color: '#9F9F9F',
                            left: '32px',
                            top: '75px',
                            marginBottom: '66px',
                            fontFamily: 'Lato',
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            fontSize: '19px',
                            lineHeight: '100%',
                            letterSpacing: '-0.01em'
                        }}
                    >
                        Dodaj cel
                    </h1>
                    <CustomInput
                        label="Nazwa Celu"
                        labelAlignment="left"
                        style={inputStyle}
                        name="objective"
                        type="text"
                        onChange={e => setValues({ ...values, objective: e.target.value })}
                    />
                    <Input
                        label="Rozpoczęcie"
                        labelAlignment="left"
                        style={inputStyleTime}
                        name="starttime"
                        type="datetime-local"
                        // className="rainbow-p-around_medium"
                        onChange={e => setValues({ ...values, starttime: e.target.value })}
                    />
                    <Input
                        label="Zakonczenie"
                        labelAlignment="left"
                        style={inputStyleTime}
                        name="endtime"
                        type="datetime-local"
                        // className="rainbow-p-around_medium"
                        onChange={e => setValues({ ...values, endtime: e.target.value })}
                    />
                    <Input
                        labelAlignment="left"
                        type="checkbox"
                        style={inputStyle}
                        name="isTime"
                        label="Czas nieokreślony"
                        onChange={e => setValues({ ...values, isTime: !values?.isTime })}
                    />
                    <Input
                        label="Nagroda"
                        labelAlignment="left"
                        style={inputStyle}
                        name="prize"
                        type="text"
                        onChange={e => setValues({ ...values, prize: e.target.value })}
                    />
                    <Select
                        label="Branża"
                        labelAlignment="left"
                        options={options}
                        name="industry"
                        onChange={e => setValues({ ...values, industry: e.target.value })}
                    />

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '31px' }}>
                        <Button
                            label="Dalej"
                            onClick={onSave}
                            variant="brand"
                            className="rainbow-m-around_medium "
                            size="medium"
                            style={buttonSize}
                        />
                    </div>
                </div>
            </View>
        </Wrapper>
    );
};
