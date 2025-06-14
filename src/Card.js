import React, { useState } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);
const Card = ({to,setTo,from,setFrom,amount,setAmount,result,setResult}) => {
  const [graphData, setGraphData] = useState(null);
    const handleChange=(e)=>{
      e.preventDefault();

      //converting the amount
      axios.get('/convert',{
        params:{
          from,to,amount
        }
      })
      .then(res => {
        console.log(res.data.result); // Converted value
        setResult(res.data.result);
  })
      .catch(err => {
        console.error(err);
  });


  //retriving historical data
  axios.get('/history', { params: { from, to } })
      .then(res => {
        const rates = res.data;
        const dates = Object.keys(rates).sort();
        const values = dates.map(date => rates[date][to]);

        setGraphData({
          labels: dates,
          datasets: [
            {
              label: `Exchange rate (${from} to ${to})`,
              data: values,
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.3,
              fill: false
            }
          ]
        });
      })
      .catch(console.error);
}
  return (
    <>
    <form onSubmit={handleChange}>
      <div className='currencyType'>
        <div className='eachCurrency'>
            <label>From: </label>
            <input type='text' onChange={(e)=>setFrom(e.target.value)} ></input>
        </div>
        <div className='eachCurrency'>
            <label>To: </label>
            <input type='text' onChange={(e)=>setTo(e.target.value)} ></input>
        </div>
        <div className='eachCurrency'>
            <label>Amount:  </label>
            <input type='number' onChange={(e)=>setAmount(e.target.value)}></input>
        </div>
      <button type='submit'>Convert</button>
      </div>
    </form>

     {result && <h3>Converted Amount: {result}</h3>}

      {graphData && (
        <div className='chart-container'>
          <h3>Exchange Rate History (Last 30 Days)</h3>
          <Line data={graphData} />
        </div>
      )}
    </>
  )
}

export default Card
