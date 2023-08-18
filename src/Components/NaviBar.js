import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Accounts from "./Pages/Accounts";
import Home from "./Pages/Home";
import Transactions from "./Pages/Transactions";
import Items from "./Pages/Items";
// import "../wemes_logo.png"

const NaviBar = ({ accounts, transactions }) => {
  // const wemes_url = "https://wemes-be.herokuapp.com/";
  const wemes_url = "http://127.0.0.1:8000/";

  return (
    <Router>
      <div>
        <Navbar bg="warning">
          <Container justify="right">
            <Navbar.Brand as={Link} to={"/"}>
              <img
                src={require("../wemes_logo.png")}
                // width="30"
                height="40"
                className="d-inline-block align-top"
                alt="Wemes logo"
              />
              {/*  ********** Wemes **********  */}
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/accounts"}>
                Accounts
              </Nav.Link>
              <Nav.Link as={Link} to={"/transactions"}>
                Transactions
              </Nav.Link>
              <Nav.Link as={Link} to={"/items"}>
                Items
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/accounts"
            element={<Accounts wemes_url={wemes_url} />}
          />
          <Route
            path="/transactions"
            element={<Transactions wemes_url={wemes_url} />}
          />
          <Route path="/items" element={<Items wemes_url={wemes_url} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default NaviBar;
