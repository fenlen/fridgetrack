import React, { Component } from 'react'; //class from tut https://medium.com/@dinukadilshanfernando/implementing-a-barcode-scanner-by-using-react-native-camera-b170de4b7f51
import {
Text,
View,
StyleSheet,
Alert,
TouchableOpacity,
Image
} from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class Barcode extends Component {
    constructor(props) {
        super(props);
        this.handleTourch = this.handleTourch.bind(this);
        this.state = {
        torchOn: false
        }
    }
    onBarCodeRead = (e) => {
        Alert.alert("Barcode value is" + e.data, "Barcode type is" + e.type);
        this.setState({ torchOn: false });
    }

    //flash icons from https://www.materialui.co/
    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                style={styles.preview}
                flashMode={this.state.torchOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                onBarCodeRead={this.onBarCodeRead}
                captureAudio={false}
                ref={cam => this.camera = cam}
                aspect={RNCamera.Constants.fill}
                >
                    <Text style={styles.textArea}>Scan your item</Text>
                </RNCamera>
                <View style={styles.bottomOverlay}>
                    <TouchableOpacity onPress={() => this.handleTourch(this.state.torchOn)}>
                        <Image style={styles.cameraIcon}
                            source={this.state.torchOn === true ? require('../images/flash_on.png') : require('../images/flash_off.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    handleTourch(value) {
        if (value === true) {
            this.setState({ torchOn: false });
        } else {
            this.setState({ torchOn: true });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    cameraIcon: {
        margin: 20,
        height: 40,
        width: 40
    },
    bottomOverlay: {
        position: "absolute",
        width: "100%",
        flex: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    textArea: {
        backgroundColor: 'white',
        width: "100%",
        textAlign: "center",
        padding: 5,
        fontSize: 25,
        marginBottom: 100,
        opacity: 0.6
    },
});
