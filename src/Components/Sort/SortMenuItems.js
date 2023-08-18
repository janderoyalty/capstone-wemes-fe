import PropTypes from "prop-types";
// icons
import { BiCheck } from "react-icons/bi";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
// Bootstrap
import Button from "react-bootstrap/Button";

const SortMenuItems = ({
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
        onClick={() => onSortByChange("drop_off")}
        className="board-menu-item"
      >
        drop off date{" "}
        {sortBy === "drop_off" && <BiCheck id="board-menu--check-mark" />}
      </Button>
      <Button
        variant="warning"
        onClick={() => onSortByChange("due_date")}
        className="board-menu-item"
      >
        due date{" "}
        {sortBy === "due_date" && <BiCheck id="board-menu--check-mark" />}
      </Button>
      <Button
        variant="warning"
        onClick={() => onSortByChange("transaction")}
        className="board-menu-item"
      >
        transaction{" "}
        {sortBy === "transaction" && <BiCheck id="board-menu--check-mark" />}
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

SortMenuItems.propTypes = {
  sortBy: PropTypes.string.isRequired,
  onSortByChange: PropTypes.func.isRequired,
  orderBy: PropTypes.string.isRequired,
  onOrderByChange: PropTypes.func.isRequired,
};

export default SortMenuItems;
