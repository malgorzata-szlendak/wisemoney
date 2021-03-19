import React, { useState } from 'react'  // React, {Component}
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native'
import ExpensesList from '../../components/ExpensesList'
// import AddExpense from '../../components/AddExpense'
// import EditExpense from '../../components/EditExpense'
import { COLORS, SIZES, icons } from '../../constants';
// NIE POTRZEBNY? /TERAZ MAIN SCREEN TO TEN Z LISTA
const HomeScreen = () => {

    const [viewMode, setViewMode] = useState("addExpense");

function renderViews() {
    return (
        <View style={{
            flexDirection: 'row', padding: SIZES.padding,
            justifyContent: 'space-between', alignItems: 'center'
        }}>
            {/* tittle*/}
            <View>
                <Text>Widoki</Text>
                {/* <Text>Ilość:
                {categories.length}
                </Text> */}
            </View>
            {/* buttons */}
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        backgroundColor: viewMode == "chart" ?
                            COLORS.pink : null,
                        borderRadius: 25
                    }}
                    onPress={() => setViewMode("chart")}
                >
                    <Image
                        source={icons.chart}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: viewMode == "chart" ?
                                COLORS.white : COLORS.pinkPower,
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        backgroundColor: viewMode == "addExpense" ?
                            COLORS.pink : null,
                        borderRadius: 25
                    }}
                    onPress={() => setViewMode("addExpense")}
                >
                    <Image
                        source={icons.plus}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: viewMode == "addExpense" ?
                                COLORS.white : COLORS.pinkPower,
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 50,
                        height: 50,
                        backgroundColor: viewMode == "list" ?
                            COLORS.pink : null,
                        borderRadius: 25
                    }}
                    onPress={() => setViewMode("list")}
                >
                    <Image
                        source={icons.menu}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: viewMode == "list" ?
                                COLORS.white : COLORS.pinkPower,
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}
    
    return (
        <View>
            {renderViews()}
            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                <View>
                {
                    viewMode == "addExpense" &&
                    <View>
                        <ExpensesList />
                    </View>
                }
                {
                     viewMode == "list" &&
                    <View>
                    </View>
                }
                {
                     viewMode == "edit" &&
                    <View>
                    </View>
                }

                {
                     viewMode == "chart" &&
                    <View>
                    </View>
                }
                </View>
            </ScrollView>
        </View>
    )
}
export default HomeScreen


