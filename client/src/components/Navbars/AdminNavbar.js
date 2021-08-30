import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";

import routes from "routes.js";

function Header() {
  const location = useLocation();

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Customer Detail";
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Navbar.Brand
            href="#home"
            onClick={(e) => e.preventDefault()}
            className="mr-2"
          >
            {getBrandText()}
          </Navbar.Brand>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
