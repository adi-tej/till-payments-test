import React from 'react';
import {Modal} from "semantic-ui-react";
import Transaction from "./Transaction";

const Merchant = ({merchant}: any) => {
    return (
        <Modal.Content scrolling>
            {merchant.transactions.map((transaction: any, index: number) => (
                <Transaction key={index} transaction={transaction}/>
            ))}
        </Modal.Content>
    )
}

export default Merchant;
