import React from 'react';
import logo from './logo.svg';
import './App.css';
import tachyons from 'tachyons';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';



const app=new Clarifai.App({
	apiKey:'734cd1060bb3454591d1a14e3a37ede7'
});





class App extends React.Component{
	constructor(){
		super();
		this.state={
			input:"",
			imageUrl:"",
			box:{}
		}
	}

	onInputChange=(event)=>{
		this.setState({input:event.target.value});

	}


	calculateFaceLocation=(data)=>{
		const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
		const image=document.getElementById("inputImage");
		const width=Number(image.width);
		const height=Number(image.height);
		let mainData={
			leftCol:clarifaiFace.left_col * width,
			topRow:clarifaiFace.top_row * height,
			rightCol:width - (clarifaiFace.right_col * width),
			bottomRow:height - (clarifaiFace.bottom_row * height)
		}
		return mainData;

	}


	displayFaceBox=(box)=>{
		this.setState({box:box});


	}

	onSubmit=()=>{
		this.setState({imageUrl:this.state.input});
		app.models
		.predict(
			'e466caa0619f444ab97497640cefc4dc','https://samples.clarifai.com/food.jpg'
		)
		.then(response=>{
			this.displayFaceBox(this.calculateFaceLocation(response));
		})
		.catch(err=> console.log(err));
	}



	render(){
		return (
    	<div className="App">
        <Navigation/>
    	<Logo/>
    	<Rank/>
    	<ImageLinkForm onSubmit={this.onSubmit} onInputChange={this.onInputChange}/>
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
       
    	</div>
   
  );
	}
    
  }


export default App;
