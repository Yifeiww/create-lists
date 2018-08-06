import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
    background-color: ${props => props.isDanger ? '#D6618F' : '#ABA6BF'};
    color: white;
    border: none;
    border-radius: 2px;
    padding: 8px;
    margin: 8px;
`;

const button = (props) => {
    return <Container onClick={props.clicked} isDanger={props.danger}>{props.children}</Container>;
};

export default button;