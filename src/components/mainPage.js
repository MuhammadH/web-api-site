import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Image, Nav} from 'react-bootstrap';
import {Card, ListGroup, ListGroupItem } from 'react-bootstrap';

class MainPage extends Component {

    render() {

        let imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Variegated_golden_frog_%28Mantella_baroni%29_Ranomafana.jpg';

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
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return{}
};

export default connect(mapStateToProps)(MainPage);

