import React from 'react'
import * as ReactDOM from 'react-dom'
import axios from 'axios'
import NProgress from 'nprogress'

class Dog extends React.Component {
	constructor(props){
		super(props)
		this.state = {Dog: '', Breed: []}
		this.clicker = this.clicker.bind(this)
		this.fetchDogByBreed = this.fetchDogByBreed.bind(this)
	}

	async fetchCat() {
		NProgress.start()
		const gotCat = await axios.get('https://dog.ceo/api/breeds/image/random')
		this.setState({Dog: gotCat.data.message})
		NProgress.done()
	}

	async fetchDogByBreed(n) {
		NProgress.start()
		const gotDog = await axios.get(`https://dog.ceo/api/breed/${n}/images/random`)
		this.setState({Dog: gotDog.data.message})
		NProgress.done()
	}

	clicker(e) {
		this.fetchCat()
	}

	clickerBreed(n) {
		this.fetchDogByBreed(n)
	}

	componentDidMount() {
		NProgress.configure({ easing: 'ease', speed: 500 })
		axios.get('https://dog.ceo/api/breeds/list').then((d)=>{
			const breeds = d.data.message.map((n)=>{
				return n
			})
			this.setState({Breed: breeds})
		})
		this.fetchCat()
	}

	render() {
		return (
			<div>
				<h1>Cute Dogs picture</h1>
				<p><img className='img' src={this.state.Dog} /></p>
				<p><button onClick={this.clicker}>Random</button></p>
				<h3>Change by breed</h3>
				{this.state.Breed.map((n,k)=>{
					return <button className='bt' key={k} onClick={e=>{this.clickerBreed(n)}}>{n.charAt(0).toUpperCase() + n.slice(1)}</button>
				})}
				<p>https://dog.ceo/dog-api/</p>
			</div>
		)
	}
}

const App = () => {
  return (
    <Dog/>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
