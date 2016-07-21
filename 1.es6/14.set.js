var books = new Set();
books.add('js');
books.add('js');
books.add('html');
console.log(books.size);
books.forEach(function(book){
    console.log(book);
})

console.log(books.has('jfs'));
books.delete('js');
console.log(books.size);
books.clear();
console.log(books.size);