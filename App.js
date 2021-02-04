import React, { Component, useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from 'react-native'
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux'
let isReady = true;
const final = { email: "hi@gmail.com", password: "aman" };
export default class App extends Component {
  render() {
    return (
          <Router>
          <Scene key="root">
            <Scene key="about" component={About} title="Login" />
            <Scene key="home" component={Home} title="Signal App" initial={isReady} />
            </Scene>
          </Router>
    )
  }
}
const Home = () => {
  const [Cont, useCont] = useState(null);
  useEffect(() => {
    const main = fetch("https://chefssignature.herokuapp.com/apiji/posts");
    main.catch(e => useCont(404));
    main.then(e => e.json()).then(data => useCont(data))
  }, []);
  return (
    <View style={styles.home}>
      <View>{Cont ? ((Cont != 404) ? (Cont.map((v, i) => (
         (<Text>{v.body}</Text>)
      ))) : (<View style={{ marginTop: "40%", borderRadius: 12, padding: 6, marginLeft: 18, marginRight: 18, textAlign: 'center', backgroundColor: '#ecf0f1'}}>
        <Text style={{fontSize: 17, color: 'red'}}>Error !!! Might Be Internet Disconnectivity !!!</Text>
      </View>)): (<ActivityIndicator style={{margin: 30}} size="large" color="#00ff00" />) }</View>
    </View>
        )
} 
const About = () => {
  const goToAbout = () => {
    Actions.home({ type: ActionConst.RESET })
  }
  const [Email, useEmail] = useState("");
  const [Password, usePassword] = useState("");
  const [Error, useError] = useState((<Text></Text>));
  const submit = () => {
    useError((<ActivityIndicator size="large" color="#00ff00" />));
    if (Email.length > 4 && Email.indexOf("@") > -1 && Email.indexOf('.') > -1)
      if (Password.length > 0) {
        const main = fetch(`https://chefssignature.herokuapp.com/login/${Email}/${Password}`);
        main.catch(e => useError((<Text style={{ color: 'red' }}>There Was A Problem With Your Login ! Might Be Some Internet Error !</Text>)));
        main.then(e => e.json()).then(dat => { dat.login ? goToAbout() : useError((<Text style={{color: 'red'}}>Incorrect Email Or Password</Text>)) });
      } else useError((<Text style={{ color: 'red' }}>Please Enter A Valid Password</Text>)); else useError((<Text style={{ color: 'red' }}>Please Enter A Valid Email</Text>));
  }
  return (
    <View style={{ padding: 14 }}>
      <View>{Error}</View>
      <TextInput style={styles.inp} onChangeText={e =>useEmail(e)} placeHolder="Email" />
      <TextInput style={styles.inp} onChangeText={e => usePassword(e)} placeHolder="Password" secureTextEntry={true} />
      <TouchableOpacity onPress={submit} style={{padding: 6, borderRadius: 8, textAlign: 'center', margin: 2, backgroundColor: '#eeaa12'}}><Text>Log In</Text></TouchableOpacity>
      <Text style={{ color: 'blue', textDecoration: "underline", textAlign: "center", marginTop: 16 }}>Forgot Password</Text>
      <Text style={{ color: 'blue', textDecoration: "underline", textAlign: "center", marginTop: 16}}>Create Account</Text>
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

