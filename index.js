import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import cors from 'cors';
import multer from 'multer';
import { loginValidation, postCreateValidation, registerValidation } from './validations.js';
import { UserController, PostController } from './controllers/index.js';
import { handleValidationErrors, checkAuth } from './utils/index.js';
// dotenv.config();
mongoose
  .connect('mongodb+srv://sultan:sultan@mern.lwk44zw.mongodb.net/?retryWrites=true&w=majority')
  .then((result) => console.log('Connect to Database is success!'))
  .catch((error) => console.log(error.message));
const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.Login);

app.post('/auth/register', registerValidation, handleValidationErrors, UserController.Register);

app.get('/auth/me', checkAuth, UserController.GetMe);
app.use('/uploads', express.static('uploads'));
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/posts', PostController.getAll);
app.get('/posts/order=2', PostController.getPopularPosts);
app.get('/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.post(
  '/comments',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.createComment,
);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update,
);

app.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    return console.log(err.message);
  } else {
    console.log('Node server is successfully runned');
  }
});
