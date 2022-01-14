import { Box } from "@chakra-ui/layout";

const Todo = ({ todo, todo2 }: { todo: any; todo2: any }) => {
  return (
    <>
      <h2>Todo</h2>
      <div>{JSON.stringify(todo)}</div>
      <div>{JSON.stringify(todo2)}</div>
    </>
  );
};

export default Todo;
