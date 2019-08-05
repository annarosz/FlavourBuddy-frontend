import React from 'react';

const Question = ( props ) => {
  return (
   <div>
    <h3>{props.title}</h3>
    <p>{props.answer}</p>
   </div>
  )
 };
 
 export default Question;