import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

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

  return { handleCheckChange };
};
