import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

export default function ReadBlog() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);

  async function handleReadBlog(e) {
    try {
      const response = await api("getBlog/" + id, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.success) {
        setBlogs(response.data);
      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  useEffect(() => {
    handleReadBlog();
  }, [id]);

  return (
    <>
      <h1>baca blog</h1>
      {
        <>
        <h1>{blogs.title}</h1>
        <h2>{blogs.content}</h2>
        </>
      }
    </>
  );
}
