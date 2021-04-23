import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Image, Nav} from 'react-bootstrap';
import {Card, ListGroup, ListGroupItem } from 'react-bootstrap';
// const fetch = require("node-fetch");

class MainPage extends Component {

    render() {

        let imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Variegated_golden_frog_%28Mantella_baroni%29_Ranomafana.jpg';

        let euro_price = 25.0;
        let region_price = 1.23;

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
            return result;
        }).then(res => {
            conversionAPI(res, 25.0).then(result => {
                console.log(result + ' should be around 30.09');
                region_price = result;
            })
        }).then(final_step => {
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
                            <b>Price in USD: {region_price}</b>
                        </p>
                    </Card.Body>
                    <Card.Body>
                    </Card.Body>
                </Card>
            )
        })

    }
}

const mapStateToProps = state => {
    return{}
};

export default connect(mapStateToProps)(MainPage);

