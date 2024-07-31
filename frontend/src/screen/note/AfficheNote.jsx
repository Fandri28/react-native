import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Button, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {api} from '../../../action/connection';


export default function NoteList() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation();
    const ap = api;

    useEffect(() => {
        fetchNotes();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchNotes();
        }, [])
    );

    const fetchNotes = () => {
        setLoading(true);
        axios.get(ap + '/grades')
            .then(async response => {
                const notesData = response.data;

                const notesWithDetails = notesData.map(note => ({
                    ...note,
                    studentName: note.eleve_id ? note.eleve_id.nom : 'Inconnu',
                    studentId: note.eleve_id ? note.eleve_id._id : 'Inconnu',
                    courseName: note.cours_id ? note.cours_id.nom : 'Inconnu',
                    assessmentType: note.evaluation_id ? note.evaluation_id.type : 'Inconnu',
                }));

                setNotes(notesWithDetails);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des notes :', error);
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        const req = `${ap}/grades/${id}`;

        axios.delete(req)
            .then(response => {
                setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
            })
            .catch(error => {
                console.error('Erreur lors de la suppression de la note :', error);
            });
    };

    const handleMenuToggle = () => {
        setMenuVisible(!menuVisible);
    };

    const renderNote = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.cardText}>ID Élève: {item.studentId}</Text>
            <Text style={styles.cardText}>Nom Élève: {item.studentName}</Text>
            <Text style={styles.cardText}>Cours: {item.courseName}</Text>
            <Text style={styles.cardText}>Évaluation: {item.assessmentType}</Text>
            <Text style={styles.cardText}>Note: {item.note}</Text>
            <View style={styles.buttonContainer}>
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
                <Text style={styles.title}>Liste des Notes</Text>
            </View>
            {menuVisible && (
                <View style={styles.menu}>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AfficheCours')}>
                        <Text style={styles.menuItemText}>AfficheCours</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AfficheEvaluation')}>
                        <Text style={styles.menuItemText}>AfficheEvaluation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AfficheEleve')}>
                        <Text style={styles.menuItemText}>AfficheEleve</Text>
                    </TouchableOpacity>
                </View>
            )}
            <FlatList
                data={notes}
                keyExtractor={(item) => item._id}
                renderItem={renderNote}
                contentContainerStyle={styles.list}
            />
            <View style={styles.bottomButtons}>
                <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('HOME')}>
                    <Ionicons name="home" size={40} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AjoutNote')}>
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
        paddingTop: 30,
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
