import * as React from 'react';
import {Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-perimssions';

export default class ScanScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: "",
            buttonState: "normal"
        }
    }
}

getCameraPermissions = async (id) => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA)

    this.setState({
        hasCameraPermissions: status === "granted",
        buttonState: id,
        scanned: false
    })
}

handleBarCodeScanned = async ({type,data}) => {
    const buttonState = this.state.buttonState;
    if(buttonState = "barcode"){
        this.setState({
            scanned: true,
            buttonState: "normal"
        })
    }
}

render(){
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if(buttonState !== "normal" && hasCameraPermissions){
        return(
            <BarCodeScanner
                onBarCodeScanned = {scanned ? undefined: this.handleBarCodeScanned}
            />
        )
    }
    
    else if (buttonState == "normal"){
        return(
            <View>
                <Image
                    source = {require("../assets/BarCodeScanner.jpg")}
                    style = {{width: 200, height:200}}
                />
                <TouchableOpacity
                    onPress = {this.getCameraPermissions}
                    title = "Bar Code Scanner">
                    <Text> Scan QR Code</Text>
                </TouchableOpacity>
            </View>
        )
    }
}