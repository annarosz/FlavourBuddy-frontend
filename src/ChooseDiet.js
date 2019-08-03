import React from 'react';
import './App.css';

class ChooseDiet extends React.Component {
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
            <h2>Choose your diet type:</h2>
            <div className="button-container">
              {data.showDiets.map((diet, index) => {
                return <button key={index} className="button-round">{diet.dietType}</button>
              })}
            </div>
          </div>
          <div className="triangle-down"></div>  
        </>
      )
    }
  }
}

export default ChooseDiet;