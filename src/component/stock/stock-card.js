
import React from 'react';
import { Link } from 'react-router-dom'
const StockCard = (props) => {

  const stock = props.stock;

  return (
    <Link style={{ textDecoration: 'none' }} to={"/stockInfo/" + stock.symbol}>
      <div className="stock-card">
        <div><span>Symbol: </span>{stock.symbol}</div>
        <div><span>High: </span>{stock.high}</div>
        <div><span>Low: </span>{stock.low}</div>
        <div><span>Open: </span>{stock.open}</div>
        <div><span>Price: </span>{stock.price}</div>
        <div><span>Volume: </span>{stock.volume}</div>

      </div>
    </Link>
  )
}
export default StockCard;