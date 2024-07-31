import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, ScrollView, FlatList } from 'react-native';
import axios from 'axios';

export default function App() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);
    const [eleves, setEleves] = useState([]);

    useEffect(() => {
        fetchEleves();
    }, []);

    const fetchEleves = () => {
        axios.get('http://localhost:3000/eleves')
            .then(response => {
                setEleves(response.data);
            })
            .catch(error => {
                setError(error.response ? error.response.data : 'Erreur de connexion au serveur');
            });
    };

    const handleNoteChange = (index, value) => {
        const newNotes = [...notes];
        newNotes[index] = value;
        setNotes(newNotes);
    };

    const handleAddNote = () => {
        setNotes([...notes, '']);
    };

    const handleSubmit = () => {
        const userData = {
            nom,
            prenom,
            notes,
        };

        axios.post('http://localhost:3000/eleves', userData)
            .then(response => {
                Alert.alert('Succès', 'Élève ajouté avec succès');
                setNom('');
                setPrenom('');
                setNotes([]);
                setError(null);
                fetchEleves(); // Rafraîchir la liste des élèves
            })
            .catch(error => {
                setError(error.response ? error.response.data : 'Erreur de connexion au serveur');
            });
    };

    const renderEleve = ({ item }) => (
        <View style={styles.eleveContainer}>
            <Text style={styles.eleveText}>Nom: {item.nom}</Text>
            <Text style={styles.eleveText}>Prénom: {item.prenom}</Text>
            <Text style={styles.eleveText}>Notes: {item.notes.join(', ')}</Text>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Ajouter un élève</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Nom"
                value={nom}
                onChangeText={setNom}
            />
            <TextInput
                style={styles.input}
                placeholder="Prénom"
                value={prenom}
                onChangeText={setPrenom}
            />

            {notes.map((note, index) => (
                <TextInput
                    key={index}
                    style={styles.input}
                    placeholder={`Note ${index + 1}`}
                    keyboardType="numeric"
                    value={note}
                    onChangeText={value => handleNoteChange(index, value)}
                />
            ))}

            <Button title="Ajouter une note" onPress={handleAddNote} />
            <Button title="Soumettre" onPress={handleSubmit} />

            <Text style={styles.title}>Liste des élèves</Text>
            <FlatList
                data={eleves}
                renderItem={renderEleve}
                keyExtractor={item => item._id}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        width: '100%',
    },
    error: {
        color: 'red',
        marginBottom: 20,
    },
    eleveContainer: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginVertical: 5,
        width: '100%',
    },
    eleveText: {
        fontSize: 16,
    },
});
