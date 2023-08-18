import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";

const Colors = ({ wemes_url, onChange }) => {
  const [colorData, setColorData] = useState([]);

  const getColor = () => {
    axios
      .get(`${wemes_url}colors/`)
      .then((response) => setColorData(response.data))
      .catch(alert);
  };
  useEffect(() => getColor(), []);

  // console.log(colorData);
  return (
    <Dropdown variant="warning" onSelect={(eventKey, event) => onChange(event)}>
      <Dropdown.Toggle variant="warning">Color</Dropdown.Toggle>

      <Dropdown.Menu variant="light">
        {colorData.map((color, index) => (
          <Dropdown.Item key={index} as="button">
            {color.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Colors;
