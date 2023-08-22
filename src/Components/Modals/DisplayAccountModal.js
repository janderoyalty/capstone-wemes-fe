import React, { useState, useEffect } from "react";
import axios from "axios";
// Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import AddAccountModal from "./AddAccountModal";
import AddTransactionModal from "../Modals/AddTransactionModal";

const DisplayAccountModal = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [updatedAccountData, setUpdatedAccountData] = useState({});
  const [lastFour, setLastFour] = useState(props.selectedaccount.last_four);

  const updateAccountData = async (index, accountData) => {
    console.log(props.selectedaccount);
    console.log(lastFour);
    axios
      .patch(`${props.wemes_url}users/${index}/`, accountData)
      .then()
      .catch((error) => console.log(error));
    return accountData;
  };

  const handleFormChange = (event) => {
    const updated_key = event.target.name;
    const updated_value = event.target.value;

    if (updated_key === "phone_num") {
      props.setUseLastFour(true);
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
    updateAccountData(props.selectedaccount.id, updatedAccountData);
    props.getAccounts();
  };

  useEffect(() => {
    // Reset lastFour when the modal is shown
    setLastFour(props.selectedaccount.last_four);
  }, [props.selectedaccount.last_four]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Account:{" "}
          <b className="modal-title-text">
            {props.selectedaccount.first_name} {props.selectedaccount.last_name}
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
              defaultValue={props.selectedaccount.first_name}
              name="first_name"
              onChange={handleFormChange}
            />
            <Form.Text className="text-muted">
              {props.selectedaccount.first_name}
            </Form.Text>
          </Form.Group>

          {/*  ********** Last Name **********  */}
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selectedaccount.last_name}
              name="last_name"
              onChange={handleFormChange}
            />
            <Form.Text className="text-muted">
              {props.selectedaccount.last_name}
            </Form.Text>
          </Form.Group>

          {/*  ********** Email **********  */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selectedaccount.email}
              name="email"
              onChange={handleFormChange}
            />
            <Form.Text className="text-muted">
              {props.selectedaccount.email}
            </Form.Text>
          </Form.Group>

          {/*  ********** Phone **********  */}
          <Form.Group className="mb-3" controlId="formPhoneNumber">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selectedaccount.phone_num}
              name="phone_num"
              onChange={handleFormChange}
            />
            <Form.Text className="text-muted">
              {props.selectedaccount.phone_num}
            </Form.Text>
          </Form.Group>

          {/*  ********** Last Four **********  */}
          <Form.Group className="mb-3" controlId="formLastFour">
            <Form.Label>Last Four</Form.Label>
            <Form.Control
              type="name"
              name="last_four"
              disabled
              value={
                !props.useLastFour ? props.selectedaccount.last_four : lastFour
              }
              onChange={handleFormChange}
            />

            <Form.Text className="text-muted">
              {props.selectedaccount.last_four}
            </Form.Text>
          </Form.Group>

          <Button
            className="modal-button"
            variant="warning"
            type="submit"
            onClick={() => {
              props.onHide();
              props.getAccounts();
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
          onClick={() => setModalShow(true)}
        >
          Add Transaction
        </div>
        {/* <AddTransactionModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        wemes_url={props.wemes_url}
      /> */}
      </Modal.Footer>
    </Modal>
  );
};

export default DisplayAccountModal;
