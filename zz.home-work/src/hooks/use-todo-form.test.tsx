import { renderHook, act } from '@testing-library/react';
import { useTodoForm } from './use-todo-form';

describe('useTodoForm', () => {
  it('할 일 텍스트를 변경하면 해당 값이 상태에 반영된다.', () => {
    const { result } = renderHook(() => useTodoForm());

    act(() => {
      result.current.updateTodo('테스트 작성하기');
    });

    expect(result.current.todo).toBe('테스트 작성하기');
  });

  it('데드라인을 변경하면 해당 값이 상태에 반영된다.', () => {
    const { result } = renderHook(() => useTodoForm());

    act(() => {
      result.current.updateDeadline('2025-01-01');
    });

    expect(result.current.deadline).toBe('2025-01-01');
  });

  it('초기화 시 텍스트와 데드라인은 빈 문자열로 초기화된다.', () => {
    const { result } = renderHook(() => useTodoForm());

    act(() => {
      result.current.updateTodo('초기화 테스트');
      result.current.updateDeadline('2025-01-01');
    });

    act(() => {
      result.current.initForm();
    });

    expect(result.current.todo).toBe('');
    expect(result.current.deadline).toBe('');
  });
});
