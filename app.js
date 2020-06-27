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
        myLibrary.push(book)
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    }

    static deleteBook(book){
        alert('delete me')
        let id = book.id;
        const myLibrary = Store.getBooks()
        myLibrary.forEach((book, index)=>{
            if(book.id === id){
                books.splice(index, 1)
            }
        })
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    }

    static assignId(){
        id +=1 
        return id
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
        const readButton = document.createElement('a')
        readButton.classList = "indigo-text readButton"
        readButton.textContent = "Read"
        cardAction.append(readButton)
        const deleteButton = document.createElement('a')
        deleteButton.textContent = "Delete"
        deleteButton.classList = "red-text"
        deleteButton.href= "#"
        deleteButton.addEventListener('click', Store.deleteBook)
        cardAction.append(deleteButton)
        card.appendChild(cardAction)
        document.querySelector('.container').appendChild(card)
    } 
    static deleteBookUI(){
      
    }
}


const readBook = () =>{
    
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