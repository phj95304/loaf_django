import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Alert 
} from "react-native"; 

 
class MasterProjects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        } 
    } 
    _keyExtractor = (item, index) => item.key;
    renderItem = ({ item }) => {
        const { navigation } = this.props;
        const token = this.state.token
        const username = this.state.username
        return(
            <TouchableOpacity onPress={() => navigation.navigate('MasterProjectDetail3', {
                itemId : item.id,
                token:token,
                username: username,
            })}  
            >
            <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd' }}>
                <View style={{ flex: 2 }}>
                    <Image source={{uri: `http://222.111.115.100:8000${item.file}`}}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                    />
                </View> 
                <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                    <Text>{item.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
        )
    } 
    async componentWillMount() {
        const username = this.props.navigation.getParam('username','NO-username')
        const token = this.props.navigation.getParam('token','NO-token')
        
        this.setState({token: token})
        return fetch(`http://222.111.115.100:8000/users/${username}/`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                "content-type" : "application/json",
                'Authorization' : `JWT ${token}`
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson){
                console.log("=====")
                console.log(responseJson)
                  this.setState({
                     data : responseJson.projects
                 })}

        })
        .catch((error) => {
            console.error(error)
        })
    }      
    render() {
        const { navigation } = this.props;
        const username = this.state.username
        return(
            <FlatList
                horizontal = {true}
                data = {this.state.data}
                renderItem = {this.renderItem}
                keyExtractor={this._keyExtractor}
            />
        )
    }
} 
export default MasterProjects;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});