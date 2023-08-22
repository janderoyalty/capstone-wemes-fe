import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
// icons
import { FaUserPlus } from "react-icons/fa";
// components
import AddAccountModal from "../Modals/AddAccountModal";
import ListAccounts from "../Lists/ListAccounts";

const Accounts = ({ wemes_url }) => {
  const [accountData, setAccountData] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const getAccounts = () => {
    axios
      .get(`${wemes_url}users/`)
      .then((response) => {
        const newData = response.data.map((account) => {
          return {
            id: account.id,
            first_name: account.first_name,
            last_name: account.last_name,
            last_four: account.last_four,
            phone_num: account.phone_num,
            email: account.email,
            admin: account.admin,
            is_active: account.is_active,
            transactions: account.transactions,
          };
        });
        setAccountData(newData);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => getAccounts(), []);

  const hideModal = () => {
    setModalShow(false);
    getAccounts();
  };

  return (
    <div>
      <h1>Accounts</h1>
      <FaUserPlus
        className="icon-pointer"
        title="add an account"
        size={50}
        onClick={() => {
          setModalShow(true);
        }}
      />

      <AddAccountModal
        show={modalShow}
        onHide={() => hideModal()}
        wemes_url={wemes_url}
        getAccounts={getAccounts}
      />
      <ListAccounts
        wemes_url={wemes_url}
        accounts={accountData}
        getAccounts={getAccounts}
      />
    </div>
  );
};

Accounts.propTypes = {
  wemes_url: PropTypes.string.isRequired,
};
export default Accounts;
