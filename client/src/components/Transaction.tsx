import React from 'react';
import {List, Message} from "semantic-ui-react";

const Transaction = ({transaction}: any) => {
    return (
        <Message>
            <Message.Header>Transaction Id : {transaction.id}</Message.Header>
            <Message.Content>
                <List>
                    <List.Item>
                        amount: {transaction.amount}
                    </List.Item>
                    <List.Item>
                        description: {transaction.description}
                    </List.Item>
                    <List.Item>
                        ccLastFour: {transaction.ccLastFour}
                    </List.Item>
                    <List.Item>
                        ccExpiry: {transaction.ccExpiry}
                    </List.Item>
                    <List.Item>
                        ccToken: {transaction.ccToken}
                    </List.Item>
                    <List.Item>
                        customerId: {transaction.customerId}
                    </List.Item>
                    <List.Item>
                        date: {transaction.date}
                    </List.Item>
                </List>
            </Message.Content>
        </Message>
    )
}

export default Transaction;
