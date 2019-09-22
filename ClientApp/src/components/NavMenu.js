import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export class NavMenu extends Component {
  displayName = NavMenu.name
  // TODO: use react-icons to replace the old glyphicons
  render() {
    return (
          <Nav className="mr-auto" fill>
            <Nav.Item>
              <Nav.Link href="/">
                  Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/play">
                Play Sudoku
              </Nav.Link>
            </Nav.Item>
          </Nav>
    );
  }
}
