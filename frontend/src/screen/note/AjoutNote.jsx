import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Ensure correct import
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../../action/connection';

export default function AjoutNote() {
    const [students, setStudents] = useState([]);
    const [evaluations, setEvaluations] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedEvaluation, setSelectedEvaluation] = useState('');
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigation = useNavigation();
    const ap = api;

    useEffect(() => {
        // Fetch students, evaluations, and courses to populate the pickers
        axios.get(ap + '/students')
            .then(response => setStudents(response.data))
            .catch(error => console.error('Erreur lors de la récupération des étudiants :', error));

        axios.get(ap + '/assessments')
            .then(response => setEvaluations(response.data))
            .catch(error => console.error('Erreur lors de la récupération des évaluations :', error));

        axios.get(ap + '/courses')
            .then(response => {
                setCourses(response.data);
                setNotes(response.data.map(course => ({ courseName: course.nom, note: '' })));
            })
            .catch(error => console.error('Erreur lors de la récupération des cours :', error));
    }, []);

    const handleAddNote = async () => {
        if (!selectedStudent || !selectedEvaluation) {
            setError('Veuillez sélectionner un élève et une évaluation');
            return;
        }

        try {
            for (const note of notes) {
                const course = courses.find(c => c.nom === note.courseName);
                if (!course) {
                    setError('Cours non trouvé');
                    return;
                }

                const newNote = {
                    eleve_id: selectedStudent,
                    evaluation_id: selectedEvaluation,
                    cours_id: course._id,
                    note: Number(note.note),
                };

                await axios.post(ap + '/grades', newNote);
            }
            setSuccess('Succès, notes ajoutées avec succès');
            setNotes(courses.map(course => ({ courseName: course.nom, note: '' })));
        } catch (error) {
            setError(error.response ? error.response.data : 'Erreur de connexion au serveur');
            console.error('Erreur lors de l\'ajout des notes :', error);
        }
    };

    const handleNoteChange = (index, value) => {
        const newNotes = [...notes];
        newNotes[index].note = value;
        setNotes(newNotes);
    };

    const handleBack = () => {
        navigation.navigate('AfficheNote');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Ajouter des Notes</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            {success && <Text style={styles.success}>{success}</Text>}
            <View style={styles.inputContainer}>
                <Picker
                    selectedValue={selectedStudent}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedStudent(itemValue)}
                >
                    <Picker.Item label="Sélectionner un élève" value="" />
                    {students.map(student => (
                        <Picker.Item key={student._id} label={student.nom} value={student._id} />
                    ))}
                </Picker>
            </View>
            <View style={styles.inputContainer}>
                <Picker
                    selectedValue={selectedEvaluation}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedEvaluation(itemValue)}
                >
                    <Picker.Item label="Sélectionner une évaluation" value="" />
                    {evaluations.map(evaluation => (
                        <Picker.Item key={evaluation._id} label={evaluation.type} value={evaluation._id} />
                    ))}
                </Picker>
            </View>
            {notes.map((note, index) => (
                <View key={index} style={styles.noteContainer}>
                    <Text style={styles.courseName}>{note.courseName}</Text>
                    <TextInput
                        style={[styles.input, styles.inputContainer]}
                        placeholder="Note"
                        value={note.note}
                        onChangeText={(value) => handleNoteChange(index, value)}
                        inputMode="numeric"
                    />
                </View>
            ))}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleAddNote}>
                    <Text style={styles.buttonText}>Ajouter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.backButton]} onPress={handleBack}>
                    <Text style={styles.buttonText}>Retour</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noteContainer: {
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
    },
    courseName: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        width: '100%',
    },
    inputContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        marginBottom: 10,
    },
    error: {
        color: 'red',
        marginBottom: 20,
    },
    success: {
        color: 'blue',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: '100%',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    backButton: {
        backgroundColor: 'red',
    },
});
