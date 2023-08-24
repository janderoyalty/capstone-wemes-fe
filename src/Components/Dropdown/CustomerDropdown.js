import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const CustomerDropdown = ({ data, isAdmin, onSelect, person }) => {
  const filteredData = data.filter((item) => item.admin === isAdmin);

  return (
    <Dropdown onChange={(event) => onSelect(event.target.value)}>
      <Dropdown.Toggle variant="secondary" value="">
        Select {person}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {filteredData.map((item) => (
          <Dropdown.Item key={item.id} value={item.id}>
            {item.first_name} {item.last_name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomerDropdown;
