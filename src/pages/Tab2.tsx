import {
    IonContent,
    IonHeader,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonListHeader,
    IonTabButton,
    IonButton,
} from '@ionic/react';
import './Tab2.css';
import {useCallback, useContext, useEffect, useState} from "react";
import {listMeasurements} from "../firebaseConfig";
import Context from "../components/Context";


function toDateTime(secs: number) {
    const t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
}

const Tab2: React.FC = () => {
    const { session } = useContext(Context);
    const [history, setHistory] = useState<any[]>([]);
    const [refresh, setRefresh] = useState(false);

    const toggleRefresh = () => setRefresh(!refresh);

    const listData = useCallback(() => {
        listMeasurements(session.user.uid)
            .then((data) => {
                setHistory(data)
            })
            .catch(err => console.error(err));
    }, [session]);

    useEffect(() => listData(), [listData, session]);
    useEffect(() => listData(), [listData, refresh]);

  return (
    <IonPage>
      <IonContent fullscreen className='content'>
          <div className='title'>
              <IonText>
                  <h2>Historial</h2>
              </IonText>
          </div>
          <IonList>
              {
                  history?.length > 0 && history.map((h, i) => (
                      <IonItem key={i}>
                          <IonItemSliding>
                              <IonItem>
                                  <IonLabel>
                                      <i>{(toDateTime(h?.date.seconds)).toTimeString()}</i>
                                      <h3>Oxigenación: {h?.oxygenation}</h3>
                                      <h3>Frecuencia: {h?.frequency}</h3>
                                  </IonLabel>
                              </IonItem>
                              <IonItemOptions side="end">
                                  <IonItemOption onClick={() => {}}>Eliminar</IonItemOption>
                              </IonItemOptions>
                          </IonItemSliding>
                      </IonItem>
                  ))
              }
          </IonList>
          <div style={{padding: '10%'}}>
              <IonButton expand='block' fill='outline' onClick={toggleRefresh}>
                  Refrescar
              </IonButton>
          </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
