import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Image, Nav} from 'react-bootstrap';
import {Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Form, FormLabel, FormControl, FormGroup, Col, Button} from 'react-bootstrap';

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.updateEvent = this.updateEvent.bind(this);
        this.buy = this.buy.bind(this);

        this.state = {
            region_cur_code: '',
            region_amount: 0,

            did_buy: false,
            order_ID: 0,
            order_conf_message: 'test string',

            purchaseData:{
                name: '',
                card_number: '',
                address: ''
            }
        }
    }

    componentDidMount() {
        this.getAPIData()
    }

    getAPIData() {
        async function fetchCur() {
            let user_cur = '';
            await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=47a11b840b6e4f1b951c65025ce182bd`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    user_cur = data.currency.code;
                    console.log(user_cur + ' li');
                })
            console.log(user_cur + ' lo');
            return user_cur;
        }
        async function conversionAPI(symb, amount) {
            let new_amount = 0.1;

            let inputs = {
                input_data:{"amount": amount, "currency": symb}
            };

            console.log(symb + '_' + amount);
            await fetch('https://conversion-api-hussain.herokuapp.com/conversion', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputs.input_data)
            })
                .then(response => response.json())
                .then(data => {
                    console.log (data);
                    new_amount = data.new_amount;
                    console.log (new_amount + ' li');
                })
            console.log (new_amount + ' lo');
            return new_amount;
        }
        fetchCur().then(result => {
            console.log(result + ' cur result');
            this.setState({
                region_cur_code: result
            });
            return result;
        }).then(res => {
            conversionAPI(res, 25.0).then(result => {
                console.log(result + ' should be around 30.09');
                this.setState({
                    region_amount: result
                });
            })
        })
    }

    updateEvent(event){
        let updateEvent = Object.assign({}, this.state.purchaseData);

        if(event.target.id === 'name_section') {
            updateEvent.name = event.target.value;
        }
        if(event.target.id === 'card_section') {
            updateEvent.card_number = event.target.value;
        }
        if(event.target.id === 'address_section') {
            updateEvent.address = event.target.value;
        }

        this.setState({
            purchaseData: updateEvent
        });
    }

    buy() {
        // submit name, address, orderID, price in base, price in region, region currency code
        this.setState({
            order_conf_message: 'order confirmed! Keep this number for your records. Order number: ',
            purchaseData:{
                name: '',
                card_number: '',
                address: ''
            }
        });
    }

    render() {

        let imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Variegated_golden_frog_%28Mantella_baroni%29_Ranomafana.jpg';

        let euro_price = 25.0;
        let region_price = this.state.region_amount;
        let region_code = this.state.region_cur_code;
        let order_conf = this.order_conf_message;

        return (
            <Card>
                <Card.Header>Wanna buy a frog!?</Card.Header>
                <Card.Body>
                    <Image className="image" src={imgUrl} thumbnail />
                </Card.Body>
                <Card.Body>
                    <p>
                        <b>buy this frog!</b>&nbsp; You know you want a frog, right!?
                        &nbsp;  Hooray, frog!
                    </p>
                </Card.Body>
                <Card.Body>
                    <p>
                        <b>Price in EUR: {euro_price}</b>
                    </p>
                    <p>
                        <b>Price in {region_code}: {region_price}</b>
                    </p>
                </Card.Body>
                <Card.Body>
                </Card.Body>

                <Form horizontal>
                    <FormGroup controlId="name_section">
                        <Col componentClass={FormLabel}>
                            Enter your name:
                        </Col>
                        <Col>
                            <FormControl as="textarea" required onChange={this.updateEvent} value={this.state.purchaseData.name}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="card_section">
                        <Col componentClass={FormLabel}>
                            Enter a credit card number:
                        </Col>
                        <Col>
                            <FormControl as="textarea" required onChange={this.updateEvent} value={this.state.purchaseData.card_number}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="address_section">
                        <Col componentClass={FormLabel}>
                            Enter your address:
                        </Col>
                        <Col>
                            <FormControl as="textarea" required onChange={this.updateEvent} value={this.state.purchaseData.address}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col>
                            <Button onClick={this.buy}>Buy frog!</Button>
                        </Col>
                    </FormGroup>

                </Form>

                <Card.Body>
                    <p>
                        <b>{this.order_conf_message}</b>
                    </p>
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return{}
};

export default connect(mapStateToProps)(MainPage);

