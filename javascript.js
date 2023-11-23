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
        formTitle.placeholder = "Title";
        formTitle.classList.remove("red-border");
    }

    createFormButton.addEventListener("click", (event) => {
        event.preventDefault();

        if(formTitle.value !== "")
        {
            if(formAuthor.value == "")
            {   
                formAuthor.value = "Unknown";
            }
            if(formPages.value == "")
            {
                formPages.value = 0;
            }
            userForm.close();
            Book.createNewBook(formTitle.value, formAuthor.value, formPages.value, formCheck.checked);
            resetForm();
        }
        else
        {
            formTitle.placeholder = "REQUIRED FIELD";
            formTitle.classList.add("red-border");
        }
    })
    // deleteBookButton.addEventListener("click", )
    // implement deleting a book button functionality
    // make a modal pop up and then user can select a book from there through a dropdown list and choose to delete it
    newBookButton.addEventListener("click", ()=> {
        userForm.showModal();
    })
    cancelFormButton.addEventListener("click", (event) => {
        userForm.close();
        resetForm();
        // below preventDefault is to prevent page refresh and loss of user created books when exiting modal pop up
        event.preventDefault();
    })

    // implement a way to change the status of a book from unread to read
    // can change delete button to an edit button where book can be deleted or status changed


    // temporary code below to work on default book styling
    tempBook = document.getElementsByClassName("book");
    tempBookSubtext = document.getElementsByClassName("book-subtext");
    // temporary code ^


    const myLibrary = [];

    function Book(title, author, pages, status)
    {
        this.title = title;
        this.author = author;
        this.status = (status) ? "book read" : "book unread";

        if(pages === "0"){
            this.pages = null;
        }
        else if(pages === "1"){
            this.pages = pages + " page";
        }
        else{
            this.pages = pages + " pages";
        }

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
        if(this.pages === null){
            return this.status;
        }
        else{
            return this.pages + ", " + this.status;
        }
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
        // function to write out all contents of library
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

    function refreshAllBooks()
    {
        // function to "refresh" all books by emptying 'libraryDiv' and re-adding all books to it
        libraryDiv.innerHTML = "";
        for(let i = 0; i < myLibrary.length; i++)
        {
            currBook = `<div class="book-with-subtext"><div class="book">${myLibrary[i].getTitle()}</div><div class="book-subtext">${myLibrary[i].getSubtext()}</div></div>`;
            libraryDiv.innerHTML += currBook;
        }
    }

    function displayNewBook()
    {
        // function to create new HTML code in form of plain text string with last added book's info and then adding that string to the 'libraryDiv'
        currBook = `<div class="book-with-subtext"><div class="book">${myLibrary[myLibrary.length-1].getTitle()}</div><div class="book-subtext">${myLibrary[myLibrary.length-1].getSubtext()}</div></div>`;
        libraryDiv.innerHTML += currBook;
    }

});