/*** --- HELPER FUNCTIONS --- ***/

/*helper function that finds the borrower of a book
givnen the book object and the accounts array*/
const findBookBorrowers = (book, accounts) => {
  //filter through each account
  const results = accounts.filter((account) =>
    //return the accounts that match a borrow transaction
    book.borrows.find((borrow) => borrow.id === account.id)
  );
  return results;
};

/*helper function that returns an object of books
filters through books given a boolean to test if returned or not*/
const booksByReturnedStatus = (books, testBoolean) => {
  //filter books and store in results var
  const results = books.filter((book) => {
    //destructure book and look at most recent borrow
    const { borrows } = book;
    const { returned } = borrows[0];
    //filter the book if the last borrow matches what boolean is given
    return returned === testBoolean;
  });
  return results;
};

/*** --- QUALIFIED FUNCTIONS --- ***/

function findAuthorById(authors, id) {
  //filter through authors to find author that matches a given id
  const results = authors.filter((author) => author.id === id);
  //change array of results to an object
  return results.reduce((acc, val) => (acc = val), {});
}

function findBookById(books, id) {
  //filter through books to find the book that matches a given id
  const results = books.filter((book) => book.id === id);
  //change array of results to an object
  return results.reduce((acc, val) => (acc = val), {});
}

function partitionBooksByBorrowedStatus(books) {
  //initialize empty array
  const results = [];
  //call helpter function to get array of books returned
  const booksReturned = booksByReturnedStatus(books, true);
  //call helpter function to get array of books not returned
  const booksBorrowed = booksByReturnedStatus(books, false);
  //push arrays into results array
  results.push(booksBorrowed, booksReturned);
  return results;
}

function getBorrowersForBook(book, accounts) {
  const { borrows } = book;
  //call helper function to create array of account objects that borrowed the book
  const borrowersForBook = findBookBorrowers(book, accounts).slice(0, 10);
  //reduce created array to accumulate the borrow info object that matches account id
  const results = borrowersForBook.reduce((acc, val) => {
    const borrowInfo = borrows.find((borrow) => borrow.id === val.id);
    //spread account object to include borrow info
    val = { ...val, ...borrowInfo };
    console.log(borrowInfo);
    //push object into array
    acc.push(val);
    return acc;
  }, []);
  return results;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
  booksByReturnedStatus
};
