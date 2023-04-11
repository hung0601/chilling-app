import React from "react";
import { FormOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import "./todo.css";

const todosData = [];

function TodoItem(props) {
  const completedStyle = {
    fontStyle: "italic",
    color: "#cdcdcd",
    textDecoration: "line-through",
  };
  return (
    <div className="checkbox-text">
      <input
        type="checkbox"
        // checked={props.item.completed}
        onChange={() => props.handleChange(props.item.id)}
      />
      <p style={props.item.completed ? completedStyle : null}>
        {props.item.text}
      </p>
    </div>
  );
}

class Todo extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: todosData,
      isShow: false,
      idCounter: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleChange(id) {
    this.setState((prevState) => {
      const checkingTodos = prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
      return {
        todos: checkingTodos,
      };
    });
  }
  handleButtonClick() {
    this.state.isShow
      ? this.setState({ isShow: false })
      : this.setState({ isShow: true });
  }
  onAddTask(value) {
    this.setState((prevState) => ({
      todos: [
        ...prevState.todos,
        {
          id: prevState.idCounter,
          text: value.task,
          completed: false,
        },
      ],
      idCounter: prevState.idCounter + 1,
    }));
  }
  handleDeleteTask(target) {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== target.id),
    }));
  }

  render() {
    const todos = this.state.todos.map((data) => (
      <div className="todo-item" key={data.id}>
        <TodoItem item={data} handleChange={this.handleChange} />
        <DeleteOutlined
          className="delete-button"
          onClick={() => this.handleDeleteTask(data)}
        />
      </div>
    ));

    return (
      <div className="todolist">
        <FormOutlined
          className="todolist-button"
          onClick={this.handleButtonClick}
        />
        <div className={this.state.isShow ? "todo-list" : "todo-list hidden"}>
          <div className="form">
            <Form
              name="horizontal_login"
              layout="inline"
              onFinish={(value) => this.onAddTask(value)}
            >
              <Form.Item
                name="task"
                rules={[{ required: true, message: "Please input task!" }]}
              >
                <Input placeholder="input task" />
              </Form.Item>
              <Form.Item shouldUpdate>
                {() => (
                  <Button type="primary" htmlType="submit">
                    <EditOutlined />
                  </Button>
                )}
              </Form.Item>
            </Form>
          </div>
          <div className="todo-items">{todos}</div>
        </div>
      </div>
    );
  }
}
export default Todo;
