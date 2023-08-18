import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
// icons
import { AiFillEdit } from "react-icons/ai";
// Bootstrap
import Table from "react-bootstrap/Table";
// components
import DisplayItemModal from "../Modals/DisplayItemModal";
import SortMenuItems from "../Sort/SortMenuItems";

const ListItems = ({ items, wemes_url, colorData }) => {
  const [modalShow, setModalShow] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(0);
  const [selecteditem, setSelectedItem] = useState({});
  const [sortBy, setSortBy] = useState("id");
  const [orderBy, setOrderBy] = useState("desc");
  const sortedItems = items.sort((a, b) => {
    let order = orderBy === "asc" ? 1 : -1;
    let sortByA = sortBy === "id" ? a[sortBy] : a[sortBy];
    let sortByB = sortBy === "id" ? b[sortBy] : b[sortBy];
    return sortByA < sortByB ? -1 * order : 1 * order;
  });

  const itemInfo = () => {
    return sortedItems.map((item, index) => (
      <tr
        key={index}
        onClick={() => {
          setClickedIndex(index);
          setModalShow(true);
          setSelectedItem(item);
        }}
      >
        <td>
          <AiFillEdit />
        </td>
        <td>{item.drop_off}</td>
        <td>{item.due_date}</td>
        <td>{item.type}</td>
        <td>{item.color}</td>
        <td>{item.is_shoe === true ? "shoe" : "sewing"}</td>
        <td>{item.follow_up === true ? "yes" : "no"}</td>
        <td>{item.description}</td>
        <td>{item.transaction}</td>
      </tr>
    ));
  };

  return (
    <>
      <div>
        <DisplayItemModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          wemes_url={wemes_url}
          index={clickedIndex}
          selecteditem={selecteditem}
          colorData={colorData}
        />
        <SortMenuItems
          sortBy={sortBy}
          onSortByChange={(sortOption) => {
            setSortBy(sortOption);
          }}
          orderBy={orderBy}
          onOrderByChange={(orderOption) => {
            setOrderBy(orderOption);
          }}
        />
      </div>
      <Table striped hover date-paganation="true">
        <thead>
          <tr>
            <th>Edit</th>
            <th>Drop Off Date</th>
            <th>Due Date</th>
            <th>Type</th>
            <th>Color</th>
            <th>Department</th>
            <th>Needs Follow-Up</th>
            <th>Description</th>
            <th>Transaction</th>
          </tr>
        </thead>
        <tbody>{itemInfo()}</tbody>
      </Table>
    </>
  );
};

ListItems.propTypes = {
  items: PropTypes.array.isRequired,
};

export default ListItems;
