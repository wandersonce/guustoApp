import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Slider } from 'react-native';

export default class Main extends Component {
    state = {
        selectedValue: 0,
        merchItem: undefined,
        imgMerch: undefined,
    }

    //It will check if the item comes from the merchant page and change the button on main page.
    itemExists = (itemId, imgLink = null) => {
        if (itemId != undefined) {
            return (
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Main', { itemId: undefined, itemImg: undefined })}>
                    <View style={styles.btnSelect}>
                        <Text style={styles.txtBtn}>Remove</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Merchants')}>
                    <View style={styles.btnSelect}>
                        <Text style={styles.txtBtn}>Select </Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    //It will check and change if we have to show the image choosed on merchant page or the text.
    imgOrTxt = (imgLink) => {
        if (imgLink != undefined) {
            return (
                <Image
                    style={{ width: 70, height: 70, alignSelf: 'center' }}
                    source={{ uri: imgLink }} />
            )
        } else {
            return (
                <Text style={styles.adviceTxt}>Recepient will choose partner merchant</Text>
            )
        }
    }

    render() {
        return (
            <View style={styles.container} >
                <View style={styles.imgView}>
                    <Image
                        style={styles.imgHeader}
                        source={{ uri: 'https://app.guusto.com/guusto2/guusto/corporate/images/guusto%20card.png' }}
                    />
                    <Text style={styles.selectTxt}>Select Merchant</Text>
                </View>
                <View style={styles.textView}>
                    <View style={{ flex: 1 }}>
                        {this.props.route.params == undefined
                            ? this.imgOrTxt(this.state.imgMerch)
                            : this.imgOrTxt(this.props.route.params.itemImg)
                        }
                    </View>
                    <View style={{ flex: 2, top: 20 }}>
                        {this.props.route.params == undefined
                            ? this.itemExists(this.state.merchItem)
                            : this.itemExists(this.props.route.params.itemId, this.props.route.params.itemImg)
                        }
                    </View>
                    <View style={{ flex: 3, top: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Set Value</Text>
                            <Text style={styles.slcValue}>$
                                {this.state.selectedValue}
                            </Text>
                        </View>
                        <Slider
                            style={styles.mySlider}
                            minimumValue={0}
                            maximumValue={100}
                            minimumTrackTintColor="#00CED1"
                            maximumTrackTintColor="#000000"
                            thumbTintColor="#00CED1"
                            onValueChange={val => {
                                let newVal = Math.round(val)
                                this.setState({ selectedValue: newVal })
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

//Defined Styles to page Main
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f4',
        alignItems: 'center',
    },
    imgView: {
        top: '5%',
    },
    imgHeader: {
        height: 150,
        width: 300,
        borderRadius: 10,
    },
    textView: {
        height: 200,
        top: '10%',
    },
    selectTxt: {
        top: 25,
        fontWeight: 'bold',
        fontSize: 25,
    },
    adviceTxt: {
        top: 15,
        textAlign: 'center',
        fontSize: 15,
    },

    btnSelect: {
        borderRadius: 5,
        borderColor: '#00CED1',
        borderStyle: 'solid',
        borderWidth: 2,
        height: 30,
        marginTop: 15,
    },
    txtBtn: {
        textAlign: 'center',
        color: '#00CED1',
        fontSize: 20,
    },
    mySlider: {
        width: 320,
    },
    slcValue: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#00CED1',
    }
});
