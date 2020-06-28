let id = 0;

class Book {
    constructor(title, author, readStatus, pages){
        this.title = title;
        this.author = author;
        this.readStatus = readStatus;
        this.pages = pages;
        this.id = Store.assignId()
    }

}
class Store {
    static getBooks() {
        let myLibrary;
        if(localStorage.getItem('myLibrary') === null){
            myLibrary = []
        } else {
            myLibrary = JSON.parse(localStorage.getItem('myLibrary'))
        }
        return myLibrary
    }

    static render(){
        const books = Store.getBooks()
        books.forEach((book)=>{
            const ui  = new UI
            ui.createCard(book)
        })
    }

    static addBookToLibrary(book){
        const myLibrary = Store.getBooks()
        myLibrary.unshift(book)
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    }

    static deleteBook(id){
        const myLibrary = Store.getBooks()
        myLibrary.forEach((book, index)=>{
            if(book.id == id){
                myLibrary.splice(index, 1)
            }
        })
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    }

    static assignId(){
        id +=1 
        return id
    }
    static readBook(id){
        const myLibrary = Store.getBooks()
        myLibrary.forEach((book, index)=>{
            if(book.id == id){
                book.readStatus = true;
            }
        })
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    }
}
class UI {
    createCard(book){
        const card = document.createElement('div');
        card.classList = 'card'
        card.dataset.id = book.id
        const cardContent = document.createElement('div')
        // top section of card
        cardContent.classList = "card-content"
        card.appendChild(cardContent)
        // Title 
        const cardTitle = document.createElement('span')
        cardTitle.classList = 'card-title'
        cardTitle.textContent = book.title
        cardContent.appendChild(cardTitle)
        // Author
        const cardAuthor = document.createElement('p')
        cardAuthor.classList = "bookAuthor"
        cardAuthor.textContent = `Author: ${book.author}`
        cardContent.append(cardAuthor)
        // Pages 
        const cardPages = document.createElement('p')
        cardPages.textContent = `Pages: ${book.pages}`
        cardPages.classList = 'bookPages'
        cardContent.append(cardPages)

        // Card Action Section
        const cardAction = document.createElement('div')
        cardAction.classList = 'card-action'
        const readButton = document.createElement('button')
        if (book.readStatus == true){
            readButton.classList = ('indigo readButton btn disabled')
        } else {
            readButton.classList = ('indigo readButton btn')
        }
        readButton.textContent = "Read"
        readButton.addEventListener('click', UI.readBookUI)
        cardAction.append(readButton)
        const deleteButton = document.createElement('button')
        deleteButton.textContent = "Delete"
        deleteButton.classList = "red-text btn-flat"
        deleteButton.href= "#"
        deleteButton.addEventListener('click', UI.deleteBookUI)
        cardAction.append(deleteButton)
        card.appendChild(cardAction)
        //document.querySelector('.container').appendChild(card)
        document.querySelector('.container').prepend(card)
    } 
    static deleteBookUI(e){
        let id = e.target.parentNode.parentNode.dataset.id;
        e.target.parentNode.parentNode.remove()
        Store.deleteBook(id)
    }
    static readBookUI(e){
        let id = e.target.parentNode.parentNode.dataset.id;
        Store.readBook(id)
        e.target.classList.add('disabled')
    }

}
const addBookToLibrary = () => {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value
    const read = false;
    const book = new Book(title, author, read, pages)
    Store.addBookToLibrary(book)
    const ui = new UI()
    ui.createCard(book)
}

document.querySelector('.modal-close').addEventListener('click', addBookToLibrary)



document.addEventListener('DOMContentLoaded', Store.render())


// MaterializeCSS methods

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });
