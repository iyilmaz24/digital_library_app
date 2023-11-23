addEventListener("DOMContentLoaded", () =>
{

    libraryDiv = document.getElementById("content-parent-div");

    tempBook = document.getElementsByClassName("book");
    tempBookSubtext = document.getElementsByClassName("book-subtext");
    tempLibrary = document.getElementById("temp-library");

    const myLibrary = [];

    function Book(title, author, pages, status)
    {
        this.title = title;
        this.author = author;
        this.pages = pages + " pages";
        this.status = (status) ? "book read" : "book unread";
    };
    Book.prototype.info = function() {
        return this.title + " by " + this.author + ", " + this.pages + ", " + this.status;
    }
    Book.prototype.getTitle = function() {
        return this.title;
    }
    Book.prototype.getAuthor = function() {
        return this.author;
    }
    Book.prototype.getSubtext = function() {
        return this.pages + ", " + this.status;
    }

    function addBook(Book)
    {
        myLibrary.push(Book);
    }

    function displayLibrary()
    {
        tempLibrary.innerHTML = "";
        for(let i = 0; i < myLibrary.length; i++)
        {
            tempLibrary.innerHTML += (myLibrary[i].info()) + "<br>";
        };
    }

    sampleBook = new Book("Harry Potter", "Rowling", "500", false);
    sampleBook2 = new Book("Odin Project", "Open-Source", "3", true);
    addBook(sampleBook);
    addBook(sampleBook2);

    tempBook[0].textContent = sampleBook.info();
    tempBookSubtext[0].textContent = sampleBook.getSubtext();
    displayLibrary();

    function refreshAllBooks()
    {
        libraryDiv.innerHTML = "";
        for(let i = 0; i < myLibrary.length; i++)
        {
            currBook = `<div class="book-with-subtext"><div class="book">${myLibrary[i].getTitle()}</div><div class="book-subtext">${myLibrary[i].getSubtext()}</div></div>`;
            libraryDiv.innerHTML += currBook;
        }
    }

    function displayNewBook()
    {
        for(let i = myLibrary.length - 1; i < myLibrary.length; i++)
        {
            currBook = `<div class="book-with-subtext"><div class="book">${myLibrary[i].getTitle()}</div><div class="book-subtext">${myLibrary[i].getSubtext()}</div></div>`;
            libraryDiv.innerHTML += currBook;
        }
    }

    // parse form input from user and then dynamically create a new book by inserting their inputs into below function 
    function createNewBook(title, author, pages, status)
    {
        newBook = new Book(title, author, pages, status);
        addBook(newBook);
        displayNewBook();
    }
    createNewBook("Test Book", "Michael", "123", true);

});