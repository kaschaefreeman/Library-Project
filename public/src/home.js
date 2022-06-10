import { booksByReturnedStatus } from "./books.js";

/*** --- HELPER FUNCTIONS --- ***/

//helper function that sorts results array of most popular by the counts
const sortByCounts = (itemArray) => {
  return itemArray.sort((a, b) => (a.count < b.count ? 1 : -1));
};

//helper function takes in authors and books array
//returns array of objects of author names and count of times their books were borrowed
const authorsWithBookBorrows = (authors, books) => {
  //map authors array
  const results = authors.map((author) => {
    const { id } = author;
    const { first, last } = author.name;
    //create new key of first and last name combined
    const name = first + " " + last;
    //filter books to create array of books written by author
    const authorBooks = books.filter((book) => book.authorId === author.id);
    //initialize variable to store count of times their books were borrowed
    let count = 0;
    authorBooks.forEach((book) => {
      //for each book, call helper function that counts times books were borrowed when called with book id
      const borrowcount = countBooksByItem(authorBooks, book.id);
      //add the count of the book borrow to count var
      count += borrowcount;
    });
    //map authors array to show new name key and the count of book borrows
    return { name, count };
  });

  return results;
};

//helper function that counts by specified item
//can be called with book genre or book id
const countBooksByItem = (books, countItem) => {
  const count = books.reduce((acc, book) => {
    const { id, genre, borrows } = book;
    //switch called with countItem var
    //use with two cases of either id or genre of book
    switch (countItem) {
      //if called with genre, increase accumulator by 1 for each time genre matches a book in books
      case genre:
        acc += 1;
        break;
      //if called by book id.  accumulator will equal the ammount of borrows of the book
      case id:
        acc += borrows.length;
        break;
    }
    return acc;
  }, 0);
  return count;
};

/*** --- MAIN FUNCTIONS --- ***/

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  //call helper function from books.js to store array of books with borrow most recent return status of false in booksBorrowed var
  const booksBorrowed = booksByReturnedStatus(books, false);
  //return the number of books not returned
  return booksBorrowed.length;
}

function getMostCommonGenres(books) {
  //initialiez empty array
  let results = [];
  books.forEach((book) => {
    const name = book.genre;
    //for each book call helper function to count number of books in given genre
    const count = countBooksByItem(books, name);
    //create object of genre and its count
    const item = { name, count };
    //if the initialized array does not have the genre in array, push item into array
    if (!results.some((result) => result.name === item.name))
      results.push(item);
  });
  //call helper function to sort by its count of each genre
  sortByCounts(results);
  //return the first five results in array
  return results.slice(0, 5);
}

function getMostPopularBooks(books) {
  //initialize empty array
  let results = [];
  books.forEach((book) => {
    const { title, id } = book;
    const name = title;
    //for each book, call helper function to count the number of borrows of the book
    const count = countBooksByItem(books, id);
    //create object of the book title and the count of borrows
    const item = { name, count };
    //for each book, check if results array does not have the title in added
    //if not push object into array
    if (!results.some((result) => result.name === item.name))
      results.push(item);
  });
  //call helper function by count of borrows
  sortByCounts(results);
  //return first five items in array
  return results.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  //
  const results = authorsWithBookBorrows(authors, books);
  sortByCounts(results);
  return results.slice(0, 5);
}

export {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
