import React from "react";
import "./App.css";
import FoodPic from "./food.jpg";
import ScrollableAnchor from "react-scrollable-anchor";

class App extends React.Component {
  state = {
    diets: null,
    dietCategories: false,
    keyIngredients: false,
    pairings: [],
    selectedDiet: null,
    keyIngredientFilter: "",
    learnMore: false
  };

  async componentDidMount() {
    const response = await fetch("http://localhost:5001/diets");
    const data = await response.json();

    // this.setState({ data: data });

    const diets = data.showDiets.reduce((obj, item) => {
      obj[item.dietType] = item.ingredients;
      return obj;
    }, {});

    this.setState({ diets: diets });
  }

  displayDietCategories = () => {
    if (!this.state.dietCategories) {
      this.setState({
        dietCategories: !this.state.dietCategories
      });
    } else {
      this.resetChoices();
    }
  };

  resetChoices = () => {
    this.setState({
      dietCategories: false,
      keyIngredients: false,
      pairings: false
    });
  };

  displayKeyIngredients = () => {
    this.setState({
      keyIngredients: !this.state.keyIngredients
    });
  };

  displayPairings = () => {
    this.setState({
      pairings: !this.state.pairings
    });
  };

  learnMore = () => {
    this.setState({
      learnMore: !this.state.learnMore
    });
  };

  render() {
    const { data } = this.state;

    // diet types
    let dietList = null;
    if (this.state.dietCategories) {
      dietList = (
        <div
          id="dietList"
          className="container-section"
          style={{ backgroundColor: "pink" }}
        >
          <>
            <h2>Choose your diet type:</h2>
            <div className="button-container">
              {Object.keys(this.state.diets)
                .sort((a, b) => (a > b ? 1 : -1))
                .map((diet, index) => {
                  return (
                    <button
                      onClick={() => {
                        this.setState({ selectedDiet: diet });
                        this.displayKeyIngredients();
                      }}
                      className="button-round"
                      key={index}
                    >
                      <a href="#diets"> {diet} </a>
                    </button>
                  );
                })}
            </div>
          </>
        </div>
      );
    }

    // key ingredients
    let keyIngredientList = null;
    if (this.state.keyIngredients) {
      keyIngredientList = (
        <div
          className="container-section"
          id="keyIngredients"
          style={{ marginBottom: "20px", backgroundColor: "wheat" }}
        >
          <h3>Hello {this.state.selectedDiet} friend!</h3>

          <h2>Choose your key ingredient:</h2>
          <div className="button-container">
            {this.state.diets[this.state.selectedDiet]
              // .sort((a, b) => (a > b ? 1 : -1))
              .map((ingredients, index) => {
                const keyIngredient = Object.keys(ingredients)[0];
                return (
                  <div key={index}>
                    <button
                      onClick={() => {
                        this.setState({
                          pairings: ingredients[keyIngredient],
                          keyIngredient: keyIngredient
                        });
                      }}
                      key={index}
                      className="button-round"
                      // style={{ backgroundColor: "lavender" }}
                    >
                      <a href="#ingredients"> {keyIngredient} </a>
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      );
    }

    // pairings
    let pairingList = null;
    if (this.state.pairings.length > 0) {
      console.log(this.state.pairings);
      pairingList = (
        <div
          className="container-section"
          id="pairings"
          style={{ marginBottom: "20px" }}
        >
          <h2>YUMM</h2>
          <h3>{this.state.keyIngredient} tastes delicious with:</h3>
          {this.state.pairings
            .sort((a, b) => (a > b ? 1 : -1))
            .map((ingredient, index) => {
              return (
                <div key={index}>
                  <div>
                    <p>{ingredient}</p>
                  </div>
                </div>
              );
            })}
        </div>
      );
    }

    return (
      <div className="container">
        <ScrollableAnchor id={"home"}>
          <div />
        </ScrollableAnchor>
        <div className="container-intro">
          <img src={FoodPic} alt="Food illustration" />

          <h1>FlavourBuddy</h1>
          <p>
            FlavourBuddy is an ingredient pairing app with a mission to
            encourage creative cooking and reduce food waste.
          </p>
          <button onClick={this.learnMore}>Learn More</button>
          <button onClick={this.displayDietCategories}>
            {!this.state.dietCategories ? "Get Started" : "Start Again"}
          </button>
        </div>

        {dietList}
        <ScrollableAnchor id={"diets"}>
          <div> $$$ </div>
        </ScrollableAnchor>
        {keyIngredientList}
        <ScrollableAnchor id={"ingredients"}>
          <div> – - - </div>
        </ScrollableAnchor>
        {pairingList}
        <ScrollableAnchor id={"pairings"}>
          <div> *** </div>
        </ScrollableAnchor>

        <div className="footer">
          <a href="#home">Home</a>
        </div>
      </div>
    );
  }
}

export default App;
