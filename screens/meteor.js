import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import axios from 'axios'
import { element } from 'prop-types'

export default class Meteor extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            meteor: {}
        }
    }

    getMeteorData = () => {
        axios.get('https://api.nasa.gov/neo/rest/v1/feed?api_key=uV04yxzadnJrkRG94PBIe2GLOlnifZpDiGevFqbj')
            .then(res => {
                this.setState({ meteor: res.data.near_earth_objects })
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount = () => {
        this.getMeteorData();
    }

    render() {

        if (Object.keys(this.state.meteor).length == 0) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                    <Text>
                        Loading...
                    </Text>
                </View>
            )
        }



        else {
         //   console.log(this.state.meteor)
            let meteorArr = Object.keys(this.state.meteor).map(date => {
                    return(
                        this.state.meteor[date]
                    )
            })
          //  console.log(meteorArr)
            let meteors = [].concat.apply([],meteorArr)
           // console.log(meteors)
            meteors.forEach(element=>{
                let d = (element.estimated_diameter.kilometers.estimated_diameter_min+element.estimated_diameter.kilometers.estimated_diameter_max)/2
                let threatScore = d/element.close_approach_data[0].miss_distance.kilometers*1000000000
               // console.log(threatScore)
                element.threat_score=threatScore
            })
            console.log(meteors)
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                    <Text>
                        Meteor screen...
                    </Text>
                </View>
            )
        }

    }



}