import { TextField, Button } from '@mui/material';
import { Dispatch } from 'react';
import { Todo } from '../types/todo';
import { useTodoForm } from '../hooks/use-todo-form';
import { isAfter } from 'date-fns';

export const TodoForm = ({
  todos,
  setTodos,
}: {
  todos: Todo[];
  setTodos: Dispatch<React.SetStateAction<Todo[]>>;
}) => {
  const { initForm, updateDeadline, updateTodo, todo, deadline } =
    useTodoForm();
  const MAX_TODO_LENGTH = 100;

  const handleAddTodo = () => {
    if (!(todo.trim() && deadline)) return;

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: todo.trim(),
        completed: false,
        deadline,
      },
    ]);
    initForm();
  };

  return (
    <>
      <TextField
        label="New Todo"
        variant="outlined"
        inputProps={{
          'data-testid': 'todo-form-text',
        }}
        fullWidth
        value={todo}
        onChange={(e) => updateTodo(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <TextField
        label="Deadline"
        type="date"
        inputProps={{
          'data-testid': 'todo-form-deadline',
        }}
        InputLabelProps={{ shrink: true }}
        fullWidth
        value={deadline}
        onChange={(e) => {
          const selectedDate = e.target.value;
          updateDeadline(selectedDate);
        }}
        style={{ marginBottom: '1rem' }}
      />
      <Button
        variant="contained"
        color="primary"
        data-testid="todo-form-button"
        onClick={handleAddTodo}
        fullWidth
        disabled={
          !(todo.trim().length <= MAX_TODO_LENGTH) ||
          !deadline ||
          new Date(deadline).getTime() <=
            new Date(new Date().setHours(0, 0, 0, 0)).getTime()
        }
      >
        Add Todo
      </Button>
    </>
  );
};
