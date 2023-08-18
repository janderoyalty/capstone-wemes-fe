import React, { useState, useEffect } from "react";
import axios from "axios";
// icons
import { FaTags } from "react-icons/fa";
// components
import AddItemModal from "../Modals/AddItemModal";
import ListItems from "../Lists/ListItems";

const Items = ({ wemes_url }) => {
  const [itemData, setItemData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [colorData, setColorData] = useState([]);

  const getColor = () => {
    axios
      .get(`${wemes_url}colors/`)
      .then((response) => {
        const newData = response.data.map((color) => {
          return {
            color: color,
          };
        });
        // console.log(newData);
        setColorData(newData);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => getColor(), []);

  // console.log(colorData);

  const getItems = () => {
    axios
      .get(`${wemes_url}items/`)
      .then((response) => {
        const newData = response.data.map((item) => {
          return {
            tag: item.tag,
            drop_off: item.drop_off,
            due_date: item.due_date,
            // type: item.type.name,
            // color: item.color.name,
            type: item.type,
            color: item.color,
            is_shoe: item.is_shoe,
            follow_up: item.follow_up,
            description: item.description,
            transaction: item.transaction,
          };
        });
        setItemData(newData);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => getItems(), []);

  const hideModal = () => {
    setModalShow(false);
    getItems();
  };

  return (
    <div>
      <h1>Items</h1>
      <FaTags
        title="add an item"
        size={50}
        onClick={() => setModalShow(true)}
      />
      <AddItemModal
        show={modalShow}
        onHide={() => hideModal()}
        wemes_url={wemes_url}
        colorData={colorData}
      />
      <ListItems colorData={colorData} wemes_url={wemes_url} items={itemData} />
    </div>
  );
};

export default Items;
