const  {findAuthorById} = require("./books.js");

/*** --- HELPER FUNCTIONS --- ***/

/*Helper function to return an array of objects 
each object constains the a book object with author object added
function operates by taking in the books and authors array*/
const bookWithAuthorObj = (books, authors) => {
  //map books array and stores object in results variable
  const results = books.map((book) => {
    const { id, title, genre, authorId, borrows } = book;
    //calls function on books file
    //returns the authors object given an authorId
    const author = findAuthorById(authors, authorId);
    return { id, title, genre, authorId, author, borrows };
  });
  return results;
};

/*helper function to find books by given account object 
returns array of objects if book was borrowed by id*/
const booksByAccount = (account, books) => {
  //destructure account id
  const { id } = account;
  //return array
  //first filter through each book
  return books.filter((book) =>
    //then find the borrow id that matches the account id
    book.borrows.find((borrows) => borrows.id === id)
  );
};

/*** --- QUALIFIED FUNCTIONS --- ***/

function findAccountById(accounts, id) {
  const results = accounts.find((account) => account.id === id);
  return results;
}

function sortAccountsByLastName(accounts) {
  const results = accounts.sort((accountA, accountB) => {
    const nameA = accountA.name.last;
    const nameB = accountB.name.last;
    return nameA.toLowerCase() > nameB.toLowerCase() ? 1 : -1;
  });
  return results;
}

function getTotalNumberOfBorrows(account, books) {
  /*call helper function
  stores array of books borrowed by account in results var*/
  const results = booksByAccount(account, books);
  //return how many books in borrowed array
  return results.length;
}

function getBooksPossessedByAccount(account, books, authors) {
  const authorId = authors.id;
  //call helper function to get all books borrowed by account
  const booksBorrowed = booksByAccount(account, books);
  //find only books not returned by account
  const booksNotReturned = booksBorrowed.filter((book) => {
    const { borrows } = book;
    const { id, returned } = borrows[0];
    return !returned && id === account.id;
  });
  //call helper function to map results in array with book object and author object included
  const results = bookWithAuthorObj(booksNotReturned, authors);
  return results;
}
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
  bookWithAuthorObj,
};
