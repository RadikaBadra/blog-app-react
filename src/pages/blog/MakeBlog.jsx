import { useState, useContext } from "react";
import api from "../../api";
import AuthContext from "../../AuthProvider";

export default function MakeBlog() {
  
  const { userID, userName } = useContext(AuthContext);

  const [image, setImage] = useState([]);
  const [author, setAuthor] = useState(userName);
  const [author_id, setAuthor_id] = useState(parseInt(userID));
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  function handleChange(e) {
    setImage(e.target.files[0]);
  }

  async function handleMakeBlog(e) {
    e.preventDefault();
    let images = image;
    let fd = new FormData()
    fd.append("author", author);
    fd.append("author_id", parseInt(author_id));
    fd.append("image", images);
    fd.append("title", "title");
    fd.append("content", "content");
    
    try {
      const response = await api("makeBlog", {
        method: "POST",
        headers: {
          contentType: "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: fd,
      });
      if (response.success) {
        alert("Blog created successfully");
      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }
  
  return (
    <>
      <h1>tes</h1>
      <form onSubmit={(e) => handleMakeBlog(e)} encType="multipart/form-data">
        <input
          type="text"
          placeholder="judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input type="file" name="image" onChange={(e) => handleChange(e)}/>

        <textarea
          placeholder="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button>submit</button>
      </form>
    </>
  );
}
