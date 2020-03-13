import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Linking, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';

export default class Merchants extends Component {
    constructor() {
        super()
        this.state = {
            search: '',
            loading: false,
            merchantObj: [],
            btnDisabled: true,
            itemId: null,
            imgLink: null,
            itemindex: "",
        }
        this.arrayholder = [];
    }
    //Taking data from a external resource and using that as json/saving on my state variable
    componentDidMount() {
        const merchantUrl = 'http://165.227.43.115:8080/merchant/merchant'
        fetch(merchantUrl)
            .then(response => response.json())
            .then(data => {
                this.setState({ merchantObj: data, loading: false },
                    function () {
                        this.arrayholder = data;
                    })
            })
            .catch(error => {
                console.log(error)
            });
    }
    //Search function
    SearchFilterFunction(text) {
        //passing the inserted text in textinput
        const newData = this.arrayholder.filter(function (item) {
            //applying filter for the inserted text in search bar
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            //setting the filtered newData on datasource
            //After setting the data it will automatically re-render the view
            merchantObj: newData,
            search: text,
        });
    }

    clear = () => {
        this.search.clear();
    };
    //This wasn't request on the image that I saw but, I use as is available in the flatlist att
    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "95%",
                    justifyContent: 'center',
                    backgroundColor: "#DCDCDC",
                }}
            />
        );
    }
    //Here I will manipulate the button select, turning available just after some merchant be choosed   
    MerchSelected = (selectedId) => {
        if (this.state.btnDisabled === true) {
            return (
                <View style={styles.btnDsb}>
                    <Text style={styles.txtBtn}>Select</Text>
                </View>
            )
        } else {
            return (
                <TouchableOpacity onPress={(item) => this.props.navigation.navigate('Main', { itemId: this.state.itemId, itemImg: this.state.imgLink })}>
                    <View style={styles.btnSelect}>
                        <Text style={styles.txtBtn}>Select</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    //Taking information from the pressed merchant
    PressedItem = (itemId, itemImg) => {
        console.log(itemId)
        this.setState({ itemId: itemId, btnDisabled: false, imgLink: itemImg })
    }
    //Here will be rendered by the flatlist and will insert the information for each item.
    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => { this.PressedItem(item.id, item.image), this.setState({ itemindex: item.id }) }} >
                <View style={this.state.itemindex == item.id ? styles.SelectedlistItem : styles.listItem} >
                    <Image
                        style={{ width: 80, height: 80 }}
                        source={{ uri: `${item.image}` }} />
                    <View style={{ flexDirection: 'column', marginLeft: 2 }}>
                        < Text style={{ fontWeight: 'bold', fontSize: 20 }} > {item.name} </Text>
                        {item.shoppingOption == 'STORE' ? <Text>Store</Text> : <Text>In-Store  &amp; Online</Text>}
                        <Text>${item.minAmount} - ${item.maxAmount}</Text>
                        <Text style={{ color: '#00CED1' }}
                            onPress={() => Linking.openURL(`${item.website}`)}>
                            view website
                    </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        if (this.state.loading) {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            );
        }

        return (
            <View style={styles.container} >
                <View style={styles.searchBar}>
                    <Searchbar
                        round
                        placeholder="Search"
                        onChangeText={text => this.SearchFilterFunction(text)}
                        onClear={text => this.SearchFilterFunction('')}
                        value={this.state.search}
                    />
                </View>
                <View style={styles.merchantsList}>
                    <FlatList
                        data={this.state.merchantObj}
                        renderItem={this.renderItem}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        keyExtractor={item => item.id.toString()}
                        extraData={this.state}

                    />

                </View>
                <View style={styles.footerBtn}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Main', { itemId: undefined })}>
                        <View style={styles.btnSelect}>
                            <Text style={styles.txtBtn}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
                    {this.state.btnDisabled === true ? this.MerchSelected('Sim') : this.MerchSelected('Nao')}
                </View>
            </View >
        );
    }
}
// Style for the merchant page
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f4',
        alignItems: 'center',
    },
    searchBar: {
        flex: 1,
        top: '5%',
        width: '90%',
        backgroundColor: 'rgba(242, 242, 244,0.5)'
    },
    merchantsList: {
        flex: 6,
        width: '95%',
    },
    footerBtn: {
        flex: 1,
        width: '100%',
    },
    listItem: {
        flexDirection: 'row',
        marginTop: 5,
    },

    SelectedlistItem: {
        flexDirection: 'row',
        marginTop: 5,
        backgroundColor: "grey",
    },

    btnSelect: {
        justifyContent: 'center',
        width: '95%',
        borderRadius: 5,
        borderColor: '#00CED1',
        borderStyle: 'solid',
        borderWidth: 2,
        height: 40,
        marginTop: 5,
        marginLeft: 8,
    },

    btnDsb: {
        justifyContent: 'center',
        width: '95%',
        borderRadius: 5,
        backgroundColor: 'gray',
        height: 40,
        marginTop: 5,
        marginLeft: 8,
    },
    txtBtn: {
        textAlign: 'center',
        color: '#00CED1',
        fontSize: 20,
    },
})