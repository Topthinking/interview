import React from 'react';
import ReactDOM from 'react-dom';
import User from './context/user';
import Book from './context/book';
import Footer from './component/footer';
import './styles.css';

function App() {
  return (
    <div className="App">
      <User>
        <Book>
          <h1>合并多个context的使用</h1>
          <p>具体查看案例在component/info.js</p>
          <Footer />
        </Book>
      </User>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
