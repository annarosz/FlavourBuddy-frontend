import React from 'react';
import './App.css';
import FoodPic from './food.jpg';
import ChooseDiet from "./ChooseDiet";
import ChooseIngredient from "./ChooseIngredient";
import PairingResult from "./PairingResult";


class App extends React.Component {

  render() {
 
      return (
        <div className="container">

          <div className="container-intro">
            <img src={FoodPic} alt="Food illustration" />
            <h1>FlavourBuddy</h1>
            <p>FlavourBuddy is an ingredient pairing app with a mission to encourange creative cooking and reduce food waste.</p>
            <button>Learn More</button>
            <button onClick={this.getStarted}>Get Started</button>
          </div>
          <div className="triangle-down"></div> 
          
        <ChooseDiet />
        <ChooseIngredient />
        <PairingResult />

        <div className="triangle-up"></div>

        </div>
      )
    }
  }
       
export default App;