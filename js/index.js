const booksSection = document.querySelector('.books');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');

let books = JSON.parse(localStorage.getItem('books')) || [];

function createBook(book) {
  const bookEl = document.createElement('li');
  bookEl.setAttribute('id', book.id);

  const titleEl = document.createElement('p');
  titleEl.textContent = book.title;
  bookEl.appendChild(titleEl);

  const authorEl = document.createElement('p');
  authorEl.textContent = book.author;
  bookEl.appendChild(authorEl);

  const deleteButtonEl = document.createElement('button');
  deleteButtonEl.classList.add('remove-book');
  deleteButtonEl.classList.add('btn');
  deleteButtonEl.classList.add('btn-outline-dark');
  deleteButtonEl.textContent = 'Remove';
  deleteButtonEl.setAttribute('data-book-id', book.id);
  bookEl.appendChild(deleteButtonEl);

  const hr = document.createElement('hr');
  bookEl.appendChild(hr);

  booksSection.appendChild(bookEl);
}

if (localStorage.getItem('books')) {
  books.forEach((book) => createBook(book));
}

function addBook(title, author) {
  const book = {
    id: new Date().getTime(),
    title,
    author,
    isComplete: false,
  };
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
  createBook(book);
}

function removeBook(bookId) {
  books = books.filter((book) => book.id !== parseInt(bookId, 10));
  localStorage.setItem('books', JSON.stringify(books));
  const bookEl = document.getElementById(bookId);
  bookEl.remove();
}

