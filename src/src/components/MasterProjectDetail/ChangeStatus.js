import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Dimensions
} from "react-native";
import Modal from 'react-native-modal';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class ChangeStatus extends Component {
    constructor() {
        super();
        this.state = {
            itemId: '',
            token: '',
            username: '',
            changeModal: true
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const itemId = navigation.getParam('itemId','NO-ID'); 
        const token = this.props.navigation.getParam('token','NO-token')
        const username = this.props.navigation.getParam('username','No-usernmae')
        this.setState({token: token, itemId: itemId, username: username})    
    }

    _statusModal(visible){
        console.log("visible!!!"+visible);
        this.setState({ changeModal: visible });
     
     }

     async _changeProject_s(pStatus, pId, pUsername){
        this.setState({ changeModal: false });
        console.log("change....")
        console.log(pStatus)
        console.log(pId)
        console.log(pUsername)
    
        let formData = new FormData();
    
        formData.append('project_status',pStatus); 
        console.log("======  form data!")
        if ((pStatus) == 1) {
            url = `http://222.111.115.100:8000/projects/${pId}/ongoing/` 
        }
        else if ((pStatus)==2 ){
            url = `http://222.111.115.100:8000/projects/${pId}/complete/` 
        }

          fetch(url, {
                method: 'POST', 
                credentials: 'include',
                headers:{
                  'Accept': 'application/json',
                  'Authorization' : `JWT ${this.state.token}`,
                  'Content-Type' : 'multipart/form-data'
                },
                body: formData
              })
          
              .then((res) => {
                if(res.status >= 200 &&res.status < 300 ) { 
                  this.props.navigation.navigate('MyProject')
                  console.log(res);
                  alert("프로젝트상태가 변경되었습니다. ")
          
                }else{
             
                  console.log(res);
          
                }
            
              })
          
          
        .catch(error => console.log('Error:', error))
        .done();
    }

    render(){
    return(
           <Modal 
                style={{justifyContent:'center', alignItems:'center'}}
                backdroColor='ffa503'
                animationIn={'slideInLeft'}
                animationOut={'slideOutRight'}
                isVisible = {this.state.changeModal}
                onRequestClose= {() => { console.log("Modal has been closed.") } }>
                  <View style={styles.modal}>
            
                  <View style={styles.modalTitle}>
                  <Text style={{fontSize: 20}}>
                  프로젝트 상태를 변경하시겠습니까? {"\n"}
                  </Text>
                  </View>
                  
                  <View style={styles.modalItem}>
                    <TouchableHighlight 
                      onPress = {() => this._changeProject_s(1, this.state.itemId,this.state.username)}>
                      <Text style = {{fontSize: 16}}>프로젝트 시작</Text>
                    </TouchableHighlight>
                  </View>
            
                  <View style={styles.modalItem}>
                    <TouchableHighlight 
                      onPress = {() => this._changeProject_s(2,this.state.itemId,this.state.username)}>
                      <Text style ={{paddingBottom: 5 ,fontSize: 16 }}>프로젝트 완료</Text>
                    </TouchableHighlight>
                  </View>
            
                  </View>
            
                  </Modal>
                 
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