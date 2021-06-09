import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Animated,
    TextInput,
    Button,
} from 'react-native';
import { VictoryPie } from 'victory-native';
import { Svg } from 'react-native-svg';

const PieChart = () => {
//////////////nie patrz tu to robocze części piechart
    return (
        <View style={{
            flexDirection: 'row', padding: SIZES.padding,
            justifyContent: 'space-between', alignItems: 'center'
        }}>
            {/* tittle*/}
            <View>
                <Text style={{ color: COLORS.pinkPower, ...FONTS.h3 }}
                >KATEGORIE</Text>
                <Text style={{ color: COLORS.black, ...FONTS.body4 }}
                >Ilość: {categories.length}</Text>
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
                        backgroundColor: viewMode == "add" ?
                            COLORS.pink : null,
                        borderRadius: 25
                    }}
                    onPress={() => setViewMode("add")}
                >
                    <Image
                        source={icons.plus}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: viewMode == "add" ?
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
            <Text></Text>
        </View>
    )
}

export default PieChart

const styles = StyleSheet.create({})


function processCategoryDataToDisplay() {
    // filtrowanie transakcji po statusie 'potwierdzone'
    let chartData = categories.map((item) => {
        let confirmTransactions = item.transactions.filter(a => a.status == "C")
        var total = confirmTransactions.reduce((a, b) => a + (b.total || 0), 0)

        return {
            name: item.name,
            y: total,
            transactionsCount: confirmTransactions.length,
            color: item.color,
            id: item.id
        }
    })

    // odfiltrowanie kategorii bez danych/ transakcji
    let filterChartData = chartData.filter(a => a.y > 0)

    // podliczenie wydatkow
    let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0)

    // podliczenie procentow i dane na wykresie
    let finalChartData = filterChartData.map((item) => {
        let percentage = (item.y / totalExpense * 100).toFixed(0)
        return {
            label: `${percentage}%`,
            y: Number(item.y),
            transactionsCount: item.transactionsCount,
            color: item.color,
            name: item.name,
            id: item.id
        }
    })

    return finalChartData
}
function setSelectCategoryByName(name) {

    let category = categories.filter(a => a.name == name)
    setSelectedCategory(category[0])
}

function renderChart() {

    let chartData = processCategoryDataToDisplay()
    let colorScales = chartData.map((item) => item.color)
    let totalTransactionsCount = chartData.reduce((a, b) => a + (b.transactionsCount || 0), 0)

    console.log("Check Chart")
    console.log(chartData)

    if (Platform.OS == 'ios') {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <VictoryPie
                    data={chartData}
                    labels={(datum) => `${datum.y}`}
                    radius={({ datum }) => (selectedCategory && selectedCategory.name == datum.name)
                        ? SIZES.width * 0.4 : SIZES.width * 0.4 - 10}
                    innerRadius={70}
                    labelRadius={({ innerRadius }) => (SIZES.width * 0.4 + innerRadius) / 2.5}
                    style={{
                        labels: { fill: COLORS.black, ...FONTS.body3 },
                        parent: {
                            ...styles.shadow
                        },
                    }}
                    width={SIZES.width * 0.8}
                    height={SIZES.width * 0.8}
                    colorScale={colorScales}
                    events={[{
                        target: "data",
                        eventHandlers: {
                            onPress: () => {
                                return [{
                                    target: "labels",
                                    mutation: (props) => {
                                        let categoryName = chartData[props.index].name
                                        setSelectCategoryByName(categoryName)
                                    }
                                }]
                            }
                        }
                    }]}

                />

                <View style={{ position: 'absolute', top: '42%', left: "41%" }}>
                    <Text style={{ ...FONTS.h1, textAlign: 'center' }}>{totalTransactionsCount}</Text>
                    <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Wydatków</Text>
                </View>
            </View>

        )
    }
    else {  // dla androida trzeba otoczyć SVG żeby działało
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Svg width={335} height={335} viewBox="0 0 335 335" style={{ width: "100%", height: "auto" }}>
                    <VictoryPie
                        standalone={false} //dla Androida
                        data={chartData}
                        labels={(datum) => `${datum.y}`}
                        radius={({ datum }) => (selectedCategory && selectedCategory.name == datum.name)
                            ? SIZES.width * 0.4 : SIZES.width * 0.4 - 10}
                        innerRadius={70}
                        labelRadius={({ innerRadius }) => (SIZES.width * 0.4 + innerRadius) / 2.5}
                        style={{
                            labels: { fill: COLORS.black, ...FONTS.body3 },
                            parent: {
                                ...styles.shadow
                            },
                        }}
                        width={SIZES.width * 0.8}
                        height={SIZES.width * 0.8}
                        colorScale={colorScales}
                        events={[{
                            target: "data",
                            eventHandlers: {
                                onPress: () => {
                                    return [{
                                        target: "labels",
                                        mutation: (props) => {
                                            let categoryName = chartData[props.index].name
                                            setSelectCategoryByName(categoryName)
                                        }
                                    }]
                                }
                            }
                        }]}

                    />
                </Svg>
                <View style={{ position: 'absolute', top: '40%', left: "40%" }}>
                    <Text style={{ ...FONTS.h1, textAlign: 'center' }}>{totalTransactionsCount}</Text>
                    <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Wydatków</Text>
                </View>
            </View>

        )
    }
}
function renderExpenseSummary() {

    let data = processCategoryDataToDisplay()

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                height: 40,
                paddingHorizontal: SIZES.radius,
                borderRadius: 10,
                backgroundColor: (selectedCategory && selectedCategory.name == item.name) ? item.color : COLORS.white
            }}
            onPress={() => {
                let categoryName = item.name
                setSelectCategoryByName(categoryName)
            }}
        >
            {/* nazwa kategorii */}
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View
                    style={{
                        width: 20,
                        height: 20,
                        backgroundColor: (selectedCategory && selectedCategory.name == item.name)
                            ? COLORS.white : item.color,
                        borderRadius: 5
                    }}
                />

                <Text style={{
                    marginLeft: SIZES.base, color: (selectedCategory && selectedCategory.name == item.name)
                        ? COLORS.white : COLORS.black, ...FONTS.h3
                }}>{item.name}</Text>
            </View>

            {/* wydatki */}
            <View style={{ justifyContent: 'center' }}>
                <Text style={{
                    color: (selectedCategory && selectedCategory.name == item.name)
                        ? COLORS.white : COLORS.black, ...FONTS.h3
                }}>{item.y} PLN - {item.label}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={{ padding: SIZES.padding }}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => `${item.id}`}
            />
        </View>

    )
}