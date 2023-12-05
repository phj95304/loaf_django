import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    FlatList,
    TouchableOpacity
} from "react-native";

class CompleteProject extends Component {
    static navigationOptions= ({navigation}) =>({
        title: 'Complete Project',	
    }); 
    constructor() {
        super()
        this.state = {
            data : []
        }
    }
    componentDidMount() {
        const token = this.props.navigation.getParam('token','NO-token')
        const username = this.props.navigation.getParam('username','NO-username')
        return fetch(`http://222.111.115.100:8000/users/${username}/completedProjects/`, {
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
                data : responseJson
            })
        })
        .catch((error) => {
            console.error(error)
        })
    }        
    renderItem = ({ item }) => {
        const { navigation } = this.props;
        const token = this.state.token
        return(
            <TouchableOpacity onPress={() => navigation('ProjectDetail', {
                itemId : item.project,
                token:token
              })}  
              key={item.id}
              style={styles.emailItem}>
            <View style={{ height: 200, width: 315, borderWidth: 0.5, borderColor: '#dddddd', marginTop:10 }}>
                <View style={{ flex: 3 }}>
                    <Image source={{uri : item.file}}
                            style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                    />
                </View>
                <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                    <Text style={{ fontSize: 17 }}>{item.project_title}</Text>
                    <Text style={{ fontSize: 14, marginTop:2 }}>#{item.project_tags[0]} #{item.project_tags[1]} #{item.project_tags[2]}</Text>
                  </View>
            </View>
            </TouchableOpacity>
        )
    }
    render() {
        return(
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}                
            >
                <FlatList
                    data = {this.state.data} 
                    renderItem = {this.renderItem}
                />
            </ScrollView>
        )
    }
}
export default CompleteProject;

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