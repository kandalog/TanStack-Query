import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { Todo } from "@/components/todos";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Todo />
    </>
  );
}
