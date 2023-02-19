import { useDeleteTodo } from "@/hooks/deleteTodo";
import { useGetTodos } from "@/hooks/getTodos";
import { usePostTodo } from "@/hooks/postTodo";
import { useMutation } from "@tanstack/react-query";

export const Todo = () => {
  // Get
  const { data: todos, isLoading, isError, error, status } = useGetTodos();

  // POST
  const { queryClient, text, handleSubmit, handleOnChange } = usePostTodo();

  // Delete
  const { handleRemoveTodo } = useDeleteTodo();

  const updateTodo = async (todo) => {
    const res = await fetch(`http://localhost:4000/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    return res.json();
  };

  const updateMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const handleCheckChange = (todo) => {
    updateMutation.mutate(todo);
  };

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
          <li
            key={todo.id}
            style={
              todo.isCompleted === true
                ? { textDecorationLine: "line-through" }
                : {}
            }
          >
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() =>
                handleCheckChange({ ...todo, isCompleted: !todo.isCompleted })
              }
            />
            {todo.name}
            <button
              style={{ marginLeft: "0.2em", cursor: "pointer" }}
              onClick={() => handleRemoveTodo(todo.id)}
            >
              x
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
