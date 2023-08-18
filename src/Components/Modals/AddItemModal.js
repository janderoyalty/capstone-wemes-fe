import React, { useState } from "react";
import axios from "axios";
// Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
// components
import Color from "../Color";

function AddItemModal(props) {
  const addItem = ({
    tag_id,
    drop_off,
    due_date,
    description,
    color,
    transaction,
    is_shoe,
    follow_up,
    type,
  }) => {
    axios
      .post(`${props.wemes_url}items/`, {
        tag_id: tag_id,
        drop_off: drop_off,
        due_date: due_date,
        description: description,
        color: color,
        transaction: transaction,
        is_shoe: is_shoe,
        follow_up: follow_up,
        type: type,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [itemData, setItemData] = useState({
    tag_id: "",
    drop_off: "",
    due_date: "",
    description: "",
    color: "",
    transaction: "",
    is_shoe: "",
    follow_up: "",
    type: "",
  });

  const submitItemData = (event) => {
    event.preventDefault();
    addItem(itemData);
    setItemData({
      tag_id: "",
      drop_off: "",
      due_date: "",
      description: "",
      color: "",
      transaction: "",
      is_shoe: "",
      follow_up: "",
      type: "",
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
          Add New Item
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form size="lg" onSubmit={submitItemData}>
          {/*  ********** TAG ID **********  */}
          <Form.Group className="mb-3" controlId="formTagID">
            <Form.Label>Tag ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="xxxx"
              onChange={(event) =>
                setItemData({
                  ...itemData,
                  tag_id: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          {/*  ********** DROP OFF DATE **********  */}
          <Form.Group className="mb-3" controlId="formDropOff">
            <Form.Label>Drop Off Date</Form.Label>
            <Form.Control
              type="date"
              onChange={(event) =>
                setItemData({
                  ...itemData,
                  drop_off: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          {/*  ********** Due Date **********  */}
          <Form.Group className="mb-3" controlId="formDueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="due_date"
              onChange={(event) =>
                setItemData({
                  ...itemData,
                  due_date: event.target.value,
                })
              }
            />
          </Form.Group>

          {/*  ********** Color **********  */}
          <Form.Group className="mb-3" controlId="formColor">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              placeholder="1: Black, 2:Brown, 3:White, 4:Cream, 5:Grey, 6:Red, 7:Blue, 8:Yellow, 9:Green, 10:Orange, 11:Purple, 12:Pink, 13:Teal"
              onChange={(event) =>
                setItemData({
                  ...itemData,
                  color: event.target.value,
                })
              }
            />
            {/* <Color
              wemes_url={props.wemes_url}
              onChange={(event) =>
                setItemData({
                  ...itemData,
                  color: event.target.value,
                })
              }
            /> */}
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          {/*  ********** Type **********  */}
          <Form.Group className="mb-3" controlId="formType">
            <Form.Label>Type</Form.Label>
            <Form.Control
              placeholder="1:men's, 2:women's, 3:kid's"
              onChange={(event) =>
                setItemData({
                  ...itemData,
                  type: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          {/*  ********** Department **********  */}
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              // defaultChecked={true}
              label="Is Shoes?"
              onChange={(event) =>
                setItemData({
                  ...itemData,
                  is_shoe: event.target.value,
                })
              }
            />
          </Form.Group>

          {/*  ********** FollowUp **********  */}
          <Form.Group className="mb-3" controlId="formFollowUp">
            <Form.Check
              type="checkbox"
              // defaultChecked={false}
              label="Follow Up"
              onChange={(event) =>
                setItemData({
                  ...itemData,
                  follow_up: event.target.value,
                })
              }
            />
          </Form.Group>
          {/*  ********** Description/Message **********  */}
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="What needs to be done?"
              onChange={(event) =>
                setItemData({
                  ...itemData,
                  description: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" value="false" label="Check me out" />
      </Form.Group> */}
          {/*  ********** Transaction **********  */}
          <Form.Group className="mb-3" controlId="formTransaction">
            <Form.Label>Transaction</Form.Label>
            <Form.Control
              type="text"
              // placeholder="Color"
              onChange={(event) =>
                setItemData({
                  ...itemData,
                  transaction: event.target.value,
                })
              }
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Button variant="warning" type="submit" onClick={props.onHide}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddItemModal;
