import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e) {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredential.user;
      // getting all the everything inside the form data
      const formDataCopy = {...formData};
      // deleting the password from the form data
      delete formDataCopy.password;
      // add the time the user registers
      formDataCopy.timestamp = serverTimestamp();

      // saving the user data amd the user id to firebase database
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      // toast.success("Sign up was successful")
      navigate("/sign-in");
    } catch (error) {
      toast.error("Something went wrong with the registration")
    }
  }
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign Up</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img
            src='https://media.istockphoto.com/id/1386227069/photo/shot-of-an-unrecognizable-agent-handing-over-keys-to-a-new-homeowner.jpg?s=612x612&w=is&k=20&c=k0irUxi-l_y_dqh-PbkrWidDR_4bUwWNwxwCBq8SiUk='
            alt='key'
            className='w-full rounded-2xl'
          />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              id='name'
              value={name}
              placeholder='Full Name'
              className='w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
              onChange={onChange}
            />
            <input
              type='email'
              id='email'
              value={email}
              placeholder='Email address'
              className='w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
              onChange={onChange}
            />
            <div className='relative mb-6'>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                value={password}
                placeholder='Password'
                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
                onChange={onChange}
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className='absolute right-3 top-3 text-xl cursor-pointer'
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className='absolute right-3 top-3 text-xl cursor-pointer'
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6 '>
                Have an account?
                <Link
                  to='/sign-up'
                  className='text-red-600 hover:text-red-800 transition duration-200 ease-in-out ml-1'
                >
                  Sign in
                </Link>
              </p>
              <p>
                <Link
                  to='/forgot-password'
                  className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
            <button
              type='submit'
              className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'
            >
              sign up
            </button>
            <div className='flex my-4 items-center before:border-t before:flex-1 before:border-gray-300 after:border-b after:flex-1 after:border-gray-300'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
