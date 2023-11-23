addEventListener("DOMContentLoaded", () =>
{

    userForm = document.getElementById("user-input-form");
    createFormButton = document.getElementById("submit-button");
    cancelFormButton = document.getElementById("cancel-button");
    newBookButton = document.getElementById("new-button");
    deleteBookButton = document.getElementById("delete-button");
    libraryDiv = document.getElementById("content-parent-div");
    formTitle = document.getElementById("title-input");
    formAuthor = document.getElementById("author-input");
    formPages = document.getElementById("page-input");
    formCheck = document.getElementById("checkbox-input");

    function resetForm() 
    {
        formTitle.value = "";
        formAuthor.value = "";
        formPages.value = "";
        formCheck.checked = false;
    }

    createFormButton.addEventListener("click", (event) => {
        event.preventDefault();
        Book.createNewBook(formTitle.value, formAuthor.value, formPages.value, formCheck.value);
        resetForm();
        userForm.close();
    })
    // deleteBookButton.addEventListener("click", )
    // implement deleting a book button functionality
    // can cause the clicking of the delete button make a bunch of X's pop up
    // after clicking an X, book gets deleted and the books all refresh
    newBookButton.addEventListener("click", ()=> {
        userForm.showModal();
    })
    cancelFormButton.addEventListener("click", () => {
        userForm.close();
    })

    // implement a way to change the status of a book from unread to read


    // temporary code below
    tempBook = document.getElementsByClassName("book");
    tempBookSubtext = document.getElementsByClassName("book-subtext");
    tempLibrary = document.getElementById("temp-library");
    // temporary code ^


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
    Book.createNewBook = function(title, author, pages, status) {
        newBook = new Book(title, author, pages, status);
        addBook(newBook);
        displayNewBook();
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
        currBook = `<div class="book-with-subtext"><div class="book">${myLibrary[myLibrary.length-1].getTitle()}</div><div class="book-subtext">${myLibrary[myLibrary.length-1].getSubtext()}</div></div>`;
        libraryDiv.innerHTML += currBook;
    }

});