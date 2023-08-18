import React, { useState, useEffect } from "react";
import axios from "axios";
// Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function AddTransactionModal(props) {
  const addTransaction = ({
    drop_off,
    admin,
    customer,
    description,
    items,
  }) => {
    axios
      .post(`${props.wemes_url}transactions/`, {
        drop_off: drop_off,
        admin: admin,
        customer: customer,
        description: description,
        items: items,
      })
      .then((response) => {
        console.log(response);
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

  const submitTransactionData = (event) => {
    props.getTransactions();
    event.preventDefault();
    addTransaction(transactionData);
    setTransactionData({
      drop_off: "",
      admin: "",
      customer: "",
      description: "",
      items: [],
    });
  };

  useEffect(() => props.getTransactions(), []);

  return (
    <Modal
      {...props}
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
            <Form.Label>Admin</Form.Label>
            <Form.Control
              type="name"
              placeholder="Who are you?"
              onChange={(event) =>
                setTransactionData({
                  ...transactionData,
                  admin: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          {/*  ********** Customer's Name **********  */}
          <Form.Group className="mb-3" controlId="formCustomer">
            <Form.Label>Customer</Form.Label>
            <Form.Control
              type="text"
              name="customer"
              placeholder="Customer"
              onChange={(event) =>
                setTransactionData({
                  ...transactionData,
                  customer: event.target.value,
                })
              }
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

          <Button variant="warning" type="submit" onClick={props.onHide}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddTransactionModal;
