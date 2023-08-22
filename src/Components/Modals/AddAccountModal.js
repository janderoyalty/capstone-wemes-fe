import React, { useState } from "react";
import axios from "axios";
// Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const AddAccountModal = ({ show, onHide, wemes_url, getAccounts }) => {
  const addAccount = ({
    first_name,
    last_name,
    phone_num,
    email,
  }) => {
    axios
      .post(`${wemes_url}users/`, {
        first_name,
        last_name,
        phone_num,
        last_four: phone_num.slice(-4),
        email,
        transactions: [],
      })
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [accountData, setAccountData] = useState({
    first_name: "",
    last_name: "",
    phone_num: "",
    email: "",
  });

  const submitAccountData = (event) => {
    event.preventDefault();
    addAccount(accountData);
    getAccounts();
    setAccountData({
      first_name: "",
      last_name: "",
      phone_num: "",
      email: "",
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Users
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form size="lg" onSubmit={submitAccountData}>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="First Name"
              onChange={(event) =>
                setAccountData({
                  ...accountData,
                  first_name: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Last Name"
              onChange={(event) =>
                setAccountData({
                  ...accountData,
                  last_name: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(event) =>
                setAccountData({ ...accountData, email: event.target.value })
              }
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone_num"
              placeholder="Phone Number"
              onChange={(event) =>
                setAccountData({
                  ...accountData,
                  phone_num: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Button variant="warning" type="submit" onClick={onHide}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddAccountModal;
