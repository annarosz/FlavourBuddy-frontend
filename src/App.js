import React from "react";
import "./App.css";
import FoodPic from "./FBillustration.svg";
import Logo from "./logo.svg";
import Delicious from "./delicious.svg";
import ScrollableAnchor from "react-scrollable-anchor";

class App extends React.Component {
  state = {
    diets: null,
    dietCategories: false,
    keyIngredients: false,
    pairings: [],
    selectedDiet: null,
    learnMore: false
  };

  async componentDidMount() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/diets`);
    const data = await response.json();

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

  displayKeyIngredients = () => {
    this.setState({
      keyIngredients: !this.keyIngredients
    });
  };

  displayPairings = () => {
    this.setState({
      pairings: !this.state.pairings
    });
  };

  displayLearnMore = () => {
    this.setState({
      learnMore: !this.state.learnMore
    });
  };

  resetChoices = () => {
    this.setState({
      dietCategories: false,
      keyIngredients: false,
      pairings: [],
      learnMore: false
    });
  };

  render() {
    // learn more
    let learnMoreSection = null;
    if (this.state.learnMore) {
      learnMoreSection = (
        <>
          <p>
            FlavourBuddy allows you to ditch the recipe books and make delicious
            meals with creativity and confidence – by using trusted flavour
            combinations.
          </p>
          <p>
            Instead of purchasing one-off ingredients for a recipe, FlavourBuddy
            allows you to create with the ingredients you already have.
            Otherwise when shopping, be inspired by fresh and in-season produce
            and use FlavourBuddy as a guide.
          </p>
          {/* <img src={Carrot} style={{ width: "60px" }} /> */}
          <br />
        </>
      );
    }

    // diet types
    let dietList = null;
    if (this.state.dietCategories) {
      dietList = (
        <>
          <div
            id="dietList"
            className="container-section"
            style={{ backgroundColor: "#D3C014" }}
          >
            <>
              <h2>Choose your diet type</h2>
              <div className="button-container">
                {Object.keys(this.state.diets)
                  .sort((a, b) => (a > b ? 1 : -1))
                  .map((diet, index) => {
                    return (
                      <button
                        onClick={() => {
                          this.setState({
                            selectedDiet: diet
                          });
                          this.displayKeyIngredients();
                          this.displayPairings();
                        }}
                        className="button-round"
                        key={index}
                        id="button-diet"
                      >
                        <a className="circle" href="#diets">
                          {" "}
                          {diet}{" "}
                        </a>
                      </button>
                    );
                  })}
              </div>
            </>
          </div>
          <div
            className="triangle-down"
            style={{ borderTop: "125px solid #D3C014" }}
          />
        </>
      );
    }

    // key ingredients
    let keyIngredientList = null;
    if (this.state.keyIngredients) {
      keyIngredientList = (
        <>
          <div
            className="container-section"
            id="keyIngredients"
            style={{ backgroundColor: "#FDA94E" }}
          >
            <h3>Hello {this.state.selectedDiet} friend!</h3>

            <h2>Choose your key ingredient</h2>
            <p>to discover its flavour combinations</p>
            <br />
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
                      >
                        <a className="circle" href="#below-key-ingredients">
                          {" "}
                          {keyIngredient}{" "}
                        </a>
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
          <div
            className="triangle-down"
            style={{ borderTop: "125px solid #FDA94E" }}
          />
        </>
      );
    }

    // pairings
    let pairingList = null;
    if (this.state.pairings.length > 0) {
      console.log(this.state.pairings);
      pairingList = (
        <>
          <div className="container-section" id="pairings">
            <img src={Delicious} style={{ width: "250px" }} alt="Delicious" />
            <br />
            <h3>{this.state.keyIngredient} tastes great with</h3>
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
          <div className="triangle-down" />
          <div className="footer">
            <h3 style={{ color: "#F9421E" }}>Happy Cooking!</h3>
            <br />
            <img
              src={Logo}
              style={{ width: "200px" }}
              alt="FlavourBuddy logo"
            />
            <a href="#home">
              <i class="fas fa-arrow-up" />
            </a>
          </div>
        </>
      );
    }

    return (
      <div className="container">
        <ScrollableAnchor id={"home"}>
          <div />
        </ScrollableAnchor>
        <div className="container-intro">
          <img src={FoodPic} alt="Food illustration" />
          <img src={Logo} alt="FlavourBuddy logo" />
          <br />
          <h3>
            An ingredient pairing app that encourages creative cooking and
            reducing food waste.
          </h3>{" "}
          {learnMoreSection}
          <button
            style={{ marginBottom: "5px" }}
            onClick={this.displayLearnMore}
          >
            {!this.state.learnMore ? "Read More" : "Read Less"}
          </button>
          <button onClick={this.displayDietCategories}>
            <a href="#diets">
              {!this.state.dietCategories ? "Get Started" : ""}
            </a>
          </button>
        </div>
        <div className="triangle-down" />

        {dietList}
        <ScrollableAnchor id={"diets"}>
          <div />
        </ScrollableAnchor>
        {keyIngredientList}
        <ScrollableAnchor id={"below-key-ingredients"}>
          <div />
        </ScrollableAnchor>
        {pairingList}
      </div>
    );
  }
}

export default App;
