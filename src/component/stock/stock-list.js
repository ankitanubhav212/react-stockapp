import React from 'react';
import axios from 'axios';
import { flattenDeep } from 'lodash';
//import {stocks} from '../../stocks';
import StockCard from '../stock/stock-card';
import '../stock/stock.css'
export class StockList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            search: ''
        }
    }

    addStock(res) {
        let globalQuote = res.data['Global Quote'];
        if (globalQuote !== undefined && Object.keys(globalQuote).length !== 0) {
            const data = {
                symbol: globalQuote['01. symbol'],
                open: globalQuote['02. open'],
                high: globalQuote['03. high'],
                low: globalQuote['04. low'],
                price: globalQuote['05. price'],
                volume: globalQuote['06. volume']
            }
            this.setState({ stocks: [...this.state.stocks, data] })
        }
    }

    componentDidMount() {
        let stocks = [];
        axios.get("http://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey= SYFCXTS0TDQJPUAE")
            .then(res => {
                this.addStock(res);
            });
    }

    getcards() {
        return this.state.stocks.map((stock, index) => {
            return (
                <StockCard key={index} stock={stock} />
            )
        });
    }

    onSearch(e) {
        this.setState({ search: e.target.value });
    }

    buttonClick(e) {
        axios.get("http://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="
            + this.state.search + "&apikey= SYFCXTS0TDQJPUAE")
            .then(res => { this.addStock(res) })
    }
    render() {
        return (
            <div>
                <input className="search-input" onChange={(e) => { this.onSearch(e) }}
                    placeholder="Search ticker to add in current list.." />
                <button className="search-but"
                    onClick={(e) => { this.buttonClick(e) }}
                >Search</button>
                {this.getcards()}
            </div>
        )
    }
}