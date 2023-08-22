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
      [updated_key]: e.target.value,
    });
  };

  const submitTransactionData = (event) => {
    event.preventDefault();
    updateTransactionData(props.selectedtransaction.id, updatedTransactionData);
    props.getTransactions();
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
