import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Некоректная почта').isEmail(),
  body('password', 'Некоректый пароль').isLength({ min: 5 }),
  body('fullName', 'Неправильное имя или фамилия').isLength({ min: 3 }),
  body('avatar', 'Неверная ссылка на фото профиля').optional().isURL(),
];

export const loginValidation = [
  body('email', 'Некоректная почта').isEmail(),
  body('password', 'Некоректый пароль').isLength({ min: 5 }),
];

export const postCreateValidation = [
  body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
  body('tags', 'Неверный формат тэгов').optional().isString(),
  body('comments', 'Неверный формат комментария').optional().isString(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];
