import React, {useCallback, useContext, useState} from 'react';
import {
    IonContent,
    IonPage,
    IonButton,
    IonInput, IonText, IonLoading,
    IonLabel
} from "@ionic/react";
import Context from '../components/Context';
import { login } from "../firebaseConfig";

import './auth.css'
import {toast} from "../components/toast";

const Login: React.FC = () => {
    const { setSession } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = useCallback(() => {
        setLoading(true);
        login(email, password)
            .then((res) => {
                console.log(res);
                setSession(res);
                return toast('Has iniciado sesión!');
            })
            .catch((error) => {
                return toast(error.message || 'Contraseña o correo invalidos');
            })
            .finally(() => setLoading(false));
    }, [email, password, setSession]);

    return (
        <IonPage>
            <IonLoading message='Porfavor espere' duration={0} isOpen={loading}/>
            <IonContent>
                <div className='content'>
                    <div className='floating-div'>
                        <IonText className='title'>
                            <h1>Iniciar sesión</h1>
                        </IonText>
                        <div style={{ padding: '2% 0' }}>
                            <IonLabel position="stacked">Correo electrónico</IonLabel>
                            <IonInput
                                type='text'
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
                            <IonButton onClick={handleLogin} expand='block' color='primary'>Iniciar sesión</IonButton>
                        </div>
                        <div style={{ padding: '2% 5%' }}>
                            <IonButton routerLink='/signup' expand='block' color='secondary'>Registrate</IonButton>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Login;