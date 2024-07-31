import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import {api} from '../../../action/connection';

export default function EditCourse() {
    const route = useRoute();
    const navigation = useNavigation();
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [mess, setMess] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = route.params; // Récupère l'ID du cours à modifier
    const ap = api;

    useEffect(() => {
        setLoading(true);
        // Récupérer les détails du cours
        axios.get(`${ap}/grades/${id}`)
            .then(response => {
                const course = response.data;
                setNom(course.nom);
                setDescription(course.description);
                setLoading(false);
            })
            .catch(error => {
                setError(error.response ? error.response.data : 'Erreur de connexion au serveur');
                setLoading(false);
            });
    }, [id]);

    const handleUpdate = () => {
        setLoading(true);
        const updatedCourse = { nom, description };

        axios.put(`${ap}/grades/${id}`, updatedCourse)
            .then(response => {
                setMess('Cours modifié avec succès');
                setLoading(false);
                setTimeout(() => {
                    navigation.navigate('AfficheCours');
                }, 5000); // Redirection après 5 secondes
            })
            .catch(error => {
                setError(error.response ? error.response.data : 'Erreur lors de la modification du cours');
                setLoading(false);
            });
    };

    const handleCancel = () => {
        navigation.navigate('AfficheCours');
    };

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" color="#007bff" />}
            {error && <Text style={styles.error}>{typeof error === 'object' ? JSON.stringify(error) : error}</Text>}
            {mess && <Text style={styles.success}>{mess}</Text>}
            <Text style={styles.title}>Modifier un Note</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom"
                value={nom}
                onChangeText={setNom}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <View style={styles.buttonContainer}>
                <Button title="Modifier" onPress={handleUpdate} color="#007bff" />
                <Button title="Annuler" onPress={handleCancel} color="red" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        padding: 10,
        width: '100%',
        backgroundColor: '#f9f9f9',
    },
    buttonContainer: {
        marginTop: 20,
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
});
