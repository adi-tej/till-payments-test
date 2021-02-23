import React, {useEffect, useState} from 'react';
import api from "../config/axios";
import {Button, Form, Input, Message, Select} from "semantic-ui-react";
import {useHistory} from "react-router-dom";

const AddCustomerForm = ({setOpen}: any) => {

    const history = useHistory()
    const [merchantOptions, setMerchantOptions] = useState([])
    const [newCustomer, setNewCustomer] = useState({
        id: undefined,
        firstName: undefined,
        lastName: undefined,
        merchant: undefined
    })
    const [formError, setFormError] = useState({
        error: false,
        msg: undefined
    })
    const [formSuccess, setFormSuccess] = useState(false)
    const handleAddCustomer = () => {
        console.log(newCustomer)
        api.post('/customers', {
            id: newCustomer.id,
            name: newCustomer.firstName + " " + newCustomer.lastName,
            merchantId: newCustomer.merchant
        }).then(res => {
            if (res.status === 200 || res.status === 201) {
                if (res.data.message) {
                    setFormError({error: true, msg: res.data.message})
                } else {
                    setFormSuccess(true)
                    setTimeout(function () {
                        history.go(0)
                    }, 500);
                }
            }
        })
    }

    useEffect(() => {
        api.get('/merchants').then(res => {
            if (res.status === 200) {
                if (!res.data.message) {
                    let options: any = []
                    res.data.forEach((merchant: any) => {
                        options.push({
                            key: merchant.id,
                            text: merchant.name,
                            value: merchant.id
                        })
                    })
                    setMerchantOptions(options)
                }
            }
        })
    }, [])
    return (
        <Form onSubmit={() => handleAddCustomer()} success={formSuccess} error={formError.error}>

            <Message
                error
                header={formError.msg}
            />
            <Message
                success
                header='Successfully added'
            />
            <Form.Group widths='equal'>
                <Form.Field
                    control={Input}
                    placeholder='First Name'
                    onChange={(e: any) => setNewCustomer({...newCustomer, firstName: e.target.value})}
                />
                <Form.Field
                    control={Input}
                    placeholder='Last Name'
                    onChange={(e: any) => setNewCustomer({...newCustomer, lastName: e.target.value})}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Field
                    control={Input}
                    placeholder='Id'
                    onChange={(e: any) => setNewCustomer({...newCustomer, id: e.target.value})}
                />
                <Form.Field
                    control={Select}
                    options={merchantOptions}
                    placeholder='Merchant'
                    onChange={(e: any, {value}: any) => setNewCustomer({...newCustomer, merchant: value})}
                />
            </Form.Group>
            <Form.Group>
                <Form.Field
                    control={Button}
                    content='Submit'
                    type='Submit'
                />
                <Form.Field
                    control={Button}
                    content='Close'
                    onClick={() => setOpen(false)}
                />
            </Form.Group>
        </Form>
    )
}

export default AddCustomerForm;
