import React from 'react';
import './App.css';
import FoodPic from './food.jpg';

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
            <img src={FoodPic} alt="Food illustration" />
            <h1>FlavourBuddy</h1>
            <p>FlavourBuddy is an ingredient pairing app with a mission to encourange creative cooking and reduce food waste.</p>
            <button>Learn More</button>
            <button>Get Started</button>
          </div>
          <div className="triangle-down"></div> 
          
          <div className="container-choose-diet">
            <h2>Choose your diet type:</h2>
            <div className="button-container">
              {data.map((diet) => {
                return <button className="button-diet">{diet.dietType}</button>
              })}
            </div>
          </div>
          <div className="triangle-down"></div>  

          <div className="container-choose-ingredient">
            <h2>Hello food friend!</h2>
            <p>Choose from the key ingredients below to discover it’s complimentary flavours:</p>
            <div className="button-container">
              {data.map((diet, index) => {
                return (
                <div key={index}>
                  {diet.ingredients.map((ingredient, index) => {
                    return (
                      <button className="button-diet">{Object.keys(ingredient)[0]}</button>
                    )
                  })}
                </div>
                )
              })}
            </div>  
          </div>
          <div className="triangle-down"></div> 

          <div className="container-yum">
            <h1>YUMMMM!</h1>
            <h3>Key ingredient goes with:</h3>

            {data.map((diet, index) => {
            return (
            <div key={index}>
              {diet.ingredients.map((ingredient, index) => {
                return (
                  <div key={index}>
                    <p>{Object.keys(ingredient)[0]}</p>
                      <>
                        {ingredient[Object.keys(ingredient)[0]].map((pairing, index) => {
                          return <p key={index}>{pairing}</p>
                        })}
                      </>
                  </div>
                ) 
              })}
            </div>
            )
          })}
        </div>
        <div className="triangle-down"></div> 

        </div>
      )
    }
  }
}
       
export default App;