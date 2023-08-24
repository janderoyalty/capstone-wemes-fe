import React, { useState, useEffect } from "react";
import axios from "axios";
// Bootstrap
import { Button, Modal, Form } from "react-bootstrap";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DisplayAccountModal = ({
  wemes_url,
  index,
  selectedaccount,
  getAccounts,
  setUseLastFour,
  useLastFour,
  displayAccountModalShow,
  displayAccountModalOnHide,
  setAddTransactionModalShow,
  addTransactionModalShow,
}) => {
  const [modalDisplayShow, setModalDisplayShow] = useState(false);
  const [updatedAccountData, setUpdatedAccountData] = useState({});
  const [lastFour, setLastFour] = useState(selectedaccount.last_four);
  const navigate = useNavigate();

  const updateAccountData = async (index, accountData) => {
    axios
      .patch(`${wemes_url}users/${index}/`, accountData)
      .then()
      .catch((error) => console.log(error));
    return accountData;
  };

  const handleFormChange = (event) => {
    const updated_key = event.target.name;
    const updated_value = event.target.value;

    if (updated_key === "phone_num") {
      setUseLastFour(true);
      const slicedLastFour = updated_value.slice(-4);
      setLastFour(slicedLastFour);
      setUpdatedAccountData((prevData) => ({
        ...prevData,
        [updated_key]: updated_value,
        last_four: slicedLastFour,
      }));
    }

    setUpdatedAccountData((prevData) => ({
      ...prevData,
      [updated_key]: updated_value,
    }));
  };

  const submitAccountData = (event) => {
    event.preventDefault();
    updateAccountData(selectedaccount.id, updatedAccountData);
    getAccounts();
  };

  useEffect(() => {
    // Reset lastFour when the modal is shown
    setLastFour(selectedaccount.last_four);
  }, [selectedaccount.last_four]);

  return (
    <Modal
      show={displayAccountModalShow}
      onHide={displayAccountModalOnHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Account:{" "}
          <b className="modal-title-text">
            {selectedaccount.first_name} {selectedaccount.last_name}
          </b>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form size="lg" onSubmit={submitAccountData}>
          {/*  ********** First Name **********  */}
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="name"
              defaultValue={selectedaccount.first_name}
              name="first_name"
              onChange={handleFormChange}
            />
            <Form.Text className="text-muted">
              {selectedaccount.first_name}
            </Form.Text>
          </Form.Group>

          {/*  ********** Last Name **********  */}
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="name"
              defaultValue={selectedaccount.last_name}
              name="last_name"
              onChange={handleFormChange}
            />
            <Form.Text className="text-muted">
              {selectedaccount.last_name}
            </Form.Text>
          </Form.Group>

          {/*  ********** Email **********  */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="name"
              defaultValue={selectedaccount.email}
              name="email"
              onChange={handleFormChange}
            />
            <Form.Text className="text-muted">
              {selectedaccount.email}
            </Form.Text>
          </Form.Group>

          {/*  ********** Phone **********  */}
          <Form.Group className="mb-3" controlId="formPhoneNumber">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="name"
              defaultValue={selectedaccount.phone_num}
              name="phone_num"
              onChange={handleFormChange}
            />
            <Form.Text className="text-muted">
              {selectedaccount.phone_num}
            </Form.Text>
          </Form.Group>

          {/*  ********** Last Four **********  */}
          <Form.Group className="mb-3" controlId="formLastFour">
            <Form.Label>Last Four</Form.Label>
            <Form.Control
              type="name"
              name="last_four"
              disabled
              value={!useLastFour ? selectedaccount.last_four : lastFour}
              onChange={handleFormChange}
            />

            <Form.Text className="text-muted">
              {selectedaccount.last_four}
            </Form.Text>
          </Form.Group>

          <Button
            className="modal-button"
            variant="warning"
            type="submit"
            onClick={() => {
              displayAccountModalOnHide();
              getAccounts();
            }}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div
          className="modal-add-button"
          variant="warning"
          type="submit"
          onClick={() => {
            displayAccountModalOnHide();
            setAddTransactionModalShow();
            navigate("/transactions"); // Navigate to "/transactions" endpoint
          }}
        >
          Add Transaction
        </div>
        {/* <AddTransactionModal
        show={modalDisplayShow}
        onHide={() => setModalDisplayShow(false)}
        wemes_url={wemes_url}
      /> */}
      </Modal.Footer>
    </Modal>
  );
};

export default DisplayAccountModal;
