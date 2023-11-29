addEventListener("DOMContentLoaded", () =>
{
    // the div where all created books will display, and the starting book
    libraryDiv = document.getElementById("content-parent-div");
    placeHolderBook = document.getElementById("placeholder-div");

    // all elements needed to create a new book
    newBookButton = document.getElementById("new-button");
    userForm = document.getElementById("user-input-form");
    formTitle = document.getElementById("title-input");
    formAuthor = document.getElementById("author-input");
    formPages = document.getElementById("page-input");
    formCheck = document.getElementById("checkbox-input");
    createFormButtonN = document.getElementById("submit-button");
    cancelFormButtonN = document.getElementById("cancel-button");

    // all elements needed to edit a existing book
    editBookButton = document.getElementById("edit-button");
    userEditForm = document.getElementById("user-edit-form");

    deleteOption = document.getElementById("delete-option");
    editOption = document.getElementById("edit-option");
    editChoices = document.getElementById("edit-options-div");
    chooseBook = document.getElementById("book-choice-dropdown");
    
    createFormButtonNE = document.getElementById("submit-button2");
    cancelFormButtonNE = document.getElementById("cancel-button2");







// The code that manages our form inputs and creates new books

    function resetForm(formType) 
    {
        if(formType == "new")
        {
            formTitle.value = "";
            formAuthor.value = "";
            formPages.value = "";
            formCheck.checked = false;
            formTitle.placeholder = "Title";
            formTitle.classList.remove("red-border");
        }
        else if (formNum == "edit") 
        {
            deleteOption.checked = false;
            editOption.checked = false;
            chooseBook.selectedIndex = -1;
        }

    }
    createFormButtonN.addEventListener("click", (event) => {
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
            resetForm("new");
        }
        else
        {
            formTitle.placeholder = "REQUIRED FIELD";
            formTitle.classList.add("red-border");
        }
    })

    editBookButton.addEventListener("click", (event) => {
        userEditForm.showModal();
        editChoices.style.display = "none";
    })
    createFormButtonNE.addEventListener("click", (event) => {
        event.preventDefault();

        // implement functionality of editing book here
            // delete a book
            // change read status of a book
            // change a book's color
    
        userEditForm.close();
        resetForm("edit");
    })

    // show and hide the edit options depending on radio button selection
    editOption.addEventListener("change", () => {
        editChoices.style.display = "flex";
    })
    deleteOption.addEventListener("change", () => {
        editChoices.style.display = "none";
    })

    newBookButton.addEventListener("click", () => {
        userForm.showModal();
    })
    cancelFormButtonN.addEventListener("click", (event) => {
        userForm.close();
        resetForm("new");
        // below preventDefault is to prevent page refresh and loss of user created books when exiting modal pop up
        event.preventDefault();
    })
    cancelFormButtonNE.addEventListener("click", (event) => {
        userEditForm.close();
        resetForm("edit");
        // below preventDefault is to prevent page refresh and loss of user created books when exiting modal pop up
        event.preventDefault();
    })


// our myLibrary array used to store Book objects and it's related helper functions

    const myLibrary = [];
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



// Our book constructor with all it's prototype methods and it's static helper method

    function Book(title, author, pages, status)
    {
        this.title = title;
        this.author = author;
        this.status = (status) ? "Book Read" : "Book Unread";

        if(pages === "0"){
            this.pages = null;
        }
        else if(pages === "1"){
            this.pages = pages + " Page";
        }
        else{
            this.pages = pages + " Pages";
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



// Functions to create our HTML code pre-insertion to our index.html document

    function refreshAllBooks()
    {
        // function to "refresh" all books by emptying 'libraryDiv' and re-adding all books to it
        libraryDiv.innerHTML = "";
        for(let i = 0; i < myLibrary.length; i++)
        {
            currBook = `<div class="book-with-subtext"><div class="book"><div id="book-title">${myLibrary[myLibrary.length-1].getTitle()}</div><div id="book-author">${myLibrary[myLibrary.length-1].getAuthor()}</div></div><div class="book-subtext">${myLibrary[myLibrary.length-1].getSubtext()}</div></div>`;
            libraryDiv.innerHTML += currBook;
        }
    }
    function displayNewBook()
    {
        placeHolderBook.style.display = "none";
        // function to create new HTML code in form of plain text string with last added book's info
        currBook = `<div class="book-with-subtext"><div class="book"><div id="book-title">${myLibrary[myLibrary.length-1].getTitle()}</div><div id="book-author">${myLibrary[myLibrary.length-1].getAuthor()}</div></div><div class="book-subtext">${myLibrary[myLibrary.length-1].getSubtext()}</div></div>`;
        libraryDiv.innerHTML += currBook;
    }


});