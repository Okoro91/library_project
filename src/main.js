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
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages ${
      this.read ? "read" : "not read yet"
    }`;
  };
}

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

addBookToLibrary(
  "Healing Body & Soul",
  "Dr. Amira Ayad",
  524,
  "Diet & nutrition Stress management Detoxification Neurolinguistic programming Exercise & physical therapy Lifestyle changes The power of prayer Like other guides to good health, Healing Body & Soul: Your Guide to Holistic Wellbeing Following Islamic Teachings advocates abandoning an unhealthy diet and altering a sedentary lifestyle, but this book goes beyond the mere physical aspects of health. Dr. Amira Ayad is a practitioner and researcher with a Master's in Pharmaceutics and a Doctorate in Natural Health.",
  12,
  "https://kalamullah.com/Books/Healing%20Body%20And%20Soul.pdf"
);

addBookToLibrary(
  "The Sealed Nectar",
  "Safi-ur-Rahman al-Mubarkpuri",
  656,
  "The heart of every Muslim is filled with the love the last Prophet Muhammad (SAWS) and the love of the Messenger of Allah is an asset for any Muslim. This book a biography goes into the details of the lineage of the Prophet (SAWS) his message, his jihad and his social interaction.",
  71,
  "https://kalamullah.com/Books/The-Sealed-Nectar-color-edition-Safiur-Rahman-Al-Mubarakpuri.pdf"
);

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
        <a href="${book.link}" target="_blank">Read Book</a>
        ${book.info()}
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
    </form>
  `;

  const form = newBook.querySelector("#bookForm");

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
};

addBookBtn.addEventListener("click", () => {
  addBook();
  newBook.showModal();
});
