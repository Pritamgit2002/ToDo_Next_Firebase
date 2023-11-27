import React from "react";
import { Box, Button, Link, Text, useColorMode } from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import { ClassNames } from "@emotion/react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { isLoggedIn, user } = useAuth();

  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
        //const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        console.log(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div>
      {isLoggedIn && (
        <div className="flex  items-start justify-between text-white ">
          <div className="flex items-center justify-center gap-4">
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl">Welcome,</span>
              <span className=" text-xl font-semibold sm:text-3xl">
                {user.displayName}
              </span>
            </div>
            <Image
              src={user.photoURL}
              alt="gh"
              width={1200}
              height={1200}
              className=" w-10 sm:w-12 h-10 sm:h-12 rounded-full border-[3px] border-gray-400 object-cover"
            />
          </div>
          <Link
            color="red.500"
            onClick={() => auth.signOut()}
            className="p-2 text-white rounded-xl bg-red-400 hover:scale-110 duration-150 ease-in text-xl font-semibold cursor-pointer "
          >
            Logout
          </Link>
        </div>
      )}
      {!isLoggedIn && (
        <div className="flex flex-col">
          <button
            leftIcon={<FaGoogle />}
            onClick={() => handleAuth()}
            className=""
          >
            <div className="text-2xl sm:text-4xl flex items-center justify-center gap-4 font-semibold ">
              <FcGoogle />
              Login with Google
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;
