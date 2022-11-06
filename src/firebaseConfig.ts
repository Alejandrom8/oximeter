import firebase from 'firebase';


interface signUpData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const config = {
    apiKey: "AIzaSyCcBzrIsvOqUJNcevTiwqBWL8No9iuPIcA",
    authDomain: "oximetro-1cef3.firebaseapp.com",
    projectId: "oximetro-1cef3",
    storageBucket: "oximetro-1cef3.appspot.com",
    messagingSenderId: "52262260814",
    appId: "1:52262260814:web:a27871cce81806528a331f",
    measurementId: "G-2Q9V47JRTC"
};

firebase.initializeApp(config);
const db = firebase.firestore();

export async function login(email: string, password: string) {
    try {
        const res = await firebase.auth().signInWithEmailAndPassword(email, password);
        return res;
    } catch (error) {
        console.error(error);
    }
}

export async function signUp(data: signUpData) {
    return await new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then(res => {
                firebase.database().ref('users/' + res?.user?.uid).set({
                    firstName: data.firstName,
                    lastName: data.lastName
                });
                resolve(res);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export async function listMeasurements (userId: string) {
    const data = await db.collection('measurements').where('userId', "==", userId).get()
    const results:any[] = [];
    data.forEach((doc) => {
        results.push(doc.data());
    });
    return results;
}

export async function saveMeasurements (userId: string, ox: number, rate: number) {
    try {
        return await db.collection('measurements').doc().set({
            userId,
            date: new Date(),
            frequency: rate,
            oxygenation: ox
        });
    } catch (error) {
        console.error(error);
    }
}