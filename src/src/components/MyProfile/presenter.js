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
  AsyncStorage,
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
      major: "",
      token: "",

    }
  } 

  _showData = async() => {
    console.log("showdata!!!")
    await AsyncStorage.getItem('token').then((value) => {
      this.setState({token: value});
    }). then(res=> console.log(res));
    console.log("token");
    console.log(this.state.token);
  }

  async componentDidMount() {
  console.log("-----------myproifle presenter--------------")

  //this._showData().done();
  const {navigation} = this.props;
  const username = navigation.getParam('username', 'NO-USERNAME')
  const token = navigation.getParam('token','NO-token')
  this.setState({token: token})
  console.log("--------------component username-------------------")
  console.log(username);
  console.log("------token---------")
  console.log(token);
  return fetch(`http:/222.111.115.100:8000/users/${username}/`,{
  method: 'GET',
  credentials:'include',
    headers:{
      "content-type": "application/json",
      'Authorization' : `JWT ${token}`
    }

    })
    .then((response) =>{
      console.log(response)
      return response.json();
    }  
    
    )
    .then((responseJson)=>
    //console.log(responseJson)
       this.setState({
        username: responseJson.username,
        profile_image : responseJson.profile_image,
        name : responseJson.name,
        address : responseJson.address,
        school : responseJson.school,
        major : responseJson.major,
        bio : responseJson.bio,
        website : responseJson.website,
        tags : responseJson.tags
      })
    )
    .catch((error)=> {
      console.error(error)
    });
  }
  _renderImage = () => {
    let {profile_image} = this.state;
    console.log(profile_image)
    if (!profile_image) {
      return  <Image source={userImg} style={styles.avatar}/>;
    }

    return (
      <Image style={styles.avatar} source={{uri: `http://222.111.115.100:8000${this.state.profile_image}`}}/>

    );
   }
   
  render() {
    const { navigation } = this.props;
    return(
      <View style={{height: height}}>
      <ScrollView>
      <View style={styles.header}></View>
            {this._renderImage()}
            <View style={styles.body}>
            <TouchableOpacity style={styles.editbtn}
                            onPress={() => navigation.navigate('ProfileForm',{
                            username: this.state.username,
                            profile_image: this.state.profile_image,
                            name: this.state.name,
                            address: this.state.address,
                            school: this.state.chool,
                            major: this.state.major,
                            bio: this.state.bio,
                            website: this.state.website,
                            tags:this.state.tags,
                            token: this.state.token}
                          )}
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

            <View style={styles.moveContent}>
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
  },moveContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5,
    marginBottom: 20,
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