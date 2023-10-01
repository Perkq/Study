import React, { FC } from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

export interface TodoItem {
  id: number;
  completed: boolean;
  text: string;
}

interface Props {
  todos: TodoItem[];
  toggleTodo: (id: number) => void;
}

const TodoList: FC<Props> = ({ todos, toggleTodo }) => (
  <ul>
    {todos.map((todo) => (
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => toggleTodo(todo.id)}
      />
    ))}
  </ul>
);


export default TodoList;