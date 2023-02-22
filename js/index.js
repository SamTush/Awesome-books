class Book {
  constructor(id, title, author, isComplete = false) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isComplete = isComplete;
  }

  createEl() {
    const bookEl = document.createElement('li');
    bookEl.setAttribute('id', this.id);

    const titleEl = document.createElement('p');
    titleEl.textContent = this.title;
    bookEl.appendChild(titleEl);

    const authorEl = document.createElement('p');
    authorEl.textContent = this.author;
    bookEl.appendChild(authorEl);

    const deleteButtonEl = document.createElement('button');
    deleteButtonEl.classList.add('remove-book');
    deleteButtonEl.classList.add('btn');
    deleteButtonEl.classList.add('btn-outline-light');
    deleteButtonEl.textContent = 'Remove';
    deleteButtonEl.setAttribute('data-book-id', this.id);
    bookEl.appendChild(deleteButtonEl);

    const hr = document.createElement('hr');
    bookEl.appendChild(hr);

    booksSection.appendChild(bookEl);
  }

  static addBook(title, author) {
    const book = new Book(new Date().getTime(), title, author);
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    book.createEl();
  }

  static removeBook(bookId) {
    books = books.filter((book) => book.id !== parseInt(bookId, 10));
    localStorage.setItem('books', JSON.stringify(books));
    const bookEl = document.getElementById(bookId);
    bookEl.remove();
  }
}

const booksSection = document.querySelector('.books');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');

let books = JSON.parse(localStorage.getItem('books')) || [];

if (localStorage.getItem('books')) {
  books.forEach((book) => new Book(book.id, book.title, book.author, book.isComplete).createEl());
}

document.querySelector('#book-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  if (title !== '' && author !== '') {
    Book.addBook(title, author);
    titleInput.value = '';
    authorInput.value = '';
    titleInput.focus();
  }
});

booksSection.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-book')) {
    const bookId = event.target.getAttribute('data-book-id');
    Book.removeBook(bookId);
  }
});

const dateTime = document.createElement('div');
const dateTimeDiv = document.querySelector('.date-time-div');

function dateTimefun() {
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let date = new Date();
  let hrs = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  let realDate = date.getDate();
  let month = date.getDay();
  let year = date.getFullYear();
  let week = weekday[date.getDay()];

  if (min < 10) {
    min = '0' + min;
  }

  if (sec < 10) {
    sec = '0' + sec;
  }

  if (month < 10) {
    month = '0' + month;
  }

  document.querySelector('.hours').innerHTML = hrs;
  document.querySelector('.minutes').innerHTML = min;
  document.querySelector('.seconds').innerHTML = sec;
  document.querySelector('.weekDay').innerHTML = week;
  document.querySelector('.date').innerHTML = realDate;
  document.querySelector('.day').innerHTML = month;
  document.querySelector('.year').innerHTML = year;
}

setInterval(dateTimefun, 10);
// dateTime.innerHTML = `
//   <a href="">${dateTime}</a>
// `;
// dateTimeDiv.appendChild(dateTime);
