addEventListener("DOMContentLoaded", () =>
{

    tempBook = document.getElementById("temp-book");
    tempBookSubtext = document.getElementById("temp-book-subtext");
    tempLibrary = document.getElementById("temp-library");

    const myLibrary = [];

    function Book(title, author, pages, status)
    {
        this.title = title;
        this.author = author;
        this.pages = pages + " pages";
        this.status = (status) ? "finished/reading book" : "book unread";
        this.info = () => {
            return this.title + " by " + this.author + ", " + this.pages + ", " + this.status;
        }
        this.getTitle = () => {
            return this.title;
        }
        this.getAuthor = () => {
            return this.author;
        }
        this.getSubtext = () => {
            return this.pages + ", " + this.status;
        }
    };

    function addBook(Book)
    {
        myLibrary.push(Book);
    };

    function displayLibrary()
    {
        tempLibrary.innerHTML = "";
        for(let i = 0; i < myLibrary.length; i++)
        {
            tempLibrary.innerHTML += (myLibrary[i].info()) + "<br>";
        };
    }

    sampleBook  = new Book("Harry Potter", "Rowling", "500", false);
    sampleBook2 = new Book("Odin Project", "Open-Source", "3", true);
    addBook(sampleBook);
    addBook(sampleBook2)


    tempBook.textContent = sampleBook.getTitle() + sampleBook.getAuthor();
    tempBookSubtext.textContent = sampleBook.getSubtext();
    displayLibrary()

});