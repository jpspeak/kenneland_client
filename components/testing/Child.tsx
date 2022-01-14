import { Box } from "@chakra-ui/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import useUser from "../../hooks/swr/use-user";
import Todo from "./Todo";

const Todos = () => {
  // const [todo, setTodo] = useState();
  // useEffect(() => {
  //   const getTodo = async () => {
  //     axios.get("https://jsonplaceholder.typicode.com/todos/1").then(res => setTodo(res.data));
  //   };
  //   getTodo();
  // }, []);
  const { todo } = useTodo();
  const { todo2 } = useTodo2();
  return (
    <>
      <h2>Todos</h2>

      {todo ? <Todo todo={todo} todo2={todo2} /> : <p>Loading...</p>}
    </>
  );
};

export default Todos;
const apiServerClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL
});
const useTodo = () => {
  const { data } = useSWR("/users/me", url => apiServerClient.get(url).then(res => res.data));
  return { todo: data };
};
// const useTodo = () => {
//   const { data } = useSWR("https://jsonplaceholder.typicode.com/todos/1", url => axios.get(url).then(res => res.data));
//   return { todo: data };
// };
const useTodo2 = () => {
  const { data } = useSWR("https://jsonplaceholder.typicode.com/todos/2", url => axios.get(url).then(res => res.data));
  return { todo2: data };
};
