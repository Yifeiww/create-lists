import React, { Component } from 'react';
import Button from '../UI/Button/Button';
import uuidv4 from 'uuid/v4';
import Input from '../UI/Input/Input';
import Columns from './Columns/Columns';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 40px;
`;


class ListCreator extends Component {
    state = {
        lists: [],
        newListTitle: "",
    };

    updateNewListTitleHandler = (event) => {
        this.setState({
            newListTitle: event.target.value,
        });
    };

    addNewListHandler = () => {
        const id = uuidv4();
        let title = this.state.newListTitle;
        if (!title || !title.trim()) {
            title = "Untitled";
        }
        const newList = {
            title: title,
            id: id,
            items: []
        };
        this.setState({
            lists: [
                ...this.state.lists,
                newList
            ],
            newListTitle: ""
        });
    };

    deleteListHandler = (id) => {
        const nextState = this.state.lists.filter(list => list.id !== id);
        this.setState({lists: nextState});
    };

    addItemHandler = (listId, itemContent) => {
        const itemId = uuidv4();
        const item = {
            content: itemContent,
            id: itemId
        };
        const columns = this.state.lists;
        const listIndex = columns.findIndex(list => list.id === listId);
        const list = columns[listIndex];
        columns[listIndex] = {
            ...list,
            items: [
                ...list.items,
                item
            ]
        };
        this.setState({lists: columns});
    };

    deleteItemHandler = (listId, itemId) => {
        const columns = this.state.lists;
        const listIndex = columns.findIndex(list => list.id === listId);
        const list = columns[listIndex];
        const itemIndex = list.items.findIndex(item => item.id === itemId);
        list.items.splice(itemIndex, 1);
        this.setState({lists: columns});
    };

    // change the order of items in one list
    // or move an item from one list to another
    onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId
            && destination.index === source.index) {
            return;
        }
        const srcListIndex = this.state.lists.findIndex(list => list.id === source.droppableId);
        const srcList = this.state.lists[srcListIndex];
        const newSrcItems = Array.from(srcList.items);

        const dstListIndex = this.state.lists.findIndex(list => list.id === destination.droppableId);
        const dstList = this.state.lists[dstListIndex];
        let newDstItems = newSrcItems;
        if (srcListIndex !== dstListIndex) {
            newDstItems = Array.from(dstList.items);
        }
        const item = newSrcItems.find(item => item.id === draggableId);
        newSrcItems.splice(source.index, 1);
        newDstItems.splice(destination.index, 0, item);

        const newSrcList = {
            ...srcList,
            items: newSrcItems
        };
        const newDstList = {
            ...dstList,
            items: newDstItems
        };
        const newLists = this.state.lists;
        newLists[srcListIndex] = newSrcList;
        newLists[dstListIndex] = newDstList;


        const nextState = {
            ...this.state,
            lists: newLists
        };

        this.setState(nextState);

    };

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <InputContainer>
                    <Input
                        holder="Enter list name"
                        changed={this.updateNewListTitleHandler}
                        inputValue={this.state.newListTitle}
                    />
                    <Button clicked={this.addNewListHandler}>New List</Button>
                </InputContainer>
                <Columns
                    deleteList={this.deleteListHandler}
                    lists={this.state.lists}
                    addItem={this.addItemHandler}
                    deleteItem={this.deleteItemHandler}
                />
            </DragDropContext>
        );
    }
}

export default ListCreator;