import React from 'react';
import './App.css';

class PairingResult extends React.Component {
  state = { data: null }

  async componentDidMount() {
    const response = await fetch('http://localhost:5000/diets')
    const data = await response.json()
    this.setState({
      data: data
    })
  }

  // renderIngredient = showDiets => {
  //   return data.showDiets.map((diet, index) => {
  //     return (
  //       <div key={index}>
  //         {diet.ingredients.map((ingredient, index) => {
  //           return (
  //             <button key={index} className="button-round">{Object.keys(ingredient)[0]}</button>
  //           )
  //         })}
  //       </div>
  //       )
  //     })}

  render() {
    const { data } = this.state

    if (!data) {
      return null
    } else {
      console.log(data)

      return (
        <>
          <div className="container-section">
              <h1>YUMMMM!</h1>

              {data.showDiets.map((diet, index) => {
              return (
              <>
                <div key={index}>
                  {diet.ingredients.map((ingredient, index) => {
                    return (
                      <div key={index}>
                        <h3>{[Object.keys(ingredient)[0]]} tastes delicious with:</h3>
                        {ingredient[Object.keys(ingredient)[0]].map((pairing, index) => {
                          return <p key={index}>{pairing}</p>
                        })}
                      </div>
                    ) 
                  })}
                </div>
              </>
              )
            })}
          </div>
          <div className="triangle-down">
            <p>Happy Cooking!</p>
          </div>  
        </>
      )
    }
  }
}

export default PairingResult;