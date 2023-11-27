import "./style.css";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import React from "react";
import useAuth from "../hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { addTodo } from "../api/todo";
const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Completed ✅");
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const { isLoggedIn, user } = useAuth();

  const handleTodoCreate = async () => {
    if (!isLoggedIn) {
      toast({
        title: "You must be logged in to create a todo",
      });
      return;
    }
    setIsLoading(true);
    const todo = {
      title,
      description,
      status,
      userId: user.uid,
    };
    await addTodo(todo);
    setIsLoading(false);

    setTitle("");
    setDescription("");
    setStatus("Pending⌛");

    //toast({ title: "Todo created successfully", status: "success" });
    toast({ title: "Todo created successfully" });
  };

  return (
    <div className="bg--400 flex flex-col sm:w-[550px] gap-y-4 mt-4 items-center ">
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className=" w-96 sm:w-full rounded-xl p-3"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-96 sm:w-full h-24 sm:h-40 rounded-xl p-3"
      />

      <div className="flex items-center justify-between w-full">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="sm:w-[200px] sm:text-xl rounded-xl p-3"
        >
          <option value={"Pending⌛"} className="rounded-lg">
            Pending⌛
          </option>
          <option value={"Completed✅"} className="rounded-lg">
            Completed✅
          </option>
        </select>

        <button
          onClick={() => handleTodoCreate()}
          disabled={title.length < 1 || description.length < 1 || isLoading}
          className="bg-green-400 px-8  py-2 text-xl hover:scale-110 duration-150 ease-in text-white font-semibold rounded-2xl cursor-pointer"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
