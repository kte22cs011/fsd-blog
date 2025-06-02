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
      setMessage('')
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
      setMessage('')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Add a Blog</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="font-semibold text-gray-700">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="font-semibold text-gray-700">Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter author name"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
        <label className="font-semibold text-gray-700">Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter blog content"
          rows="5"
          className="border border-gray-300 rounded-md p-2 resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors duration-300"
        >
          Add Blog
        </button>
      </form>

      {message && (
        <p className="mt-4 text-green-600 font-medium text-center">{message}</p>
      )}
      {error && (
        <p className="mt-4 text-red-600 font-medium text-center">{error}</p>
      )}
    </div>
  )
}

export default AddBlog
