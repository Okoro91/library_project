import { data } from "./data";

const addBookBtn = document.querySelector("#addBookBtn");
const bookList = document.querySelector("#bookList");
const newBook = document.querySelector("#new-book");

const myLibrary = [];

function Book(id, title, author, pages, details, size, link) {
  if (!new.target) {
    throw error("new is required");
  }
  this.id = id;
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.details = details;
  this.size = size;
  this.link = link;
  this.read = false;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.read ? "read" : "not read yet"
  }`;
};

function addBookToLibrary(title, author, pages, details, size, link) {
  const newBook = new Book(
    crypto.randomUUID(),
    title,
    author,
    pages,
    details,
    size,
    link
  );
  myLibrary.push(newBook);
  return newBook;
}

console.log(data);

data.forEach((book) => {
  addBookToLibrary(...book);
});

window.toggleRead = (id) => {
  const book = myLibrary.find((b) => b.id === id);
  if (book) {
    book.read = !book.read;
    displayBook();
  }
};

window.removeBook = (id) => {
  const book = myLibrary.find((b) => b.id === id);
  if (book) {
    myLibrary.pop();
    displayBook();
  }
};

const displayBook = () => {
  bookList.innerHTML = myLibrary
    .map(
      (book) => `
      <div class="book">
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>Details:</strong> ${book.details}</p>
        <p><strong>Size:</strong> ${book.size} MB</p>
        <a href="${book.link}" target="_blank">Download</a>
       <p> ${book.info()}</p>
        <button onclick="toggleRead('${book.id}')">Toggle Read</button>
        <button onclick="removeBook('${book.id}')">remove</button>
        <hr/>
      </div>
    `
    )
    .join("");
};

console.log(myLibrary);

displayBook();

const addBook = () => {
  newBook.innerHTML = `
    <form id="bookForm">
      <label for="title">Title:</label>
      <input type="text" id="title" required>

      <label for="author">Author:</label>
      <input type="text" id="author" required>

      <label for="pages">Pages:</label>
      <input type="number" id="pages" required>

      <label for="details">Details:</label>
      <textarea id="details" required></textarea>

      <label for="size">Size (MB):</label>
      <input type="number" id="size" required>

      <label for="link">Link:</label>
      <input type="url" id="link" required>

      <label for="read">Read:</label>
      <input type="checkbox" id="read">

      <button type="submit">Submit</button>
      <button id="discard">Discard</button>
    </form>
  `;

  const form = newBook.querySelector("#bookForm");
  const discard = newBook.querySelector("#discard");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = form.querySelector("#title").value;
    const author = form.querySelector("#author").value;
    const pages = parseInt(form.querySelector("#pages").value);
    const details = form.querySelector("#details").value;
    const size = parseFloat(form.querySelector("#size").value);
    const link = form.querySelector("#link").value;
    const read = form.querySelector("#read").checked;

    addBookToLibrary(title, author, pages, details, size, link);
    displayBook();
    newBook.close();
  });
  discard.addEventListener("click", (e) => {
    e.preventDefault();
    newBook.close();
  });
};

addBookBtn.addEventListener("click", () => {
  addBook();
  newBook.showModal();
});
