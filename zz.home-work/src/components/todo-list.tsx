import {
  List,
  ListItem,
  Checkbox,
  ListItemText,
  IconButton,
} from '@mui/material';
import { parseISO, format } from 'date-fns';
import { Todo } from '../types/todo';
import { InputHTMLAttributes, Dispatch } from 'react';
import { deleteTodo, updateToggle } from '../controllers/todo';

export const TodoList = ({
  todos,
  setTodos,
}: {
  todos: Todo[];
  setTodos: Dispatch<React.SetStateAction<Todo[]>>;
}) => {
  const handleToggleTodo = (id: number) => {
    setTodos(updateToggle(todos, id));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(deleteTodo(todos, id));
  };

  return (
    <List style={{ marginTop: '2rem' }}>
      {todos.map((todo) => (
        <ListItem key={todo.id}>
          <Checkbox
            inputProps={
              {
                'data-testid': `todo-item-checkbox-${todo.id}`,
              } as InputHTMLAttributes<HTMLInputElement> & {
                'data-testid': string;
              }
            }
            checked={todo.completed}
            onChange={() => handleToggleTodo(todo.id)}
          />
          <ListItemText
            primary={todo.text}
            data-testid={`todo-item-text-${todo.id}`}
            secondary={`Deadline: ${format(
              parseISO(todo.deadline),
              'yyyy-MM-dd'
            )}`}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
          />
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => handleDeleteTodo(todo.id)}
          >
            🗑️
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};
