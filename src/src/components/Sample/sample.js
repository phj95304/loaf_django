import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native'; 

import userImg from '../../image/user.png';
import addressImg from '../../image/address.png';
import schoolImg from '../../image/school.png';
import majorImg from '../../image/major.png';
import websiteImg from '../../image/website.png';
import bioImg from '../../image/bio.png';
import hashtagImg from '../../image/hashtag.png'; 

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class MyProfile extends Component {
  static navigationOptions= ({navigation}) =>({
    title: 'My Profile',	
  }); 
  constructor(props) {
    super(props)
    this.state = {
      name : "",
      username : "",
      profile_image: "",
      school : "",
      bio: "",
      website: "",
      tags: [],
      address: "",
      major: ""
    }
  } 
  componentDidMount() {
    return fetch('https://raw.githubusercontent.com/merry555/json/master/json/friends/friendsDetail/81.json')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        username: "",
        name : "",
        profile_image : "https://png.icons8.com/metro/50/f1c40f/administrator-male.png",
        school : "",
        bio : "",
        website : "",
        tags : "",
        address : "",
        major : ""
      })
    })
    .catch((error)=> {
      console.error(error)
    });
  }
  render() {
    const { navigation } = this.props;
    return(
      <View style={{height: height}}>
      <ScrollView>
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={{uri: this.state.profile_image}}/>
            <View style={styles.body}>
            <TouchableOpacity style={styles.editbtn}
                            onPress={() => this.props.navigation.navigate('ProfileForm')}
                             >
                    <Text style={styles.textC}>수정하기</Text>  
            </TouchableOpacity> 
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.username}</Text>
              <Text style={styles.nick}>{this.state.name}</Text>
              <View style={styles.item}>
                <View style={styles.iconContent}>      
                  <Image style={styles.icon} source={addressImg}/>
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.info}>{this.state.address}</Text>
                </View>
              </View>
              <View style={styles.item}>
                <View style={styles.iconContent}>
                  <Image style={styles.icon} source={schoolImg}/>
                </View>
                <View style={styles.infoContent}>
                <Text style={styles.info}>{this.state.school}</Text>
                </View>
              </View>
              <View style={styles.item}>
                <View style={styles.iconContent}>
                  <Image style={styles.icon} source={majorImg}/>
                </View>
                <View style={styles.infoContent}>
                <Text style={styles.info}>{this.state.major}</Text>
                </View>
              </View>
              <View style={styles.item}>
                <View style={styles.iconContent}>
                <Image style={styles.icon} source={websiteImg}/>
                </View>
                <View style={styles.infoContent}>
                <Text style={styles.info}>{this.state.website}</Text>
                </View>
              </View>
              <View style={styles.item}>
                <View style={styles.iconContent}>
                <Image style={styles.icon} source={bioImg}/>
                </View>
                <View style={styles.infoContent}>
                <Text style={styles.info}>{this.state.bio}</Text>
                </View>
              </View>

              <View style={styles.item}>
              <View style={styles.iconContent}>
                <Image style={styles.icon} source={hashtagImg}/>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>{this.state.tags[0]}</Text>
              </View>
              <View style={styles.iconContent}>
                <Image style={styles.icon} source={hashtagImg}/>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>{this.state.tags[1]}</Text>
              </View>
              <View style={styles.iconContent}>
                <Image style={styles.icon} source={hashtagImg}/>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>{this.state.tags[2]}</Text>
              </View>
            </View>
            <View style={styles.infoContent}>
              <TouchableOpacity style={styles.buttonContainer}
              onPress={() => navigation.navigate('MyProject')}
              >
                <Text style={styles.textC}>프로젝트 경험</Text>  
              </TouchableOpacity> 
            </View>
            </View>
            </View>
            </ScrollView>
          </View>
    )
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#055a47",
    height:100,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop: 30,
    marginBottom: 10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
    flex:1,
    alignItems:'center',
  },
  bodyContent: {
    
    alignItems: 'center',
    paddingTop:10,
    paddingLeft:30,
    paddingRight:30,
    paddingBottom:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  nick:{
    fontSize:16,
    color: "#055a47",
    marginTop:10
  },
  info:{
    fontSize:18,
    marginTop:25,
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5
  },
  buttonContainer: {
    marginTop: 40,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 45,
    width:250,
    borderRadius:30,
    backgroundColor: "#055a47",
  },
  editbtn: {
      marginTop: 30,
      height:30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width:150,
      borderRadius:30,
      backgroundColor: "#055a47",

  },
  item:{
    flexDirection : 'row',
  },
  iconContent:{
    paddingRight:5,
  },
  icon:{
    width:30,
    height:30,
    marginTop:20,
  },
  textC:{
    color: '#ffffff',
  }
});

export default MyProfile;