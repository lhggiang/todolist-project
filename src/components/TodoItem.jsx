import PropTypes from "prop-types";
const TodoItem = (props) => {
  return (
    <div>
      <div
        className="todo-item"
        onClick={() => {
          props.handleTodoItemClick(props.id);
        }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          <input
            type="checkbox"
            checked={props.isCompleted}
            name=""
            id=""
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={() => {
              props.handleCompleteCheckboxChange(props.id);
            }}
          />
          <p className=".todo-item-text">{props.name}</p>
        </div>
        <p>{props.isImportant ? "⭐" : ""}</p>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  handleTodoItemClick: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
  isImportant: PropTypes.bool,
  isCompleted: PropTypes.bool,
  handleCompleteCheckboxChange: PropTypes.func,
};

export default TodoItem;
