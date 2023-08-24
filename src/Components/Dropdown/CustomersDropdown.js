import React, { useState } from "react";
import Select from "react-select";

const CustomersDropdown = ({
  data,
  isAdmin,
  onSelect,
  person,
  selectedCustomer,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  console.log(`selectedCustomerLastFour:${selectedCustomer}`);

  const filteredData = data.filter(
    (item) =>
      item.admin === isAdmin &&
      (item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.last_four.includes(searchTerm))
  );

  const options = filteredData.map((item) => ({
    value: item.id,
    label: `${item.first_name} ${item.last_name} ${item.last_four}`,
  }));

  return (
    <Select
      options={options}
      placeholder={`Select ${person}`}
      onChange={(selectedOption) => onSelect(selectedOption.value)}
      onInputChange={(inputValue) => setSearchTerm(inputValue)}
      inputValue={searchTerm}
      // value={selectedCustomer}
    />
  );
};

export default CustomersDropdown;
