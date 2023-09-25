'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [img, setImg] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!img || !title || !content){
        console.log("All fields are required")
        return
    }

    try {

      const res = await fetch(`http://localhost:3000/api/post`, {
        headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${session?.user?.email}`,
          },
        method: 'POST',
        body: JSON.stringify({ title, content, img, username: session?.user?.email }),
      })

      if(!res.ok){
        throw new Error("Error occured")
      }

      const post = await res.json()

      router.push(`/`)
    } catch (error) {
        console.log(error)
    }
}

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="img"
            onChange={(e) => setImg(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            name="content"
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
