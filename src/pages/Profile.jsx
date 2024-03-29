import { getAuth } from '@firebase/auth';
import React, { useState } from 'react'

export default function Profile() {
  const auth = getAuth()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData
  return (
    <>
      <section>
        <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            <input type="text" id="name" value={name}
              disabled className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border 
            border-gray-300 rounded transition ease-in-out" />

            <input type="email" id="email" value={email}
              disabled className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border 
            border-gray-300 rounded transition ease-in-out" />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p>Do you want to change your name?
                <span className="text-red-600 hover:text-red-700 transition ease-in-out
                duration-200 ml-1 cursor-pointer">Edit</span>
              </p>
              <p className="text-blue-600 hover:text-blue-800"></p>
              <p>Sign out</p>
            </div>
          </form>
        </div>
      </section >
    </>
  )
}
