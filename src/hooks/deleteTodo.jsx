import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  // 削除用の関数
  const deleteTodo = async (id) => {
    const res = await fetch(`http://localhost:4000/todos/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return res.json();
  };

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const handleRemoveTodo = (id) => {
    deleteMutation.mutate(id);
  };

  return { queryClient, handleRemoveTodo };
};
