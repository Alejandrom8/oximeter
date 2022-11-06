import {IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar} from '@ionic/react';
import './Tab3.css';
import {Line} from "react-chartjs-2";

const HR = {
    labels: ['Lun', 'Mar', 'Miér', 'Jue', 'Vie', 'Sab', 'Dom'],
    datasets: [
        {
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 70, 74, 80, 67, 72, 90]
        }
    ]
};

const SO = {
    labels: ['Lun', 'Mar', 'Miér', 'Jue', 'Vie', 'Sab', 'Dom'],
    datasets: [
        {
            backgroundColor: 'rgba(72,149,239,0.2)',
            borderColor: 'rgba(72,149,239,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(72,149,239,0.4)',
            hoverBorderColor: 'rgba(72,149,239,1)',
            data: [81, 95, 90, 98, 97, 100, 93]
        }
    ]
};

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen className='content'>
          <div className='title'>
              <IonText>
                  <h2>Gráficas</h2>
              </IonText>
          </div>
          <div style={{padding: '8%'}}>
              <div>
                  <IonText>
                      <h3>Oxigenación de la semana pasada</h3>
                  </IonText>
              </div>
              <div className={'chart'}>
                  <Line data={SO} options={{
                      responsive: true,
                      maintainAspectRatio: true,
                      legend: { display: false },
                      scales: {
                          xAxes: [{
                              gridLines: {
                                  display:false
                              }
                          }],
                          yAxes: [{
                              gridLines: {
                                  display:false
                              }
                          }]
                      }
                  }}   />
              </div>
              <div>
                  <IonText>
                      <h3>Frecuencia cardiaca de la semana pasada</h3>
                  </IonText>
              </div>
              <div className={'chart'}>
                  <Line data={HR} options={{
                      responsive: true,
                      maintainAspectRatio: true,
                      legend: { display: false },
                      scales: {
                          xAxes: [{
                              gridLines: {
                                  display:false
                              }
                          }],
                          yAxes: [{
                              gridLines: {
                                  display:false
                              }
                          }]
                      }
                  }}   />
              </div>
          </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
