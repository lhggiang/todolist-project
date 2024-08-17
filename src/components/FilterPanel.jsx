import { useMemo } from "react";
import "./FilterPanel.css";
import PropTypes from "prop-types";
import CategoryList from "./CategoryList";

const FILTER_ITEMS = [
  { id: "all", label: "All", iconPath: "./public/inbox.png" },
  { id: "important", label: "Important", iconPath: "./public/flag.png" },
  { id: "completed", label: "Completed", iconPath: "./public/check.png" },
  { id: "delete", label: "Delete", iconPath: "./public/delete.png" },
];

const FilterPanel = ({
  selectedFilterId,
  setSelectedFilterId,
  todoList,
  searchText,
  setSearchText,
}) => {
  const countByFilterType = useMemo(() => {
    return todoList.reduce(
      (acc, cur) => {
        let newAcc = { ...acc };
        if (cur.isImportant) {
          newAcc = { ...newAcc, important: newAcc.important + 1 };
        }
        if (cur.isCompleted) {
          newAcc = { ...newAcc, completed: newAcc.completed + 1 };
        }
        if (cur.isDelete) {
          newAcc = { ...newAcc, isDelete: newAcc.delete + 1 };
        }
        return newAcc;
      },
      { all: todoList.length, important: 0, completed: 0, delete: 0 }
    );
  }, [todoList]);
  return (
    <div className="filter-panel">
      <input
        name="search-text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      ></input>
      <div className="filter-container">
        {FILTER_ITEMS.map((filterItem) => {
          return (
            <div
              className={`filter-item ${
                filterItem.id === selectedFilterId ? "selected" : ""
              }`}
              onClick={() => setSelectedFilterId(filterItem.id)}
              key={filterItem.id}
            >
              <div className="filter-name">
                <img src={filterItem.iconPath} alt="" />
                <p>{filterItem.label}</p>
              </div>
              <p>{countByFilterType[filterItem.id]}</p>
            </div>
          );
        })}
      </div>
      <CategoryList todoList={todoList} />
    </div>
  );
};

FilterPanel.propTypes = {
  selectedFilterId: PropTypes.string,
  setSelectedFilterId: PropTypes.func,
  todoList: PropTypes.array,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
};

export default FilterPanel;
