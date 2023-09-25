'use client'
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CreatePost = () => {
    const session = useSession();
    const router = useRouter();

    const [formData, setFormData] = useState({
      title: "",
      img: "",
      content: "",
    });


    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const newPost = {
          ...formData,
          username: session.user.name,
        };

        await axios.post("/api/post", newPost);

        router.push("/");
      } catch (error) {
        console.error("Error creating post:", error);
      }
    };
  return (
    <div>
    <h1>Create a New Post</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          name="img"
          value={formData.img}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Create Post</button>
    </form>
  </div>
  )
}

export default CreatePost