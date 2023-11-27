"use client";

import Image from "next/image";
import AddTodo from "../components/AddTodo";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import localFont from "next/font/local";

const title = localFont({ src: "../../public/American Captain.ttf" });

export default function Home() {
  const { isLoggedIn, user } = useAuth();

  return (
    <div className="min-h-screen  w-full max-h-max bg-black  flex justify-center  ">
      <Image
        src={
          "https://images.pexels.com/photos/11911068/pexels-photo-11911068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        alt="done"
        width={2000}
        height={2000}
        className="w-full h-full opacity-40 object-cover absolute overflow-hidden"
      />
      {isLoggedIn ? (
        <div className=" items-start w-full relative ">
          <div
            className="flex flex-col sm:flex-row items-center justify-center
           gap-8 mt-3 sm:mt-auto"
          >
            <div className="bg--400 w-full sm:w-auto px-3 ">
              <Auth />
              <AddTodo />
            </div>
            <div className="bg--400 ">
              <TodoList />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-between  gap-y-8">
          <div
            className=" text-neutral-200 underline p-3 text-[100px] sm:text-[120px] tracking-wider "
            style={title.style}
          >
            ToDo List
          </div>
          <div className="p-5 h-20 sm:h-32 rounded-2xl bg-yellow-300/80 w-max text-white border-2 absolute inset-0 mx-auto my-auto  border-blue-400 flex items-center justify-center ">
            <Auth />
          </div>
          <div className="text-red-400 text-lg">
            *Login to create your plan.
          </div>
        </div>
      )}
    </div>
  );
}
