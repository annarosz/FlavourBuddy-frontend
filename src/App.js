import React from 'react';
import './App.css';
import FoodPic from './food.jpg';
import ChooseDiet from "./ChooseDiet";
import ChooseIngredient from "./ChooseIngredient";
import PairingResult from "./PairingResult";
import Question from "./Question";


class App extends React.Component {
  state = {
    data: null,
    dietCategories: false,
    keyIngredients: false,
    pairings: false
}

async componentDidMount() {
  const response = await fetch('http://localhost:5000/diets')
  const data = await response.json()
  this.setState({
    data: data
  })
}

displayDietCategories = () => {
  this.setState({
    dietCategories: !this.state.dietCategories
  })
}

displayKeyIngredients = () => {
  this.setState({
    keyIngredients: !this.state.keyIngredients
  })
}

displayPairings = () => {
  this.setState({
    pairings: !this.state.pairings
  })
}

  render() {

    const { data } = this.state

    // diet types
    let dietList = null 
    if ( this.state.dietCategories ) {
      dietList = (
        <div className="container-section" style={{marginBottom: '20px'}}>
          <h2>Step 1. Choose your diet type:</h2>
            <div className="button-container">
              {data.showDiets.map((diet, index) => {
                return <button onClick={this.displayKeyCategories} key={index} className="button-round">{diet.dietType}</button>
              })}
            </div>
            <button onClick={this.displayKeyIngredients}>Key Ingredients</button>
        </div>
      )
    }

    // key ingredients
    let keyIngredientList = null 
    if ( this.state.keyIngredients ) {
      keyIngredientList = (
        <div className="container-section" style={{marginBottom: '20px'}}>
          <h2>Step 2. Choose key ingredient:</h2>

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
            <button onClick={this.displayPairings}>Show pairings</button>  
        </div>
      )
    }

    // pairings
    let pairingList = null 
    if ( this.state.pairings ) {
      pairingList = (
        <div className="container-section" style={{marginBottom: '20px'}}>
          <h2>YUMM:</h2>
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
      )
    }
 
      return (
        <div className="container">

          <div className="container-intro">
            <img src={FoodPic} alt="Food illustration" />
            <h1>FlavourBuddy</h1>
            <p>FlavourBuddy is an ingredient pairing app with a mission to encourage creative cooking and reduce food waste.</p>
            <button>Learn More</button>
            <button onClick={this.displayDietCategories}>Get Started</button>
          </div>
          <div className="triangle-down"></div> 

          <div>
            {dietList}
          </div>
          <div>
            {keyIngredientList}
          </div>
          <div>
            {pairingList}
          </div>
          
        {/* <ChooseIngredient /> */}
        {/* <PairingResult /> */}
        <div className="triangle-up"></div>
      </div>
      )
    }
  }
       
export default App;