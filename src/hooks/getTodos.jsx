import { useQuery } from "@tanstack/react-query";

export const useGetTodos = () => {
  const queryFn = async () => {
    const res = await fetch("http://localhost:4000/todos");

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message);
    }

    return res.json();
  };

  const { data, isLoading, isError, error, status } = useQuery(
    ["todos"],
    queryFn
  );

  return { data, isLoading, isError, error, status };
};
