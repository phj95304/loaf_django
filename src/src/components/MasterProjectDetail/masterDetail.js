import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert, 
  Dimensions,
  TouchableHighlight,
  Button,
  Modal
} from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Icon, CheckBox, ListItem } from 'native-base'
//import Modal from 'react-native-modal';
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
            file : "",
            title : "",
            caption: "",
            schedule : "", 
            max_member: "",
            tags: [],
            creator : "",
            data: [],
            modalVisible: true
        } 
    } 
    componentDidMount() {
        const {navigation} = this.props;
        const itemId = navigation.getParam('itemId','NO-ID'); 
        const token = this.props.navigation.getParam('token','NO-token')
        this.setState({token: token})   
        return fetch(`http:/222.111.115.100:8000/projects/${itemId}/`, {
            method: 'GET',
            credentials:'include',
            headers: {
                "content-type" : "application/json",
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
                data : responseJson.join
            })
            console.log ( "------------data-----------")
            console.log(this.state.data)
        })
        .catch((error) => {
            console.error(error)
        });
    }
    renderItem = ({item}) => {
        const { navigation } = this.props
        const id = item.id;
        return(
            <View >
                <TouchableOpacity onPress={() => {
                    Alert.alert(
                        'Alert Title',
                        'My Alert Msg',
                        [
                          {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: false }
                      )
                      /*
                    Alert.alert(
                        '지원자 목록에서 제외하시겠습니까?',
                        [
                            {text: '예', onPress: () => this._remove(id)},
                            {text: '아니오', onPress: () => {}},
                        ],
                        { cancelable: false }
                    )*/
                }}>
                <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd' }}>
                    <View style={{ flex: 2 }}>
                        <Image source={{uri: item.joiner.profile_image}}
                            style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                        />
                    </View>
                    <View style={{ flex: 1, paddingTop: 10, alignItems:'center' }}>
                        <Text>{item.joiner.username}</Text>
                    </View>
                    <View style = {{ marginBottom:5, marginLeft:45}}>
                    </View>
                </View>
                </TouchableOpacity> 
            </View>
        )
    }
    buttonClickListener(id) {

    }
    _toggleModal(visible) {
        console.log("visible!!!"+visible);
        this.setState({ modalVisible: visible });
    }
    _remove (id) {
        const { navigation } = this.props
        console.log("------------------id-----------------")
        console.log(id)
        const itemId = navigation.getParam('itemId','NO-ID'); 
        const token = navigation.getParam('token','NO-token'); 

        const url = "222.111.115.100:8000/projects/" + itemId +"/confirm/" + id +"/"
        console.log ("======remove======")
        console.log(url)

        fetch(`http:/222.111.115.100:8000/projects/${itemId}/confirm/${id}/`, {
            method: 'POST', 
            credentials: 'include',
            headers:{
                'Authorization' : `JWT ${token}`,
            },
            })
            .then((res) => {
            if(res.status >= 200 &&res.status < 300 ) { 
                console.log(res);
            }
            else{
                console.log(res);
            }       
            })
            .catch(error => console.log('Error:', error))
            .done(
                console.log("finish")
            );
    }
    render() {
        const {navigation} = this.props;
        const token = this.state.token
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
                        <FlatList
                            horizontal = {true}
                            data = {this.state.data}
                            renderItem = {this.renderItem}
                        />
                    </View>
                    <View style={{ alignItems:"center"}}>
                    </View>
                </Card>
                <Card>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 20, marginTop:10 }}>추천 사용자 목록</Text>                           
                    </View>
                    <View style={{ height: 130, marginTop: 30, marginBottom: 10 }}>
                        <MasterProjectDetailRecom/>
                    </View>
                </Card>
            </View>
        </ScrollView>
        );
    }
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
        width:100,
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
    modalClose:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom:20,   
        color:'#055a47'
    },
    modalItem: {
        height: 60,
        justifyContent:'center',
        alignItems: 'center',
        paddingBottom:5,   
    }
});