import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions
} from "react-native";
import Modal from 'react-native-modal';


const width = Dimensions.get('window').width;


export default class RemoveFri extends Component {
    constructor() {
        super();
        this.state = {
            token: '',
            itemId: '',
            modalVisible:true,
            
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const itemId = navigation.getParam('itemId','NO-ID'); 
        const token = navigation.getParam('token','NO-token'); 

        this.setState({itemId: itemId, token: token})    
    }

    _toggleModal(visible){
        console.log("visible!!!"+visible);
        this.setState({ modalVisible: visible });
     
     }

    render(){
    return(
        <Modal 
        style={{justifyContent:'center', alignItems:'center', backdroColor:'ffa503'}}
        animationIn={'slideInLeft'}
        animationOut={'slideOutRight'}
        isVisible = {this.state.modalVisible}
        onBackButtonPress = {() => { console.log("Modal has been closed.") } }>
    <View style={styles.modal}>

    <View style={styles.modalTitle}>
        <Text style={{fontSize: 20}}>
        참여 여부{"\n"}
        </Text>
    </View>
    <View style={styles.modalItem}>
        <TouchableHighlight
            onPress = {() => {this._toggleModal(!this.state.modalVisible)
        }}
        >
        <Text style = {{fontSize: 16}}>참여 확정</Text>
        </TouchableHighlight>
    </View> 
    <View style={styles.modalItem}>
        <TouchableHighlight 
        onPress = {() => {this._remove(this.state.itemId), this._toggleModal(!this.state.modalVisible)}} >
        <Text style ={{paddingBottom: 5 ,fontSize: 16 }}>리스트에서 삭제</Text>
        </TouchableHighlight>
    </View>
    <View style={styles.modalItem}>
    <TouchableOpacity onPress={() => {this.props.navigation.navigate('MyProject')}}>
        <View style={styles.modalClose}>
        <Text style={{fontSize: 20}}>
            Close
        </Text>
        </View>
    </TouchableOpacity>
    </View>
    </View>
    </Modal>
                 
            );
        }

        _remove (id) {
            const { navigation } = this.props
            console.log("------------------id-----------------")
            console.log(id)
            const itemId = navigation.getParam('itemId','NO-ID'); 
            const token = navigation.getParam('token','NO-token'); 
    
            const url = "222.111.115.100:8000/projects/" + this.state.itemId +"/confirm/" + id +"/"
            console.log ("======remove======")
            console.log(url)
    
            fetch(`http:/222.111.115.100:8000/projects/${this.state.itemId}/confirm/${id}/`, {
                method: 'POST', 
                credentials: 'include',
                headers:{
                    'Authorization' : `JWT ${this.state.token}`,
                },
                })
                .then((res) => {
                    if(res.status >= 200 &&res.status < 300 ) { 
                        this.props.navigation.navigate('MyProject')
                        console.log(res);
                        alert("프로젝트상태가 변경되었습니다. ")
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
    })