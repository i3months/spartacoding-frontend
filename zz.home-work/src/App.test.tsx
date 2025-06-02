import { fireEvent, render } from '@testing-library/react';
import App from './App';
import { format } from 'date-fns';
import { vi } from 'vitest';

const renderWithTodoInput = ({
  text,
  date,
}: {
  text: string;
  date: string;
}) => {
  const screen = render(<App />);
  const { getByTestId } = screen;

  const textInput = getByTestId('todo-form-text');
  fireEvent.change(textInput, { target: { value: text } });

  const deadlineInput = getByTestId('todo-form-deadline');
  fireEvent.change(deadlineInput, { target: { value: date } });

  return screen;
};

describe('TodoList 기능 테스트', () => {
  test('할 일을 100자 이상 입력시 등록 버튼 비활성화', () => {
    // Given
    const overLimitText = new Array(200).fill('a').join(' ');
    const today = format(new Date(), 'yyyy-MM-dd');

    // When
    const { getByTestId } = renderWithTodoInput({
      text: overLimitText,
      date: today,
    });

    // Then
    const submitButton = getByTestId('todo-form-button');
    expect(submitButton).toBeDisabled();
  });

  test('마감일이 오늘 이전이면 등록 버튼 비활성화', () => {
    // Given
    const fixedToday = new Date(2024, 11, 1);
    vi.useFakeTimers();
    vi.setSystemTime(fixedToday);

    const invalidDeadline = new Date(2024, 10, 1);

    // When
    const { getByTestId } = renderWithTodoInput({
      text: '테스트 할 일',
      date: format(invalidDeadline, 'yyyy-MM-dd'),
    });

    // Then
    const submitButton = getByTestId('todo-form-button');
    expect(submitButton).toBeDisabled();
  });
});
