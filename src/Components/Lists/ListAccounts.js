import React, { useState } from "react";
import PropTypes from "prop-types";
// Bootstrap
import Table from "react-bootstrap/Table";
// icons
import { AiFillEdit } from "react-icons/ai";
// components
import DisplayAccountModal from "../Modals/DisplayAccountModal";
import SortMenuAccounts from "../Sort/SortMenuAccounts";
import AddTransactionModal from "../Modals/AddTransactionModal";

const ListAccounts = ({
  accounts,
  wemes_url,
  getAccounts,
  setAddTransactionModalShow,
  addTransactionModalShow,
}) => {
  const [displayAccountModalShow, setDisplayModalShow] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(0);
  const [selectedaccount, setSelectedAccount] = useState({});
  const [sortBy, setSortBy] = useState("id");
  const [orderBy, setOrderBy] = useState("desc");
  const [useLastFour, setUseLastFour] = useState(false);

  const sortedAccounts = accounts.sort((a, b) => {
    let order = orderBy === "asc" ? 1 : -1;
    let sortByA = sortBy === "id" ? a[sortBy] : a[sortBy];
    let sortByB = sortBy === "id" ? b[sortBy] : b[sortBy];
    return sortByA < sortByB ? -1 * order : 1 * order;
  });

  const accountInfo = () => {
    return sortedAccounts.map((account, index) => (
      <tr
        key={index}
        onClick={() => {
          setClickedIndex(index);
          setDisplayModalShow(true);
          setSelectedAccount(account);
          setUseLastFour(false);
        }}
      >
        <td>
          <AiFillEdit />
        </td>
        <td>{account.last_four}</td>
        <td>{account.first_name}</td>
        <td>{account.last_name}</td>
        <td>{account.phone_num}</td>
        <td>{account.email}</td>
        <td>{account.transactions.length}</td>
      </tr>
    ));
  };

  return (
    <>
      <div>
        <DisplayAccountModal
          wemes_url={wemes_url}
          index={clickedIndex}
          selectedaccount={selectedaccount}
          getAccounts={() => getAccounts()}
          setUseLastFour={setUseLastFour}
          useLastFour={useLastFour}
          displayAccountModalShow={displayAccountModalShow}
          displayAccountModalOnHide={() => setDisplayModalShow(false)}
          setAddTransactionModalShow={() => setAddTransactionModalShow(true)}
        />
        <AddTransactionModal
          addTransactionModalShow={addTransactionModalShow}
          addTransactionModalOnHide={() => setAddTransactionModalShow(false)}
        />
        <SortMenuAccounts
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
            <th>Account ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Transactions</th>
          </tr>
        </thead>
        <tbody>{accountInfo()}</tbody>
      </Table>
    </>
  );
};

ListAccounts.propTypes = {
  accounts: PropTypes.array.isRequired,
};

export default ListAccounts;
