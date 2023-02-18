import { useGetTodos } from "@/hooks/getTodos";
import { usePostTodo } from "@/hooks/postTodo";

export const Todo = () => {
  // Get
  const { data, isLoading, isError, error, status } = useGetTodos();

  // POST
  const { text, handleSubmit, handleOnChange } = usePostTodo();

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
        {data.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleOnChange} value={text} />
        <button>送信</button>
      </form>
    </>
  );
};
