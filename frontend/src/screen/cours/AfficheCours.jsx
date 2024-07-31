import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Button, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../../../action/connection';


export default function CourseList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const ap = api;
    console.log('aaa' + ' ' + ap);

    useEffect(() => {
        fetchCourses();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchCourses();
        }, [])
    );

    const fetchCourses = () => {
        setLoading(true);
        axios.get(ap + '/courses')
            .then(response => {
                setCourses(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.response ? error.response.data : 'Erreur de connexion au serveur');
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        const req = `${ap}/courses/${id}`;

        axios.delete(req)
            .then(response => {
                setCourses(prevCourses => prevCourses.filter(course => course._id !== id));
            })
            .catch(error => {
                console.error('Erreur lors de la suppression du cours :', error);
            });
    };

    const handleEdit = (id) => {
        navigation.navigate('ModifierCours', { id });
    };

    const handleAdd = () => {
        navigation.navigate('AjoutCours');
    };

    const handleHome = () => {
        navigation.navigate('HOME');
    };

    const handleMenuToggle = () => {
        setMenuVisible(!menuVisible);
    };

    const renderCourse = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.cardText}>Nom: {item.nom}</Text>
            <Text style={styles.cardText}>Description: {item.description}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Modifier" onPress={() => handleEdit(item._id)} />
                <Button title="Supprimer" color="red" onPress={() => handleDelete(item._id)} />
            </View>
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton} onPress={handleMenuToggle}>
                    <Ionicons name="menu" size={32} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Liste des Cours</Text>
            </View>
            {menuVisible && (
                <View style={styles.menu}>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AfficheEleve')}>
                        <Text style={styles.menuItemText}>AfficheEleve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AfficheEvaluation')}>
                        <Text style={styles.menuItemText}>AfficheEvaluation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AfficheNote')}>
                        <Text style={styles.menuItemText}>AfficheNote</Text>
                    </TouchableOpacity>
                </View>
            )}
            <FlatList
                data={courses}
                keyExtractor={(item) => item._id}
                renderItem={renderCourse}
                contentContainerStyle={styles.list}
            />
            <View style={styles.bottomButtons}>
                <TouchableOpacity style={styles.homeButton} onPress={handleHome}>
                    <Ionicons name="home" size={40} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                    <Ionicons name="add-circle-outline" size={40} color="green" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#007bff',
        paddingTop: 25,
        paddingVertical:10,
        paddingHorizontal:15,


        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    title: {
        fontSize: 22,
        color: 'white',
        flex: 1,
        textAlign: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    cardText: {
        fontSize: 16,
        marginBottom: 5,
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    error: {
        color: 'red',
        marginBottom: 20,
        textAlign: 'center',
    },
    success: {
        color: 'green',
        marginBottom: 20,
        textAlign: 'center',
    },
    addButton: {
        marginRight: 20,
    },
    homeButton: {
        marginLeft: 20,
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 20,
        width: '100%',
    },
    menuButton: {
        marginLeft: 10,
    },
    menu: {
        position: 'absolute',
        top: 70,
        left: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        padding: 10,
        zIndex: 1,
        width: 200,
    },
    menuItem: {
        paddingVertical: 10,
    },
    menuItemText: {
        fontSize: 18,
        color: '#007bff',
    },
    list: {
        paddingBottom: 80, // Add padding to avoid overlap with the bottom buttons
    },
});
