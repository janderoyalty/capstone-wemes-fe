import React, { useState } from "react";
import axios from "axios";
// Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
// components
import AddItemModal from "./AddItemModal";
// import Color from "../Color";

function DisplayItemModal(props) {
  const [modalShow, setModalShow] = useState(false);
  const [updatedItemData, setUpdatedItemData] = useState({
    drop_off: props.selecteditem.drop_off,
    due_date: props.selecteditem.due_date,
    type: props.selecteditem.type,
    color: props.selecteditem.color,
    transaction: props.selecteditem.transaction,
    description: props.selecteditem.description,
    is_shoe: props.selecteditem.is_shoe,
    follow_up: props.selecteditem.follow_up,
  });

  const updateItemData = async (index, itemData) => {
    axios
      .patch(`${props.wemes_url}users/${index}`, { itemData })
      .then(() => setUpdatedItemData(itemData))
      .catch((error) => console.log(error));
    return itemData;
  };

  const submitItemData = (event) => {
    event.preventDefault();
    updateItemData(props.index, updatedItemData);
    setUpdatedItemData({
      drop_off: "",
      due_date: "",
      type: "",
      color: "",
      transaction: "",
      description: "",
      is_shoe: "",
      follow_up: "",
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Transaction {props.selecteditem.transaction} Item
          <br />
          Dropped Off: {props.selecteditem.drop_off}
        </Modal.Title>
      </Modal.Header>
      {/*  ********** <Button
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
      />{" "} **********  */}
      <Modal.Body>
        <Form size="lg" onSubmit={submitItemData}>
          {/*  ********** Drop Off Date*/}
          <Form.Group className="mb-3" controlId="formDropOffDate">
            <Form.Label>Drop Off Date</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selecteditem.drop_off}
              onChange={(event) =>
                setUpdatedItemData({
                  ...updatedItemData,
                  drop_off: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted">
              {props.selecteditem.drop_off}
            </Form.Text>
          </Form.Group>

          {/*  ********** Due Date **********  */}
          <Form.Group className="mb-3" controlId="formDueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="name"
              // disabled
              defaultValue={props.selecteditem.due_date}
              onChange={(event) =>
                setUpdatedItemData({
                  ...updatedItemData,
                  due_date: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted">
              {props.selecteditem.due_date}
            </Form.Text>
          </Form.Group>

          {/*  ********** Transaction **********  */}
          <Form.Group className="mb-3" controlId="formTransaction">
            <Form.Label>Transaction</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selecteditem.transaction}
              onChange={(event) =>
                setUpdatedItemData({
                  ...updatedItemData,
                  transaction: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted">
              {props.selecteditem.transaction}
            </Form.Text>
          </Form.Group>

          {/*  ********** Type **********  */}
          <Form.Group className="mb-3" controlId="formType">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selecteditem.type}
              onChange={(event) =>
                setUpdatedItemData({
                  ...updatedItemData,
                  type: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted">
              {props.selecteditem.type}
            </Form.Text>
          </Form.Group>

          {/*  ********** Color **********  */}
          <Form.Group className="mb-3" controlId="formColor">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selecteditem.color}
              onChange={(event) =>
                setUpdatedItemData({
                  ...updatedItemData,
                  color: event.target.value,
                })
              }
            />
            {/* <Color
              wemes_url={props.wemes_url}
              onChange={(event) =>
                setUpdatedItemData({
                  ...updatedItemData,
                  color: event.target.value,
                })
              }
            /> */}
            <Form.Text className="text-muted">
              {props.selecteditem.color}
            </Form.Text>
          </Form.Group>

          {/*  ********** Description/Message **********  */}
          <Form.Group className="mb-3" controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              type="name"
              defaultValue={props.selecteditem.description}
              onChange={(event) =>
                setUpdatedItemData({
                  ...updatedItemData,
                  description: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted">
              {props.selecteditem.description}
            </Form.Text>
          </Form.Group>

          {/*  ********** Department **********  */}
          <Form.Group className="mb-3" controlId="formIs Shoe">
            <Form.Label>Is Shoe</Form.Label>
            <Form.Check
              type="checkbox"
              defaultChecked={props.selecteditem.is_shoe}
              onChange={(event) =>
                setUpdatedItemData({
                  ...updatedItemData,
                  is_shoe: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted">
              {props.selecteditem.is_shoe}
            </Form.Text>
          </Form.Group>

          {/*  ********** FollowUp **********  */}
          <Form.Group className="mb-3" controlId="formFollowUp">
            <Form.Label>FollowUp</Form.Label>
            <Form.Check
              type="checkbox"
              defaultChecked={props.selecteditem.description}
              onChange={(event) =>
                setUpdatedItemData({
                  ...updatedItemData,
                  description: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted">
              {props.selecteditem.description}
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

export default DisplayItemModal;
