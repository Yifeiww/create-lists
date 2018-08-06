import React, { Component } from 'react';
import ListItem from './ListItem/ListItem';


class Items extends Component {
    deleteItemHandler = (listId, itemId) => () => {
        this.props.delete(listId, itemId);
    };

    render() {
        const items = this.props.items.map((item, index) => {

            return (
                <ListItem
                    deleteItem={this.deleteItemHandler(this.props.id, item.id)}
                    content={item.content}
                    key={item.id}
                    id={item.id}
                    index={index}
                />
            )
        });
        return (
            <div>
                {items}
            </div>
        );
    }

}

export default Items;
