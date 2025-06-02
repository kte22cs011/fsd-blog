import React, { useState } from 'react'
import axios from 'axios'

const AddBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)

  const baseUrl = import.meta.env.VITE_API_BASE_URL // e.g., http://localhost:5000/api/blogs

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !author || !content) {
      setError('All fields are required.')
      return
    }

    try {
      const response = await axios.post(baseUrl, { title, author, content })
      console.log('Blog added:', response.data)
      setMessage('Blog successfully added!')
      setTitle('')
      setAuthor('')
      setContent('')
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Failed to add blog. Make sure the backend is running.')
    }
  }

  return (
    <div>
      <h2>Add a Blog</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: 400 }}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
        />

        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter author name"
        />
        
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter blog content"
          rows="5"
        />
        
        <button type="submit" style={{ marginTop: '10px' }}>Add Blog</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}