import React, {useEffect, useState} from 'react';
import api from "../config/axios";
import {Button, Card, Container, Header, Icon, Modal} from "semantic-ui-react";
import Merchant from "../components/Merchant";

const Merchants = () => {
    const [merchants, setMerchants] = useState([])
    const [open, setOpen] = useState(false)
    const [currentMerchant, setCurrentMerchant] = useState({
        id: undefined,
        name: undefined,
        isTrading: undefined,
        currency: undefined,
        transactions: []
    })
    const [currentIndex, setCurrentIndex] = useState(0)
    const handleCardClick = (merchantId: string) => {
        let temp = merchants.findIndex((merchant: any) => merchant.id === merchantId)
        setCurrentIndex(temp)
        setCurrentMerchant(merchants[temp])
        setOpen(true)
    }
    const handlePrevious = () => {
        setCurrentMerchant(merchants[currentIndex - 1])
        setCurrentIndex(currentIndex - 1)
    }
    const handleNext = () => {
        setCurrentMerchant(merchants[currentIndex + 1])
        setCurrentIndex(currentIndex + 1)
    }

    useEffect(() => {
        api.get('/merchants').then(res => {
            if (res.status === 200) {
                if (!res.data.message) {
                    setMerchants(res.data)
                }
            }
        })
    }, [])

    return (
        <Container>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
            >
                <Modal.Header style={{textAlign: 'center'}}>
                    {currentIndex > 0 ?
                        <Header floated='left'>
                            <Icon name='chevron left' onClick={() => handlePrevious()}/>
                        </Header>
                        : null}
                    {currentMerchant.name}
                    {currentIndex < merchants.length - 1 ?
                        <Header floated='right'>
                            <Icon name='chevron right' onClick={() => handleNext()}/>
                        </Header>
                        : null}
                </Modal.Header>
                <Merchant merchant={currentMerchant}/>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                </Modal.Actions>
            </Modal>
            <Card.Group>
                {merchants.map((merchant: any, index: number) => (
                    <Card
                        key={index}
                        header={merchant.name}
                        meta={merchant.id}
                        onClick={() => handleCardClick(merchant.id)}
                    />
                ))}
            </Card.Group>
        </Container>
    )
}

export default Merchants;
