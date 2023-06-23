"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useStore from "../store";
async function login(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST",
    //   mode: "cors",
    //   cache: "no-cache",
    //   credentials: "same-origin", 
      headers: {
        "Content-Type": "application/json",
      },
    //   redirect: "follow",
    //   referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  }
const Page = () => {
    const router = useRouter()
    const setUserInfo = useStore(state => state?.setUserInfo)
  const [data, setData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  useEffect(() => {
    setErrorMessage(null)
  }, [data])
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
        login("https://staging.kaufes.ch/api/auth/login/web", {email: data.email, password: data.password, fcm_token: ''}).then(data => {
        if(data?.data?.user){
            setUserInfo(data?.data?.user ?? {})
            router.push("/blog")
        }else{
            setErrorMessage("Email or password is incorrect!")
        }
    })
    } catch (err) {

    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <Image className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={data?.email}
                required
                onChange={handleChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={data?.password}
                required
                onChange={handleChange}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
          {
            errorMessage ? <p className="text-red-500">{errorMessage}</p> : null
          }
        </form>
      </div>
    </div>
  );
};

export default Page;
