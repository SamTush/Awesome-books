const form = document.querySelector('#book-form');
const booksSection = document.querySelector('.books');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const buttonRemove = document.querySelector('.remove-book');

const books = JSON.parse(localStorage.getItem('books')) || [];

function createBook(book) {
  const bookEL = document.createElement('li');

  bookEL.setAttribute('id', book.id);

  if (book.isComplete) {
    bookEL.classList.add('complete');
  }

  const bookELMarkup = `
  <li>
    <p>${book.title}</p>
    <p>${book.author}</p>
    <button class="remove-book" id="remove-book ${book.id}" class="btn btn-outline-dark">Remove</button>
    <hr>
  </li>
  `;

  bookEL.innerHTML = bookELMarkup;

  booksSection.appendChild(bookEL);
}

if (localStorage.getItem('books')) {
  books.map((book) => (createBook(book)));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const titleValue = titleInput.value;
  const authorValue = authorInput.value;

  if (titleValue !== '' && authorValue !== '') {
    const book = {
      id: new Date().getTime(),
      title: titleValue,
      author: authorValue,
      isComplete: false,
    };

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));

    createBook(book);
    booksSection.reset();
    titleInput.focus();
    authorInput.focus();
  }
});

