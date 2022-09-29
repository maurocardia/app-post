const express = require('express');
const helmet = require("helmet")
const morgan = require("morgan")
const compression = require("compression")

// Routers
const { usersRouter } = require('./routes/users.routes');
const { postsRouter } = require('./routes/posts.routes');
const { commentsRouter } = require('./routes/comments.routes');

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

// Init our Express app
const app = express();

// Enable Express app to receive JSON data
app.use(express.json());
app.use(helmet())
app.use(compression())

if (process.env.NODE_ENV === "development") app.use(morgan("dev"))
else app.use(morgan("combined"))

// Define endpoints
// /posts
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', postsRouter); // next(error)
app.use('/api/v1/comments', commentsRouter);

// Global error handler
app.use(globalErrorHandler);

// Catch non-existing endpoints
app.all('*', (req, res) => {
	res.status(404).json({
		status: 'error',
		message: `${req.method} ${req.url} does not exists in our server`,
	});
});

module.exports = { app };
