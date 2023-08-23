import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// icons
import { AiFillEdit } from "react-icons/ai";
// Bootstrap
import Table from "react-bootstrap/Table";
// components
import DisplayTransactionModal from "../Modals/DisplayTransactionModal";
import SortMenuTransactions from "../Sort/SortMenuTransactions";

const ListTransactions = ({
  transactionData,
  wemes_url,
  getTransactions,
  setTransactionData,
  getAccounts,
  accountData,
  setAccountData,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(0);
  const [selectedtransaction, setSelectedTransaction] = useState({});
  const [sortBy, setSortBy] = useState("id");
  const [orderBy, setOrderBy] = useState("desc");
  const [currentUser, setCurrentUser] = useState("")

  const sortedTransactions = transactionData.sort((a, b) => {
    let order = orderBy === "asc" ? 1 : -1;
    let sortByA = sortBy === "id" ? a[sortBy] : a[sortBy];
    let sortByB = sortBy === "id" ? b[sortBy] : b[sortBy];
    return sortByA < sortByB ? -1 * order : 1 * order;
  });

  const mapCustomerIdToName = (accountId) => {
    // console.log("mapCustomerIdToName");
    // console.log({
    //   accountId,
    //   accountData,
    // });
    const account = accountData.find((account) => account.id === accountId);
    if (account) {
      return `${account.first_name} ${account.last_name.slice(0, 1)}.`;
    }
    return "Unknown Customer";
  };

  const transactionInfo = () => {
    return sortedTransactions.map((transaction, index) => (
      <tr
        key={index}
        onClick={() => {
          setClickedIndex(index);
          setCurrentUser(mapCustomerIdToName(transaction.customer))
          setModalShow(true);
          setSelectedTransaction(transaction);
        }}
      >
        <td>
          <AiFillEdit />
        </td>
        <td>{transaction.id}</td>
        <td>{mapCustomerIdToName(transaction.customer)}</td>
        <td>{mapCustomerIdToName(transaction.admin)}</td>
        <td>{transaction.drop_off}</td>
        <td>{transaction.description}</td>
        <td>{transaction.items.length}</td>
      </tr>
    ));
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <>
      <div>
        <DisplayTransactionModal
          wemes_url={wemes_url}
          show={modalShow}
          onHide={() => setModalShow(false)}
          index={clickedIndex}
          selectedtransaction={selectedtransaction}
          transactionData={transactionData}
          getTransactions={() => getTransactions()}
          setTransactionData={() => setTransactionData()}
          accountData={accountData}
          currentUser={currentUser}
        />
        <SortMenuTransactions
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
      <Table striped hover>
        <thead>
          <tr>
            <th>Edit</th>
            <th>Id</th>
            <th>Customer</th>
            <th>Admin</th>
            <th>Dropped Off</th>
            <th>Message</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>{transactionInfo()}</tbody>
      </Table>
    </>
  );
};

ListTransactions.propTypes = {
  transactions: PropTypes.array,
};

export default ListTransactions;
