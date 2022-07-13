import { useState,useContext } from "react";
import { Link } from "react-router-dom";
import api from "../../../api";
import  AuthContext  from "../../../AuthProvider";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const { isLogin } = useContext(AuthContext);

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const response = await api("register", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(form),
      });
      if (response.data.token) {
        isLogin(response.data.token, response.data.author_id, response.data.name);
      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  return (
    <div class="container mx-auto p-4 bg-white">
      <div class="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
        <h1 class="text-lg font-bold">Register</h1>

        <form class="flex flex-col mt-4" onSubmit={(e) => handleRegister(e)}>
          <input
            type="text"
            name="username"
            class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Username"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

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

          <input
            type="password"
            name="repeat-password"
            class="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            placeholder="Repeat Password"
            value={form.confirm_password}
            onChange={(e) =>
              setForm({ ...form, confirm_password: e.target.value })
            }
          />

          <button
            type="submit"
            class="mt-4 px-4 py-3  leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
          >
            Register
          </button>
          <div class="flex flex-col items-center mt-5">
            <p class="mt-1 text-xs font-light text-gray-500">
              Register already?<Link to="/login"> sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
