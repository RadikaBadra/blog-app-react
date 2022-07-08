import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../../../api";
import  AuthContext  from "../../../AuthProvider";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { isLogin } = useContext(AuthContext);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api("login", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(form),
      });
      console.log(response);
      if (response.data.token) {
        isLogin(response.data.token, response.data.author_id);
      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }
  return (
    <div class="container mx-auto p-4 bg-white">
      <div class="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
        <h1 class="text-lg font-bold">Login</h1>
        <form class="flex flex-col mt-4" onSubmit={(e) => handleLogin(e)}>

          <input
            type="email"
            name="email"
            class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            name="password"
            class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            type="submit"
            class="mt-4 px-4 py-3  leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
          >
            Login
          </button>
          <div class="flex flex-col items-center mt-5">
            <p class="mt-1 text-xs font-light text-gray-500">
              Register already?
              <a class="ml-1 font-medium text-blue-400"><Link to="/register">Sign up</Link></a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
