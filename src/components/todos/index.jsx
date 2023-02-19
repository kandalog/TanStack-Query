import { useDeleteTodo } from "@/hooks/deleteTodo";
import { useGetTodos } from "@/hooks/getTodos";
import { usePostTodo } from "@/hooks/postTodo";

export const Todo = () => {
  // Get
  const { data: todos, isLoading, isError, error, status } = useGetTodos();

  // POST
  const { text, handleSubmit, handleOnChange } = usePostTodo();

  // Delete
  const { handleRemoveTodo } = useDeleteTodo();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <span>{error.message}</span>;
  }

  return (
    <>
      <h1>Todo一覧</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.name}
            <button
              style={{ marginLeft: "0.2em", cursor: "pointer" }}
              onClick={() => handleRemoveTodo(todo.id)}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleOnChange} value={text} />
        <button>送信</button>
      </form>
    </>
  );
};
