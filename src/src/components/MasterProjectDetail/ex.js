import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Alert,

  TouchableHighlight
} from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Icon, Button, CheckBox, ListItem } from 'native-base'
import Modal from 'react-native-modal';
import MasterProjectDetailJoiner from "../MasterProjectDetailJoiner/joiner"
import MasterProjectDetailRecom from "../MasterProjectDetailRecom/recomFriends"


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class MasterProjectDetail extends Component {
    static navigationOptions= ({navigation}) =>({
        title: 'Master Project Detail',	
    }); 
    constructor(props) {
        super(props)
        this.state = {
          changeModal: false,
          file : "",
          title : "",
          caption: "",
          schedule : "",
          max_member: "",
          tags: [],
          creator : "",
          data: [],
          recom: [],
          checkBoxChecked: false,
          id: '',
          token: '',
        } 
    } 
    onPress() {
        console.log( "Checked!" );
        this.setState({
          checkBoxChecked: !this.state.checkBoxChecked
        }); 
    }

    _toggleModal(visible) {
        console.log("visible!!!"+visible);
        this.setState({ modalVisible: visible });
     }

     componentWillMount() {
        const {navigation} = this.props;
        const itemId = navigation.getParam('itemId','NO-ID'); 
        const token = this.props.navigation.getParam('token','NO-token')
        this.setState({token: token, id: itemId})   
        return fetch(`http://222.111.115.100:8000/projects/${itemId}/`, {//change this 
            method: 'GET',
            credentials:'include',
            headers: {
                'content-type' : 'application/json',
                'Authorization' : `JWT ${token}`
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {

            this.setState({
                file: responseJson.file,
                title: responseJson.title,
                caption : responseJson.caption,
                schedule: responseJson.schedule,
                max_member: responseJson.max_member,
                tags : responseJson.tags,
                creator: responseJson.creator,
                id : responseJson.id,
                data : responseJson.join,
                recom : responseJson.recom,
            })
        })
        .catch((error) => {
            console.error(error)
        });   
    }
    render() {
        const {navigation} = this.props;
        //console.log("master Detail state...")
        //console.log(this.state)
        return (
        <ScrollView>
            <View style={styles.container}>
                <Image style={styles.projectImg} source={{uri : this.state.file}}/>
                <View style={styles.body}>
                    <View style={styles.projectHead}>
                        <Text style={styles.projectName}>{this.state.title}</Text>
                        <Text style={styles.projectTag}>#{this.state.tags[0]} #{this.state.tags[1]} #{this.state.tags[2]}</Text>
                    </View>
                </View>
                <Card>
                    <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 20, marginTop:10 }}>프로젝트 개요</Text>
                    <Text style={{ fontSize: 17, fontWeight: '200', paddingHorizontal: 20, marginTop: 5, marginBottom:10 }}>{this.state.caption}</Text>
                </Card>
                <Card>
                    <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 20, marginTop:10 }}>프로젝트 일정</Text>
                    <Text style={{ fontSize: 17, fontWeight: '200', paddingHorizontal: 20, marginTop: 5, marginBottom:10 }}>{this.state.schedule}</Text>
                </Card>
                <Card>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 20, marginTop:10 }}>지원자 목록</Text>                           
                    </View>
                    <View style={{ height: 130, marginTop: 30, marginBottom: 10 }}>
                        
                        
                    </View>
                    <View style={{ alignItems:"center"}}>
                    </View>
                </Card>
                
                <Card>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 20, marginTop:10 }}>추천 사용자 순위</Text>                           
                    </View>
                    <View style={{ height: 130, marginTop: 30, marginBottom: 10 }}>
                        <MasterProjectDetailRecom token= {this.state.token} itemId= {this.state.id}/>
                    </View>
                </Card>

                <View style={{justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity style={styles.board} 
                       onPress={() => navigation.navigate('ChangeStatus', 
                       {  username: this.state.creator.username,
                          itemId : this.state.id,
                          token : this.state.token
                       })}>
                        <Text>프로젝트 상태 변경 </Text>  
                </TouchableOpacity> 
                </View>
            </View>


        </ScrollView>

        );
    }
    _keyExtractor = (item, index) => item.key;

    
 
}
 
export default MasterProjectDetail;

const styles = StyleSheet.create({
    container : {
        backgroundColor:'white'
    },
    body:{
        marginTop:5,
        alignItems:'center',
        backgroundColor:'white'
    },
    projectHead: {
        flex: 1,
        alignItems: 'center',
        padding:30,
    },
    projectOutline: {
        alignItems: 'center',
        padding:30,
        height: 30,
        fontSize: 20,
        backgroundColor: 'gray', 
        color:'white'
    },
    projectText: {
        alignItems: 'center',
        padding:30,
        fontSize: 15,
        backgroundColor: 'white', 
    },
    projectSchedule: {
        alignItems: 'center',
        padding: 5,
        fontSize: 20,
        backgroundColor: 'gray', 
        color:'white'       
    },
    projectImg:{
        backgroundColor: "#00BFFF",
        height:250,
    },
    projectName:{
        fontSize:30,
        color:'black',
        fontWeight:'600',
    },
    projectTag:{
        fontSize:20,
        color: 'black',
        marginTop:15
    },
    num: {
        fontSize:20,
        color:'black',
        marginTop:10,
    },

    info:{
        fontSize:18,
        marginTop:25,
    },

    board: {
        height:40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:15,
        marginTop: 10,
        width:width -20,
        borderRadius:30,
        borderColor: '#000',
        borderWidth: 0.5,
    },
    item:{
        flexDirection : 'row',
    },
    iconContent:{
        paddingRight:5,
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