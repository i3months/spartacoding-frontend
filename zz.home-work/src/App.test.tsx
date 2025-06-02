import { cleanup, fireEvent, render } from '@testing-library/react';
import App from './App';
import { format } from 'date-fns';

const setup = () => {
  const utils = render(<App />);
  const { getByTestId } = utils;

  fireEvent.change(getByTestId('todo-form-text'), {
    target: { value: '할일 텍스트 문구' },
  });

  fireEvent.change(getByTestId('todo-form-deadline'), {
    target: { value: format(new Date(), 'yyyy-MM-dd') },
  });

  fireEvent.click(getByTestId('todo-form-button'));

  return utils;
};

describe('TodoList', () => {
  afterEach(cleanup);

  it('체크박스를 클릭하면 텍스트에 취소선이 추가된다.', () => {
    const { getByTestId } = setup();
    const checkbox = getByTestId(/todo-item-checkbox/);
    const text = getByTestId(/todo-item-text/);

    fireEvent.click(checkbox);
    expect(text.style.textDecoration).toBe('line-through');
  });

  it('체크박스를 클릭하면 체크 상태가 true가 된다.', () => {
    const { getByTestId } = setup();
    const checkbox = getByTestId(/todo-item-checkbox/);

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('체크된 박스를 다시 클릭하면 텍스트에서 취소선이 제거된다.', () => {
    const { getByTestId } = setup();
    const checkbox = getByTestId(/todo-item-checkbox/);
    const text = getByTestId(/todo-item-text/);

    fireEvent.click(checkbox);
    fireEvent.click(checkbox);

    expect(text.style.textDecoration).toBe('none');
  });

  it('체크된 박스를 다시 클릭하면 체크 상태가 false가 된다.', () => {
    const { getByTestId } = setup();
    const checkbox = getByTestId(/todo-item-checkbox/);

    fireEvent.click(checkbox);
    fireEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });
});
