import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const usePostTodo = () => {
  const queryClient = useQueryClient();
  const [text, setText] = useState("");

  // POSTリクエストを送るための関数
  const addTodo = async () => {
    const res = await fetch("http://localhost:4000/todos/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: text,
      }),
    });

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    return res.json();
  };

  // React queryのhooks
  const addMutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  // イベント発火系
  const handleSubmit = (e) => {
    e.preventDefault();
    addMutation.mutate();
    setText("");
  };

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  return { queryClient, text, handleSubmit, handleOnChange };
};
