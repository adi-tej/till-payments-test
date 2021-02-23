import React, {useState} from 'react';
import './AppHeader.css';
import {Container, Header, Menu} from 'semantic-ui-react';
import {useHistory} from 'react-router-dom';

const AppHeader = (props: any) => {
    const history = useHistory()
    const [activeItem, setActiveItem] = useState('merchants')

    const handleClick = (name: string) => {
        setActiveItem(name)
        history.push('/' + name)
    }

    return (
        <div>
            <Container className='headerContainer'>
                <Header>
                    <Menu floated='right'>
                        <Menu.Item
                            name='merchants'
                            active={activeItem === 'merchants'}
                            onClick={(e, {name}) => handleClick(name!)}
                        >
                            Merchants
                        </Menu.Item>

                        <Menu.Item
                            name='customers'
                            active={activeItem === 'customers'}
                            onClick={(e, {name}) => handleClick(name!)}
                        >
                            Customers
                        </Menu.Item>
                    </Menu>
                </Header>
            </Container>
            <Container className='pageContainer'>
                {props.children}
            </Container>
        </div>
    )
}

export default AppHeader;
