import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// icons
import { FaUserPlus } from "react-icons/fa";
// components
import AddAccountModal from "../Modals/AddAccountModal";
import ListAccounts from "../Lists/ListAccounts";

const Accounts = ({ wemes_url, getAccounts, accountData, setAccountData }) => {
  const [modalShow, setModalShow] = useState(false);

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
        getAccounts={() => getAccounts()}
      />
      <ListAccounts
        wemes_url={wemes_url}
        accounts={accountData}
        getAccounts={() => getAccounts()}
      />
    </div>
  );
};

Accounts.propTypes = {
  wemes_url: PropTypes.string.isRequired,
};
export default Accounts;
