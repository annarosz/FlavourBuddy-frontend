import React from 'react';
import './App.css';

class App extends React.Component {
  state = { data: null }

  // componentDidMount runs second
  async componentDidMount() {
    const response = await fetch('http://localhost:5000/diets')
    const data = await response.json()
    this.setState({
      data: data.showDiets
    })
  }

  // render runs first
  render() {
    const { data } = this.state

    if (!data) {
      return null
    } else {
      console.log(data)
      // console.log(data.showDiets[0].ingredients[0].apple[0])
      //console.log(data.showDiets[0].ingredients)
      // const ingredients = data.showDiets[0].ingredients

      return (
        <div className="container">
          <h1>Welcome to flavourbuddy!</h1>
          <p>To start, choose your diet type...</p>
          {data.map((diet, index) => {
            return (
            <div key={index}>
              <h1>{diet.dietType}</h1>
              <>
              {diet.ingredients.map((ingredient, index) => {
                return (
                  <div key={index}>
                    <p>{Object.keys(ingredient)[0]}</p>
                      <ul>
                        {ingredient[Object.keys(ingredient)[0]].map((pairing, index) => {
                          return <li key={index}>{pairing}</li>
                        })}
                      </ul>
                  </div>
                ) 
              })}
              </>
            </div>
            )
          })}
        </div>
      )
    }
  }
}

export default App;
