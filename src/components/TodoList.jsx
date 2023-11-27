import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteTodo, toggleTodoStatus } from "../api/todo";
import "./style.css";
import { ToastAction } from "@/components/ui/toast";
import { IoIosRadioButtonOn } from "react-icons/io";

import { useToast } from "@/components/ui/use-toast";
import { BiSolidToggleLeft, BiSolidToggleRight } from "react-icons/bi";

const TodoList = () => {
  const [todos, setTodos] = React.useState([]);

  const { user } = useAuth();
  const { toast } = useToast();
  const refreshData = () => {
    if (!user) {
      setTodos([]);
      return;
    }
    const q = query(collection(db, "todo"), where("user", "==", user.uid));

    onSnapshot(q, (querySnapchot) => {
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setTodos(ar);
    });
  };

  useEffect(() => {
    refreshData();
  }, [user]);

  const handleTodoDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this todo?")) {
      deleteTodo(id);
      toast({ title: "Todo deleted successfully" });
    }
  };

  const handleToggle = async (id, status) => {
    const newStatus = status == "Completed✅" ? "Pending⌛" : "Completed✅";
    await toggleTodoStatus({ docId: id, status: newStatus });
    toast({
      title: `Todo marked ${newStatus}`,
      // status: newStatus == "Completed" ? "success" : "warning",
    });
  };

  return (
    <div
      className="flex items-center justify-center gap-16 w-full sm:w-[500px] overflow-auto sm:overflow-y-scroll 
    h-[580px] sm:h-screen  bg--200 flex-wrap p-4 border-t-2 bg--400 sm:border-none border-black"
    >
      {todos &&
        todos.map((todo) => (
          <div
            className={` bg-gray-900  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border-4 flex flex-col justify-between w-72 sm:w-96 h-60 sm:h-64 rounded-2xl shadow-md  py-2 ${
              todo.status == "Pending⌛"
                ? "border-red-400 shadow-red-300"
                : "border-green-400 shadow-green-300"
            }`}
          >
            <div className="w-full bg--300 flex items-center justify-between border-b-2 py-2 px-4  border-black ">
              <span className="text-4xl text-white font-semibold whitespace-normal h-max w-max  ">
                {todo.title}
              </span>
              <div
                onClick={() => handleTodoDelete(todo.id)}
                className="text-2xl text-red-500 cursor-pointer duration-300 sticky  active:text-xl"
              >
                <FaTrash />
              </div>
            </div>

            <span className="text-xl pl-3 text-neutral-200">
              {todo.description}
            </span>

            <div className="border-t-2 border-black flex items-center justify-center">
              <div
                onClick={() => handleToggle(todo.id, todo.status)}
                className="flex  gap-2  text-2xl items-center justify-between border-black text-white bg--300 w-44 mx-auto  "
              >
                {todo.status == "Pending⌛" ? (
                  <div className="text-red-400 text-xl">
                    <IoIosRadioButtonOn />
                  </div>
                ) : (
                  <div className="text-green-400 text-xl">
                    <IoIosRadioButtonOn />
                  </div>
                )}
                <span className="text-white ">{todo.status}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TodoList;