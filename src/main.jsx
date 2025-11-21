import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const basename = import.meta.env.MODE === 'production' ? '/portfolio' : '/';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter basename='/portfolio'>
      <App />
    </BrowserRouter>
);

// ReactDOM.createRoot(document.getElementById('root')).render(
//     <BrowserRouter basename={basename}>
//       <App />
//     </BrowserRouter>
// );


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';
// import { BrowserRouter } from 'react-router-dom';

// const basename = import.meta.env.MODE === 'production' ? '/portfolio' : '/';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <BrowserRouter basename={basename}>
//     <App />
//   </BrowserRouter>
// );


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css';
// import { BrowserRouter } from 'react-router-dom';

// const basename = import.meta.env.MODE === 'production' ? '/portfolio' : '/';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <BrowserRouter basename={basename}>
//     <App />
//   </BrowserRouter>
// );
