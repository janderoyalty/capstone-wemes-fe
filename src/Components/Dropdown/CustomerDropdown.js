import React, { useState } from "react";
import Select from "react-select";

const CustomerDropdown = ({ data, isAdmin, onSelect, person }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.admin === isAdmin &&
      (item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const options = filteredData.map((item) => ({
    value: item.id,
    label: `${item.first_name} ${item.last_name}`,
  }));

  return (
    <Select
      options={options}
      placeholder={`Select ${person}`}
      onChange={(selectedOption) => onSelect(selectedOption.value)}
      onInputChange={(inputValue) => setSearchTerm(inputValue)}
      inputValue={searchTerm}
    />
  );
};

export default CustomerDropdown;
