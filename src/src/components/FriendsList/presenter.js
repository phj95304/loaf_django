import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity,KeyboardAvoidingView,Alert } from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import SearchInput, { createFilter } from 'react-native-search-filter';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base'
// import user from "./api/users";
import { createStackNavigator } from 'react-navigation';

const KEYS_TO_FILTERS = ['username', 'tags']
   
class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm:'',
      friendlist : []
    };   
  }
  async componentDidMount() {  
    const token = this.props.navigation.getParam('token','NO-token')
    console.log("token : " + token)
    this.setState({token: token})
    return fetch("http:/222.111.115.100:8000/users/explore/", {
      method: 'GET',
      credentials:'include',
        headers: {
          "content-type" : "application/json",
          'Authorization' : `JWT ${token}`
        }
    })
    .then((response)=> {
      console.log(response)
      return response.json();
    })
    .then((responseJson) => this.setState({
      friendlist : responseJson
    }))
    .catch((error)=> {
      console.error(error)
    });
  }  
  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  render() {
    const friends = this.state.friendlist
    const token = this.state.token
    const filteredFriends = friends.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    const { navigation } = this.props;
    return (
      <View> 
      <KeyboardAvoidingView>
        <SearchInput
          onChangeText={(term) => {this.searchUpdated(term)}}
          style={styles.searchInput}
          placeholder="Search Friends (ex. 취업)"
        />
      </KeyboardAvoidingView>
        <ScrollView>
          {filteredFriends.map(friends => {
            return( 
              <TouchableOpacity onPress={() => navigation.navigate('FriendDetail', {
                username : friends.username,
                token : token
              })} 
              key={friends.id} 
              style={styles.emailItem}
              >
              <CardItem>
                  <Left>
                      <Thumbnail source={{uri : `http://222.111.115.100:8000${friends.profile_image}`}} />
                      <Body>
                          <Text style={{ fontSize: 17 }}>{friends.username}</Text>
                          <Text style={{ fontSize: 15, marginTop:10 }}>#{friends.tags[0]} #{friends.tags[1]} #{friends.tags[2]}</Text>
                      </Body>
                  </Left>
              </CardItem>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  emailItem:{
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
  },
  emailSubject: {
    color: 'rgba(0,0,0,0.5)'
  },
  searchInput:{
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius : 5
  }
});

export default FriendsList;