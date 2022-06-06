const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const Card = require('../models/card');
const { isEntityFound } = require('../utils/utils');

module.exports.getCards = (req, res, next) => {
  Card.find()
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return Promise.reject(new NotFoundError('Карточка не найдена'));
      }
      if (card.owner.toString() !== req.user._id) {
        return Promise.reject(new ForbiddenError('У вас недостаточно прав'));
      }
      return Card.findByIdAndRemove(cardId);
    })
    .then((card) => {
      if (!card) {
        return Promise.reject(NotFoundError('Карточка не найдена'));
      }
      return res.status(200).send(card);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const currentUser = req.user;
  Card.create({ name, link, owner: currentUser })
    .then((result) => res.status(201).send(result))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные карточки'));
        return;
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(cardId, {
    $addToSet: {
      likes: _id,
    },
  }, { new: true })
    .then((result) => isEntityFound(res, result, 'Карточка не найдена'))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные карточки'));
        return;
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(cardId, {
    $pull: {
      likes: _id,
    },
  }, { new: true })
    .then((result) => isEntityFound(res, result, 'Карточка не найдена'))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные карточки'));
        return;
      }
      next(err);
    });
};
