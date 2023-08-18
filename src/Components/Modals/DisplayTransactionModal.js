import React, { useState, useEffect } from "react";
import axios from "axios";
// Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
// componets
import AddItemModal from "./AddItemModal";

function DisplayTransactionModal(props) {
  const [modalShow, setModalShow] = useState(false);
  const [updatedTransactionData, setUpdatedTransactionData] = useState({});
  const [transactionData, setTransactionData] = useState([]);

  const getTransactions = () => {
    axios
      .get(`${props.wemes_url}transactions/`)
      .then((response) => {
        const newData = response.data.map((transaction) => {
          return {
            id: transaction.id,
            drop_off: transaction.drop_off,
            // admin: `${transaction.admin.first_name} ${transaction.admin.last_name}`,
            // customer: `${transaction.customer.first_name} ${transaction.customer.last_name}`,
            admin: transaction.admin,
            customer: transaction.customer,
            items: transaction.items,
            description: transaction.description,
          };
        });
        setTransactionData(newData);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const updateTransactionData = async (index, transactionData) => {
    axios
      .patch(`${props.wemes_url}transactions/${index}`, transactionData)
      .then()
      .catch((error) => console.log(error));
    return transactionData;
  };

  const handleFormChange = (e) => {
    const updated_key = e.target.name;
    setUpdatedTransactionData({
      ...updatedTransactionData,
      [updated_key]: e.target.value, //computed property
    });
  };

  const submitTransactionData = (event) => {
    event.preventDefault();
    updateTransactionData(props.selectedtransaction.id, updatedTransactionData);
    getTransactions();
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
          Edit {props.selectedtransaction.customer}'s
          <br />
          Transaction on {props.selectedtransaction.drop_off}
        </Modal.Title>
      </Modal.Header>
      <Button
        variant="warning"
        type="submit"
        onClick={() => setModalShow(true)}
      >
        Add Item
      </Button>
      <AddItemModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        wemes_url={props.wemes_url}
      />{" "}
      <Modal.Body>
        <Form size="lg" onSubmit={submitTransactionData}>
          {/*  ********** Drop Off Data*/}
          <Form.Group className="mb-3" controlId="formDropOffDate">
            <Form.Label>Drop Off Date</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selectedtransaction.drop_off}
              name="drop_off"
              onChange={handleFormChange}
            />
            <Form.Text className="text-muted">
              {props.selectedtransaction.drop_off}
            </Form.Text>
          </Form.Group>

          {/*  ********** Customer's Name **********  */}
          {/* <Form.Group className="mb-3" controlId="formCustomerName">
            <Form.Label>Cusotmer</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selectedtransaction.customer}
              name="customer.first_name"
              onChange={handleFormChange}
            />
            <Form.Text className="text-muted">
              {props.selectedtransaction.customer}
            </Form.Text>
          </Form.Group> */}

          {/*  ********** Admin's Name **********  */}
          {/* <Form.Group className="mb-3" controlId="formAdminName">
            <Form.Label>Admin</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selectedtransaction.admin}
              name="admin.first_name"
              onChange={handleFormChange}
            />
            <Form.Text className="text-muted">
              {props.selectedtransaction.admin}
            </Form.Text>
          </Form.Group> */}

          {/*  ********** Items **********  */}

          {/*  ********** Message **********  */}
          <Form.Group className="mb-3" controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selectedtransaction.description}
              name="description"
              onChange={handleFormChange}
            />
            <Form.Text className="text-muted">
              {props.selectedtransaction.description}
            </Form.Text>
          </Form.Group>
        </Form>

        <Button
          className="modal-button"
          variant="warning"
          type="submit"
          onClick={props.onHide}
        >
          Submit
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default DisplayTransactionModal;
