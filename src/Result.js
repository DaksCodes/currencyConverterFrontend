import React from 'react'
import './result.css'
const Result = ({to,from,amount, result}) => {
  return (
    <div className='result'>
      {from} {amount} amounts to {to} {result}
    </div>
  )
}

export default Result
