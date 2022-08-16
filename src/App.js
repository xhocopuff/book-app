import { useState } from 'react';

class Book {
  // <editor-fold defaultstate="collapsed" desc="Class properties">

  /**
   * @type string
   */
  title;

  /**
   * @type string
   */
  author;

  /**
   * @type File
   */
  image;

  // </editor-fold>

  /**
   *
   * @param {string} title
   * @param {string} author
   * @param {File} image
   */
  constructor(title, author, image) {
    this.title = title;
    this.author = author;
    this.image = image;
    this.id = new Date().getTime();
  }

  getImageUrl() {
    return URL.createObjectURL(this.image);
  }
}

/**
 *
 * @param {string} title
 * @param {string} author
 * @param {string} image The image URL
 * @param removeFromList
 */
function Card({ title, author, image, removeFromList }) {
  const closeBtnStyle = {
    cursor: 'pointer',
  };

  return (
    <div className='card'>
      <div style={closeBtnStyle} onClick={() => removeFromList()}>
        X
      </div>
      <div>
        <img
          src={image}
          alt=''
          style={{
            width: 580,
          }}
        />
      </div>
      <div>{title}</div>
      <div>{author}</div>
    </div>
  );
}

function App() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [, setFileFieldEvent] = useState(null);

  const [bookList, setBookList] = useState([]);

  const previewImageUrl = !selectedFile
    ? ''
    : URL.createObjectURL(selectedFile);

  const cardComponents = bookList.map((book) => (
    <Card
      title={book.title}
      author={book.author}
      image={book.getImageUrl()}
      key={book.id}
      removeFromList={() => {
        setBookList((prev) => prev.filter((it) => it.id !== book.id));
      }}
    />
  ));

  return (
    <div className='App'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setBookList((prev) => [
            ...prev,
            new Book(title, author, selectedFile),
          ]);
          setTitle('');
          setAuthor('');
          setSelectedFile(null);
          setFileFieldEvent((e) => {
            if (e) {
              e.target.value = null;
            }
            return null;
          });
        }}
      >
        <div>
          <label htmlFor='title'>Title:</label>
          <input
            type={'text'}
            value={title}
            id='title'
            required='required'
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor={'author'}>Author:</label>
          <input
            type={'text'}
            value={author}
            id={'author'}
            required='required'
            onChange={(event) => {
              setAuthor(event.target.value);
            }}
          />
        </div>

        <div>
          <input
            type={'file'}
            required='required'
            onChange={(e) => {
              setSelectedFile(e.target.files[0]);
              setFileFieldEvent(e);
            }}
          />
        </div>
        <img
          src={previewImageUrl}
          alt=''
          style={{
            width: 580,
          }}
        />
        <div>
          <button type={'submit'}>Submit</button>
        </div>
      </form>
      <div className={'book-list'}>{cardComponents}</div>
    </div>
  );
}

export default App;
