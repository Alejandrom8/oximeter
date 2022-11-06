import {
    IonText,
    IonContent,
    IonPage,
    IonButton, IonToast,
    IonModal,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle
} from '@ionic/react';
import './Tab1.css';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import BluetoothPairing from "../components/BluetoothPairing";
import {BluetoothSerial} from "@ionic-native/bluetooth-serial";
import {toast} from "../components/toast";
import { saveMeasurements, listMeasurements } from '../firebaseConfig';
import Context from "../components/Context";

const Tab1: React.FC = () => {
    const { session } = useContext(Context);
    const [rate, setRate] = useState<number>(0),
        [ox, setOx] = useState<number>(0),
        [showToast, setShowToast] = useState<boolean>(false),
        [showModal, setShowModal] = useState<boolean>(false),
        [message, setMessage] = useState<string>('');

    const handleSave = useCallback(() => {
        saveMeasurements(session.user.uid, ox, rate)
            .then((res) => {
                console.log(res);
                return toast('Medidas guardadas');
            })
            .catch((error) => {
                console.error(error);
                return toast(error.message || 'Error al guardar las medidas');
            });
    }, [session, ox, rate]);

    const handleDataChange = (data: [string, string]) => {
        setRate(parseFloat(data[0]));
        setOx(parseFloat(data[1]));
    }

    const toggleShowModal = () => {
        setShowModal(!showModal);
    }

    const processData = (data: any) => {
        data = data.replace(/\r?\n|\r/, '');
        data = data.replace('{ heartRate: ', '');
        data = data.replace(' spo2: ', '');
        data = data.replace(' }', '');
        data = data.split(',').map((c: string) => c.trim());
        handleDataChange(data);
    };

    const deviceConnected = () => {
        BluetoothSerial.subscribe('\n').subscribe(data => {
            processData(data);
        });
    };

    useEffect(() => {
       setInterval(() => {
            const intervalRef = setInterval(() => {
                setRate(Math.floor(Math.random() * 5) + 80);
                setOx(Math.floor(Math.random() * 10 + 90));
            }, 1000);
            setTimeout(() => {
                clearInterval(intervalRef);
                setRate(0)
                setOx(0)
            }, 6000);
        }, 12000);
    }, []);

  return (
    <IonPage>
      <IonContent fullscreen className='content'>
          <div className='header'>
              <div className='floating-div'>
                  <div className='title-container'>
                      <IonText>
                          <h1 className='title'>Oximetro</h1>
                      </IonText>
                      <IonText>
                          <p>Últimos datos recibidos del oximetro:</p>
                      </IonText>
                      <IonText>
                          <p>{message}</p>
                      </IonText>
                  </div>
                  <div className='insights-container'>
                      <div>
                          <div className='tag oxigen'>
                              <div className='tag-label'>
                                  Oxigenación
                              </div>
                              <div className='insight-box oxigen'>
                                  {ox}
                              </div>
                          </div>
                          <div className='tag heart-rate'>
                              <div className='tag-label'>
                                  Frecuencia
                              </div>
                              <div className='insight-box heart-rate'>
                                  {rate}
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className='save-button-container'>
                      <IonButton
                          expand="block"
                          color='primary'
                          fill='outline'
                          onClick={() => handleSave()}
                      >
                          Guardar medidas
                      </IonButton>
                  </div>
                  <div className='save-button-container'>
                      <IonButton
                          expand="block"
                          color='secondary'
                          fill='outline'
                          onClick={toggleShowModal}
                      >
                          Conectar oximetro
                      </IonButton>
                  </div>
              </div>
          </div>
          <IonToast
              isOpen={showToast}
              onDidDismiss={() => setShowToast(false)}
              message={'Medidas guardadas exitosamente'}
              duration={800}
          />
          <IonModal isOpen={showModal}>
              <IonToolbar>
                  <IonTitle>Conecta tu oximetro</IonTitle>
                  <IonButtons slot="end">
                      <IonButton onClick={toggleShowModal}>Cerrar</IonButton>
                  </IonButtons>
              </IonToolbar>
              <IonContent>
                  <BluetoothPairing onDeviceConnected={deviceConnected} />
              </IonContent>
          </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
