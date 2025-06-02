const express = require('express')
const mongoose = require('mongoose');
const Blog = require('./models/blog'); // Adjust the path as necessary
const cors = require('cors');

const app = express()
const port = 3000

app.use(express.json());
app.use(cors());
require('dotenv').config()
console.log(process.env.MONGODB_URL)

main()
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

// post a new blog
app.post('/', async (req, res) => {
  try {
    const { title, author, content } = req.body;
    if (!title || !author || !content) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const blog = new Blog({ title, author, content });
    await blog.save();   
    const blogs = await Blog.find();
    res.status(201).json({
      message: 'Blog created successfully',
      blogs
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
});

// retrieve all Blogs
app.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
});

// update a Blog
app.patch('/:id',async (req, res) => {
  try{
    const blogId = req.params.id;
    if(!blogId) {
      return res.status(400).json({ error: 'Blog ID is required' });
    }
    if(!req.body){
      return res.status(400).json({ error: 'Blog details are required' });
    }
    if(!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ error: 'Invalid Blog ID' });
    }
    const blog = await Blog.findByIdAndUpdate(blogId, req.body, { new: true });
    res.status(200).json({
      message: 'Blog updated successfully',
      updateedBlog: blog
    });
  }
  catch(error){
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
})

// delete a product
app.delete('/:id',async (req, res) => {
  try{
    const blogId = req.params.id;
    if(!blogId) {
      return res.status(400).json({ error: 'Blog ID is required' });
    }
    if(!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ error: 'Invalid Blog ID' });
    }
    const blog = await Blog.findByIdAndDelete(blogId, req.body, { new: true });
    if(!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    return res.status(200).json({
      message: 'Blog deleted successfully',
      deletedBlog: blog
    });
  }
  catch(error){
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
})

console.log('Backend server is running...')