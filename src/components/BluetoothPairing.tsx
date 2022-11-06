import { IonButtons, IonItemSliding, IonItemOptions, IonItemOption, IonToast, IonContent, IonAlert, IonText, IonList, IonItem, IonLabel, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import React, {useEffect, useState} from "react";

interface BlueToothDevise {
    id: string;
    name: string;
    address: string;
    uuid: string;
}

interface alertError {
    title: string;
    message: string;
}

const BluetoothPairing: React.FC<{onDeviceConnected: () => void}> = ({ onDeviceConnected }) => {
    const [message, setMessage] = useState<string>(),
        [list, setList] = useState<BlueToothDevise[]>(),
        [error, setError] = useState<alertError>(),
        [showAlert, setShowAlert] = useState<boolean>(false),
        [showToast, setShowToast] = useState<string>(''),
        [connecting, setConnecting] = useState<boolean>(false),
        [connectionId, setConnectionId] = useState<string>();

    const showError = (e: alertError) => {
        setError(e);
        setShowAlert(true);
    }

    const connect = (address: string) => {
        setConnectionId(address);
        setConnecting(true);
        BluetoothSerial.connect(address).subscribe((success) => {
            setShowToast('Conectado exitosamente!');
            setConnecting(false);
            onDeviceConnected();
        }, error => {
            setConnectionId('');
            setConnecting(false);
            showError({
                title: 'Error de conexión',
                message: 'No se pudo conectar con el dispositivo'
            })
        });
    };

    const listDevices = () => {
        BluetoothSerial.list()
            .then((data) => {
                if (!data) return;
                setMessage('');
                setList(data);
            })
            .catch(() => setShowAlert(true));
    };

    useEffect(() => {
        BluetoothSerial.isEnabled()
            .then(() => listDevices())
            .catch(error => {
                setMessage(JSON.stringify(error))
                BluetoothSerial.enable()
                    .then(() => listDevices())
                    .catch(() => setShowAlert(true))
            });
    }, []);

    return (
        <React.Fragment>
            <IonText>
                <h1>Conecta tu oximetro</h1>
            </IonText>
            <IonText>
                <p>{message}</p>
            </IonText>
            <IonList>
                {
                    (list && list?.length > 0) ? list.map((opt, i) => (
                        <IonItemSliding key={i}>
                            <IonItem button onClick={() => connect(opt.address)}>
                                <IonLabel>{opt.name}</IonLabel>
                            </IonItem>
         {/*                   <IonItemOptions side="end">
                                <IonItemOption onClick={() => connect(opt.address)}>conectar</IonItemOption>
                            </IonItemOptions>*/}
                        </IonItemSliding>
                    )) : (
                        <IonText>No hay dispositivos</IonText>
                    )
                }
            </IonList>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={error?.title}
                message={error?.message}
                buttons={['OK']}
            />
            <IonAlert
                isOpen={connecting}
                header={'Conectando'}
                message={`Se esta conectando con tu oximetro ${connectionId}`}
            />
            <IonToast
                isOpen={showToast !== ''}
                onDidDismiss={() => setShowToast('')}
                message={showToast}
                duration={300}
            />
        </React.Fragment>
    );
};

export default BluetoothPairing;