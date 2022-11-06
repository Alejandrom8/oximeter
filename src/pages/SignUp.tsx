import React, {useCallback, useContext, useState} from 'react';
import {
    IonContent,
    IonPage,
    IonButton,
    IonInput, IonText,
    IonLoading,
    IonLabel
} from "@ionic/react";

import './auth.css'
import { signUp } from '../firebaseConfig';
import {toast} from "../components/toast";
import Context from "../components/Context";
import {useHistory} from "react-router";

const SignUp: React.FC = () => {
    const { setSession } = useContext(Context);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSignUp = useCallback(() => {
        setLoading(true);
        signUp({
            firstName,
            lastName,
            email,
            password
        })
            .then((res) => {
                console.log(res);
                setSession(res);
                history.push('/');
                return toast('Registrado exitosamente!');
            })
            .catch((error) => {
                return toast(error.message || 'Hubo un error al registrarte');
            })
            .finally(() => setLoading(false));
    }, [firstName, lastName, email, password, setSession]);

    return (
        <IonPage>
            <IonLoading message='Porfavor espere' duration={0} isOpen={loading}/>
            <IonContent>
                <div className='content'>
                    <div className='floating-div'>
                        <IonText className='title'>
                            <h1>Registro</h1>
                        </IonText>
                        <div style={{ padding: '2% 0' }}>
                            <IonLabel position="stacked">Nombre</IonLabel>
                            <IonInput
                                type='text'
                                placeholder='Nombre'
                                value={firstName}
                                onIonChange={(e: any) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div style={{ padding: '2% 0' }}>
                            <IonLabel position="stacked">Apellidos</IonLabel>
                            <IonInput
                                type='text'
                                placeholder='Apellidos'
                                value={lastName}
                                onIonChange={(e: any) => setLastName(e.target.value)}
                            />
                        </div>
                        <div style={{ padding: '2% 0' }}>
                            <IonLabel position="stacked">Correo electrónico</IonLabel>
                            <IonInput
                                type='email'
                                placeholder='Correo electrónico'
                                value={email}
                                onIonChange={(e: any) => setEmail(e.target.value)}
                            />
                        </div>
                        <div style={{ padding: '2% 0' }}>
                            <IonLabel position="stacked">Contraseña</IonLabel>
                            <IonInput
                                type='password'
                                placeholder='Contraseña'
                                value={password}
                                onIonChange={(e: any) => setPassword(e.target.value)}
                            />
                        </div>
                        <div style={{ padding: '4% 5% 2%' }}>
                            <IonButton onClick={handleSignUp} expand='block' color='primary'>Registrate</IonButton>
                        </div>
                        <div style={{ padding: '2% 5%' }}>
                            <IonButton routerLink='/' expand='block' color='secondary'>Iniciar sesión</IonButton>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default SignUp;