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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
    h-[580px] sm:h-screen 200 flex-wrap p-4 border-t-2   400 sm:border-none border-black"
    >
      {todos &&
        todos.map((todo) => (
          <div
            className={` bg-gray-900  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border-y-4 flex flex-col justify-between w-72 sm:w-96 h-60 sm:h-72 rounded-2xl shadow-lg  ${
              todo.status == "Pending⌛"
                ? "border-red-400 shadow-red-300"
                : "border-green-400 shadow-green-300"
            }`}
          >
            <div className="w-full   300 flex items-center justify-between border-b-2 px-4  border-black py-3 rounded-t-2xl  bg-neutral-800 ">
              <span className="text-4xl text-white font-semibold whitespace-normal h-max w-max overflow-auto ">
                {todo.title}
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      onClick={() => handleTodoDelete(todo.id)}
                      className="text-2xl px-1 text-red-500 cursor-pointer duration-300 sticky  active:text-xl"
                    >
                      <FaTrash />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black border-none rounded-xl p-3 text-xl font-semibold text-red-400">
                    <p>Delete Todo</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <span className="text-xl px-2 pt-3 h-full text-neutral-200 overflow-y-scroll">
              {todo.description}
            </span>

            <div className="border-t-2 bg-neutral-800 py-2 rounded-b-2xl border-black flex items-center justify-center">
              <div
                onClick={() => handleToggle(todo.id, todo.status)}
                className="flex gap-2 text-2xl items-center justify-between border-black text-white 300 w-44 mx-auto  "
              >
                {todo.status == "Pending⌛" ? (
                  <div className="text-red-400 text-xl duration-150 active:scale-0">
                    <IoIosRadioButtonOn />
                  </div>
                ) : (
                  <div className="text-green-400 text-xl  duration-150 active:scale-0">
                    <IoIosRadioButtonOn />
                  </div>
                )}
                <div className="flex w-96 gap-3 items-center">
                  <span className="text-white ">{todo.status}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TodoList;
