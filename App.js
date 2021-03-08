import logo from './logo.svg';
import './App.css';
import moreInfo from './moreInfo.png';
import roti from './roti-6.jpg'
import rotiFinal from './final.jpg'
import React, { state } from 'react';
import ReactStopwatch from 'react-stopwatch';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      rotiCount: 0,
      time:0,
      time2: 0,
      finTime: 29,
      reset: false,
      infoboard: true,
      imageReference: rotiFinal
    }
  }
  
  componentDidMount(){
    this.interval = setInterval(() => this.backgroundActivity(), 100);
  }

  backgroundActivity = () =>{
    if(this.state.reset){
      this.setState({rotiCount:  0})
      this.setState({reset:  false})
    }
    if (this.state.finTime >= 30){
      this.setState({imageReference: rotiFinal});

    }
    else{
    this.setState({imageReference: roti});
    }
    if (this.state.infoboard){
      this.setState({imageReference: rotiFinal});

    }
    this.setState({ time2: Date.now()/ 1000, finTime:  1 + Math.trunc(this.state.time2 - this.state.time) })
  }

  trackClicks = () => {
    if (this.state.finTime >= 30){
      this.setState({imageReference: rotiFinal});
    }
    else{
    this.setState({rotiCount:  this.state.rotiCount + 1})
    this.setState({imageReference: roti});
    }
  }

  photoShifter = () => {
    if(this.state.infoboard){
    this.setState({infoboard:!this.state.infoboard, imageReference: roti});
    }
    else{
      this.setState({infoboard:!this.state.infoboard, imageReference: rotiFinal});
    }
  }

  trackTime = () => {
    var rotiDate = new Date();
    this.setState({imageReference: roti});
    this.setState({ time: rotiDate.getTime()/ 1000, reset: true})
  }

  render() {
    var d = new Date();
    if (this.state.finTime > 10000){
    var starter =  <div className="top-text3" onClick={() => this.trackTime()}>
      Start
    </div>
    }
    else if (this.state.finTime > 30 && this.state.finTime<1000){
      var starter =  <div className="top-text" onClick={() => this.trackTime()}>
        Times Up (Click To Reset)
      </div>
      }
    else{
      var starter =  <div className="top-text2" onClick={() => this.trackTime()}>
    Reset: { this.state.finTime}
    </div>
    }

    if(!this.state.infoboard == true){
      var saveGame = <div> 
      <div className="count-roti">
      <div>
        {starter}
      </div>
      Kottu Count: { this.state.rotiCount}
      </div>
      </div>
    }
    else{
      var saveGame = <div className="information-card"> 
        <h1>What is Kottu Roti? </h1>
        <p>Kottu roti is a Tamil dish that essentially is chopped roti mixed with any type of curry. The curry can be based on meat products or purely vegetarian. Just in case your not familiar with what a Tamil dish is here is a little explanation. In my opinion, a Tamil dish is something Tamil people eat. Tamil people can be found around the world and Tamils have their own language and distinct culture separate from other Indian groups. </p>
          <h1>How does this game relate to Kottu Roti? </h1>
        <p>  Well, Kottu Roti in India and Sri Lanka is a form of fast-food akin to burgers in Canada. Chefs need to Kottu (chop) the roti into tiny pieces really quickly and this game attempts to simulate that.  </p>
          <h1>What is the objective of this game?  </h1>
        <p>The objective of the Kottu Roti game is to chop (click/tap) as much as possible in 30 seconds to simulate chefs cooking the dish who have to chop the roti as quickly as possible. The higher the kottu (chop) count the better. You can click/tap anywhere on the roti to chop it.</p>
      <button className="starter" onClick={() => this.photoShifter()}>Play Game </button>
      </div>
    }
    return (
      <div  onClick={() => this.trackClicks()} className="Background" style={{ backgroundImage: `url(${this.state.imageReference})` }}>
     <img onClick={() => this.photoShifter()} className="more-info" src={moreInfo} alt="Need a explaination?"/>
      {saveGame}
      
    </div>
    )
  }
}

export default App;
