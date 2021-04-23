import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Image, Nav} from 'react-bootstrap';

class MainPage extends Component {

    render() {

        let imgUrl = 'https://en.wikipedia.org/wiki/Frog#/media/File:Variegated_golden_frog_(Mantella_baroni)_Ranomafana.jpg';

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

export default connect(mapStateToProps)(MainPage);

