import React, { Component, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { Router, Scene, Actions } from 'react-native-router-flux'
let isReady = false;
export default class App extends Component {
  render() {
    return (
          <Router>
          <Scene key="root">
            <Scene key="about" component={About} title="About" />
              <Scene key="home" component={Home} title="Home" initial={isReady} />
            </Scene>
          </Router>
    )
  }
}
const Home = () =>{
  const goToAbout = () => {
    Actions.about()
  }
  return (
    <TouchableOpacity style={styles.home} onPress={goToAbout}>
      <Text>This is Home</Text>
    </TouchableOpacity>
        )
}
const About = () => {
  const goToAbout = () => {
    Actions.home()
  }
  const [Email, useEmail] = useState("");
  const [Password, usePassword] = useState("");
  const [Error, useError] = useState("");
  const submit = () => {
    if (Email.length > 4 && Email.indexOf("@") > -1 && Email.indexOf('.') > -1)
      if (Password.length > 0) {
        const main = fetch(`mysignalappapi.herokuapp.com/login/${Email}/${Password}`);
        main.catch(e => useError("There Was A Problem With Your Login ! Might Be Some Internet Error !"))
      } else useError("Please Enter A Valid Password"); else useError("Please Enter A Valid Email");
  }
  return (
    <View style={{ padding: 14 }}>
      <Text style={{ color: 'red' }}>{Error}</Text>
      <TextInput style={styles.inp} onChangeText={e =>useEmail(e)} placeHolder="Email" />
      <TextInput style={styles.inp} onChangeText={e => usePassword(e)} placeHolder="Password" secureTextEntry={true} />
      <TouchableOpacity onPress={submit} style={{padding: 6, borderRadius: 8, textAlign: 'center', margin: 2, backgroundColor: '#eeaa12'}}><Text>Log In</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  inp: {
    backgroundColor: '#45ff0f2a',
    marginBottom: 9,
    padding: 5,
    borderRadius: 5
  }
})
