import React , { Component } from 'react';
import {StackActions, NavigationActions} from 'react-navigation';
import { 
    AsyncStorage,
    Dimensions,
    Modal,
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
} from 'react-native';


  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  
export default class Logout extends React.Component {
    constructor(){
        super();
        this.state = {
          username: "",
          token: "",
          modalVisible: true,
        }
      }
    
    // remove username, token value 
      _logout = async() => { 
        try {
          await AsyncStorage.removeItem('username')
          await AsyncStorage.removeItem('token')
          const resetActions = StackActions.reset({
            index:0,
            actions:[
              NavigationActions.navigate({routeName:'Login'})
            ],
          });
          this.props.navigation.dispatch(resetActions);
        
          
         } catch (error) {
           console.log(error)
         }
      }

      render() {

          return (
            <Modal 
            style={{justifyContent:'center', alignItems:'center'}}
            backdroColor='ffa503'
            animationIn={'slideInLeft'}
            animationOut={'slideOutRight'}
            isVisible = {this.state.modalVisible}
            onRequestClose= {() => { console.log("Modal has been closed.") } }>
          <View style={styles.modal}>

          <View style={styles.modalTitle}>
          <Text style={{fontSize: 20}}>
          Logout? {"\n"}
          </Text>
          </View>
          
          <View style={styles.modalItem}>
            <TouchableHighlight 
              onPress = {this._logout}>
              <Text style = {{fontSize: 16}}>Yes</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.modalItem}>
            <TouchableHighlight 
              onPress = {() => this.props.navigation.navigate('Home')}>
              <Text style ={{paddingBottom: 5 ,fontSize: 16 }}>No</Text>
            </TouchableHighlight>
          </View>

          </View>

          </Modal>



          )
      }

      _toggleModal(visible) {
        console.log("visible!!!"+visible);
        this.setState({ modalVisible: visible });
     }


    
}

const styles = StyleSheet.create({
modal: {
    height: 270,
    width:width,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  modalTitle:{
   justifyContent: 'center',
   alignItems: 'center',
   paddingBottom:20,
  
  },
  modalItem: {
    height: 60,
    justifyContent:'center',
    alignItems: 'center',
    paddingBottom:5,
  
  }
});