class BooksList {
  constructor() {
    this.favoriteBooks = [];
    this.filters = [];
      
    this.initData();
    this.getElements();
    this.render();
    this.initActions();
  }
  
  initData() {
    this.data = dataSource.books;
  }
  
  getElements() {
    this.template = document.getElementById('template-book').innerHTML;
    this.booksList = document.querySelector('.books-list');
    this.filterInputs = document.querySelectorAll('.filters input[type="checkbox"]');
  }
  
  initActions() {
    this.booksList.addEventListener('dblclick', (e) => {
      const bookImage = e.target.closest('.book__image');
      if (!bookImage) return;
  
      e.preventDefault();
      const bookId = bookImage.getAttribute('data-id');
      const index = this.favoriteBooks.indexOf(bookId);
  
      if (index === -1) {
        bookImage.classList.add('favorite');
        this.favoriteBooks.push(bookId);
      } else {
        bookImage.classList.remove('favorite');
        this.favoriteBooks.splice(index, 1);
      }
  
      console.log('Ulubione książki:', this.favoriteBooks);
    });
  
    this.filterInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        const filterValue = e.target.value;
        const isChecked = e.target.checked;
  
        if (isChecked) {
          this.filters.push(filterValue);
        } else {
          const index = this.filters.indexOf(filterValue);
          if (index !== -1) {
            this.filters.splice(index, 1);
          }
        }
  
        this.filterBooks();
      });
    });
  }
  
  render() {
    const compiledTemplate = Handlebars.compile(this.template);
    const generatedHTML = this.data.map(book => {
      const bookHTML = compiledTemplate(book);
      const bookElement = document.createElement('div');
      bookElement.innerHTML = bookHTML;
  
      const ratingElement = bookElement.querySelector('.book__rating__fill');
      const rating = book.rating;
      const ratingPercentage = (rating / 10) * 100;
  
      let background = '';
      if (rating < 6) {
        background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else {
        background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
      }
  
      ratingElement.style.width = `${ratingPercentage}%`;
      ratingElement.style.background = background;
  
      return bookElement.innerHTML;
    }).join('');
  
    this.booksList.innerHTML = generatedHTML;
    this.filterBooks();
  }
  
  filterBooks() {
    console.log('Aktywne filtry:', this.filters);
  
    for (const book of this.data) {
      let shouldBeHidden = false;
  
      for (const filter of this.filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
  
      const bookElement = document.querySelector(`.book__image[data-id="${book.id}"]`);
  
      if (bookElement) {
        if (shouldBeHidden) {
          bookElement.classList.add('hidden');
        } else {
          bookElement.classList.remove('hidden');
        }
      }
    }
  }
}
  
const app = new BooksList(); // eslint-disable-line no-unused-vars  