import { h, Component } from 'preact'
import style from './style'
import firebase from 'firebase/app'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyBw5xxy64y00HVY6jSPXrmLuRmDp2juwNA",
    authDomain: "smart-eat-cb1b9.firebaseapp.com",
    databaseURL: "https://smart-eat-cb1b9.firebaseio.com",
    projectId: "smart-eat-cb1b9",
    storageBucket: "smart-eat-cb1b9.appspot.com",
    messagingSenderId: "269015425821",
    appId: "1:269015425821:web:639292d38c5a54545377f4",
    measurementId: "G-WM82LHN0T8"
}
firebase.initializeApp(config)


class Home extends Component {
	constructor() {
		super();
		this.state = {
			text: ''
		}

		this.addIngredient = this.addIngredient.bind(this)
		this.updateText = this.updateText.bind(this)
	}

	componentDidMount() {
		let databaseRef = firebase.database().ref()
		let ingredientsRef = databaseRef.child("ingredients")
		ingredientsRef.on("value", snap => console.log(snap.val()))
	}

	addIngredient() {
		let databaseRef = firebase.database().ref()
		let newIngredient = databaseRef.child("ingredients").push()
		newIngredient.set({
			name: this.state.text,
		})

		this.setState({
			text: ''
		})
	}	

	updateText(e) {
		let { value } = e.target
		this.setState({
			text: value
		})
	}

	render() {
		return (
			<div class={style.home}>
				<input type="text" onChange={this.updateText} value={this.state.text}/>
				<button onClick={this.addIngredient}>add</button>
			</div>
		)
	}
}

export default Home
