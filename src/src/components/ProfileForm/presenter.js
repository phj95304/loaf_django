import React, { Component } from 'react';

import Modal from 'react-native-modal';
import userImg from '../../image/user.png';
import addressImg from '../../image/address.png';
import schoolImg from '../../image/school.png';
import majorImg from '../../image/major.png';
import websiteImg from '../../image/website.png';
import bioImg from '../../image/bio.png';
import hashtagImg from '../../image/hashtag.png'; 
 
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableHighlight,
  ScrollView,
  TextInput,
  Dimensions,
  AsyncStorage,
  KeyboardAvoidingView,

} from 'react-native';
import { Constants, ImagePicker, Permissions } from 'expo';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class ProfileFrom extends Component {

  constructor(){
    super();
    this.state = {
      tokenV : '',
      image_uri: '',
      usernameV:'',
      nameV:'',
      addressV: '',
      schoolV: '',
      majorV: '',
      bioV: '',
      websiteV: '',
      tagsV0:'',
      tagsV1:'',
      tagsV2:'',
      modalVisible: false,
    }
  }

  componentWillMount() {


  }

  async componentDidMount(){   
    console.log("proifle form component did mount!!") //server change this!!
    return fetch(`http://222.111.115.100:8000/users/${this.state.usernameV}/`,{
      method: 'GET',
      credentials:'include',
        headers:{
          "content-type": "application/json",
          'Authorization' : `JWT ${this.state.tokenV}`
        }

    })
    .then((response) =>{
      console.log(response)
      return response.json();
    }  
    
    )
    .then((responseJson)=>
    //console.log(responseJson)
       this.setState({//change this
        image_uri: `http://222.111.115.100:8000`+responseJson.profile_image,
        nameV : responseJson.name,
        addressV : responseJson.address,
        schoolV : responseJson.school,
        majorV : responseJson.major,
        bioV : responseJson.bio,
        websiteV : responseJson.website,
        tagsV0 : responseJson.tags[0],
        tagsV1 : responseJson.tags[1],
        tagsV2 : responseJson.tags[2]
      })
    )
    .catch((error)=> {
      console.error(error)
    });
  }

  _onPressButton()  {
    Alert.alert('Network error!!')
  }

  render() {
    //change this
    const {navigation} = this.props;
    this.state.usernameV = navigation.getParam('username', 'NO-USERNAME')
    this.state.tokenV = navigation.getParam('token', 'NO-token')
    console.log("form render start?")
    console.log(this.state)

    return (
    <KeyboardAvoidingView behavior="position" > 
      <ScrollView >
        <View style={styles.header}></View>
        
        {/*profile_image*/}
        {this._maybeRenderImage()} 


            {/* call modal from camera btn pressed  */}
            <Modal 
              style={{justifyContent:'center', alignItems:'center'}}
              backdroColor='ffa503'
              animationIn={'slideInLeft'}
              animationOut={'slideOutRight'}
              isVisible = {this.state.modalVisible}
              onBackButtonPress = {() => { console.log("Modal has been closed.") } }>
            <View style={styles.modal}>

            <View style={styles.modalTitle}>
            <Text style={{fontSize: 20}}>
            프로필 사진 선택{"\n"}
            </Text>
            </View>
            
            <View style={styles.modalItem}>
              <TouchableHighlight 
                onPress = {this._takePhoto}>
                <Text style = {{fontSize: 16}}>사진 촬영</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.modalItem}>
              <TouchableHighlight 
                onPress = {this._pickImage}>
                <Text style ={{paddingBottom: 5 ,fontSize: 16 }}>앨범에서 사진 선택</Text>
              </TouchableHighlight>
            </View>


            <View style={styles.modalItem}>
            <Button 
                style={{paddingBottom: 10,width: width-5}}
                raised
                color = '#055a47'
                icon={{name: 'close' }}
                title="Close"
                backgroundColor="#055a47"
                onPress = {() => {
                this._toggleModal(!this.state.modalVisible)}}
              />
            </View>
            </View>

            </Modal>

        {/*profile Input*/}

 
        <View style={styles.body}>
        

        {/*camera button*/}
        <TouchableOpacity 
          style={styles.editbtn} 
          onPress={() => {
          this._toggleModal(!this.state.modalVisible)}}>
          <Text  style={{color: '#ffffff'}}>사진</Text>
        </TouchableOpacity>
 
        <Text style={styles.name}>
               {this.state.usernameV}</Text>
              <View style={styles.bodyContent}>
                <TextInput 
                style={styles.nick} 
                placeholder={this._nameInput}
                returnKeyType="next" 
                value={this.state.nameV}
                onChangeText={(text)=> this._updateValue(text,'nameV')}/>

              <View style={styles.item}>
                <View style={styles.iconContent}>      
                  <Image style={styles.icon} source={addressImg}/>
                </View>
                <View style={styles.infoContent}>
                  <TextInput 
                  style={styles.info} 
                  placeholder="지역"
                  returnKeyType="next" 
                  value={this.state.addressV}
                  onChangeText={(text)=>this._updateValue(text,'addressV')}/>
                  </View>
                </View>

             
              <View style={styles.item}>
                <View style={styles.iconContent}>
                  <Image style={styles.icon} source={schoolImg}/>
                </View>
                <View style={styles.infoContent}>

                  <TextInput 
                  style={styles.info} 
                  placeholder="학교"
                  returnKeyType="next" 
                  value={this.state.schoolV}
                  onChangeText={(text)=>this._updateValue(text,'schoolV')}/>

                </View>
              </View>
        

              <View style={styles.item}>
                <View style={styles.iconContent}>
                  <Image style={styles.icon} source={majorImg}/>
                </View>
                <View style={styles.infoContent}>
                  <TextInput 
                  style={styles.info} 
                  placeholder="전공"
                  returnKeyType="next" 
                  value={this.state.majorV}
                  onChangeText={(text)=>this._updateValue(text,'majorV')}/>
                </View>
              </View>
                
                <View style={styles.item}>
                <View style={styles.iconContent}>
                <Image style={styles.icon} source={websiteImg}/>
                </View>
                <View style={styles.infoContent}>
                <TextInput 
                  style={styles.info} 
                  placeholder="웹사이트"
                  returnKeyType="next" 
                  value={this.state.websiteV}
                  onChangeText={(text)=>this._updateValue(text,'websiteV')}/>
                </View>
                </View>

                <View style={styles.item}>
                <View style={styles.iconContent}>
                <Image style={styles.icon} source={bioImg}/>
                </View>
                <View style={styles.infoContent}>
                  <TextInput 
                  style={styles.info}  
                  multiline={true}
                  placeholder="자기소개"
                  value={this.state.bioV}
                  onChangeText={(text)=>this._updateValue(text,'bioV')}/>
                </View>
                </View>

            {/*input tags*/}
                <View style={styles.item}>
                  <View style={styles.iconContent}>
                    <Image style={styles.icon} source={hashtagImg}/>
                  </View>
                  <View style={styles.tagsContent}>
                    <TextInput 
                    style={styles.info} 
                    placeholder="관심사"
                    returnKeyType="next"
                    value={this.state.tagsV0}
                    onChangeText={(text)=>this._updateValue(text,'tagsV[0]')}/>
                  </View>
                </View>

                
                <View style={styles.item}>
                  <View style={styles.iconContent}>
                    <Image style={styles.icon} source={hashtagImg}/>
                  </View>
                  <View style={styles.tagsContent}>
                    <TextInput 
                    style={styles.info} 
                    placeholder="관심사"
                    returnKeyType="next"
                    value={this.state.tagsV1}
                    onChangeText={(text)=> this._updateValue(text,'tagsV[1]')}/>
                  </View> 
                  </View>

                  <View style={styles.item}>
                  <View style={styles.iconContent}>
                    <Image style={styles.icon} source={hashtagImg}/>
                  </View>
                  <View style={styles.tagsContent}>
                    <TextInput 
                    style={styles.info} 
                    placeholder="관심사"
                    returnKeyType="next"
                    value={this.state.tagsV2}
                    onChangeText={(text)=>this._updateValue(text,'tagsV[2]')}/>
                </View>
                </View>
               

                <View style={styles.tagsitem}>
                  <View style={styles.infoContent}>
                  <TouchableOpacity 
                    style={styles.buttonContainer}
                    onPress={this._handleSubmit}
                    >
                      <Text style={{color: '#ffffff'}}>완료</Text>  
                  </TouchableOpacity> 
                </View>   
              </View>
              </View>
           
            </View>

        {/*{this._maybeRenderUploadingOverlay()}*/}
           

      </ScrollView>
      </KeyboardAvoidingView> 
    );
  }

  _toggleModal(visible) {
    console.log("visible!!!"+visible);
    this.setState({ modalVisible: visible });
 }

 
  _handleSubmit = () => {
    
    console.log("is this handleSubmit state ");
    console.log(this.state);
    const tagsArray =  "[\"" + this.state.tagsV0+ "\",\""+ this.state.tagsV1+"\",\"" +this.state.tagsV2+"\"]";
   

//server change this
////`http://192.168.0.3:8000/users/${username}/`
////////http://222.111.115.100:8000/users/${username}/
 

  let formData = new FormData();
  formData.append('profile_image', {
    uri: this.state.image_uri,
    name: `${this.state.usernameV}.jpg`,
    type: `image/jpg`
  }); 
  formData.append('address',this.state.addressV);
  formData.append('school', this.state.schoolV);
  formData.append('major', this.state.majorV);
  formData.append('website',this.state.websiteV);
  formData.append('bio', this.state.bioV);
  formData.append('tags',tagsArray);
  formData.append('name',this.state.nameV);
  
  
  console.log("======  form data!")
  console.log(formData)
  fetch(`http://222.111.115.100:8000/users/${this.state.usernameV}/`, {
      method: 'POST', 
      credentials: 'include',
      headers:{
        'Accept': 'application/json',
        'Authorization' : `JWT ${this.state.tokenV}`,
        'Content-Type' : 'multipart/form-data'
      },
      body: formData
    })

    .then((res) => {
      if(res.status >= 200 &&res.status < 300 ) { 
        this.props.navigation.navigate('Main')
        console.log(res);

      }else{
   
        console.log(res);

      }
  
    })


    .catch(error => console.log('Error:', error))
    .done();
  }


  _maybeRenderImage = () => {
    let {
      image_uri
    } = this.state;
    if (!image_uri) {
      return  <Image source={userImg} style={styles.maybeRenderImage}/>;
    }

    return (
          <Image source={{ uri: image_uri }} style={styles.maybeRenderImage} />

    );
  };


  _copyToClipboard = () => {
    Clipboard.setString(this.state.image_uri);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    //camera permission 
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);
    //album permission 
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
      });

       this.setState({ modalVisible: false });

       // pick a image
       console.log(pickerResult.uri)
       this.setState({
         image_uri: pickerResult.uri
       });
    }
  };

  _pickImage = async () => {
    //album permission 
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
    //image result
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1]
      });

      this.setState({ modalVisible: false });

      // pick a image
      console.log(pickerResult.uri)
      this.setState({
        image_uri: pickerResult.uri
      });
      ///
    }
  };


  _onPressButton()  {
    Alert.alert('Network error!!')
  }
  
   
    
  _updateValue(text, field){
  
      if(field=='nameV'){
        this.setState({
          nameV: text,
        })
      }else if(field=='addressV'){
        this.setState({
          addressV: text,
        })
      }else if(field=='schoolV'){
        this.setState({
          schoolV: text,
        })
      }else if(field==='majorV'){
        this.setState({
          majorV : text,
        })
      }else if(field=='bioV'){
        this.setState({
          bioV : text,
        })
      }else if(field=='websiteV'){
        this.setState({
          websiteV : text,
        })
      }else if(field=='tagsV[0]'){
        this.setState({
          tagsV0 : text,
        })
      }else if(field=='tagsV[1]'){
        this.setState({
          tagsV1 : text,
        })
      }
      else if(field=='tagsV[2]'){
        this.setState({
          tagsV2 : text,
        })
      }
    }
}



const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    backgroundColor: "#055a47",
    height:100,
  },
  maybeRenderUploading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  maybeRenderContainer: {
    elevation: 2,
    marginTop: 10,
    justifyContent:'center',
    width: width,
    
  },
  maybeRenderImage: {
    height: 130,
    width: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop: 30,
    marginBottom: 10,
  },
body:{
  marginTop:40,
  height:900,
  alignItems:'center',
},
bodyContent: {
  flex: 1,
  alignItems: 'center',
  paddingTop:10,
  paddingLeft:30,
  paddingRight:30,
  paddingBottom:30,
},
name:{
  paddingLeft: 5,
  width: 100,
  height: 30,
  fontSize:28,
  color: "#696969",
  fontWeight: "600"
  
},
nick:{
  fontSize:16,
  color: "#055a47",
  marginTop:10,
  width: 150,     
},
info:{
  fontSize:18,
  marginTop:25,
  width: width-100,  

},
infoContent:{
  flex:1,
  alignItems:'flex-start',
  paddingLeft:5,
},
buttonContainer: {
  marginTop: 40,
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 70,
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
},tagsitem:{
  justifyContent:'center',
  alignItems:'center',
},

iconContent:{
  paddingRight:5,
},
icon:{
  width:30,
  height:30,
  marginTop:20,
},
image: {
  height: 300,
  width: 200,
  borderRadius: 30,
},
headerStyle:{
  height: 40,
  justifyContent: 'center',
  alignItems:'center',
  backgroundColor:'#2196f3'
},
contentStyle:{
  height : 40,
  justifyContent: 'center',
  alignItems:'center',
  backgroundColor:'#2196f3'
},
contnetRowStyle: {
  flex:1,
  flexDirection: 'row',
  justifyContent:'center',
  alignItems: 'center',
},
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
///line