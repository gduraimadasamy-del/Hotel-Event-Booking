
import Book from "../Models/Book.js";
import Event from "../Models/Event.js";

export const createBook = async (req, res, next) => {
  const eventId = req.params.eventid;
  const newBook = new Book(req.body);
  try {
    const savedBook = await newBook.save();
    try {
      await Event.findByIdAndUpdate(eventId, {
        $push: { book: savedBook._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedBook);
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedBook);
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (req, res, next) => {
  const eventId = req.params.eventid;
  try {
    await Book.findByIdAndDelete(req.params.id);
    try {
      await Event.findByIdAndUpdate(eventId, {
        $pull: { book: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Booking is deleted");
  } catch (err) {
    next(err);
  }
};

export const getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};

export const getallBook = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};