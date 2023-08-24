import React, { useState, useEffect } from "react";
import axios from "axios";
// Bootstrap
import { Button, Modal, Form } from "react-bootstrap";

import CustomerDropdown from "../Dropdown/CustomerDropdown";

const AddTransactionModal = ({
  wemes_url,
  getTransactions,
  addTransactionModalShow,
  addTransactionModalOnHide,
  accountsData,
}) => {
  const addTransaction = ({
    drop_off,
    admin,
    customer,
    description,
    items,
  }) => {
    axios
      .post(`${wemes_url}transactions/`, {
        drop_off: drop_off,
        admin: admin,
        customer: customer,
        description: description,
        items: items,
      })
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [transactionData, setTransactionData] = useState({
    drop_off: "",
    admin: "",
    customer: "",
    description: "",
    items: [],
  });
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedAdminId, setSelectedAdminId] = useState("");

  
  const submitTransactionData = (event) => {
    getTransactions();
    event.preventDefault();
    addTransaction({
      ...transactionData,
      customer: selectedCustomerId,
      admin: selectedAdminId,
    });
    setTransactionData({
      drop_off: "",
      admin: "",
      customer: "",
      description: "",
      items: [],
    });
  };

  return (
    <Modal
      show={addTransactionModalShow}
      onHide={addTransactionModalOnHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Transaction
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form size="lg" onSubmit={submitTransactionData}>
          {/*  ********** Drop Off Date **********  */}
          <Form.Group className="mb-3" controlId="formDropOff">
            <Form.Label>Drop Off Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="12/12/22"
              onChange={(event) =>
                setTransactionData({
                  ...transactionData,
                  drop_off: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          {/*  ********** Admin's Name **********  */}
          <Form.Group className="mb-3" controlId="formAdmin">
            <Form.Label>Admin</Form.Label>{" "}
            <CustomerDropdown
              data={accountsData}
              isAdmin={true}
              person={"an admin"}
              onSelect={(adminId) => {
                console.log(`ADMIN ID:${adminId}`);
                setSelectedAdminId(adminId);
                console.log(`selectedAdminId:${selectedAdminId}`);
              }}
            />
          </Form.Group>

          {/*  ********** Customer's Name **********  */}
          <Form.Group className="mb-3" controlId="formCustomer">
            <Form.Label>Customer</Form.Label>{" "}
            <CustomerDropdown
              data={accountsData}
              isAdmin={false}
              person={"a customer"}
              onSelect={(customerId) => {
                console.log(`CUSTOMER ID:${customerId}`);
                setSelectedCustomerId(customerId);
                console.log(`selectedCustomerId:${selectedCustomerId}`);
              }}
            />
          </Form.Group>

          {/*  ********** Desciption/Message **********  */}
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="description"
              placeholder="Leave a Note"
              onChange={(event) =>
                setTransactionData({
                  ...transactionData,
                  description: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          {/*  ********** Items **********  */}
          <Form.Group className="mb-3" controlId="formItems">
            <Form.Label>Items</Form.Label>
            <Form.Control type="text" placeholder="" disabled />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" value="false" label="Check me out" />
          </Form.Group> */}

          <Button
            variant="warning"
            type="submit"
            onClick={addTransactionModalOnHide}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTransactionModal;
