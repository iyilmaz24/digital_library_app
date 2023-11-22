addEventListener("DOMContentLoaded", () =>
{

    tempDiv = document.getElementById("temp-result");


    function Book(title, author, pages, status)
    {
        this.title = title;
        this.author = author;
        this.pages = pages + " pages";
        this.status = (status) ? "finished/reading book" : "book unread";
        
        this.info = () => {
            return this.title + " by " + this.author + ", " + this.pages + ", " + this.status;
        }
    }

    sampleBook  = new Book("Harry Potter", "Rowling", "500", false);

    tempDiv.textContent = sampleBook.info();

});