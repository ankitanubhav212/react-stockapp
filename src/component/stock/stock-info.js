import React from 'react';
import axios from 'axios';
//import {stocks} from '../../stocks';
import { Line } from 'react-chartjs-2';
import { flattenDeep } from 'lodash';


export class StockInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            time: [],
            volume: [],
            price: []
        }
    }
    componentDidMount() {
        let ar;
        const id = this.props.match.params.id;
        const time = [];
        const volume = [];
        const price = [];
        axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" + id + "&interval=5min&apikey=G3YCMS5GOFFVPNEU")
            .then(res => {
                let metaData = res.data['Meta Data'];
                if (metaData) {
                    let data = {
                        symbol: metaData['2. Symbol'],
                        lastRefreshed: metaData['3. Last Refreshed'],
                        timeZone: metaData['4. Time Zone']
                    };
                    let timeSeries = res.data['Monthly Time Series'];

                    Object.keys(timeSeries).forEach(key => {
                        time.push(key);
                        const tdata = timeSeries[key];
                        volume.push(tdata['5. volume']);
                        price.push(tdata['4. close']);
                    })

                    this.setState({
                        data: data,
                        time: time,
                        volume: volume,
                        price: price
                    })
                }
            });
    }


    render() {
        const volumeChart = {
            labels: this.state.time,
            datasets: [
                {
                    label: 'Volume',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.volume
                }
            ]
        }
        if (this.state.data.symbol) {
            return (
                <div className="stock-info">
                    <div className="stock-details">
                        <div><span>Symbol: </span>{this.state.data.symbol}</div>
                        <div><span>Last Refreshed: </span>{this.state.data.lastRefreshed}</div>
                        <div><span>Time Zone: </span>{this.state.data.timeZone}</div>

                    </div>
                    <Line data={volumeChart}
                        width={100}
                        height={300}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />

                </div>
            )
        }
        else {
            return (<div>Loading..</div>)
        }
    }
}