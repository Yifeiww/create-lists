import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    padding: 8px;
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 60%;
`;

const input = (props) => {
    return <Input
        placeholder={props.holder}
        type="text"
        value={props.inputValue}
        onChange={props.changed} />;
};

export default input;