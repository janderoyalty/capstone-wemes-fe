import React, { useState } from "react";
import axios from "axios";
import { Nav, Navbar, Container } from "react-bootstrap";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Accounts from "./Pages/Accounts";
import Home from "./Pages/Home";
import Transactions from "./Pages/Transactions";
import Items from "./Pages/Items";

const NaviBar = () => {
  let wemes_url = null;
  const DEPLOY = true;

  if (DEPLOY) {
    wemes_url = process.env.REACT_APP_WEMES_URL;
  } else {
    wemes_url = process.env.REACT_APP_WEMES_URL_L;
  }

  const [accountData, setAccountData] = useState([]);

  const getAccounts = () => {
    axios
      .get(`${wemes_url}users/`)
      .then((response) => {
        const newData = response.data.map((account) => {
          return {
            id: account.id,
            first_name: account.first_name,
            last_name: account.last_name,
            last_four: account.last_four,
            phone_num: account.phone_num,
            email: account.email,
            admin: account.admin,
            is_active: account.is_active,
            transactions: account.transactions,
          };
        });
        setAccountData(newData);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Router>
      <div>
        <Navbar bg="warning">
          <Container justify="right">
            <Navbar.Brand as={Link} to={"/"}>
              <img
                src={require("../wemes_logo.png")}
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
            element={
              <Accounts
                wemes_url={wemes_url}
                getAccounts={() => getAccounts()}
                accountData={accountData}
                setAccountData={() => setAccountData()}
              />
            }
          />
          <Route
            path="/transactions"
            element={
              <Transactions
                wemes_url={wemes_url}
                getAccounts={() => getAccounts()}
                accountData={accountData}
                setAccountData={setAccountData}
              />
            }
          />
          <Route path="/items" element={<Items wemes_url={wemes_url} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default NaviBar;
