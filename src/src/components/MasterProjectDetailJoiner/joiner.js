import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView, 
  FlatList,
  Alert,
  Dimensions,
  Button, 
} from 'react-native';
import Modal from 'react-native-modal';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class MasterProjectDetailJoiner extends Component {
    constructor(props) {
        super(props)
        this.state = {
          data: [],
        }   
    } 

    renderItem = ({item}) => {
//        const { navigation } = this.props;
//        const token = this.state.token
        return(
            <View>
                {/*
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
                    참여 여뷰{"\n"}
                    </Text>
                </View>
                <View style={styles.modalItem}>
                    <TouchableHighlight
                        onPress = {() => {
                      //  this.item._toggleModal(!this.state.modalVisible)
                    }}
                    >
                    <Text style = {{fontSize: 16}}>참여 확정</Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.modalItem}>
                    <TouchableHighlight 
                    onPress = {() => {}}>
                    <Text style ={{paddingBottom: 5 ,fontSize: 16 }}>리스트에서 삭제</Text>
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
                    //this.item._toggleModal(!this.state.modalVisible)
                }}
                    />
                </View>
                </View>
                </Modal>
            */}
                <TouchableOpacity onPress={() => {
                    //this.item._toggleModal(!this.state.modalVisible)
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
    _toggleModal(visible) {
        console.log("visible!!!"+visible);
        this.setState({ modalVisible: visible });
    }
/*
    _remove = (id) => {
//      url : localhost:8000/projects/projectID/confirm/join_number/        
        this.setState({ id : id })
        const {url} = "url : " + id + ""
        Alert.alert("remove : " + url)
        /*
        fetch(`http://222.111.115.100:8000/projects/${itemId}/confirm/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Authorization' : `JWT ${this.state.token}`,
                'Content-Type' : 'url'            
            },
            body : url
        })
        .then((res) => {
            console.log(res)
        })
        .catch(error => console.log('Error : ', error))
        .done();
    }
        */

    async componentDidMount() {
        return fetch("https://raw.githubusercontent.com/merry555/json/master/json/projects/recruit_projects.json")
        .then((response) => response.json())
        .then ((responseJson) => {
            this.setState({
                data : responseJson.join,
            })
        })
        .catch((error) => {
            console.error(error)
        });
        /*
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
                data: responseJson.data
            })
        })
        .catch((error) => {
            console.error(error)
        });
        */
    }
    render() {
//        const {navigation} = this.props;
//        const token = this.state.token
        return (
            <FlatList
                horizontal = {true}
                data = {this.state.data}
                renderItem = {this.renderItem}
            />
        );
    }
}
 
export default MasterProjectDetailJoiner;

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
    modalItem: {
        height: 60,
        justifyContent:'center',
        alignItems: 'center',
        paddingBottom:5,   
    }
});