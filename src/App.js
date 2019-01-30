import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { StockList } from './component/stock/stock-list';
import { StockInfo } from './component/stock/stock-info';
class App extends Component {
  render() {
    return (

      <BrowserRouter>
        <div className="app">
          <header className="app-header">
            STOCK DATA
        </header>
          <Route exact path='' render={() => <Redirect to='/stocks' />} />
          <Route exact path='/stocks' component={StockList} />
          <Route exact path='/stockInfo/:id' component={StockInfo} />
        </div>
      </BrowserRouter>


    );
  }
}

export default App;
