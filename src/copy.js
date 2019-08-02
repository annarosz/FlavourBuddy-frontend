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


      return (
        <div className="container">

          <div className="container-intro">
            <h1>FlavourBuddy</h1>
            <p>FlavourBuddy is an ingredient pairing app with a mission to encourange creative cooking and reduce food waste.</p>
            <button>Learn More</button>
            <button>Get Started</button>
          </div> 
          
          <div className="container-choose-ingredient">
            <h2>Hello food friend!</h2>
            <p>Choose from the key ingredients below to discover it’s flavour buddies:</p>
          </div>

          {data.map((diet, index) => {
            return (
            // <div className="around-everything" key={index}>
            <>
              <div className="container-choose-diet">
                <h2>Choose your diet type:</h2>
                  <div className="round-diet">
                    <button>{diet.dietType}</button>
                  </div>
              </div>    

              
              {diet.ingredients.map((ingredient, index) => {
                return (
                  <>
                    <div className="round-ingredient" key={index}>
                        <p>{Object.keys(ingredient)[0]}</p>
                    </div>

                  <div className="container-yummmm">
                    <h1>YUMMMM!</h1>
                    <h3>Key ingredient goes with:</h3>
                    {ingredient[Object.keys(ingredient)[0]].map((pairing, index) => {
                      return <div className="pairing-ingredient" key={index}>{pairing}</div>
                    })}
                  </div>
                  </>
                ) 
              })}
              </>
            )
          })}

        </div>

      )
    }
  }
}

export default App;


// console.log(data.showDiets[0].ingredients[0].apple[0])
//console.log(data.showDiets[0].ingredients)
// const ingredients = data.showDiets[0].ingredients


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