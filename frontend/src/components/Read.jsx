import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Read = () => {
    // State management
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // Environment configuration
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    // Data fetching effect
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(baseUrl);
                
                if (response.status !== 200) {
                    throw new Error('Failed to fetch blogs');
                }
                
                setBlogs(response.data);
            } catch (err) {
                setError(err.message || "Server interaction failed");
                console.error('Fetch error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, [baseUrl]);

    // Render states
    if (isLoading) return <div className="loading">Loading blogs...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (blogs.length === 0) return <div className="empty">No blogs available</div>;

    return (
        <div className="blog-container">
            <header className="blog-header">
                <h1>Blog Posts</h1>
                <p>Explore our latest articles</p>
            </header>

            <section className="blog-list">
                {blogs.map(blog => (
                    <article key={blog._id} className="blog-card">
                        <h2 className="blog-title">{blog.title}</h2>
                        <p className="blog-author">By {blog.author}</p>
                        <div className="blog-content">
                            {blog.content}
                        </div>
                        <footer className="blog-meta">
                            {/* Add date or other metadata here if available */}
                        </footer>
                    </article>
                ))}
            </section>
        </div>
    );
};

export default Read;
