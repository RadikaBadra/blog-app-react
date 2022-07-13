import { useState, useEffect, useContext } from "react";
import Sidebar from "../../component/sidebar";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import api from "../../api";
import AuthContext from "../../AuthProvider";



export default function Home() {
  const [showBar, setShowBar] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const data = useContext(AuthContext);
  console.log(data);

  async function getBlog(e){
    try {
      const response = await api("getBlogs", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setBlogs(response.data);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }
  useEffect(() => {
    getBlog();
  }, []);

  return (
    <>
      <div className="bg-gray-200 h-screen">
        <div className="background flex">
          {showBar ? <Sidebar /> : null}
          <nav class="navBar relative select-none bg-black lg:flex lg:items-stretch">
            <div class="flex flex-no-shrink items-stretch h-16">
              <IconContext.Provider
                value={{
                  style: { fontSize: "30px", color: "rgb(255, 255, 255)" },
                }}
              >
                <button
                  class="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-grey-dark"
                  onClick={() => {
                    if (showBar == true) {
                      setShowBar(false);
                    } else {
                      setShowBar(true);
                    }
                  }}
                >
                  <FaBars />
                </button>
              </IconContext.Provider>
            </div>
          </nav>
          <div className="w-full h-screen">
            <div className="h-screen overflow-y-auto w-full">
              <h1 className="text-8xl">home</h1>
              {
                blogs.map((blog) => {
                  return (
                    <div className="bg-white p-4">
                      <h1 key={blog.id}>{blog.id}</h1>
                      <h1 className="text-2xl">{blog.title}</h1>
                      <p className="text-xl">{blog.content}</p>
                      <Link to={`/readblog/${blog.id}`}>
                        <button>baca</button>
                      </Link>
                    </div>
                  )
                }
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
