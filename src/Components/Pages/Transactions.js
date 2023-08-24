import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
// icons
import { FaUserTag } from "react-icons/fa";
// components
import AddTransactionModal from "../Modals/AddTransactionModal";
import ListTransactions from "../Lists/ListTransactions";

const Transactions = ({
  wemes_url,
  getAccounts,
  accountData,
  setAccountData,
  setAddTransactionModalShow,
  addTransactionModalShow,
}) => {
  const [transactionData, setTransactionData] = useState([]);
  // const [addTransactionModalShow, setAddTransactionModalShow] = useState(false);

  const getTransactions = () => {
    axios
      .get(`${wemes_url}transactions/`)
      .then((response) => {
        const newData = response.data.map((transaction) => {
          return {
            id: transaction.id,
            drop_off: transaction.drop_off,
            // admin: `${transaction.admin.first_name} ${transaction.admin.last_name}`,
            // customer: `${transaction.customer.first_name} ${transaction.customer.last_name}`,
            admin: transaction.admin,
            customer: transaction.customer,
            items: transaction.items,
            description: transaction.description,
          };
        });
        setTransactionData(newData);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => getTransactions(), []);

  const hideModal = () => {
    setAddTransactionModalShow(false);
    getTransactions();
  };
  return (
    <div>
      <h1>Transactions</h1>
      <FaUserTag
        className="icon-pointer"
        title="add an account"
        size={50}
        variant="warning"
        onClick={() => setAddTransactionModalShow(true)}
      />

      <AddTransactionModal
        // show={addTransactionModalShow}
        accountsData={accountData}
        wemes_url={wemes_url}
        getTransactions={() => getTransactions()}
        addTransactionModalShow={addTransactionModalShow}
        addTransactionModalOnHide={() => hideModal()}
      />
      <ListTransactions
        wemes_url={wemes_url}
        transactionData={transactionData}
        getTransactions={() => getTransactions()}
        setTransactionData={setTransactionData}
        accountData={accountData}
        getAccounts={() => getAccounts()}
      />
    </div>
  );
};

Transactions.propTypes = {
  wemes_url: PropTypes.string.isRequired,
};

export default Transactions;
