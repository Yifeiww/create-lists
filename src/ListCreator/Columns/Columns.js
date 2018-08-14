import React, { Component } from 'react';
import List from './List/List';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    height: 500px;
    margin: 0 20px 20px;
`;


class Columns extends Component {
    deleteListHandler = (id) => () => {
        this.props.deleteList(id);
    };

    addItemHandler = (listId, itemContent) => {
        this.props.addItem(listId, itemContent);
    };

    deleteItemHandler = (listId, itemId) => {
        this.props.deleteItem(listId, itemId);
    };

    render() {
        const lists = this.props.lists.map((list) =>
            <List
                deleteList={this.deleteListHandler(list.id)}
                addItem={this.addItemHandler}
                deleteItem={this.deleteItemHandler}
                title={list.title}
                items={list.items}
                key={list.id}
                id={list.id}
            />
        );

        return (
            <Container>
                {lists}
            </Container>
        );
    }
}

export default Columns;