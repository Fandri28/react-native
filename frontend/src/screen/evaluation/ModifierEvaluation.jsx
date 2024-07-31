import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import { api } from '../../../action/connection';


export default function EditAssessment() {
    const route = useRoute();
    const navigation = useNavigation();
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [mess, setMess] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = route.params; // Récupère l'ID de l'évaluation à modifier
    const ap = api;

    useEffect(() => {
        setLoading(true);
        // Récupérer les détails de l'évaluation
        const re = `${ap}/assessments/${id}`;
        axios.get(re)
            .then(response => {
                const assessment = response.data;
                setType(assessment.type);
                setDate(assessment.date);
                setLoading(false);
            })
            .catch(error => {
                setError(error.response ? error.response.data : 'Erreur de connexion au serveur');
                setLoading(false);
            });
    }, [id]);

    const handleUpdate = () => {
        setLoading(true);
        const updatedAssessment = { type, date };

        const req = `${ap}/assessments/${id}`;

        axios.put(req, updatedAssessment)
            .then(response => {
                setMess('Évaluation modifiée avec succès');
                setLoading(false);
                setTimeout(() => {
                    navigation.navigate('AfficheEvaluation');
                }, 5000); // Redirection après 5 secondes
            })
            .catch(error => {
                setError(error.response ? error.response.data : 'Erreur lors de la modification de l\'évaluation');
                setLoading(false);
            });
    };

    const handleCancel = () => {
        navigation.navigate('AfficheEvaluation');
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                {loading && <ActivityIndicator size="large" color="#007bff" />}
                {error && <Text style={styles.error}>{typeof error === 'object' ? JSON.stringify(error) : error}</Text>}
                {mess && <Text style={styles.success}>{mess}</Text>}
                <Text style={styles.title}>Modifier une Évaluation</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Type"
                    value={type}
                    onChangeText={setType}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Date"
                    value={date}
                    onChangeText={setDate}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Modifier" onPress={handleUpdate} color="#007bff" />
                    <Button title="Annuler" onPress={handleCancel} color="red" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
    ,formContainer: {
        width: '80%',
        padding: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
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
