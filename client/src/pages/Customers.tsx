import React, {useEffect, useState} from 'react';
import api from "../config/axios";
import {Button, Card, Container, Header, List, Message, Modal} from "semantic-ui-react";
import Transaction from "../components/Transaction";
import AddCustomerForm from "../components/AddCustomerForm";

interface Merchant {
    id: string,
    name: string,
    isTrading: boolean,
    currency: string,
    transactions: []
}

interface Customer {
    id: string,
    name: string,
    merchantId: string,
    merchant: Merchant,
    total: string
}

const Customers = () => {
    const [customers, setCustomers] = useState([])
    const [open, setOpen] = useState(false)


    useEffect(() => {
        const getCustomers = () => {
            api.get('/customers').then((res) => {
                if (res.status === 200) {
                    if (!res.data.message) {
                        let data = res.data
                        const promises = data.map((customer: any) => {
                            return api.get('/merchants/' + customer.merchantId).then(res => {
                                if (res.status === 200) {
                                    if (!res.data.message) {
                                        return res.data
                                    }
                                }
                            })
                        })
                        Promise.all(promises).then((results: any) => {
                            for (let i = 0; i < data.length; i++) {
                                results[i].transactions = results[i].transactions.filter((tr: any) => tr.customerId === data[i].id)
                                let total = 0
                                let currency = ""
                                results[i].transactions.forEach((tr: any) => {
                                    total += tr.amount
                                    if (results[i].currency === "AUD") {
                                        if (!currency) currency = "$"
                                        tr.amount = "$" + Number(tr.amount / 100).toFixed(2)
                                    } else if (results[i].currency === "EURO") {
                                        if (!currency) currency = "€"
                                        tr.amount = "€" + Number(tr.amount / 100).toFixed(2)
                                    }
                                })
                                data[i].merchant = results[i]
                                data[i].total = currency + Number(total / 100).toFixed(2)
                            }
                            setCustomers(data)
                        })
                    }
                }
            })

        }
        getCustomers()
    }, [])

    return (
        <Container>

            {/*Add Customer*/}
            <div style={{width: '100%', height: '65px'}}>
                <Header floated='right'>
                    <Button onClick={() => setOpen(true)}>Add New Customer</Button>
                </Header>
            </div>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
            >
                <Modal.Header style={{textAlign: 'center'}}>
                    Add New Customer
                </Modal.Header>
                <Modal.Content>
                    <AddCustomerForm setOpen={setOpen}/>
                </Modal.Content>
            </Modal>


            {/*Show Customers*/}
            <div>
                {customers.map((customer: Customer, index: number) => (
                    <Message key={index}>
                        <Message.Header>{customer.name}</Message.Header>
                        <Message.Content>
                            <List>
                                <List.Item>
                                    id : {customer.id}
                                </List.Item>
                                <List.Item>
                                    merchant : {customer.merchant.name}
                                </List.Item>
                            </List>
                        </Message.Content>
                        {customer.merchant.transactions.map((tr: any, index: number) => (
                            <Transaction key={index} transaction={tr}/>
                        ))}
                        <Card.Header>
                            Total : {customer.total}
                        </Card.Header>
                    </Message>
                ))}
            </div>
        </Container>
    )
}

export default Customers;
