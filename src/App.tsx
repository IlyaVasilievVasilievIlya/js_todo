import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { routeInfos } from './public/consts';

const App: React.FC = function () {

  const router = createBrowserRouter(routeInfos);

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;