// import "./Styles/SortBoardMenu.css";
import PropTypes from "prop-types";
// icons
import { BiCheck } from "react-icons/bi";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
// Bootstrap
import Button from "react-bootstrap/Button";

const SortMenuAccounts = ({
  sortBy,
  onSortByChange,
  orderBy,
  onOrderByChange,
}) => {
  return (
    <section id="sort-board-menu">
      <h4 className="sort-board-menu--label">sort by</h4>
      <Button
        variant="warning"
        onClick={() => onSortByChange("last_four")}
        className="board-menu-item"
      >
        account id{" "}
        {sortBy === "last_four" && <BiCheck id="board-menu--check-mark" />}
      </Button>
      <Button
        variant="warning"
        onClick={() => onSortByChange("last_name")}
        className="board-menu-item"
      >
        last name{" "}
        {sortBy === "last_name" && <BiCheck id="board-menu--check-mark" />}
      </Button>
      <Button
        variant="warning"
        onClick={() => onSortByChange("first_name")}
        className="board-menu-item"
      >
        first name{" "}
        {sortBy === "first_name" && <BiCheck id="board-menu--check-mark" />}
      </Button>
      <br />
      {/*  ********** <h4 className="sort-board-menu--label">order</h4> **********  */}
      <div>
        <FaLongArrowAltUp
          title="ascending"
          size={35}
          onClick={() => onOrderByChange("asc")}
          className="board-menu-item"
        >
          ascending{" "}
          {orderBy === "asc" && <BiCheck id="board-menu--check-mark" />}
        </FaLongArrowAltUp>
        <FaLongArrowAltDown
          title="descending"
          size={35}
          onClick={() => onOrderByChange("desc")}
          className="board-menu-item"
        >
          descending{" "}
          {orderBy === "desc" && <BiCheck id="board-menu--check-mark" />}
        </FaLongArrowAltDown>
      </div>
    </section>
  );
};

SortMenuAccounts.propTypes = {
  sortBy: PropTypes.string.isRequired,
  onSortByChange: PropTypes.func.isRequired,
  orderBy: PropTypes.string.isRequired,
  onOrderByChange: PropTypes.func.isRequired,
};

export default SortMenuAccounts;
