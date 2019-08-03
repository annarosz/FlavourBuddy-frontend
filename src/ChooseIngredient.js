import React from 'react';
import './App.css';

class ChooseIngredient extends React.Component {
  state = { data: null }

  async componentDidMount() {
    const response = await fetch('http://localhost:5000/diets')
    const data = await response.json()
    this.setState({
      data: data
    })
  }

  render() {
    const { data } = this.state

    if (!data) {
      return null
    } else {
      console.log(data)

      return (
        <>
          <div className="container-section">
            {data.showDiets.map((diet, index) => {
                return <h2>Hello {diet.dietType} friend!</h2>
              })}
            <p>Choose a key ingredient from below to discover it’s complementary flavours:</p>

            <div className="button-container">

              {data.showDiets.map((diet, index) => {
                return (
                <div key={index}>
                  {diet.ingredients.map((ingredient, index) => {
                    return (
                      <button key={index} className="button-round">{Object.keys(ingredient)[0]}</button>
                    )
                  })}
                </div>
                )
              })}
            </div>  
          </div>
          <div className="triangle-down"></div>  
        </>
      )
    }
  }
}

export default ChooseIngredient;