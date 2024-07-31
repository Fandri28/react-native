import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EleveScreen = () => {
    return (
        <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
                <Text
                    style={{ marginVertical: 10, gap: 10, flexDirection: "row", fontSize: 25 }}
                > --- Liste --- </Text>
            </View>
            <View>

                <Text style={{margin:5, borderRadius: 8, padding: 5, width:60,height:50, backgroundColor: "#659832",alignItems: "center", }} >
                    Ajout
                </Text>
            </View>
            {/* voici le code suivant  */}
            <View >

                <View


                    style={{ marginVertical: 10, gap: 10, flexDirection: "row", width: "100%", backgroundColor: "grey", borderRadius: 10, padding: 5, }}
                >
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 8,
                            padding: 10,
                            backgroundColor: "#4b6cb7",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{ color: "white", fontSize: 16 }}>Name</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>emploi</Text>
                        <Text style={{ marginTop: 5, }}>
                            text area
                        </Text>
                    </View>
                </View>
                <View


                    style={{ marginVertical: 10, gap: 10, flexDirection: "row", width: "100%", backgroundColor: "grey", borderRadius: 10, padding: 5, }}
                >
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 8,
                            padding: 10,
                            backgroundColor: "#4b6cb7",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{ color: "white", fontSize: 16 }}>Name</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>emploi</Text>
                        <Text style={{ marginTop: 5, color: "gray" }}>
                            text area
                        </Text>
                    </View>
                </View>
                <View


                    style={{ marginVertical: 10, gap: 10, flexDirection: "row", width: "100%", backgroundColor: "grey", borderRadius: 10, padding: 5, }}
                >
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 8,
                            padding: 10,
                            backgroundColor: "#4b6cb7",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{ color: "white", fontSize: 16 }}>Name</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>emploi</Text>
                        <Text style={{ marginTop: 5, color: "gray" }}>
                            text area
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ padding: 10 }}>
                <View

                    style={{ marginVertical: 10, gap: 10, flexDirection: "row", width: "100%", }}
                >
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 8,
                            padding: 10,
                            backgroundColor: "#4b6cb7",
                            alignItems: "center",
                            justifyContent: "center",

                        }}
                    >
                        <Text style={{ color: "white", fontSize: 16 }}>Name</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>emploi</Text>
                        <Text style={{ marginTop: 5, color: "gray" }}>
                            text area
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ padding: 10 }}>
                <View

                    style={{ marginVertical: 5, gap: 10, flexDirection: "row", width: "100%", }}
                >
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 8,
                            padding: 10,
                            backgroundColor: "#4b6cb7",
                            alignItems: "center",
                            justifyContent: "center",

                        }}
                    >
                        <Text style={{ color: "white", fontSize: 16 }}>Name</Text>
                    </View>

                    <View>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>emploi</Text>
                        <Text style={{ marginTop: 5, }}>
                            text area
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default EleveScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        flexGrow: 1,
        width: "98%",
        marginHorizontal:5,
    },
});