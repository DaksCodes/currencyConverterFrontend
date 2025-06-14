import Heading from './Heading'
import Result from './Result'
import Card2 from './Card2'
import Footer from './Footer'
import { useState } from 'react';
function App() {
  const [result,setResult]=useState(0);
  const [to,setTo]=useState('');
    const [from,setFrom]=useState('');
    const [amount,setAmount]=useState('');
  return (
    <div className="App">
      <Heading/>
      <Card2
      to={to}
      setTo={setTo}
      from={from}
      setFrom={setFrom}
      amount={amount}
      setAmount={setAmount}
      result={result}
      setResult={setResult}/>
      {/* <Result
      to={to}
      from={from}
      amount={amount}
      result={result}/> */}
      {/* <Footer/> */}
    </div>
  );
}

export default App;
