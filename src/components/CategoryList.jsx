import "./CategoryList.css";
import { CATEGORY_ITEMS } from "../constant";
import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppProvider";
import { PropTypes } from "prop-types";
const CategoryList = ({ todoList }) => {
  const { selectedCategoryId, setSelectedCategoryId } = useContext(AppContext);
  const countByNumber = useMemo(() => {
    return todoList.reduce(
      (acc, cur) => {
        return { ...acc, [cur.category]: acc[cur.category] + 1 };
      },
      { company: 0, travel: 0, idea: 0, personal: 0 }
    );
  }, [todoList]);
  return (
    <div>
      <p>Categories</p>
      <div>
        {CATEGORY_ITEMS.map((category) => {
          return (
            <div
              key={category.id}
              className={`category-item ${
                category.id === selectedCategoryId ? "selected" : ""
              }`}
              onClick={() => setSelectedCategoryId(category.id)}
            >
              <p className="category-name">{category.label}</p>
              <p>{countByNumber[category.id]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
CategoryList.propTypes = {
  todoList: PropTypes.array,
};
export default CategoryList;
