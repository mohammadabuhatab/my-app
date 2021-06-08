import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      locationName:'',
      locationData:'',
      showMap: false,
      errorMasage: false
    }

  }

  getLocation = async(a) => {
    a.preventDefault()
  let url = `https://us1.locationiq.com/v1/search.php?key=pk.bda91f06da81a12d3f44a7893e00a109&q=${this.state.locationName}&format=json`;
  try {
  let result = await axios.get(url);
  console.log(result.data);
  this.setState({
    locationData:result.data[0],
    showMap:true
  })
}
catch {
  this.setState({
    errorMasage:true,
    showMap:false
  })
}}
  updateSearchQuery=(event) =>{
    this.setState({
      locationName:event.target.value
    })
}

render () {
  return (
    <>
      <h1> amman location </h1>
      <form onSubmit={this.getLocation}>
          <input type='text' placeholder='add a city' onChange={this.updateSearchQuery}/>
          <input type='submit' value='Get Location'/>
        </form>
        <p>{this.state.locationData.display_name}</p>
        {this.state.showMap && <img
        src={`https://maps.locationiq.com/v3/staticmap?key=pk.bda91f06da81a12d3f44a7893e00a109&center=${this.state.locationData.lat},${this.state.locationData.lon}`} alt=''
         />}
         {this.state.errorMasage&&<p>there is an error</p>}
    </>
  )
}
}

export default App;
