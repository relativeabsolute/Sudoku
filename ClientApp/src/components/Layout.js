import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  displayName = Layout.name

  render() {
    return (
      <Container>
        <Row>
          <Col sm={12}>
            <NavMenu />
          </Col>
        </Row>
        <Row>
            {this.props.children}
        </Row>
      </Container>
    );
  }
}
