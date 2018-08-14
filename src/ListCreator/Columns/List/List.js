import React, { Component } from 'react';
import styled from 'styled-components';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import Items from './Items/Items';
import { Droppable } from 'react-beautiful-dnd';

const StyledColumn = styled.div`
    width: 250px;
    height: 500px;
    overflow-y: auto;
    border: 1px solid lightgrey;
    border-radius: 2px;
    margin: 8px;
`;

const TitleContainer = styled.h3`
    margin: 8px;
    padding: 0 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.div`
    overflow: hidden;
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-right: 16px;
`;

const StyledItems = styled.div`
    padding: 8px;
    min-height: 376px;
    display: flex;
    flex-direction: column;
    background-color: ${props => (props.isDraggingOver ? 'lightgrey' : 'white')};
`;

class List extends Component {
    state = {
        newItemContent: ""
    };

    addNewItemHandler = (listId, itemContent) => () => {
        this.props.addItem(listId, itemContent);
        this.setState({newItemContent: ""});
    };

    updateNewItemContentHandler = (event) => {
        this.setState({
            newItemContent: event.target.value,
        });

    };

    deleteItemHandler = (listId, itemId) => {
        this.props.deleteItem(listId, itemId);
    };

    render() {
        return (

            <StyledColumn>
                <TitleContainer>
                    <Title>{this.props.title}</Title>
                    <Button clicked={this.props.deleteList} danger>Delete</Button>
                </TitleContainer>
                <InputContainer>
                    <Input
                        changed={this.updateNewItemContentHandler}
                        inputValue={this.state.newItemContent}
                        holder="Enter New Item" />
                    <Button clicked={this.addNewItemHandler(this.props.id, this.state.newItemContent)}>Add</Button>
                </InputContainer>
                <Droppable droppableId={this.props.id}>
                    {(provided, snapshot) => (
                        <StyledItems
                            innerRef={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            <Items
                                delete={this.deleteItemHandler}
                                id={this.props.id}
                                items={this.props.items} />
                            {provided.placeholder}
                        </StyledItems>
                    )}
                </Droppable>
            </StyledColumn>

        );
    }

}

export default List;
