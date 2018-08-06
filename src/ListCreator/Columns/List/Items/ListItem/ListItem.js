import React from 'react';
import styled from "styled-components";
import Button from '../../../../../UI/Button/Button';
import { Draggable } from 'react-beautiful-dnd';

const StyledItem = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    margin-bottom: 8px;
    display: flex;
    background-color: white;
    align-items: center;
    justify-content: space-between;
`;

const Content = styled.div`
    padding: 8px;
    overflow-x: hidden;
`;

const item = (props) => {
    return (
        <Draggable draggableId={props.id} index={props.index}>
            {(provided) => (
                <StyledItem
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    innerRef={provided.innerRef}
                >
                    <Content>{props.content}</Content>
                    <Button clicked={props.deleteItem} danger>Delete</Button>
                </StyledItem>
            )}
        </Draggable>

    );
};

export default item;