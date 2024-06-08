import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as L from 'leaflet';
import 'leaflet.wms';
import 'leaflet-rastercoords';
import { layer } from 'leaflet.wms';
declare var $: any;
import  Swal  from "sweetalert2"
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
// map:any= L.Map;
recupclient:any =  [
  {
    "id": 1,
    "avatar": "10.png",
    "full_name": "BOLATY",
    "post": "Nuclear Power Engineer",
    "email": "kocrevy0@thetimes.co.uk",
    "city": "Krasnosilka",
    "start_date": "09/23/2021",
    "salary": "$23896.35",
    "age": "61",
    "experience": "1 Year",
    "status": "1"
  },
  {
    "id": 2,
    "avatar": "1.png",
    "full_name": "EULOGE",
    "post": "VP Quality Control",
    "email": "bcoulman1@yolasite.com",
    "city": "Hinigaran",
    "start_date": "05/20/2021",
    "salary": "$13633.69",
    "age": "63",
    "experience": "3 Years",
    "status": "2"
  }
]
recupCouche:any =[]
recupDonnee:any =[]
recupDonneeTab:any =[]

  constructor(private http: HttpClient) { }
  ShowLoader(){
    Swal.fire({
      allowOutsideClick: false
    })
    Swal.showLoading()
  }
  CloseLoader(){
    Swal.close()
  }
  style(feature:any) {
   var styleObjet ={
    
    };
    //@ts-ignore
    var nomCouche = feature.id.split('.')
    var couleur 
    switch (true) {
      
     case nomCouche[0] == 'AFFLEUREMENT_ROCHEUX_OCCUPATION_DU_SOL':
          styleObjet ={
            //@ts-ignore
            //fillColor: '#b0c4b1',
            fillColor: '#e77148',
            weight: 10,
            opacity: 0.1,
            color: '#ffbe0b',
            dashArray: '3',
            fillOpacity: 0,
            zIndex: '1',
            };
     break;
     case nomCouche[0] == 'VILLE_CHEF-LIEU_DE_DISTRICT_pg':
          styleObjet ={
            //@ts-ignore
            //fillColor: '#b0c4b1',
            fillColor: 'blue',
            weight: 10,
            opacity: 0.1,
            color: '#fb8500',
            dashArray: '3',
            fillOpacity: 0,
            zIndex: '1',
            };
     break;
     case nomCouche[0] == 'VILLE_CHEF-LIEU_DE_REGION_pg':
          styleObjet ={
            //@ts-ignore
            //fillColor: '#b0c4b1',
            fillColor: '#0d1321',
            weight: 10,
            opacity: 0.1,
            color: '#3a86ff',
            dashArray: '3',
            fillOpacity: 0,
            zIndex: '1',
            };
     break;
     case nomCouche[0] == 'VILLE_CHEF-LIEU_DE_SOUS_PREFECTURE_pg':
          styleObjet ={
            //@ts-ignore
            //fillColor: '#b0c4b1',
            fillColor: 'blue',
            weight: 10,
            opacity: 0.1,
            color: 'blue',
            dashArray: '3',
            fillOpacity: 0,
            zIndex: '1',
            };
     break;
      case nomCouche[0] == 'DISTRICT_pg':
        styleObjet ={
          //@ts-ignore
          //fillColor: '#b0c4b1',
          fillColor: '',
          weight: 2,
          opacity: 0.1,
          //color: '',
          dashArray: '3',
          fillOpacity: 0,
          zIndex: '1',
          };
         
        break;
        case nomCouche[0] == 'RESEAU_ROUTIER_PISTE_pg':
        styleObjet ={
          //@ts-ignore
          //fillColor: '#b0c4b1',
          fillColor: '',
          weight: 1,
          opacity: 0.1,
          //color: '',
          dashArray: '1',
          fillOpacity: 0
         
          };
        break;
        case nomCouche[0] == 'HYDROGRAPHIE_LIGNE_RIVIERE_MINEURE_pg':
        styleObjet ={
          //@ts-ignore
          //fillColor: '#b0c4b1',
          fillColor: '',
          weight: 1,
          opacity: 0.1,
          //color: '',
          dashArray: '1',
          fillOpacity: 0
         
          };
        break;
        case nomCouche[0] == 'VILLAGE_pg':
        /*styleObjet ={
          //@ts-ignore
          //fillColor: '#b0c4b1',
          fillColor: '#572a9e',
          weight: 5,
          opacity: 1,
          color: '#572a9e',
          dashArray: '1',
          fillOpacity: 0
         
          };*/

          styleObjet ={
            //@ts-ignore
            fillColor: '#572a9e',
            weight: 2,
            opacity: 1,
            radius: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
            zIndex: '6',
            };
        break;
      case nomCouche[0] == 'REGIONS_pg':
        styleObjet ={
          //@ts-ignore
          fillColor: '',
          weight: 3,
          opacity: 0.2,
          color: 'red',
          dashArray: '6',
          fillOpacity: 0,
          zIndex: '2',
          };
         /* if(feature.properties.REGION_N == 'GUEMON'){
            //@ts-ignore
            styleObjet.fillColor = '#06d6a0'
          }
          if(feature.properties.REGION_N == 'TONKPI'){
            //@ts-ignore
            styleObjet.fillColor = '#fb5607'
          }
          if(feature.properties.REGION_N == 'CAVALLY'){
            //@ts-ignore
            styleObjet.fillColor = '#023047'
          }*/
        break;
      case nomCouche[0] == 'DEPARTEMENTS_pg':
          var colorsByDepartment = {
          'BIANKOUMA': '#06d6a0',
          'DANANE': '#fb5607',
          'MAN': '#023047',
          'TAÏ': '#FF5733',
          'ZOUAN-HOUNIEN': '#3498DB',
          'DUEKOUE': '#8E44AD',
          'BANGOLO': '#D4E157',
          'KOUIBLY': '#F1C40F',
          'FACOBLY': '#E74C3C',
          'GUIGLO': '#E67E22',
          'TOULEPLEU': '#9B59B6'
          };
          styleObjet ={
            //@ts-ignore
            fillColor: '',
          weight: 3,
          opacity: 0.2,
          color: 'red',
          dashArray: '6',
          fillOpacity: 0,
          zIndex: '2',
            };
            
         break;
      case nomCouche[0] == 'SOUS_PREFECTURES_pg' || nomCouche[0] == 'POPULATION_SOUS-PREFECTURE_pg':
        var colorsBySubPrefecture = {
          'BIANKOUMA': '#06d6a0',
          'YORODOUGOU': '#fb5607',
          'SIPILOU': '#023047',
          'DALEU': '#FF5733',
          'SANTA': '#3498DB',
          'BLAPLEU': '#8E44AD',
          'MAN': '#D4E157',
          'FACOBLY': '#F1C40F',
          'NIDROU': '#E74C3C',
          'SEMIEN': '#E67E22',
          'KOUIBLY': '#9B59B6',
          'TOTRODROU': '#c93c20',
          'LOGOUALE': '#6ebe45',
          'ZEO': '#ff6700',
          //'DIEOUZON': '#aeaeae',
          'GUINGLO-TAHOUAKE': '#c2d0e6',
          'GOHOUO-ZAGNA': '#c24d00',
          'BANGOLO': '#29b7cb',
          'ZOU': '#f9d423',
          'YAPLEU': '#61ff73',
          'PODIAGOUINE': '#9e26cc',
          'MAHAPLEU': '#c4f7a1',
          'DANANE': '#ffb859',
          'KOUAN-HOULE': '#f81c23',
          'TEAPLEU': '#c9818a',
          'BANNEU': '#2e86de',
          'BIN-HOUYE': '#ffc02e',
          'BLOLEQUIN': '#31dd47',
          'DOKE': '#cc47b1',
          'TOULEPLEU': '#ffaec3',
          'TIOBLY': '#0077b6',
          'PEHE': '#82d173',
          'TINHOU': '#998c7a',
          'DIBOKE': '#24a19c',
          'ZEAGLO': '#d64d4d',
          'BEDY-GOAZON': '#108dc7',
          'GUIGLO': '#ffab00',
          'ZAGNE': '#95e53f',
          'TAI': '#ff0000',
          //'GBAPLEU': '#c2c2d0',
          'NIZAHON': '#e17f6a',
          'GUEZON': '#0055dd',
          'BAGOHOUO': '#9e00a6',
          'GUEHIEBLY': '#9e0059',
          'GBONNE': '#ffea00',
          'GOUINE': '#80bfff',
          'ZOUAN-HOUNIEN': '#ffcccb',
          'DUEKOUE': '#4dff4d',
          'DIEOUZON': '#ffb266',
          'GBAPLEU': '#8c8c8c',
          'SANGOUINE': '#cc80cc',
      };
      
          styleObjet ={
            //@ts-ignore
            fillColor: '',//colorsBySubPrefecture[feature.properties.S_PREFEC_N],
            weight: 1,
            opacity: 0.3,
            color: 'red',
            dashArray: '3',
            fillOpacity: 0,
            zIndex: '2',
            };
         break;
      case nomCouche[0] == 'CAMPEMENTS_pg':
        styleObjet ={
          //@ts-ignore
          fillColor: '#ffb703',
          weight: 2,
          opacity: 1,
          radius: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7,
          zIndex: '6',
          };
          if(feature.properties.REGION_NAM == 'CAVALLY'){
            //@ts-ignore
            styleObjet.color = '#e9c46a'
          }
          if(feature.properties.REGION_NAM == 'TONKPI'){
            //@ts-ignore
            styleObjet.color = '#f4a261'
          }
          if(feature.properties.REGION_NAM == 'GUEMON'){
            //@ts-ignore
            styleObjet.color = '#e76f51'
          }
        break;
      case nomCouche[0] == 'VILLES_ET_VILLAGES_pg':
        styleObjet ={
          //@ts-ignore
          fillColor: '',
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7,
          zIndex: '5',
          };
        break;
        case nomCouche[0] == 'HYDROGRAPHIE_LIGNE_pg':
          styleObjet ={
            //@ts-ignore
            fillColor: '',
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
            };
            if(feature.properties.TYPE_HYDRO == 'RIVIERE MINEURE'){
              //@ts-ignore
              styleObjet.color = 'red'
            }
            if(feature.properties.TYPE_HYDRO == 'RIVIERE MAJEURE'){
              //@ts-ignore
              styleObjet.color = 'red'
            }
          break;
          case nomCouche[0] == 'HYDROGRAPHIE_SURFACE_pg':
          styleObjet ={
            //@ts-ignore
            fillColor: '',
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
            };
          break;
          case nomCouche[0] == 'FORETS_CLASSEES_PARCS_NATIONAUX_ET_RESERVES_pg':
            styleObjet ={
              //@ts-ignore
              fillColor: '',
              weight: 2,
              opacity: 0.5,
              color: '',
              dashArray: '3',
              fillOpacity: 0.2,
              };
              if(feature.properties.STATUT == 'FORET CLASSEE'){
                //@ts-ignore
                styleObjet.fillColor = '#283618'
              }
              if(feature.properties.STATUT == 'PARC NATIONAL'){
                //@ts-ignore
                styleObjet.fillColor = '#606c38'
              }
              if(feature.properties.STATUT == 'RESERVE'){
                //@ts-ignore
                styleObjet.fillColor = '#fca311'
              }
            break;
          /*case nomCouche[0] == 'RESEAU_ROUTIER_pg':
            styleObjet ={
              //@ts-ignore
              fillColor: '',
              weight: 2,
              opacity: 0.5,
              color: 'white',
              dashArray: '3',
              fillOpacity: 0.6,
              };
            if(feature.properties.TYPE_ROUTE == 'PISTE'){
              styleObjet.color = '#669bbc'
            }
            if(feature.properties.TYPE_ROUTE == 'ROUTE BITUMEE'){
              styleObjet.color = '#fb5607'
              styleObjet.weight = 8
              styleObjet.opacity = 1
              styleObjet.fillOpacity = 0.8
            }
            if(feature.properties.TYPE_ROUTE == 'ROUTE NON BITUMEE'){
              styleObjet.color = '#780000'
              styleObjet.weight = 6
              styleObjet.opacity = 1
              styleObjet.fillOpacity = 0.8
            }
            
            break;*/
            case nomCouche[0] == 'INDICE_DE_PROTECTION_DE_LA_FAUNE_SAUVAGE_PAR_LES_AGENTS_FORESTIERS_pg':
            styleObjet ={
              //@ts-ignore
              fillColor: '',
              weight: 2,
              opacity: 1,
              color: '',
              dashArray: '3',
              fillOpacity: 0.7,
              };
              if(feature.properties.STATUT == 'ZONE RURALE'){
                //@ts-ignore
                styleObjet.fillColor = '#e9edc9'
              }
              if(feature.properties.STATUT == 'FORET CLASSEE'){
                //@ts-ignore
                styleObjet.fillColor = '#283618'
              }
              if(feature.properties.STATUT == 'PARC NATIONAL'){
                //@ts-ignore
                styleObjet.fillColor = '#606c38'
              }
              if(feature.properties.STATUT == 'RESERVE'){
                //@ts-ignore
                styleObjet.fillColor = '#fca311'
              }
            break;
            case nomCouche[0] == 'INDICE_DE_PROTECTION_DE_LA_FAUNE_SAUVAGE___INTERPELLETION_POUR_INFRACTION_pg':
              styleObjet ={
                //@ts-ignore
                fillColor: '',
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7,
                };
                if(feature.properties.STATUT == 'ZONE RURALE'){
                  //@ts-ignore
                  styleObjet.fillColor = '#d4a373'
                }
                if(feature.properties.STATUT == 'FORET CLASSEE'){
                  //@ts-ignore
                  styleObjet.fillColor = '#283618'
                }
                if(feature.properties.STATUT == 'PARC NATIONAL'){
                  //@ts-ignore
                  styleObjet.fillColor = '#606c38'
                }
                if(feature.properties.STATUT == 'RESERVE'){
                  //@ts-ignore
                  styleObjet.fillColor = '#fca311'
                }
              break;
              case nomCouche[0] == 'INDICE_INTRECTION_HOMME_-_FAUNE_SAUVAGE_COHABITATION_pg':
                styleObjet ={
                  //@ts-ignore
                  fillColor: '',
                  weight: 2,
                  opacity: 1,
                  color: 'white',
                  dashArray: '3',
                  fillOpacity: 0.7,
                  };
                  if(feature.properties.STATUT == 'ZONE RURALE'){
                    //@ts-ignore
                    styleObjet.fillColor = '#669bbc'
                  }
                  if(feature.properties.STATUT == 'FORET CLASSEE'){
                    //@ts-ignore
                    styleObjet.fillColor = '#283618'
                  }
                  if(feature.properties.STATUT == 'PARC NATIONAL'){
                    //@ts-ignore
                    styleObjet.fillColor = '#606c38'
                  }
                  if(feature.properties.STATUT == 'RESERVE'){
                    //@ts-ignore
                    styleObjet.fillColor = '#fca311'
                  }
            break;
            case nomCouche[0] == 'INDICE_INTRECTION_HOMME__FAUNE_SAUVAGE_COHABITATION_pg':
                styleObjet ={
                  //@ts-ignore
                  fillColor: '',
                  weight: 2,
                  opacity: 1,
                  color: 'white',
                  dashArray: '3',
                  fillOpacity: 0.7,
                  };
                  if(feature.properties.STATUT == 'ZONE RURALE'){
                    //@ts-ignore
                    styleObjet.fillColor = '#dad7cd'
                  }
                  if(feature.properties.STATUT == 'FORET CLASSEE'){
                    //@ts-ignore
                    styleObjet.fillColor = '#283618'
                  }
                  if(feature.properties.STATUT == 'PARC NATIONAL'){
                    //@ts-ignore
                    styleObjet.fillColor = '#606c38'
                  }
                  if(feature.properties.STATUT == 'RESERVE'){
                    //@ts-ignore
                    styleObjet.fillColor = '#fca311'
                  }
            break;
            case nomCouche[0] == 'INDICE_INTRECTION_HOMME_-_FAUNE_SAUVAGE_VENTE_ET_CONSOMMATION_pg':
              var colorsByDepartment = {
                'BIANKOUMA': '#06d6a0',
                'DANANE': '#fb5607',
                'MAN': '#023047',
                'TAÏ': '#FF5733',
                'ZOUAN-HOUNIEN': '#3498DB',
                'DUEKOUE': '#8E44AD',
                'BANGOLO': '#D4E157',
                'KOUIBLY': '#F1C40F',
                'FACOBLY': '#E74C3C',
                'GUIGLO': '#E67E22',
                'TOULEPLEU': '#9B59B6'
                };
                styleObjet ={
                  //@ts-ignore
                  fillColor: colorsByDepartment[feature.properties.DEPART_N],
                  weight: 2,
                  opacity: 0.7,
                  color: 'white',
                  dashArray: '3',
                  fillOpacity: 0.7,
                  zIndex: '3',
                  };
                  
               break;
            case nomCouche[0] == 'INDICE_DE_PRESENCE_DE_LA_FAUNE_SAUVAGE_pg':
              styleObjet ={
                //@ts-ignore
                fillColor: '',
                weight: 1,
                opacity: 0.8,
                color: '',
                dashArray: '1',
                fillOpacity: 0.7,
                };
                if(feature.properties.LEGENDE_2 == 'FAIBLE'){
                  //@ts-ignore
                  styleObjet.fillColor = '#f09acc'
                }
                if(feature.properties.LEGENDE_2 == 'FORT'){
                  //@ts-ignore
                  styleObjet.fillColor = '#500402'
                }
                if(feature.properties.LEGENDE_2 == 'MOYEN'){
                  //@ts-ignore
                  styleObjet.fillColor = '#d64040'
                }
                
            break;
            case nomCouche[0] == 'INDICE_DE_PRESENCE_DE_FAUNE_SAUVAGE_pg':
              styleObjet ={
                //@ts-ignore
                fillColor: '',
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7,
                };
                if(feature.properties.STATUT == 'ZONE RURALE'){
                  //@ts-ignore
                  styleObjet.fillColor = '#e9edc9'
                }
                if(feature.properties.STATUT == 'FORET CLASSEE'){
                  //@ts-ignore
                  styleObjet.fillColor = '#283618'
                }
                if(feature.properties.STATUT == 'PARC NATIONAL'){
                  //@ts-ignore
                  styleObjet.fillColor = '#606c38'
                }
                if(feature.properties.STATUT == 'RESERVE'){
                  //@ts-ignore
                  styleObjet.fillColor = '#fca311'
                }
            break;
            case nomCouche[0] == 'INDICE_DE_PROTECTION_DES_FC_ET_PN_PAR_NOMBRE_AGENTS_POUR_SURVEILLANCE_pg':
              styleObjet ={
                //@ts-ignore
                fillColor: '',
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7,
                };
                if(feature.properties.LEGENDE_2 == 'FAIBLE'){
                  //@ts-ignore
                  styleObjet.fillColor = '#e9edc9'
                }
                if(feature.properties.LEGENDE_2 == 'FORT'){
                  //@ts-ignore
                  styleObjet.fillColor = '#283618'
                }
                if(feature.properties.LEGENDE_2 == 'MOYEN'){
                  //@ts-ignore
                  styleObjet.fillColor = '#606c38'
                }
            break;
            case nomCouche[0] == 'INDICE_DE_PROTECTION_DES_FC_ET_PN_PAR_PATROUILLE_ANNUELLE_pg':
              styleObjet ={
                //@ts-ignore
                fillColor: '',
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7,
                };
                if(feature.properties.LEGENDE_2 == 'FAIBLE'){
                  //@ts-ignore
                  styleObjet.fillColor = '#e9edc9'
                }
                if(feature.properties.LEGENDE_2 == 'FORT'){
                  //@ts-ignore
                  styleObjet.fillColor = '#283618'
                }
                if(feature.properties.LEGENDE_2 == 'MOYEN'){
                  //@ts-ignore
                  styleObjet.fillColor = '#606c38'
                }
            break;
            case nomCouche[0] == 'INDICE_FINAL_DE_PROTECTION_DES_FC_ET_PN_pg':
              styleObjet ={
                //@ts-ignore
                fillColor: '',
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7,
                };
            break;
            case nomCouche[0] == 'INDICE_FINAL_DE_RISQUE_DE_ZOONOSE_DANS_LE_DISTRICT_DES_MONTAGNE_AVEC_ZONE_TAMPON_DE_5KM_pg':
              styleObjet ={
                //@ts-ignore
                fillColor: '',
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7,
                };
            break;
            case nomCouche[0] == 'INDICE_FINAL_DE_RISQUE_DE_ZOONOSE_DANS_LE_DISTRICT_DES_MONTAGNE_AVEC_ZONE_TAMPON_DE_10KM_pg' || nomCouche[0] == 'IINDICE_FINAL_INTERFACE_HOMME_FAUNE_SAUVAGE_DANS_LE_DISTRICT_DES_MONTAGNES_pg':
              styleObjet ={
                //@ts-ignore
                fillColor: '',
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7,
                };
                if(feature.properties.LEGENDE == 'FAIBLE' || feature.properties.LEGENDE ==  'ZONE RURALE FAIBLE'){
                  //@ts-ignore
                  styleObjet.fillColor = '#bc4749'
                }
                if(feature.properties.LEGENDE == 'FORT'){
                  //@ts-ignore
                  styleObjet.fillColor = '#780000'
                }
                if(feature.properties.LEGENDE == 'MOYEN'){
                  //@ts-ignore
                  styleObjet.fillColor = '#9e2a2b'
                }
            break;
            case nomCouche[0] == 'DENSITE_POPULATION_SOUS__PREFECTORALE_pg':
              styleObjet ={
                //@ts-ignore
                fillColor: '',
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7,
                };
                if(feature.properties.LEGENDE_2 == 'FAIBLE' ){
                  //@ts-ignore
                  styleObjet.fillColor = '#f28482'
                }
                if(feature.properties.LEGENDE_2 ==  'FAIBLE ZONE RURALE'){
                  //@ts-ignore
                  styleObjet.fillColor = '#eae2b7'
                }
                if(feature.properties.LEGENDE_2 == 'FORT'){
                  //@ts-ignore
                  styleObjet.fillColor = '#780000'
                }
                if(feature.properties.LEGENDE_2 == 'MOYEN'){
                  //@ts-ignore
                  styleObjet.fillColor = '#c1121f'
                }
            break;
            case nomCouche[0] == 'INDICE_INTERACTION_HOMME_FAUNE_4_(NIVEAU_INFILTRATION)_pg':
              styleObjet ={
                //@ts-ignore
                fillColor: '',
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7,
                };
                if(feature.properties.LEGENDE_2 == 'FAIBLE' ){
                  //@ts-ignore
                  styleObjet.fillColor = '#f28482'
                }
                if(feature.properties.LEGENDE_2 ==  'FAIBLE ZONE RURALE'){
                  //@ts-ignore
                  styleObjet.fillColor = '#eae2b7'
                }
                if(feature.properties.LEGENDE_2 == 'FORT'){
                  //@ts-ignore
                  styleObjet.fillColor = '#780000'
                }
                if(feature.properties.LEGENDE_2 == 'MOYEN'){
                  //@ts-ignore
                  styleObjet.fillColor = '#c1121f'
                }
            break;
            case nomCouche[0] == 'INDICE_INTERACTION_HOMME_FAUNE_ISSU_DE_VENTE_ET_CONSOMMATION_ANIMAUX_pg' || nomCouche[0] == 'INDICE_INTERACTION_HOMME_FAUNE_1_(VENTE_ET_CONSOMMATION_FAUNE_SAUVAGE)_pg':
              styleObjet ={
                //@ts-ignore
                fillColor: '',
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7,
                };
                if(feature.properties.LEGENDE == 'FAIBLE' ){
                  //@ts-ignore
                  styleObjet.fillColor = '#f28482'
                }
                if(feature.properties.LEGENDE ==  'FAIBLE ZONE RURALE'){
                  //@ts-ignore
                  styleObjet.fillColor = '#eae2b7'
                }
                if(feature.properties.LEGENDE == 'FORT'){
                  //@ts-ignore
                  styleObjet.fillColor = '#780000'
                }
                if(feature.properties.LEGENDE == 'MOYEN'){
                  //@ts-ignore
                  styleObjet.fillColor = '#c1121f'
                }
               /* if(feature.properties.LEGENDE == 'FAIBLE' || feature.properties.LEGENDE ==  'ZONE RURALE FAIBLE'){
                  //@ts-ignore
                  styleObjet.fillColor = '#bc4749'
                }
                if(feature.properties.LEGENDE == 'FORT'){
                  //@ts-ignore
                  styleObjet.fillColor = '#780000'
                }
                if(feature.properties.LEGENDE == 'MOYEN'){
                  //@ts-ignore
                  styleObjet.fillColor = '#9e2a2b'
                }*/
            break;
            case nomCouche[0] == 'INDICE_INTERACTION_HOMME_FAUNE_ISSU_DU_NIVEAU_INFILTRATION_pg' || nomCouche[0] == 'INDICE_INTERACTION_HOMME_FAUNE_5_(DENSITE_POPULATION_SOUS__PREFECTORALE_RAYON_DE_5_KM_AUTOUR_DES_FORETS_CLASSEES_ET_PARCS)_pg' :
              styleObjet ={
                //@ts-ignore
                fillColor: '',
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7,
                };

                if(nomCouche[0] == 'RISQUE_INTAXICATION_PAR_INTRANT_AGRICOLE_pggg'){
                  //
                  if(feature.properties.RISQ_INTOX == 'FAIBLE' ){
                    //@ts-ignore
                    styleObjet.fillColor = '#f28482'
                  }
                  if(feature.properties.LEGENDE ==  'ZONE RURALE FAIBLE'){
                    //@ts-ignore
                    styleObjet.fillColor = '#eae2b7'
                  }
                  if(feature.properties.RISQ_INTOX == 'FORT'){
                    //@ts-ignore
                    styleObjet.fillColor = '#780000'
                  }
                  if(feature.properties.RISQ_INTOX == 'MOYEN'){
                    //@ts-ignore
                    styleObjet.fillColor = '#c1121f'
                  }
                  break;
                }else{
                  if(feature.properties.LEGENDE == 'FAIBLE'){
                    //@ts-ignore
                    styleObjet.fillColor = '#f28482'
                  }
                  if(feature.properties.LEGENDE ==  'ZONE RURALE FAIBLE'){
                    //@ts-ignore
                    styleObjet.fillColor = '#eae2b7'
                  }
                  if(feature.properties.LEGENDE == 'FORT'){
                    //@ts-ignore
                    styleObjet.fillColor = '#780000'
                  }
                  if(feature.properties.LEGENDE == 'MOYEN'){
                    //@ts-ignore
                    styleObjet.fillColor = '#c1121f'
                  }
                  break;
                }
            case nomCouche[0] == 'RISQUE_INTAXICATION_PAR_INTRANT_AGRICOLE_pg':
                  styleObjet ={
                    //@ts-ignore
                    fillColor: '',
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7,
                    };
    
                  
                      if(feature.properties.RISQ_INTOX == 'FAIBLE'){
                        //@ts-ignore
                        styleObjet.fillColor = '#bc4749'
                      }
                      if(feature.properties.RISQ_INTOX == 'FORT'){
                        //@ts-ignore
                        styleObjet.fillColor = '#780000'
                      }
                      if(feature.properties.RISQ_INTOX == 'MOYEN'){
                        //@ts-ignore
                        styleObjet.fillColor = '#9e2a2b'
                      }
                  break;
           
            case nomCouche[0] == 'INDICE_PRESSION_ANTHROPIQUE_CONCENTRATION_LOCALITE_RAYON_DE_5_KM_AUTOUR_DES_FC_ET_PN_pg' || nomCouche[0] == 'INDICE_INTERACTION_HOMME_FAUNE_3_(CONCENTRATION_LOCALITE_RAYON_DE_5_KM_AUTOUR_DES_FORETS CLASSEES_ET_PARCS)_pg':
              styleObjet ={
                //@ts-ignore
                fillColor: '',
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7,
                };
               if(feature.properties.LEGENDE == 'FAIBLE' ){
                  //@ts-ignore
                  styleObjet.fillColor = '#f28482'
                }
                if(feature.properties.LEGENDE ==  'ZONE RURALE FAIBLE'){
                  //@ts-ignore
                  styleObjet.fillColor = '#eae2b7'
                }
                if(feature.properties.LEGENDE == 'FORT'){
                  //@ts-ignore
                  styleObjet.fillColor = '#780000'
                }
                if(feature.properties.LEGENDE == 'MOYEN'){
                  //@ts-ignore
                  styleObjet.fillColor = '#c1121f'
                }
            break;
            
            case nomCouche[0] == 'INDICE_PRESSION_ANTHROPIQUE_CONCENTRATION_LOCALITE_RAYON_DE_10_KM_AUTOUR_DES_FC_ET_PN_pg':
              styleObjet ={
                //@ts-ignore
                fillColor: '',
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7,
                };
                if(feature.properties.LEGENDE == '1'){
                  //@ts-ignore
                  styleObjet.fillColor = '#e9edc9'
                }
                if(feature.properties.LEGENDE == '3'){
                  //@ts-ignore
                  styleObjet.fillColor = '#283618'
                }
                if(feature.properties.LEGENDE == '2'){
                  //@ts-ignore
                  styleObjet.fillColor = '#606c38'
                }
            break;
            case nomCouche[0] == 'INDICE_PRESSION_ANTHROPIQUE_LONGUEUR_ROUTE_RAYON_DE_5_KM_AUTOUR_DES_FC_ET_PN_pg' || nomCouche[0] == 'INDICE_INTERACTION_HOMME_FAUNE_2_(LONGUEUR_ROUTE_RAYON_DE_5_KM_AUTOUR_DES_FORETS CLASSEES_ET_PARCS)_pg' :
              styleObjet ={
                //@ts-ignore
                fillColor: '',
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7,
                };
                if(feature.properties.LEGENDE == 'FAIBLE' ){
                  //@ts-ignore
                  styleObjet.fillColor = '#f28482'
                }
                if(feature.properties.LEGENDE ==  'ZONE RURALE FAIBLE'){
                  //@ts-ignore
                  styleObjet.fillColor = '#eae2b7'
                }
                if(feature.properties.LEGENDE == 'FORT'){
                  //@ts-ignore
                  styleObjet.fillColor = '#780000'
                }
                if(feature.properties.LEGENDE == 'MOYEN'){
                  //@ts-ignore
                  styleObjet.fillColor = '#c1121f'
                }
            break;
            case nomCouche[0] == 'INDICE_PRESSION_ANTHROPIQUE_LONGUEUR_ROUTE_RAYON_DE_10_KM_AUTOUR_DES_FC_ET_PN_pg':
              styleObjet ={
                //@ts-ignore
                fillColor: '',
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7,
                };
                if(feature.properties.LEGENDE == '1'){
                  //@ts-ignore
                  styleObjet.fillColor = '#e9edc9'
                }
                if(feature.properties.LEGENDE == '3'){
                  //@ts-ignore
                  styleObjet.fillColor = '#283618'
                }
                if(feature.properties.LEGENDE == '2'){
                  //@ts-ignore
                  styleObjet.fillColor = '#606c38'
                }
            break;
            case nomCouche[0] == 'CARTE_ALEA_INTERACTION_HOMME_FAUNE_SAUVAGE_pg':
              styleObjet ={
                //@ts-ignore
                fillColor: '',
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7,
                };
                if(feature.properties.LEGENDE == 'FAIBLE'){
                  //@ts-ignore
                  styleObjet.fillColor = '#e5989b'
                }
                if(feature.properties.LEGENDE == 'FORT'){
                  //@ts-ignore
                  styleObjet.fillColor = '#283618'
                }
                if(feature.properties.LEGENDE == 'MOYEN'){
                  //@ts-ignore
                  styleObjet.fillColor = '#606c38'
                }
              break;
            case nomCouche[0] == 'CARTE_ATTENUATION_DU_RISQUE_ZOONOTIQUE_pg':
                styleObjet ={
                  //@ts-ignore
                  fillColor: '',
                  weight: 2,
                  opacity: 1,
                  color: 'white',
                  dashArray: '3',
                  fillOpacity: 0.7,
                  };
              break;
              case nomCouche[0] == 'CARTE_DU_RISQUE_ZOONOTIQUE_pg':
                styleObjet ={
                  //@ts-ignore
                  fillColor: '',
                  weight: 2,
                  opacity: 1,
                  color: 'white',
                  dashArray: '3',
                  fillOpacity: 0.7,
                  };
              break;  
              case nomCouche[0] == 'CONCENTRATION_FAUNE_SAUVAGE_pg':
                styleObjet ={
                  //@ts-ignore
                  fillColor: '',
                  weight: 2,
                  opacity: 1,
                  color: 'white',
                  dashArray: '3',
                  fillOpacity: 0.7,
                  };
                  if(feature.properties.CONCENTRAT == '0-25%'){
                    //@ts-ignore
                    styleObjet.fillColor = '#bc4749'
                  }
                  if(feature.properties.CONCENTRAT == '0%'){
                    //@ts-ignore
                    styleObjet.fillColor = '#bc4749'
                  }
                  if(feature.properties.CONCENTRAT == '75-100%'){
                    //@ts-ignore
                    styleObjet.fillColor = '#780000'
                  }
                  if(feature.properties.CONCENTRAT == '50-75%'){
                    //@ts-ignore
                    styleObjet.fillColor = '#9e2a2b'
                  }
                 
              break;  
              case nomCouche[0] == 'CARTE_ENJEU_INDICE_PRESENCE_DE_FAUNE_SAUVAGE_pg':
                styleObjet ={
                  //@ts-ignore
                  fillColor: '',
                  weight: 2,
                  opacity: 1,
                  color: 'white',
                  dashArray: '3',
                  fillOpacity: 0.7,
                  };
                  if(feature.properties.LEGENDE == '1'){
                    //@ts-ignore
                    styleObjet.fillColor = '#e9edc9'
                  }
                  if(feature.properties.LEGENDE == '3'){
                    //@ts-ignore
                    styleObjet.fillColor = '#283618'
                  }
                  if(feature.properties.LEGENDE == '2'){
                    //@ts-ignore
                    styleObjet.fillColor = '#606c38'
                  }
              break;  
          default:
            couleur = '';
            break;
        }
        
        return styleObjet;
    }
  getColor(d:any) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}
//@ts-ignore
  afficherInfosSurClic(e) {
    var properties = e.target.feature.properties;
   // Affichez le contenu de properties dans un toast
   // Créez une liste HTML dynamique à partir des propriétés
    let propertiesList = '<ul>';
    for (const key in properties) {
      if (properties.hasOwnProperty(key)) {
        propertiesList += `<li>${key}: ${properties[key]}</li>`;
      }
    }
    propertiesList += '</ul>';

    // Affichez la liste dans un toast
    //@ts-ignore
    toastr.success(propertiesList, 'Détails des propriétés');
   //@ts-ignore
   // toastr.info('Contenu des propriétés : ' + JSON.stringify(properties), 'Succès');
   }
   //@ts-ignore
   highlightFeature(e) {
    var layer = e.target;
    var lib = e.target.feature.id.split('.')

    if(lib[0] == 'VILLE_CHEF-LIEU_DE_DEPARTEMENT_pg' ||
      lib[0] == 'VILLE_CHEF-LIEU_DE_DISTRICT_pg' ||
      lib[0] == 'VILLE_CHEF-LIEU_DE_REGION_pg' ||
      lib[0] == 'VILLE_CHEF-LIEU_DE_SOUS_PREFECTURE_pg' ||
      lib[0] == 'VILLES_ET_VILLAGES_pg' ||
      lib[0] == 'CAMPEMENTS_pg' ||
      lib[0] == 'VILLAGE_pg'){
        layer.setStyle({
          weight: 5,
          color: e.layer.options.color,
          fillColor: e.layer.options.color,
          dashArray: '',
          fillOpacity: 0.7
        });
      }else if(lib[0] == 'DISTRICT_pg'){

      }
      else{
        layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
        });
      }

    

    layer.bringToFront();
   }
   //@ts-ignore
   resetHighlight(e) {
    e.resetStyle(e.target);
    
   
   }
   generateUniqueParameter() {
    return 'nocache=' + Math.random();
  }
  CarteMap(){

    //initialisation de la carte
    var map = L.map('map', {
      center: [7.4981, -7.578],
      zoom: 8
    });

   //gestion du rechargement de la carte
   if (!map) {
       
     map = L.map('map').fitWorld();;
   }
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    
     attribution: '© OpenStreetMap'
   }).addTo(map);
    //initialisation des models de cartes

   var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
    });

    var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'});

    var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

   
    // chargement de nos service geoserver wms
    var wmsLayer = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
      layers: 'dbHydrographie:CAMPEMENTS_DISTRICT_DE__MONTAGNES_pg',
      //styles?: string | undefined;
      format: 'image/png',
      transparent: true,
     
     })
     
   var CAMPEMENTS_DISTRICT_DE__MONTAGNES_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographie:CAMPEMENTS_DISTRICT_DE__MONTAGNES_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   })

   var VILLAGE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:VILLAGE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
    opacity: 0.4 // Réglez l'opacité à 70%
   }).bringToFront()

   var VILLE_CHEF_LIEU_DE_DEPARTEMENT_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNv:VILLE_CHEF-LIEU_DE_DEPARTEMENT_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
   }).bringToFront()

   var VILLE_CHEFLIEU_DE_DISTRICT_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:VILLE_CHEF-LIEU_DE_DISTRICT_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
   }).bringToFront()

   var VILLE_CHEFLIEU_DE_REGION_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:VILLE_CHEF-LIEU_DE_REGION_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
   }).bringToFront()

   
   var VILLE_CHEFLIEU_DE_SOUS_PREFECTURE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:VILLE_CHEF-LIEU_DE_SOUS_PREFECTURE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
   }).bringToFront()

   var CAMPEMENTS_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographie:CAMPEMENTS_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
   })
   CAMPEMENTS_pg.bringToFront()

   var DEPARTEMENTS_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNv:DEPARTEMENTS_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
   })

   //DEPARTEMENTS_pg.bringToFront()

   var DISTRICT_DE__MONTAGNES_pg= new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographie:DISTRICT_DE__MONTAGNES_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   })

   var DISTRICT_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographie:DISTRICT_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
    //opacity:0.1
   })
  // DISTRICT_pg.bringToBack()

   var FORETS_CLASSEES_PARCS_NATIONAUX_ET_RESERVES_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographie:FORETS_CLASSEES_PARCS_NATIONAUX_ET_RESERVES_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   })

   FORETS_CLASSEES_PARCS_NATIONAUX_ET_RESERVES_pg.bringToFront()

   var HYDROGRAPHIE_DISTRICT_DE__MONTAGNES_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographie:HYDROGRAPHIE_DISTRICT_DE__MONTAGNES_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   })

   var HYDROGRAPHIE_LIGNE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographie:HYDROGRAPHIE_LIGNE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   })

   HYDROGRAPHIE_LIGNE_pg.bringToFront()

   var HYDROGRAPHIE_SURFACE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographie:HYDROGRAPHIE_SURFACE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   })

   HYDROGRAPHIE_SURFACE_pg.bringToFront()

   

   var REGIONS_DISTRICT_DE__MONTAGNES_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographie:REGIONS_DISTRICT_DE__MONTAGNES_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   })

   var REGIONS_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographie:REGIONS_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   })//.bringToFront()

   var RESEAU_ROUTIER_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographie:RESEAU_ROUTIER_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()

   /*var SOUS_PREFECTURES_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNv:SOUS_PREFECTURES_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
    opacity: 0.2 // Réglez l'opacité à 70%
   }).bringToFront()*/


   var SOUS_PREFECTURES_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieFin:SOUS_PREFECTURES_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
    opacity: 0.2 // Réglez l'opacité à 70%
   }).bringToFront()

   var VILLES_ET_VILLAGES_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographie:VILLES_ET_VILLAGES_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()

   var VILLES_VILLAGES_DISTRICT_DE__MONTAGNES_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographie:VILLES_VILLAGES_DISTRICT_DE__MONTAGNES_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   })

   var 	INDICE_DE_PROTECTION_DE_LA_FAUNE_SAUVAGE_PAR_LES_AGENTS_FORESTIERS_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographie:INDICE_DE_PROTECTION_DE_LA_FAUNE_SAUVAGE_PAR_LES_AGENTS_FORESTIERS_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
    opacity: 0.5 // Réglez l'opacité à 70%
   }).bringToFront()

   var INDICE_DE_PROTECTION_DE_LA_FAUNE_SAUVAGE___INTERPELLETION_POUR_INFRACTION_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographie:INDICE_DE_PROTECTION_DE_LA_FAUNE_SAUVAGE___INTERPELLETION_POUR_INFRACTION_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()

   var INDICE_INTRECTION_HOMME__FAUNE_SAUVAGE_COHABITATION_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographie:INDICE_INTRECTION_HOMME_-_FAUNE_SAUVAGE_COHABITATION_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()

   var 	INDICE_INTRECTION_HOMME__FAUNE_SAUVAGE_VENTE_ET_CONSOMMATION_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: '	dbHydrographie:INDICE_INTRECTION_HOMME_-_FAUNE_SAUVAGE_VENTE_ET_CONSOMMATION_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()

   var INDICE_DE_PRESENCE_DE_FAUNE_SAUVAGE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographie:INDICE_DE_PRESENCE_DE_FAUNE_SAUVAGE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()

   var INDICE_DE_PRESENCE_DE_LA_FAUNE_SAUVAGE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNv:INDICE_DE_PRESENCE_DE_LA_FAUNE_SAUVAGE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   })

   var INDICE_DE_PROTECTION_DES_FC_ET_PN_PAR_NOMBRE_AGENTS_POUR_SURVEILLANCE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNv:INDICE_DE_PROTECTION_DES_FC_ET_PN_PAR_NOMBRE_AGENTS_POUR_SURVEILLANCE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()

   var INDICE_DE_PROTECTION_DES_FC_ET_PN_PAR_PATROUILLE_ANNUELLE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNv:INDICE_DE_PROTECTION_DES_FC_ET_PN_PAR_PATROUILLE_ANNUELLE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()

   var INDICE_FINAL_DE_PROTECTION_DES_FC_ET_PN_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNv:INDICE_FINAL_DE_PROTECTION_DES_FC_ET_PN_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()

   var INDICE_POTENTIEL_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNv:INDICE_POTENTIEL_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()


   var INDICE_FINAL_DE_RISQUE_DE_ZOONOSE_DANS_LE_DISTRICT_DES_MONTAGNE_AVEC_ZONE_TAMPON_DE_5KM_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNv:INDICE_FINAL_DE_RISQUE_DE_ZOONOSE_DANS_LE_DISTRICT_DES_MONTAGNE_AVEC_ZONE_TAMPON_DE_5KM_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()
   var INDICE_FINAL_DE_RISQUE_DE_ZOONOSE_DANS_LE_DISTRICT_DES_MONTAGNE_AVEC_ZONE_TAMPON_DE_10KM_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNv:INDICE_FINAL_DE_RISQUE_DE_ZOONOSE_DANS_LE_DISTRICT_DES_MONTAGNE_AVEC_ZONE_TAMPON_DE_10KM_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()
   var INDICE_INTERACTION_HOMME_FAUNE_ISSU_DE_VENTE_ET_CONSOMMATION_ANIMAUX_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNv:INDICE_INTERACTION_HOMME_FAUNE_ISSU_DE_VENTE_ET_CONSOMMATION_ANIMAUX_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()

   var INDICE_INTERACTION_HOMME_FAUNE_ISSU_DU_NIVEAU_INFILTRATION_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNv:INDICE_INTERACTION_HOMME_FAUNE_ISSU_DU_NIVEAU_INFILTRATION_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()

   var INDICE_PRESSION_ANTHROPIQUE_CONCENTRATION_LOCALITE_RAYON_DE_5_KM_AUTOUR_DES_FC_ET_PN_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNv:INDICE_PRESSION_ANTHROPIQUE_CONCENTRATION_LOCALITE_RAYON_DE_5_KM_AUTOUR_DES_FC_ET_PN_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()

   var INDICE_PRESSION_ANTHROPIQUE_CONCENTRATION_LOCALITE_RAYON_DE_10_KM_AUTOUR_DES_FC_ET_PN_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNv:INDICE_PRESSION_ANTHROPIQUE_CONCENTRATION_LOCALITE_RAYON_DE_10_KM_AUTOUR_DES_FC_ET_PN_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()

   var INDICE_PRESSION_ANTHROPIQUE_LONGUEUR_ROUTE_RAYON_DE_5_KM_AUTOUR_DES_FC_ET_PN_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNv:INDICE_PRESSION_ANTHROPIQUE_LONGUEUR_ROUTE_RAYON_DE_5_KM_AUTOUR_DES_FC_ET_PN_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()

   var INDICE_PRESSION_ANTHROPIQUE_LONGUEUR_ROUTE_RAYON_DE_10_KM_AUTOUR_DES_FC_ET_PN_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNv:INDICE_PRESSION_ANTHROPIQUE_LONGUEUR_ROUTE_RAYON_DE_10_KM_AUTOUR_DES_FC_ET_PN_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()


   

   //


   var CARTE_ALEA_INTERACTION_HOMME_FAUNE_SAUVAGE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographie:CARTE_ALEA_INTERACTION_HOMME_FAUNE_SAUVAGE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   }).bringToFront()

   var CARTE_ATTENUATION_DU_RISQUE_ZOONOTIQUE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographie:CARTE_ATTENUATION_DU_RISQUE_ZOONOTIQUE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
   }).bringToFront()

   var CARTE_DU_RISQUE_ZOONOTIQUE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographie:CARTE_DU_RISQUE_ZOONOTIQUE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
   }).bringToFront()

   var CARTE_ENJEU_INDICE_PRESENCE_DE_FAUNE_SAUVAGE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographie:CARTE_ENJEU_INDICE_PRESENCE_DE_FAUNE_SAUVAGE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()

   var wmsLayer1 = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'topp:states',
    format: 'image/png',
    transparent: true,
   
   })

   var wmsLayer2 = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'topp:tasmania_state_boundaries',
    format: 'image/png',
    transparent: true,
   
   })

   var HYDROGRAPHIE_LIGNE_FLEUVE_CAVALLY_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:HYDROGRAPHIE_LIGNE_FLEUVE_CAVALLY_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   }).bringToFront()
   
   var HYDROGRAPHIE_LIGNE_RIVIERE_MAJEURE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:HYDROGRAPHIE_LIGNE_RIVIERE_MAJEURE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   }).bringToFront()
  
   var HYDROGRAPHIE_LIGNE_RIVIERE_MINEURE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:HYDROGRAPHIE_LIGNE_RIVIERE_MINEURE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   }).bringToFront()

   var RESEAU_ROUTIER_PISTE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:RESEAU_ROUTIER_PISTE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   }).bringToFront()
   
   var RESEAU_ROUTIER_ROUTE_BITUMEE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:RESEAU_ROUTIER_ROUTE_BITUMEE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   }).bringToFront()
   
   var RESEAU_ROUTIER_ROUTE_NON_BITUMEE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:RESEAU_ROUTIER_ROUTE_NON_BITUMEE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   }).bringToFront()
  
   var CONCENTRATION_FAUNE_SAUVAGE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:CONCENTRATION_FAUNE_SAUVAGE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
   }).bringToFront()

   var COURBES_DE_NIVEAUX_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:COURBES_DE_NIVEAUX_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
   }).bringToFront()


   /*var COURBES_RASTER = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbRaster:SR_50M',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
   }).addTo(map);*/
   //initialisation des groupes

   var OCCUPATION_DU_SOL_pg = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'dbRaster:OCCUPATION_DU_SOL',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   })

   var AFFLEUREMENT_ROCHEUX_OCCUPATION_DU_SOL_pg = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'dbRaster:AFFLEUREMENT_ROCHEUX_OCCUPATION_DU_SOLNV',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()

   var EXPLOITATION_AGRICOLE_OCCUPATION_DU_SOL_pg = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'dbRaster:EXPLOITATION_AGRICOLE_OCCUPATION_DU_SOLNV',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()

   var FORET_OCCUPATION_DU_SOL_pg = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'dbRaster:FORET_OCCUPATION_DU_SOLNV',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()


   var HABITAT_ET_SOL_NU_OCCUPATION_DU_SOL_pg = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'dbRaster:HABITAT_ET_SOL_NU_OCCUPATION_DU_SOLNV',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()



   var INDICE_FAIBLE_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE_pg = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'dbRaster:INDICE_FAIBLE_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLENV',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()


   var INDICE_FORT_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE_pg = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'dbRaster:INDICE_FORT_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLENV',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()

   var INDICE_MOYEN_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE_pg = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'dbRaster:INDICE_MOYEN_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLENV',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()

   var MARECAGE_OCCUPATION_DU_SOL_pg = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'dbRaster:MARECAGE_OCCUPATION_DU_SOLNV',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()

   var PLAN_DEAU_OCCUPATION_DU_SOL_pg = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: "dbRaster:PLAN_D'EAU_OCCUPATION_DU_SOLNV",
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()

   var REBOISEMENT_OCCUPATION_DU_SOL_pg = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'dbRaster:REBOISEMENT_OCCUPATION_DU_SOLNV',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()
   
   var SAVANE_ET_FORMATION_ARBUSTIVE_OCCUPATION_DU_SOL_pg = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'dbRaster:SAVANE_ET_FORMATION_ARBUSTIVE_OCCUPATION_DU_SOLNV',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()
   
   
   

 /*  const rc = new (L as any).RasterCoords(map, [487, 768]);

   const bounds = rc.unproject([0, 0]);
  const boundsMax = rc.unproject([487, 768]);

  const image = L.imageOverlay('../../assets/img/front-pages/branding/dbRaster-OCCUPATION_DU_SOL.png', bounds).addTo(map);

  map.setMaxBounds(new L.LatLngBounds(bounds, boundsMax));
  map.fitBounds(new L.LatLngBounds(bounds, boundsMax));*/

   var INDICE_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbRaster:INDICE_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
   }).bringToFront()

   var ILOTS_FORETS_HORS_FORETS_CLASSEES_ET_PARCS = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbRaster:ILOTS_FORETS_HORS_FORETS_CLASSEES_ET_PARCS',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
   }).bringToFront()

   var INDICE_POTENTIEL_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'dbRaster:INDICE_POTENTIEL_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE (1)',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   }).bringToFront()


   var POPULATION_SOUSPREFECTURE_pg = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieFin:POPULATION_SOUS-PREFECTURE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   }).bringToFront()

   var DENSITE_POPULATION_SOUS__PREFECTORALE_pg = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieFin:DENSITE_POPULATION_SOUS__PREFECTORALE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   }).bringToFront()

   var ILOTS_FORETS_HORS_FORETS_CLASSEES_ET_PARCS_pg = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieFin:ILOTS_FORETS_HORS_FORETS_CLASSEES_ET_PARCS_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   }).bringToFront()


   var IINDICE_FINAL_INTERFACE_HOMME_FAUNE_SAUVAGE_DANS_LE_DISTRICT_DES_MONTAGNES_pg = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieFin:IINDICE_FINAL_INTERFACE_HOMME_FAUNE_SAUVAGE_DANS_LE_DISTRICT_DES_MONTAGNES_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   }).bringToFront()

   var INDICE_INTERACTION_HOMME_FAUNE_1_pg = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieFin:INDICE_INTERACTION_HOMME_FAUNE_1_(VENTE_ET_CONSOMMATION_FAUNE_SAUVAGE)_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   }).bringToFront()

   var INDICE_INTERACTION_HOMME_FAUNE_2_pg = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieFin:INDICE_INTERACTION_HOMME_FAUNE_2_(LONGUEUR_ROUTE_RAYON_DE_5_KM_AUTOUR_DES_FORETS CLASSEES_ET_PARCS)_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   }).bringToFront()

   var INDICE_INTERACTION_HOMME_FAUNE_3_pg = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieFin:INDICE_INTERACTION_HOMME_FAUNE_3_(CONCENTRATION_LOCALITE_RAYON_DE_5_KM_AUTOUR_DES_FORETS CLASSEES_ET_PARCS)_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   }).bringToFront()

   var INDICE_INTERACTION_HOMME_FAUNE_4_pg = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieFin:INDICE_INTERACTION_HOMME_FAUNE_4_(NIVEAU_INFILTRATION)_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   }).bringToFront()

   var INDICE_INTERACTION_HOMME_FAUNE_5_pg = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieFin:INDICE_INTERACTION_HOMME_FAUNE_5_(DENSITE_POPULATION_SOUS__PREFECTORALE_RAYON_DE_5_KM_AUTOUR_DES_FORETS_CLASSEES_ET_PARCS)_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   }).bringToFront()

   var RISQUE_INTAXICATION_PAR_INTRANT_AGRICOLE_pg = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieFin:RISQUE_INTAXICATION_PAR_INTRANT_AGRICOLE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   }).bringToFront()



   var groupeCartes = L.layerGroup([osm,DISTRICT_pg, DEPARTEMENTS_pg, FORETS_CLASSEES_PARCS_NATIONAUX_ET_RESERVES_pg,ILOTS_FORETS_HORS_FORETS_CLASSEES_ET_PARCS,HYDROGRAPHIE_LIGNE_FLEUVE_CAVALLY_pg,HYDROGRAPHIE_LIGNE_RIVIERE_MAJEURE_pg
    ,HYDROGRAPHIE_SURFACE_pg]);

   //initialisation des modeles de vue
   var baseMaps = {
    "Open Street Map": osm,
    "Open Street Map OT": osmHOT,
    "Open Topo Map":OpenTopoMap
   };

    //preparation des couches

   var overlayMaps = {
   // 'COURBES RASTER':COURBES_RASTER, 
    'VILLE CHEF LIEU DE DISTRICT':VILLE_CHEFLIEU_DE_DISTRICT_pg,
    'VILLE_CHEF LIEU DE DEPARTEMENT':VILLE_CHEF_LIEU_DE_DEPARTEMENT_pg,
    'VILLE_CHEF LIEU DE REGION':VILLE_CHEFLIEU_DE_REGION_pg,
    'VILLE_CHEF LIEU DE SOUS PREFECTURE':VILLE_CHEFLIEU_DE_SOUS_PREFECTURE_pg,
    'VILLAGE':VILLAGE_pg,
    'CAMPEMENTS':CAMPEMENTS_pg,
    
    //'CAMPEMENTS DISTRICT DE MONTAGNES': CAMPEMENTS_DISTRICT_DE__MONTAGNES_pg,
    //'VILLES ET VILLAGES':VILLES_ET_VILLAGES_pg,
   // 'VILLES VILLAGES DISTRICT DE MONTAGNES':VILLES_VILLAGES_DISTRICT_DE__MONTAGNES_pg,
   // 'DISTRICT DE MONTAGNES':DISTRICT_DE__MONTAGNES_pg,
    'DISTRICT':DISTRICT_pg,
    'REGIONS':REGIONS_pg,
    //'REGIONS DISTRICT DE MONTAGNES':REGIONS_DISTRICT_DE__MONTAGNES_pg,
    'DEPARTEMENTS':DEPARTEMENTS_pg,
    'SOUS PREFECTURES':SOUS_PREFECTURES_pg,
    'ILOTS FORETS HORS FORETS CLASSEES ET PARCS':ILOTS_FORETS_HORS_FORETS_CLASSEES_ET_PARCS,
    
    'POPULATION SOUSPREFECTURE':POPULATION_SOUSPREFECTURE_pg,
    'DENSITE POPULATION SOUS PREFECTORALE': DENSITE_POPULATION_SOUS__PREFECTORALE_pg,
    
   // 'HYDROGRAPHIE LIGNE':HYDROGRAPHIE_LIGNE_pg,
   // 'HYDROGRAPHIE SURFACE':HYDROGRAPHIE_SURFACE_pg,
    'FORETS CLASSEES PARCS NATIONAUX ET RESERVES':FORETS_CLASSEES_PARCS_NATIONAUX_ET_RESERVES_pg,
    'AFFLEUREMENT ROCHEUX OCCUPATION DU SOL':AFFLEUREMENT_ROCHEUX_OCCUPATION_DU_SOL_pg,
    'EXPLOITATION AGRICOLE OCCUPATION DU SOL':EXPLOITATION_AGRICOLE_OCCUPATION_DU_SOL_pg,
    'FORET OCCUPATION DU SOL':FORET_OCCUPATION_DU_SOL_pg,
    'HABITAT ET SOL NU OCCUPATION DU SOL':HABITAT_ET_SOL_NU_OCCUPATION_DU_SOL_pg,
    'MARECAGE OCCUPATION DU SOL':MARECAGE_OCCUPATION_DU_SOL_pg,
    'PLAN D EAU OCCUPATION DU SOL':PLAN_DEAU_OCCUPATION_DU_SOL_pg,
    'REBOISEMENT OCCUPATION DU SOL':REBOISEMENT_OCCUPATION_DU_SOL_pg,
    'SAVANE ET FORMATION ARBUSTIVE OCCUPATION DU SOL':SAVANE_ET_FORMATION_ARBUSTIVE_OCCUPATION_DU_SOL_pg,
   // 'OCCUPATION DU SOL':OCCUPATION_DU_SOL_pg,
    //'RESEAU ROUTIER':RESEAU_ROUTIER_pg,

        //'HYDROGRAPHIE DISTRICT DE MONTAGNES':HYDROGRAPHIE_DISTRICT_DE__MONTAGNES_pg,
        'HYDROGRAPHIE LIGNE FLEUVE CAVALLY':HYDROGRAPHIE_LIGNE_FLEUVE_CAVALLY_pg,
        'HYDROGRAPHIE_LIGNE RIVIERE MAJEURE':HYDROGRAPHIE_LIGNE_RIVIERE_MAJEURE_pg,
        'HYDROGRAPHIE LIGNE RIVIERE MINEURE':HYDROGRAPHIE_LIGNE_RIVIERE_MINEURE_pg,
        'HYDROGRAPHIE SURFACE':HYDROGRAPHIE_SURFACE_pg,
        //'FORETS CLASSEES PARCS NATIONAUX ET RESERVES':FORETS_CLASSEES_PARCS_NATIONAUX_ET_RESERVES_pg,
        'RESEAU ROUTIER PISTE':RESEAU_ROUTIER_PISTE_pg,
        'RESEAU ROUTIER ROUTE BITUMEE':RESEAU_ROUTIER_ROUTE_BITUMEE_pg,
        'RESEAU ROUTIER ROUTE NON BITUMEE':RESEAU_ROUTIER_ROUTE_NON_BITUMEE_pg,

    
    //'INDICE DE PRESENCE DE FAUNE SAUVAGE':INDICE_DE_PRESENCE_DE_LA_FAUNE_SAUVAGE_pg,//INDICE_DE_PRESENCE_DE_FAUNE_SAUVAGE_pg,

    //'INDICE DE PROTECTION DES FORETS CLASSEES ET PARCS NATIONAUX PAR NOMBRE AGENTS POUR SURVEILLANCE':INDICE_DE_PROTECTION_DES_FC_ET_PN_PAR_NOMBRE_AGENTS_POUR_SURVEILLANCE_pg,
    //'INDICE DE PROTECTION DES FORETS CLASSEES ET PARCS NATIONAUX PAR PATROUILLE ANNUELLE':INDICE_DE_PROTECTION_DES_FC_ET_PN_PAR_PATROUILLE_ANNUELLE_pg,
    //'INDICE FINAL DE PROTECTION DES FORETS CLASSEES ET PARCS NATIONAUX':INDICE_FINAL_DE_PROTECTION_DES_FC_ET_PN_pg,
  
    'INDICE FINAL INTERFACE HUMAIN FAUNE FAUNE SAUVAGE DANS LE DISTRICT DES MONTAGNE AVEC ZONE TAMPON DE 5KM':INDICE_FINAL_DE_RISQUE_DE_ZOONOSE_DANS_LE_DISTRICT_DES_MONTAGNE_AVEC_ZONE_TAMPON_DE_5KM_pg,
   // 'INDICE FINAL INTERFACE HUMAIN FAUNE FAUNE SAUVAGE DANS LE DISTRICT DES MONTAGNE AVEC ZONE TAMPON DE 10KM':INDICE_FINAL_DE_RISQUE_DE_ZOONOSE_DANS_LE_DISTRICT_DES_MONTAGNE_AVEC_ZONE_TAMPON_DE_10KM_pg,
   // 'INDICE INTERACTION HOMME FAUNE ISSU DE VENTE ET CONSOMMATION ANIMAUX':INDICE_INTERACTION_HOMME_FAUNE_ISSU_DE_VENTE_ET_CONSOMMATION_ANIMAUX_pg,
    //'INDICE INTERACTION HOMME FAUNE ISSU DU NIVEAU INFILTRATION':INDICE_INTERACTION_HOMME_FAUNE_ISSU_DU_NIVEAU_INFILTRATION_pg,
    //'INDICE PRESSION ANTHROPIQUE CONCENTRATION LOCALITE RAYON DE 5 KM AUTOUR DES FORETS CLASSEES ET PARCS NATIONAUX':INDICE_PRESSION_ANTHROPIQUE_CONCENTRATION_LOCALITE_RAYON_DE_5_KM_AUTOUR_DES_FC_ET_PN_pg,
    //'INDICE PRESSION ANTHROPIQUE CONCENTRATION LOCALITE RAYON DE 10 KM AUTOUR DES FORETS CLASSEES ET PARCS NATIONAUX':INDICE_PRESSION_ANTHROPIQUE_CONCENTRATION_LOCALITE_RAYON_DE_10_KM_AUTOUR_DES_FC_ET_PN_pg,
    //'INDICE PRESSION ANTHROPIQUE LONGUEUR ROUTE RAYON DE 5 KM AUTOUR DES FORETS CLASSEES ET PARCS NATIONAUX':INDICE_PRESSION_ANTHROPIQUE_LONGUEUR_ROUTE_RAYON_DE_5_KM_AUTOUR_DES_FC_ET_PN_pg,
    //'INDICE PRESSION ANTHROPIQUE LONGUEUR ROUTE RAYON DE 10 KM AUTOUR DES FORETS CLASSEES ET PARCS NATIONAUX':INDICE_PRESSION_ANTHROPIQUE_LONGUEUR_ROUTE_RAYON_DE_10_KM_AUTOUR_DES_FC_ET_PN_pg,
    
   // 'INDICE FAIBLE INTOXICATION ANIMAUX PAR INTRANT AGRICOLE':INDICE_FAIBLE_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE_pg,
   // 'INDICE FORT INTOXICATION ANIMAUX PAR INTRANT AGRICOLE':INDICE_FORT_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE_pg,
   // 'INDICE MOYEN INTOXICATION ANIMAUX PAR INTRANT AGRICOLE':INDICE_MOYEN_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE_pg,

    //nouveau
   // 'INDICE FINAL INTERFACE HUMAIN FAUNE FAUNE SAUVAGE DANS LE DISTRICT DES MONTAGNE AVEC ZONE TAMPON DE 5KM': IINDICE_FINAL_INTERFACE_HOMME_FAUNE_SAUVAGE_DANS_LE_DISTRICT_DES_MONTAGNES_pg,
    'INDICE VENTE ET CONSOMMATION FAUNE SAUVAGE':INDICE_INTERACTION_HOMME_FAUNE_1_pg,
    'LONGUEUR ROUTE RAYON DE 5 KM AUTOUR DES FORETS CLASSEES ET PARCS':INDICE_INTERACTION_HOMME_FAUNE_2_pg,
    'CONCENTRATION LOCALITE RAYON DE 5 KM AUTOUR DES FORETS CLASSEES ET PARCS':INDICE_INTERACTION_HOMME_FAUNE_3_pg,
    'NIVEAU_INFILTRATION':INDICE_INTERACTION_HOMME_FAUNE_4_pg,
    'DENSITE POPULATION SOUS PREFECTORALE RAYON DE 5 KM AUTOUR DES FORETS CLASSEES ET PARCS':INDICE_INTERACTION_HOMME_FAUNE_5_pg,
   // 'RISQUE_INTAXICATION_PAR_INTRANT_AGRICOLE':RISQUE_INTAXICATION_PAR_INTRANT_AGRICOLE_pg,
   'INDICE FAIBLE INTOXICATION ANIMAUX PAR INTRANT AGRICOLE':INDICE_FAIBLE_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE_pg,
   'INDICE FORT INTOXICATION ANIMAUX PAR INTRANT AGRICOLE':INDICE_FORT_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE_pg,
   'INDICE MOYEN INTOXICATION ANIMAUX PAR INTRANT AGRICOLE':INDICE_MOYEN_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE_pg
   // 'INDICE POTENTIEL INTOXICATION ANIMAUX PAR INTRANT AGRICOLE':INDICE_POTENTIEL_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE

  
   }
  // this.recupCouche.push(overlayMaps)
   //ajout des couches a la cartes.
   var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
   var coucheDataMap = {};
  var coucheDataMapStock = {};
  var legendStock = {};
  var legendVILLE_CHEFLIEU_DE_DEPARTEMENT_pg = {};
  var pointer = this
   map.on('overlayadd', function (eventLayer) {
    // Réagissez au clic sur le groupe de couches ici
     pointer.ShowLoader()
    //alert("Le groupe de couches a été ajouté à la carte.");
    layerControl
  //@ts-ignore
    var nameCouche = eventLayer.layer.options.layers.split(':')
     var lien = 'assets/donnee/' + nameCouche[1] + '.json'
     if(nameCouche[1] == 'AFFLEUREMENT_ROCHEUX_OCCUPATION_DU_SOLNV'){
      //@ts-ignore
      legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
      //@ts-ignore
      legendStock[nameCouche[1]].onAdd = function (map) {
      
        var div = L.DomUtil.create('div', 'info legend')
        div.style.background= '#d6ccc2';
        div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
        div.style.borderRadius= '5px';
        div.style.width= '200px';
        div.style.height= '100px';
        div.style.padding= '6px 8px';
        // loop through our density intervals and generate a label with a colored square for each interval
        div.innerHTML = '<h6>AFFLEUREMENT ROCHEUX OCCUPATION DU SOL</h6>' 
        div.innerHTML +=
            /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                  ;*/
              '<p style="background-color:#944c4c;border: 2px solid black;width: 20px;height: 10px;"></p>'
        
        return div;
      };
      //@ts-ignore
      legendStock[nameCouche[1]].addTo(map);
      pointer.CloseLoader()
        } else if(nameCouche[1] == 'ILOTS_FORETS_HORS_FORETS_CLASSEES_ET_PARCS'){
          //@ts-ignore
          legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
          //@ts-ignore
          legendStock[nameCouche[1]].onAdd = function (map) {
          
            var div = L.DomUtil.create('div', 'info legend')
            div.style.background= '#d6ccc2';
            div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
            div.style.borderRadius= '5px';
            div.style.width= '200px';
            div.style.height= '100px';
            div.style.padding= '6px 8px';
            // loop through our density intervals and generate a label with a colored square for each interval
            div.innerHTML = '<h6>ILOTS FORETS HORS FORETS CLASSEES ET PARCS</h6>' 
            div.innerHTML +=
                  '<p style="background-color:#944c4c;border: 2px solid black;width: 20px;height: 10px;"></p>'
            
            return div;
          };
          //@ts-ignore
          legendStock[nameCouche[1]].addTo(map);
          pointer.CloseLoader()
            } else
        
        if(nameCouche[1] == 'EXPLOITATION_AGRICOLE_OCCUPATION_DU_SOLNV'){
            //@ts-ignore
            legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
            //@ts-ignore
            legendStock[nameCouche[1]].onAdd = function (map) {

              var div = L.DomUtil.create('div', 'info legend')
              div.style.background= '#d6ccc2';
              div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
              div.style.borderRadius= '5px';
              div.style.width= '200px';
              div.style.height= '100px';
              div.style.padding= '6px 8px';
              // loop through our density intervals and generate a label with a colored square for each interval
              div.innerHTML = '<h6>EXPLOITATION AGRICOLE OCCUPATION DU SOL</h6>' 
              div.innerHTML +=
                  /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                        ;*/
                    '<p style="background-color:#dda15e;border: 2px solid black;width: 20px;height: 10px;"></p>'
              
              return div;
            };
            //@ts-ignore
            legendStock[nameCouche[1]].addTo(map);
            pointer.CloseLoader()
        }else if(nameCouche[1] == 'FORET_OCCUPATION_DU_SOLNV'){
              //@ts-ignore
              legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
              //@ts-ignore
              legendStock[nameCouche[1]].onAdd = function (map) {
              
                var div = L.DomUtil.create('div', 'info legend')
                div.style.background= '#d6ccc2';
                div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                div.style.borderRadius= '5px';
                div.style.width= '200px';
                div.style.height= '100px';
                div.style.padding= '6px 8px';
                // loop through our density intervals and generate a label with a colored square for each interval
                div.innerHTML = '<h6>FORET OCCUPATION DU SOL</h6>' 
                div.innerHTML +=
                    /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                          ;*/
                      '<p style="background-color:#104911;border: 2px solid black;width: 20px;height: 10px;"></p>'
                
                return div;
              };
              //@ts-ignore
              legendStock[nameCouche[1]].addTo(map);
              pointer.CloseLoader()
        }else if(nameCouche[1] == 'HABITAT_ET_SOL_NU_OCCUPATION_DU_SOLNV'){
              //@ts-ignore
              legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
              //@ts-ignore
              legendStock[nameCouche[1]].onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend')
                div.style.background= '#d6ccc2';
                div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                div.style.borderRadius= '5px';
                div.style.width= '200px';
                div.style.height= '100px';
                div.style.padding= '6px 8px';
                // loop through our density intervals and generate a label with a colored square for each interval
                div.innerHTML = '<h6>HABITAT ET SOL NU OCCUPATION DU SOL</h6>' 
                div.innerHTML +=
                    /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                          ;*/
                      '<p style="background-color:#c4bbaf;border: 2px solid black;width: 20px;height: 10px;"></p>'
                
                return div;
              };
              //@ts-ignore
              legendStock[nameCouche[1]].addTo(map);
              pointer.CloseLoader()
        }else if(nameCouche[1] == 'MARECAGE_OCCUPATION_DU_SOLNV'){
              //@ts-ignore
              legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
              //@ts-ignore
              legendStock[nameCouche[1]].onAdd = function (map) {
              
                var div = L.DomUtil.create('div', 'info legend')
                div.style.background= '#d6ccc2';
                div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                div.style.borderRadius= '5px';
                div.style.width= '200px';
                div.style.height= '100px';
                div.style.padding= '6px 8px';
                // loop through our density intervals and generate a label with a colored square for each interval
                div.innerHTML = '<h6>MARECAGE OCCUPATION DU SOL</h6>' 
                div.innerHTML +=
                    /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                          ;*/
                      '<p style="background-color:#00a5cf;border: 2px solid black;width: 20px;height: 10px;"></p>'
                
                return div;
              };
              //@ts-ignore
              legendStock[nameCouche[1]].addTo(map);
              pointer.CloseLoader()
        }else if(nameCouche[1] == 'PLAN_DEAU_OCCUPATION_DU_SOLNV'){
            //@ts-ignore
            legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
            //@ts-ignore
            legendStock[nameCouche[1]].onAdd = function (map) {
            
              var div = L.DomUtil.create('div', 'info legend')
              div.style.background= '#d6ccc2';
              div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
              div.style.borderRadius= '5px';
              div.style.width= '200px';
              div.style.height= '100px';
              div.style.padding= '6px 8px';
              // loop through our density intervals and generate a label with a colored square for each interval
              div.innerHTML = '<h6>PLAN DEAU OCCUPATION DU SOL</h6>' 
              div.innerHTML +=
                  /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                        ;*/
                    '<p style="background-color:#274690;border: 2px solid black;width: 20px;height: 10px;"></p>'
              
              return div;
            };
            //@ts-ignore
            legendStock[nameCouche[1]].addTo(map);
            pointer.CloseLoader()
        }else if(nameCouche[1] == 'EXPLOITATION_AGRICOLE_OCCUPATION_DU_SOLNV'){
          //@ts-ignore
          legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
          //@ts-ignore
          legendStock[nameCouche[1]].onAdd = function (map) {
          
            var div = L.DomUtil.create('div', 'info legend')
            div.style.background= '#d6ccc2';
            div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
            div.style.borderRadius= '5px';
            div.style.width= '200px';
            div.style.height= '100px';
            div.style.padding= '6px 8px';
            // loop through our density intervals and generate a label with a colored square for each interval
            div.innerHTML = '<h6>EXPLOITATION AGRICOLE OCCUPATION DU SOL</h6>' 
            div.innerHTML +=
                /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                      ;*/
                  '<p style="background-color:#987db7;border: 2px solid black;width: 20px;height: 10px;"></p>'
            
            return div;
          };
          //@ts-ignore
          legendStock[nameCouche[1]].addTo(map);
          pointer.CloseLoader()
        }else if(nameCouche[1] == 'REBOISEMENT_OCCUPATION_DU_SOLNV'){
            //@ts-ignore
            legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
            //@ts-ignore
            legendStock[nameCouche[1]].onAdd = function (map) {
            
              var div = L.DomUtil.create('div', 'info legend')
              div.style.background= '#d6ccc2';
              div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
              div.style.borderRadius= '5px';
              div.style.width= '200px';
              div.style.height= '100px';
              div.style.padding= '6px 8px';
              // loop through our density intervals and generate a label with a colored square for each interval
              div.innerHTML = '<h6>REBOISEMENT OCCUPATION DU SOL</h6>' 
              div.innerHTML +=
                  /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                        ;*/
                    '<p style="background-color:#a1c181;border: 2px solid black;width: 20px;height: 10px;"></p>'
              
              return div;
            };
            //@ts-ignore
            legendStock[nameCouche[1]].addTo(map);
            pointer.CloseLoader()
            
        }else if(nameCouche[1] == 'INDICE_FAIBLE_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLENV'){
            //@ts-ignore
            legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
            //@ts-ignore
            legendStock[nameCouche[1]].onAdd = function (map) {
            
              var div = L.DomUtil.create('div', 'info legend')
              div.style.background= '#d6ccc2';
              div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
              div.style.borderRadius= '5px';
              div.style.width= '200px';
              div.style.height= '100px';
              div.style.padding= '6px 8px';
              // loop through our density intervals and generate a label with a colored square for each interval
              div.innerHTML = '<h6>INDICE FAIBLE INTOXICATION ANIMAUX PAR INTRANT AGRICOLE</h6>' 
              div.innerHTML +=
                  /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                        ;*/
                    '<p style="background-color:#a8577e;border: 2px solid black;width: 20px;height: 10px;"></p>'
              
              return div;
            };
            //@ts-ignore
            legendStock[nameCouche[1]].addTo(map);
            pointer.CloseLoader()
        }else if(nameCouche[1] == 'INDICE_FORT_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLENV'){
            //@ts-ignore
            legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
            //@ts-ignore
            legendStock[nameCouche[1]].onAdd = function (map) {
            
              var div = L.DomUtil.create('div', 'info legend')
              div.style.background= '#d6ccc2';
              div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
              div.style.borderRadius= '5px';
              div.style.width= '200px';
              div.style.height= '100px';
              div.style.padding= '6px 8px';
              // loop through our density intervals and generate a label with a colored square for each interval
              div.innerHTML = '<h6>INDICE FORT INTOXICATION ANIMAUX PAR INTRANT AGRICOLE</h6>' 
              div.innerHTML +=
                  /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                        ;*/
                    '<p style="background-color:#e57c04;border: 2px solid black;width: 20px;height: 10px;"></p>'
              
              return div;
            };
            //@ts-ignore
            legendStock[nameCouche[1]].addTo(map);
            pointer.CloseLoader()
        }else if(nameCouche[1] == 'INDICE_MOYEN_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLENV'){
          //@ts-ignore
          legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
          //@ts-ignore
          legendStock[nameCouche[1]].onAdd = function (map) {
          
            var div = L.DomUtil.create('div', 'info legend')
            div.style.background= '#d6ccc2';
            div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
            div.style.borderRadius= '5px';
            div.style.width= '200px';
            div.style.height= '100px';
            div.style.padding= '6px 8px';
            // loop through our density intervals and generate a label with a colored square for each interval
            div.innerHTML = '<h6>INDICE MOYEN INTOXICATION ANIMAUX PAR INTRANT AGRICOLE</h6>' 
            div.innerHTML +=
                /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                      ;*/
                  '<p style="background-color:#ff9fe5;border: 2px solid black;width: 20px;height: 10px;"></p>'
            
            return div;
          };
          //@ts-ignore
          legendStock[nameCouche[1]].addTo(map);
          pointer.CloseLoader()
        }else if(nameCouche[1] == 'SAVANE_ET_FORMATION_ARBUSTIVE_OCCUPATION_DU_SOLNV'){
          
            //@ts-ignore
            legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
            //@ts-ignore
            legendStock[nameCouche[1]].onAdd = function (map) {
            
              var div = L.DomUtil.create('div', 'info legend')
              div.style.background= '#d6ccc2';
              div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
              div.style.borderRadius= '5px';
              div.style.width= '200px';
              div.style.height= '100px';
              div.style.padding= '6px 8px';
              // loop through our density intervals and generate a label with a colored square for each interval
              div.innerHTML = '<h6>SAVANE ET FORMATION ARBUSTIVE OCCUPATION DU SOL</h6>' 
              div.innerHTML +=
                  /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                        ;*/
                    '<p style="background-color:#ffd449;border: 2px solid black;width: 20px;height: 10px;"></p>'
              
              return div;
            };
            //@ts-ignore
            legendStock[nameCouche[1]].addTo(map);
        }else if(nameCouche[1] == "INDICE_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE"){
        //@ts-ignore
        legendStock[nameCouche[1]] = '';

        //@ts-ignore
        legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
        //@ts-ignore
        legendStock[nameCouche[1]].onAdd = function (map) {
        
          var div = L.DomUtil.create('div', 'info legend'),
          grades = ['FORT','MOYEN', 'FAIBLE']
          div.style.background= '#d6ccc2';
          div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
          div.style.borderRadius= '5px';
          div.style.width= '200px';
          div.style.height= '200px';
          div.style.padding= '6px 8px';
          // loop through our density intervals and generate a label with a colored square for each interval
          div.innerHTML = '<h6>INDICE INTOXICATION ANIMAUX PAR INTRANT AGRICOLE</h6>' 
         
          for (var i = 0; i < grades.length; i++) {
            if(grades[i] == 'FORT'){
              div.innerHTML +=
              grades[i] + '<p style="background-color:#212529;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                    ;
            }else if (grades[i] == 'MOYEN'){
              div.innerHTML +=
              grades[i] + '<p style="background-color:#343a40;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                    ;
            }else{
             div.innerHTML +=
             grades[i] + '<p style="background-color:#495057;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                   ;
           }
              
          }
        
         
          return div;
        };
        //@ts-ignore
        legendStock[nameCouche[1]].addTo(map);
     }else if (nameCouche[1] == "OCCUPATION_DU_SOL"){
        //@ts-ignore
        legendStock[nameCouche[1]] = '';

        //@ts-ignore
        legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
        //@ts-ignore
        legendStock[nameCouche[1]].onAdd = function (map) {

          var div = L.DomUtil.create('div', 'info legend'),
          grades = ['FORT','MOYEN', 'FAIBLE']
          div.style.background= '#d6ccc2';
          div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
          div.style.borderRadius= '5px';
          div.style.width= '200px';
          div.style.height= '200px';
          div.style.padding= '6px 8px';
          // loop through our density intervals and generate a label with a colored square for each interval
          div.innerHTML = '<h6>OCCUPATION DU SOL</h6>' 
        
          for (var i = 0; i < grades.length; i++) {
            if(grades[i] == 'FORT'){
              div.innerHTML +=
              grades[i] + '<p style="background-color:#212529;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                    ;
            }else if (grades[i] == 'MOYEN'){
              div.innerHTML +=
              grades[i] + '<p style="background-color:#343a40;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                    ;
            }else{
             div.innerHTML +=
             grades[i] + '<p style="background-color:#495057;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                   ;
           }
              
          }
        
          return div;
        };
        //@ts-ignore
        legendStock[nameCouche[1]].addTo(map);
     }else{
      pointer.http.get(lien).subscribe(data => {
        console.log(data);
       // pointer.recupDonnee =[]
      
        //@ts-ignore
        if(data.features == undefined || data.features == null){
  
        }else{
         // Utilisez le nom de la couche comme clé pour associer les données à la couche
         pointer.recupDonneeTab = []
         //@ts-ignore
       
         for(let i =0;i<data.features.length;i++){//@ts-ignore
          pointer.recupDonneeTab.push(data.features[i].properties)
         }
         //@ts-ignore
         coucheDataMap[nameCouche[1]] = data.features;
         //@ts-ignore
         legendStock[nameCouche[1]] = '';
          //@ts-ignore
          //coucheDataMapStock[nameCouche[1]] = eventLayer;
          var styleDepartement = {
            color: "green",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.2,
            zIndex: 3,
        };
        
          if(nameCouche[1] == 'VILLE_CHEF-LIEU_DE_DEPARTEMENT_pg'){
            // Définissez un style personnalisé pour vos marqueurs
            var styleMarqueur = {
              radius: 10, // Augmentation de la taille du marqueur à 10
              fillColor: '#a1e209',
              color: '#a1e209',
              weight: 10,
              opacity: 1,
              fillOpacity: 0
            };
               //@ts-ignore
               legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
              //@ts-ignore
              legendStock[nameCouche[1]].onAdd = function (map) {
              
                var div = L.DomUtil.create('div', 'info legend')
                div.style.background= '#d6ccc2';
                div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                div.style.borderRadius= '5px';
                div.style.width= '200px';
                div.style.height= '80px';
                div.style.padding= '6px 8px';
                // loop through our density intervals and generate a label with a colored square for each interval
                div.innerHTML = '<h6>VILLE CHEF LIEU DE DEPARTEMENT</h6>' 
                div.innerHTML +=
                    '<p style="background-color:#a1e209;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                          ;
               
                return div;
              };
              //@ts-ignore
              legendStock[nameCouche[1]].addTo(map);
              pointer.CloseLoader()
              //@ts-ignore
              //this.legendVILLE_CHEFLIEU_DE_DEPARTEMENT_pg.remove();
  
          }
          if(nameCouche[1] == 'VILLE_CHEF-LIEU_DE_DISTRICT_pg'){
            // Définissez un style personnalisé pour vos marqueurs
            var styleMarqueur = {
              radius: 30, // Augmentation de la taille du marqueur à 10
              fillColor: '#e22a09', // Couleur de remplissage
              color: '#e22a09', // Couleur de la bordure
              weight: 30,
              opacity: 1,
              fillOpacity: 0
            };
  
              //@ts-ignore
              legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
              //@ts-ignore
              legendStock[nameCouche[1]].onAdd = function (map) {
              
                var div = L.DomUtil.create('div', 'info legend')
                div.style.background= '#d6ccc2';
                div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                div.style.borderRadius= '5px';
                div.style.width= '200px';
                div.style.height= '80px';
                div.style.padding= '6px 8px';
                // loop through our density intervals and generate a label with a colored square for each interval
                div.innerHTML = '<h6>VILLE CHEF LIEU DE DISTRICT</h6>' 
                div.innerHTML +=
                    '<p style="background-color:#e22a09;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                          ;
               
                return div;
              };
              //@ts-ignore
              legendStock[nameCouche[1]].addTo(map);

              pointer.CloseLoader()
          }
          if(nameCouche[1] == 'VILLE_CHEF-LIEU_DE_REGION_pg'){
             // Définissez un style personnalisé pour vos marqueurs
              var styleMarqueur = {
                radius: 10, // Augmentation de la taille du marqueur à 10
                fillColor: '#09e2ac',
                color: '#09e2ac',
                weight: 10,
                opacity: 1,
                fillOpacity: 0
              };
  
                //@ts-ignore
                legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                //@ts-ignore
                legendStock[nameCouche[1]].onAdd = function (map) {
                
                  var div = L.DomUtil.create('div', 'info legend')
                  div.style.background= '#d6ccc2';
                  div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                  div.style.borderRadius= '5px';
                  div.style.width= '200px';
                  div.style.height= '80px';
                  div.style.padding= '6px 8px';
                  // loop through our density intervals and generate a label with a colored square for each interval
                  div.innerHTML = '<h6>VILLE CHEF LIEU DE REGION</h6>' 
                  div.innerHTML +=
                      '<p style="background-color:#09e2ac;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                            ;
                  return div;
                };
                //@ts-ignore
                legendStock[nameCouche[1]].addTo(map);

                pointer.CloseLoader()
          }
          if(nameCouche[1] == 'VILLE_CHEF-LIEU_DE_SOUS_PREFECTURE_pg'){
             // Définissez un style personnalisé pour vos marqueurs
              var styleMarqueur = {
                radius: 10, // Augmentation de la taille du marqueur à 10
                fillColor: '#c55375',
                color: '#c55375',
                weight: 10,
                opacity: 1,
                fillOpacity: 0
              };
  
               //@ts-ignore
               legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
               //@ts-ignore
               legendStock[nameCouche[1]].onAdd = function (map) {
               
                 var div = L.DomUtil.create('div', 'info legend')
                 div.style.background= '#d6ccc2';
                 div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                 div.style.borderRadius= '5px';
                 div.style.width= '200px';
                 div.style.height= '80px';
                 div.style.padding= '6px 8px';
                 // loop through our density intervals and generate a label with a colored square for each interval
                 div.innerHTML = '<h6>VILLE CHEF LIEU DE SOUS PREFECTURE</h6>' 
                 div.innerHTML +=
                     '<p style="background-color:#c55375;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                           ;
                
                 return div;
               };
               //@ts-ignore
               legendStock[nameCouche[1]].addTo(map);

               pointer.CloseLoader()
          }
          if(nameCouche[1] == 'VILLES_ET_VILLAGES_pg'){
             // Définissez un style personnalisé pour vos marqueurs
              var styleMarqueur = {
                radius: 10, // Augmentation de la taille du marqueur à 10
                fillColor: '#fb5607',
                color: 'green',
                weight: 10,
                opacity: 1,
                fillOpacity: 0
              };
  
                //@ts-ignore
                legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                //@ts-ignore
                legendStock[nameCouche[1]].onAdd = function (map) {
                
                  var div = L.DomUtil.create('div', 'info legend')
                  div.style.background= '#d6ccc2';
                  div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                  div.style.borderRadius= '5px';
                  div.style.width= '200px';
                  div.style.height= '80px';
                  div.style.padding= '6px 8px';
                  // loop through our density intervals and generate a label with a colored square for each interval
                  div.innerHTML = '<h6>VILLES ET VILLAGES</h6>' 
                  div.innerHTML +=
                      '<p style="background-color:#fb5607;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                            ;
                 
                  return div;
                };
                //@ts-ignore
                legendStock[nameCouche[1]].addTo(map);

                pointer.CloseLoader()
          }
          if(nameCouche[1] == 'VILLAGE_pg'){
             // Définissez un style personnalisé pour vos marqueurs
            var styleMarqueur = {
              radius: 5, // Augmentation de la taille du marqueur à 10
              fillColor: '#572a9e',
              color: '#572a9e',
              weight: 5,
              opacity: 1,
              fillOpacity: 0
            };
  
             //@ts-ignore
             legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
             //@ts-ignore
             legendStock[nameCouche[1]].onAdd = function (map) {
             
               var div = L.DomUtil.create('div', 'info legend')
               div.style.background= '#d6ccc2';
               div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
               div.style.borderRadius= '5px';
               div.style.width= '200px';
               div.style.height= '80px';
               div.style.padding= '6px 8px';
               // loop through our density intervals and generate a label with a colored square for each interval
               div.innerHTML = '<h6>VILLAGES</h6>' 
               div.innerHTML +=
                   '<p style="background-color:#572a9e;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                         ;
              
               return div;
             };
             //@ts-ignore
             legendStock[nameCouche[1]].addTo(map);
             pointer.CloseLoader()
          } 
          switch (true) {
        
     
       
            case nameCouche[1] == 'DISTRICT_pg':
               //@ts-ignore
               legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
               //@ts-ignore
               legendStock[nameCouche[1]].onAdd = function (map) {
               
                 var div = L.DomUtil.create('div', 'info legend')
                 div.style.background= '#d6ccc2';
                 div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                 div.style.borderRadius= '5px';
                 div.style.width= '200px';
                 div.style.height= '80px';
                 div.style.padding= '6px 8px';
                 // loop through our density intervals and generate a label with a colored square for each interval
                 div.innerHTML = '<h6>DISTRICT</h6>' 
                 div.innerHTML +=
                     /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                           ;*/
                      '<p style="background-color:red;border: 2px solid red;width: 20px;height: 10px;"></p>'
                
                 return div;
               };
               //@ts-ignore
               legendStock[nameCouche[1]].addTo(map);
                
              break;
              case nameCouche[1] == 'RESEAU_ROUTIER_PISTE_pg':
                //@ts-ignore
               legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
               //@ts-ignore
               legendStock[nameCouche[1]].onAdd = function (map) {
               
                 var div = L.DomUtil.create('div', 'info legend')
                 div.style.background= '#d6ccc2';
                 div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                 div.style.borderRadius= '5px';
                 div.style.width= '200px';
                 div.style.height= '80px';
                 div.style.padding= '6px 8px';
                 // loop through our density intervals and generate a label with a colored square for each interval
                 div.innerHTML = '<h6>RESEAU ROUTIER PISTE</h6>' 
                 div.innerHTML +=
                      '<p style="background: repeating-linear-gradient(to right, lightblue, lightblue 10%, transparent 10%, transparent 20%);width: 100px;height: 2px;"></p>'
                
                 return div;
               };
               //@ts-ignore
               legendStock[nameCouche[1]].addTo(map);
              break;
              case nameCouche[1] == 'HYDROGRAPHIE_LIGNE_RIVIERE_MINEURE_pg':
             //@ts-ignore
             legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
             //@ts-ignore
             legendStock[nameCouche[1]].onAdd = function (map) {
             
               var div = L.DomUtil.create('div', 'info legend')
               div.style.background= '#d6ccc2';
               div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
               div.style.borderRadius= '5px';
               div.style.width= '200px';
               div.style.height= '80px';
               div.style.padding= '6px 8px';
               // loop through our density intervals and generate a label with a colored square for each interval
               div.innerHTML = '<h6>HYDROGRAPHIE LIGNE RIVIERE MINEURE</h6>' 
               div.innerHTML +=
                    '<p style="background: repeating-linear-gradient(to right, lightblue, lightblue 10%, transparent 10%, transparent 20%);width: 100px;height: 2px;"></p>'
              
               return div;
             };
             //@ts-ignore
             legendStock[nameCouche[1]].addTo(map);
              break;
             
            case nameCouche[1] == 'REGIONS_pg':
               //@ts-ignore
               legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
               //@ts-ignore
               legendStock[nameCouche[1]].onAdd = function (map) {
               
                 var div = L.DomUtil.create('div', 'info legend')
                 div.style.background= '#d6ccc2';
                 div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                 div.style.borderRadius= '5px';
                 div.style.width= '200px';
                 div.style.height= '80px';
                 div.style.padding= '6px 8px';
                 // loop through our density intervals and generate a label with a colored square for each interval
                 div.innerHTML = '<h6>REGIONS</h6>' 
                 div.innerHTML +=
                     /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                           ;*/
                      '<p style="background-color:red;border: 2px solid red;width: 20px;height: 10px;"></p>'
                
                 return div;
               };
               //@ts-ignore
               legendStock[nameCouche[1]].addTo(map);
                
              break;
            case nameCouche[1] == 'DEPARTEMENTS_pg':
              
                   //@ts-ignore
               legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
               //@ts-ignore
               legendStock[nameCouche[1]].onAdd = function (map) {
               
                 var div = L.DomUtil.create('div', 'info legend')
                 div.style.background= '#d6ccc2';
                 div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                 div.style.borderRadius= '5px';
                 div.style.width= '200px';
                 div.style.height= '80px';
                 div.style.padding= '6px 8px';
                 // loop through our density intervals and generate a label with a colored square for each interval
                 div.innerHTML = '<h6>DEPARTEMENTS</h6>' 
                 div.innerHTML +=
                     /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                           ;*/
                      '<p style="background-color:red;border: 2px solid red;width: 20px;height: 10px;"></p>'
                
                 return div;
               };
               //@ts-ignore
               legendStock[nameCouche[1]].addTo(map);
               break;
            case nameCouche[1] == 'SOUS_PREFECTURES_pg':
              //@ts-ignore
              legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
              //@ts-ignore
              legendStock[nameCouche[1]].onAdd = function (map) {
              
                var div = L.DomUtil.create('div', 'info legend')
                div.style.background= '#d6ccc2';
                div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                div.style.borderRadius= '5px';
                div.style.width= '200px';
                div.style.height= '80px';
                div.style.padding= '6px 8px';
                // loop through our density intervals and generate a label with a colored square for each interval
                div.innerHTML = '<h6>SOUS PREFECTURES</h6>' 
                div.innerHTML +=
                    /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                          ;*/
                      '<p style="background-color:#dbb7b7;border: 2px solid red;width: 20px;height: 10px;"></p>'
                
                return div;
              };
              //@ts-ignore
              legendStock[nameCouche[1]].addTo(map);
               break;
            case nameCouche[1] == 'CAMPEMENTS_pg'://#ffb703
                   //@ts-ignore
                   legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                   //@ts-ignore
                   legendStock[nameCouche[1]].onAdd = function (map) {
                   
                     var div = L.DomUtil.create('div', 'info legend')
                     div.style.background= '#d6ccc2';
                     div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                     div.style.borderRadius= '5px';
                     div.style.width= '200px';
                     div.style.height= '80px';
                     div.style.padding= '6px 8px';
                     // loop through our density intervals and generate a label with a colored square for each interval
                     div.innerHTML = '<h6>CAMPEMENTS</h6>' 
                     div.innerHTML +=
                         /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                               ;*/
                          '<p style="background-color:#ffb703;border: 2px solid red;width: 20px;height: 10px;"></p>'
                    
                     return div;
                   };
                   //@ts-ignore
                   legendStock[nameCouche[1]].addTo(map);
              break;
            
              case nameCouche[1] == 'HYDROGRAPHIE_LIGNE_pg':
                   //@ts-ignore
                   legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                   //@ts-ignore
                   legendStock[nameCouche[1]].onAdd = function (map) {
                   
                     var div = L.DomUtil.create('div', 'info legend'),
                         grades = ['RIVIERE MINEURE', 'RIVIERE MAJEURE'],
                         labels = [];
                     div.style.background= '#d6ccc2';
                     div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                     div.style.borderRadius= '5px';
                     div.style.width= '200px';
                     div.style.height= '250px';
                     div.style.padding= '6px 8px';
                    
                     // loop through our density intervals and generate a label with a colored square for each interval
                     div.innerHTML = '<h6>HYDROGRAPHIE LIGNE</h6>' 
                     for (var i = 0; i < grades.length; i++) {
                       if(grades[i] == 'RIVIERE MINEURE'){
                         div.innerHTML +=
                         grades[i] + '<p style="background: repeating-linear-gradient(to right, lightblue, lightblue 10%, transparent 10%, transparent 20%);width: 100px;height: 2px;"></p>'
                               ;
                       }else if (grades[i] == 'RIVIERE MAJEURE'){
                         div.innerHTML +=
                         grades[i] + '<p style="background: linear-gradient(to right, lightblue, transparent);width: 100px;height: 2px;"></p>'
                               ;
                       }
                         
                     }
                     return div;
                   };
                   //@ts-ignore
                   legendStock[nameCouche[1]].addTo(map);
                break;
                case nameCouche[1] == 'HYDROGRAPHIE_SURFACE_pg':
                
                break;
                case nameCouche[1] == 'FORETS_CLASSEES_PARCS_NATIONAUX_ET_RESERVES_pg':
                 
                     //@ts-ignore
                   legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                   //@ts-ignore
                   legendStock[nameCouche[1]].onAdd = function (map) {
                   
                     var div = L.DomUtil.create('div', 'info legend'),
                         grades = ['FORET CLASSEE', 'PARC NATIONAL', 'RESERVE'],
                         labels = [];
                     div.style.background= '#d6ccc2';
                     div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                     div.style.borderRadius= '5px';
                     div.style.width= '200px';
                     div.style.height= '250px';
                     div.style.padding= '6px 8px';
                    
                     // loop through our density intervals and generate a label with a colored square for each interval
                     div.innerHTML = '<h6>FORETS CLASSEES PARCS NATIONAUX ET RESERVES</h6>' 
                     for (var i = 0; i < grades.length; i++) {
                       if(grades[i] == 'FORET CLASSEE'){
                         div.innerHTML +=
                         grades[i] + '<p style="background-color:#283618;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                               ;
                       }else if (grades[i] == 'PARC NATIONAL'){
                         div.innerHTML +=
                         grades[i] + '<p style="background-color:#606c38;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                               ;
                       }else{
                        div.innerHTML +=
                        grades[i] + '<p style="background-color:#fca311;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                              ;
                      }
                         
                     }
                     return div;
                   };
                   //@ts-ignore
                   legendStock[nameCouche[1]].addTo(map);
                   pointer.CloseLoader()
                  break;
                
                  case nameCouche[1] == 'INDICE_DE_PROTECTION_DE_LA_FAUNE_SAUVAGE_PAR_LES_AGENTS_FORESTIERS_pg':
                 
                
                      //@ts-ignore
                   legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                   //@ts-ignore
                   legendStock[nameCouche[1]].onAdd = function (map) {
                   
                     var div = L.DomUtil.create('div', 'info legend'),
                         grades = ['FORT', 'MOYEN', 'FAIBLE'],
                         labels = [];
                     div.style.background= '#d6ccc2';
                     div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                     div.style.borderRadius= '5px';
                     div.style.width= '200px';
                     div.style.height= '250px';
                     div.style.padding= '6px 8px';
                    
                     // loop through our density intervals and generate a label with a colored square for each interval
                     div.innerHTML = '<h6>INDICE DE PROTECTION DE LA FAUNE SAUVAGE PAR LES AGENTS FORESTIERS</h6>' 
                     for (var i = 0; i < grades.length; i++) {
                       if(grades[i] == 'FORT'){
                         div.innerHTML +=
                         grades[i] + '<p style="background-color:#283618;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                               ;
                       }else if (grades[i] == 'MOYEN'){
                         div.innerHTML +=
                         grades[i] + '<p style="background-color:#606c38;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                               ;
                       }else{
                        div.innerHTML +=
                        grades[i] + '<p style="background-color:#e9edc9;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                              ;
                      }
                         
                     }
                     return div;
                   };
                   //@ts-ignore
                   legendStock[nameCouche[1]].addTo(map);
          
                  break;
                  case nameCouche[1] == 'INDICE_DE_PROTECTION_DE_LA_FAUNE_SAUVAGE___INTERPELLETION_POUR_INFRACTION_pg':
                   
                      //@ts-ignore
                      legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                      //@ts-ignore
                      legendStock[nameCouche[1]].onAdd = function (map) {
                      
                        var div = L.DomUtil.create('div', 'info legend'),
                            grades = ['FORT', 'MOYEN', 'FAIBLE'],
                            labels = [];
                        div.style.background= '#d6ccc2';
                        div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                        div.style.borderRadius= '5px';
                        div.style.width= '200px';
                        div.style.height= '250px';
                        div.style.padding= '6px 8px';
                       
                        // loop through our density intervals and generate a label with a colored square for each interval
                        div.innerHTML = '<h6>INDICE DE PROTECTION DE LA FAUNE SAUVAGE   INTERPELLETION POUR INFRACTION</h6>' 
                        for (var i = 0; i < grades.length; i++) {
                          if(grades[i] == 'FORT'){
                            div.innerHTML +=
                            grades[i] + '<p style="background-color:#283618;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                  ;
                          }else if (grades[i] == 'MOYEN'){
                            div.innerHTML +=
                            grades[i] + '<p style="background-color:#606c38;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                  ;
                          }else{
                           div.innerHTML +=
                           grades[i] + '<p style="background-color:#e9edc9;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                 ;
                         }
                            
                        }
                        return div;
                      };
                      //@ts-ignore
                      legendStock[nameCouche[1]].addTo(map);
                    break;
                    case nameCouche[1] == 'DENSITE_POPULATION_SOUS__PREFECTORALE_pg':
                   
                      //@ts-ignore
                      legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                      //@ts-ignore
                      legendStock[nameCouche[1]].onAdd = function (map) {
                      
                        var div = L.DomUtil.create('div', 'info legend'),
                            grades = ['FORT', 'MOYEN', 'FAIBLE'],
                            labels = [];
                        div.style.background= '#d6ccc2';
                        div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                        div.style.borderRadius= '5px';
                        div.style.width= '200px';
                        div.style.height= '250px';
                        div.style.padding= '6px 8px';
                       
                        // loop through our density intervals and generate a label with a colored square for each interval
                        div.innerHTML = '<h6>DENSITE POPULATION SOUS PREFECTORALE</h6>' 
                        for (var i = 0; i < grades.length; i++) {
                          if(grades[i] == 'FORT'){
                            div.innerHTML +=
                            grades[i] + '<p style="background-color:#780000;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                  ;
                          }else if (grades[i] == 'MOYEN'){
                            div.innerHTML +=
                            grades[i] + '<p style="background-color:#9e2a2b;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                  ;
                          }else{
                           div.innerHTML +=
                           grades[i] + '<p style="background-color:#bc4749;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                 ;
                         }
                            
                        }
                        return div;
                      };
                      //@ts-ignore
                      legendStock[nameCouche[1]].addTo(map);
                    break;
                    case nameCouche[1] == 'INDICE_DE_PROTECTION_DE_LA_FAUNE_SAUVAGE___INTERPELLETION_POUR_INFRACTION_pg':
                   
                      //@ts-ignore
                      legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                      //@ts-ignore
                      legendStock[nameCouche[1]].onAdd = function (map) {
                      
                        var div = L.DomUtil.create('div', 'info legend'),
                            grades = ['FORT', 'MOYEN', 'FAIBLE'],
                            labels = [];
                        div.style.background= '#d6ccc2';
                        div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                        div.style.borderRadius= '5px';
                        div.style.width= '200px';
                        div.style.height= '250px';
                        div.style.padding= '6px 8px';
                       
                        // loop through our density intervals and generate a label with a colored square for each interval
                        div.innerHTML = '<h6>INDICE DE PROTECTION DE LA FAUNE SAUVAGE   INTERPELLETION POUR INFRACTION</h6>' 
                        for (var i = 0; i < grades.length; i++) {
                          if(grades[i] == 'FORT'){
                            div.innerHTML +=
                            grades[i] + '<p style="background-color:#283618;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                  ;
                          }else if (grades[i] == 'MOYEN'){
                            div.innerHTML +=
                            grades[i] + '<p style="background-color:#606c38;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                  ;
                          }else{
                           div.innerHTML +=
                           grades[i] + '<p style="background-color:#e9edc9;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                 ;
                         }
                            
                        }
                        return div;
                      };
                      //@ts-ignore
                      legendStock[nameCouche[1]].addTo(map);
                    break;
                    case nameCouche[1] == 'INDICE_INTRECTION_HOMME_-_FAUNE_SAUVAGE_COHABITATION_pg':
                      
                      //@ts-ignore
                   legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                   //@ts-ignore
                   legendStock[nameCouche[1]].onAdd = function (map) {
                   
                     var div = L.DomUtil.create('div', 'info legend'),
                         grades = ['FORT', 'MOYEN', 'FAIBLE'],
                         labels = [];
                     div.style.background= '#d6ccc2';
                     div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                     div.style.borderRadius= '5px';
                     div.style.width= '200px';
                     div.style.height= '250px';
                     div.style.padding= '6px 8px';
                    
                     // loop through our density intervals and generate a label with a colored square for each interval
                     div.innerHTML = '<h6>INDICE INTRECTION HOMME - FAUNE SAUVAGE COHABITATION</h6>' 
                     for (var i = 0; i < grades.length; i++) {
                       if(grades[i] == 'FORT'){
                         div.innerHTML +=
                         grades[i] + '<p style="background-color:#283618;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                               ;
                       }else if (grades[i] == 'MOYEN'){
                         div.innerHTML +=
                         grades[i] + '<p style="background-color:#606c38;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                               ;
                       }else{
                        div.innerHTML +=
                        grades[i] + '<p style="background-color:#e9edc9;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                              ;
                      }
                         
                     }
                     return div;
                   };
                   //@ts-ignore
                   legendStock[nameCouche[1]].addTo(map);
                  break;
                  case nameCouche[1] == 'INDICE_INTRECTION_HOMME__FAUNE_SAUVAGE_COHABITATION_pg':
                      
                      //@ts-ignore
                   legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                   //@ts-ignore
                   legendStock[nameCouche[1]].onAdd = function (map) {
                   
                     var div = L.DomUtil.create('div', 'info legend'),
                         grades = ['FORT', 'MOYEN', 'FAIBLE'],
                         labels = [];
                     div.style.background= '#d6ccc2';
                     div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                     div.style.borderRadius= '5px';
                     div.style.width= '200px';
                     div.style.height= '250px';
                     div.style.padding= '6px 8px';
                    
                     // loop through our density intervals and generate a label with a colored square for each interval
                     div.innerHTML = '<h6>INDICE INTRECTION HOMME  FAUNE SAUVAGE COHABITATION</h6>' 
                     for (var i = 0; i < grades.length; i++) {
                       if(grades[i] == 'FORT'){
                         div.innerHTML +=
                         grades[i] + '<p style="background-color:#283618;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                               ;
                       }else if (grades[i] == 'MOYEN'){
                         div.innerHTML +=
                         grades[i] + '<p style="background-color:#606c38;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                               ;
                       }else{
                        div.innerHTML +=
                        grades[i] + '<p style="background-color:#e9edc9;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                              ;
                      }
                         
                     }
                     return div;
                   };
                   //@ts-ignore
                   legendStock[nameCouche[1]].addTo(map);
                  break;
                 
                  case nameCouche[1] == 'INDICE_DE_PRESENCE_DE_LA_FAUNE_SAUVAGE_pg':
                  
                      //@ts-ignore
                   legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                   //@ts-ignore
                   legendStock[nameCouche[1]].onAdd = function (map) {
                   
                     var div = L.DomUtil.create('div', 'info legend'),
                         grades = ['FORT', 'MOYEN', 'FAIBLE'],
                         labels = [];
                     div.style.background= '#d6ccc2';
                     div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                     div.style.borderRadius= '5px';
                     div.style.width= '200px';
                     div.style.height= '250px';
                     div.style.padding= '6px 8px';
                    
                     // loop through our density intervals and generate a label with a colored square for each interval
                     div.innerHTML = '<h6>INDICE DE PRESENCE DE LA FAUNE SAUVAGE</h6>' 
                     for (var i = 0; i < grades.length; i++) {
                       if(grades[i] == 'FORT'){
                         div.innerHTML +=
                         grades[i] + '<p style="background-color:#283618;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                               ;
                       }else if (grades[i] == 'MOYEN'){
                         div.innerHTML +=
                         grades[i] + '<p style="background-color:#606c38;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                               ;
                       }else{
                        div.innerHTML +=
                        grades[i] + '<p style="background-color:#e9edc9;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                              ;
                      }
                         
                     }
                     return div;
                   };
                   //@ts-ignore
                   legendStock[nameCouche[1]].addTo(map);
                      
                  break;
                  case nameCouche[1] == 'INDICE_DE_PRESENCE_DE_FAUNE_SAUVAGE_pg':
                  
                      //@ts-ignore
                      legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                      //@ts-ignore
                      legendStock[nameCouche[1]].onAdd = function (map) {
                      
                        var div = L.DomUtil.create('div', 'info legend'),
                            grades = ['FORT', 'MOYEN', 'FAIBLE'],
                            labels = [];
                        div.style.background= '#d6ccc2';
                        div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                        div.style.borderRadius= '5px';
                        div.style.width= '200px';
                        div.style.height= '250px';
                        div.style.padding= '6px 8px';
                       
                        // loop through our density intervals and generate a label with a colored square for each interval
                        div.innerHTML = '<h6>INDICE DE PRESENCE DE LA FAUNE SAUVAGE</h6>' 
                        for (var i = 0; i < grades.length; i++) {
                          if(grades[i] == 'FORT'){
                            div.innerHTML +=
                            grades[i] + '<p style="background-color:#283618;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                  ;
                          }else if (grades[i] == 'MOYEN'){
                            div.innerHTML +=
                            grades[i] + '<p style="background-color:#606c38;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                  ;
                          }else{
                          div.innerHTML +=
                          grades[i] + '<p style="background-color:#e9edc9;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;
                        }
                            
                        }
                        return div;
                      };
                      //@ts-ignore
                      legendStock[nameCouche[1]].addTo(map);
                  break;
                  case nameCouche[1] == 'INDICE_DE_PROTECTION_DES_FC_ET_PN_PAR_NOMBRE_AGENTS_POUR_SURVEILLANCE_pg':
                   //@ts-ignore
                   legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                   //@ts-ignore
                   legendStock[nameCouche[1]].onAdd = function (map) {
                   
                     var div = L.DomUtil.create('div', 'info legend'),
                         grades = ['FORT', 'MOYEN', 'FAIBLE'],
                         labels = [];
                     div.style.background= '#d6ccc2';
                     div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                     div.style.borderRadius= '5px';
                     div.style.width= '200px';
                     div.style.height= '250px';
                     div.style.padding= '6px 8px';
                    
                     // loop through our density intervals and generate a label with a colored square for each interval
                     div.innerHTML = '<h6>INDICE DE PROTECTION DES FC ET PN PAR NOMBRE AGENTS POUR SURVEILLANCE</h6>' 
                     for (var i = 0; i < grades.length; i++) {
                       if(grades[i] == 'FORT'){
                         div.innerHTML +=
                         grades[i] + '<p style="background-color:#283618;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                               ;
                       }else if (grades[i] == 'MOYEN'){
                         div.innerHTML +=
                         grades[i] + '<p style="background-color:#606c38;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                               ;
                       }else{
                        div.innerHTML +=
                        grades[i] + '<p style="background-color:#e9edc9;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                              ;
                      }
                         
                     }
                     return div;
                   };
                   //@ts-ignore
                   legendStock[nameCouche[1]].addTo(map);
                  break;
                  case nameCouche[1] == 'INDICE_DE_PROTECTION_DES_FC_ET_PN_PAR_PATROUILLE_ANNUELLE_pg':
                    
                      //@ts-ignore
                      legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                      //@ts-ignore
                      legendStock[nameCouche[1]].onAdd = function (map) {
                      
                        var div = L.DomUtil.create('div', 'info legend'),
                            grades = ['FORT', 'MOYEN', 'FAIBLE'],
                            labels = [];
                        div.style.background= '#d6ccc2';
                        div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                        div.style.borderRadius= '5px';
                        div.style.width= '200px';
                        div.style.height= '250px';
                        div.style.padding= '6px 8px';
                       
                        // loop through our density intervals and generate a label with a colored square for each interval
                        div.innerHTML = '<h6>INDICE DE PROTECTION DES FC ET PN PAR PATROUILLE ANNUELLE</h6>' 
                        for (var i = 0; i < grades.length; i++) {
                          if(grades[i] == 'FORT'){
                            div.innerHTML +=
                            grades[i] + '<p style="background-color:#283618;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                  ;
                          }else if (grades[i] == 'MOYEN'){
                            div.innerHTML +=
                            grades[i] + '<p style="background-color:#606c38;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                  ;
                          }else{
                          div.innerHTML +=
                          grades[i] + '<p style="background-color:#e9edc9;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;
                        }
                            
                        }
                        return div;
                      };
                      //@ts-ignore
                      legendStock[nameCouche[1]].addTo(map);
          
          
                  break;
                  case nameCouche[1] == 'INDICE_FINAL_DE_PROTECTION_DES_FC_ET_PN_pg':
                    //@ts-ignore
                    legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                    //@ts-ignore
                    legendStock[nameCouche[1]].onAdd = function (map) {
                    
                      var div = L.DomUtil.create('div', 'info legend'),
                          grades = ['FORT', 'MOYEN', 'FAIBLE'],
                          labels = [];
                      div.style.background= '#d6ccc2';
                      div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                      div.style.borderRadius= '5px';
                      div.style.width= '200px';
                      div.style.height= '250px';
                      div.style.padding= '6px 8px';
                     
                      // loop through our density intervals and generate a label with a colored square for each interval
                      div.innerHTML = '<h6>INDICE FINAL DE PROTECTION DES FC ET PN</h6>' 
                      for (var i = 0; i < grades.length; i++) {
                        if(grades[i] == 'FORT'){
                          div.innerHTML +=
                          grades[i] + '<p style="background-color:#780000;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;
                        }else if (grades[i] == 'MOYEN'){
                          div.innerHTML +=
                          grades[i] + '<p style="background-color:#9e2a2b;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;
                        }else{
                        div.innerHTML +=
                        grades[i] + '<p style="background-color:#bc4749;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                              ;
                      }
                          
                      }
                      return div;
                    };
                    //@ts-ignore
                    legendStock[nameCouche[1]].addTo(map);
                  break;
                  case nameCouche[1] == 'INDICE_FINAL_DE_RISQUE_DE_ZOONOSE_DANS_LE_DISTRICT_DES_MONTAGNE_AVEC_ZONE_TAMPON_DE_5KM_pg':
                   //@ts-ignore
                   legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                   //@ts-ignore
                   legendStock[nameCouche[1]].onAdd = function (map) {
                   
                     var div = L.DomUtil.create('div', 'info legend'),
                         grades = ['FORT', 'MOYEN', 'FAIBLE'],
                         labels = [];
                     div.style.background= '#d6ccc2';
                     div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                     div.style.borderRadius= '5px';
                     div.style.width= '200px';
                     div.style.height= '250px';
                     div.style.padding= '6px 8px';
                    
                     // loop through our density intervals and generate a label with a colored square for each interval
                     div.innerHTML = '<h6>INDICE FINAL DE RISQUE DE ZOONOSE DANS LE DISTRICT DES MONTAGNE AVEC ZONE TAMPON DE5KM</h6>' 
                     for (var i = 0; i < grades.length; i++) {
                      if(grades[i] == 'FORT'){
                        div.innerHTML +=
                        grades[i] + '<p style="background-color:#780000;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                              ;
                      }else if (grades[i] == 'MOYEN'){
                        div.innerHTML +=
                        grades[i] + '<p style="background-color:#9e2a2b;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                              ;
                      }else{
                      div.innerHTML +=
                      grades[i] + '<p style="background-color:#bc4749;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                            ;
                    }
                         
                     }
                     return div;
                   };
                   //@ts-ignore
                   legendStock[nameCouche[1]].addTo(map);
                  break;
                  case nameCouche[1] == 'INDICE_FINAL_DE_RISQUE_DE_ZOONOSE_DANS_LE_DISTRICT_DES_MONTAGNE_AVEC_ZONE_TAMPON_DE_10KM_pg':
                    //@ts-ignore
                    legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                    //@ts-ignore
                    legendStock[nameCouche[1]].onAdd = function (map) {
                    
                      var div = L.DomUtil.create('div', 'info legend'),
                          grades = ['FORT', 'MOYEN', 'FAIBLE'],
                          labels = [];
                      div.style.background= '#d6ccc2';
                      div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                      div.style.borderRadius= '5px';
                      div.style.width= '200px';
                      div.style.height= '250px';
                      div.style.padding= '6px 8px';
                     
                      // loop through our density intervals and generate a label with a colored square for each interval
                      div.innerHTML = '<h6>INDICE FINAL DE RISQUE DE ZOONOSE DANS LE DISTRICT DES MONTAGNE AVEC ZONE TAMPON DE 10KM</h6>' 
                      for (var i = 0; i < grades.length; i++) {
                        if(grades[i] == 'FORT'){
                          div.innerHTML +=
                          grades[i] + '<p style="background-color:#780000;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;
                        }else if (grades[i] == 'MOYEN'){
                          div.innerHTML +=
                          grades[i] + '<p style="background-color:#9e2a2b;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;
                        }else{
                        div.innerHTML +=
                        grades[i] + '<p style="background-color:#bc4749;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                              ;
                      }
                          
                      }
                      return div;
                    };
                    //@ts-ignore
                    legendStock[nameCouche[1]].addTo(map);
                  break;
                  case nameCouche[1] == 'IINDICE_FINAL_INTERFACE_HOMME_FAUNE_SAUVAGE_DANS_LE_DISTRICT_DES_MONTAGNES_pg':
                    //@ts-ignore
                    legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                    //@ts-ignore
                    legendStock[nameCouche[1]].onAdd = function (map) {
                    
                      var div = L.DomUtil.create('div', 'info legend'),
                          grades = ['FORT', 'MOYEN', 'FAIBLE'],
                          labels = [];
                      div.style.background= '#d6ccc2';
                      div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                      div.style.borderRadius= '5px';
                      div.style.width= '200px';
                      div.style.height= '250px';
                      div.style.padding= '6px 8px';
                     
                      // loop through our density intervals and generate a label with a colored square for each interval
                      div.innerHTML = '<h6>INDICE FINAL INTERFACE HUMAIN FAUNE FAUNE SAUVAGE DANS LE DISTRICT DES MONTAGNE AVEC ZONE TAMPON DE 5KM</h6>' 
                      for (var i = 0; i < grades.length; i++) {
                        if(grades[i] == 'FORT'){
                          div.innerHTML +=
                          grades[i] + '<p style="background-color:#780000;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;
                        }else if (grades[i] == 'MOYEN'){
                          div.innerHTML +=
                          grades[i] + '<p style="background-color:#9e2a2b;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;
                        }else{
                        div.innerHTML +=
                        grades[i] + '<p style="background-color:#03071e;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                              ;
                      }
                          
                      }
                      return div;
                    };
                    //@ts-ignore
                    legendStock[nameCouche[1]].addTo(map);
                  break;
                  case nameCouche[1] == 'INDICE_INTERACTION_HOMME_FAUNE_ISSU_DE_VENTE_ET_CONSOMMATION_ANIMAUX_pg' || nameCouche[1] == 'INDICE_INTERACTION_HOMME_FAUNE_1_(VENTE_ET_CONSOMMATION_FAUNE_SAUVAGE)_pg':
                      //@ts-ignore
                      legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                      //@ts-ignore
                      legendStock[nameCouche[1]].onAdd = function (map) {
                      
                        var div = L.DomUtil.create('div', 'info legend'),
                            grades = ['FORT', 'MOYEN', 'FAIBLE'],
                            labels = [];
                        div.style.background= '#d6ccc2';
                        div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                        div.style.borderRadius= '5px';
                        div.style.width= '200px';
                        div.style.height= '250px';
                        div.style.padding= '6px 8px';
                       
                        // loop through our density intervals and generate a label with a colored square for each interval
                        if(nameCouche[1] == 'INDICE_INTERACTION_HOMME_FAUNE_1_(VENTE_ET_CONSOMMATION_FAUNE_SAUVAGE)_pg'){
                          div.innerHTML = '<h6>VENTE_ET_CONSOMMATION_FAUNE_SAUVAGE</h6>'
                        }else{
                          div.innerHTML = '<h6>INDICE INTERACTION HOMME FAUNE ISSU DE VENTE ET CONSOMMATION ANIMAUX</h6>'
                        }
                         
                        for (var i = 0; i < grades.length; i++) {
                          if(grades[i] == 'FORT'){
                            div.innerHTML +=
                            grades[i] + '<p style="background-color:#780000;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                  ;
                          }else if (grades[i] == 'MOYEN'){
                            div.innerHTML +=
                            grades[i] + '<p style="background-color:#9e2a2b;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                  ;
                          }else{
                          div.innerHTML +=
                          grades[i] + '<p style="background-color:#bc4749;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;
                        }
                            
                        }
                        return div;
                      };
                      //@ts-ignore
                      legendStock[nameCouche[1]].addTo(map);
                  break;
                 
                  case nameCouche[1] == 'INDICE_INTERACTION_HOMME_FAUNE_ISSU_DU_NIVEAU_INFILTRATION_pg' || nameCouche[1] == 'INDICE_INTERACTION_HOMME_FAUNE_4_(NIVEAU_INFILTRATION)_pg' || nameCouche[1] == 'INDICE_INTERACTION_HOMME_FAUNE_5_(DENSITE_POPULATION_SOUS__PREFECTORALE_RAYON_DE_5_KM_AUTOUR_DES_FORETS_CLASSEES_ET_PARCS)_pg' || nameCouche[1] == 'RISQUE_INTAXICATION_PAR_INTRANT_AGRICOLE_pg':
                      
                      //@ts-ignore
                      legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                      //@ts-ignore
                      legendStock[nameCouche[1]].onAdd = function (map) {
                      
                        var div = L.DomUtil.create('div', 'info legend'),
                            grades = ['FORT', 'MOYEN', 'FAIBLE'],
                            labels = [];
                        div.style.background= '#d6ccc2';
                        div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                        div.style.borderRadius= '5px';
                        div.style.width= '200px';
                        div.style.height= '250px';
                        div.style.padding= '6px 8px';
                       
                        // loop through our density intervals and generate a label with a colored square for each interval
                        if(nameCouche[1] == 'INDICE_INTERACTION_HOMME_FAUNE_4_(NIVEAU_INFILTRATION)_pg'){
                          div.innerHTML = '<h6>NIVEAU INFILTRATION</h6>'
                        }
                        else if(nameCouche[1] == 'INDICE_INTERACTION_HOMME_FAUNE_5_(DENSITE_POPULATION_SOUS__PREFECTORALE_RAYON_DE_5_KM_AUTOUR_DES_FORETS_CLASSEES_ET_PARCS)_pg'){
                          div.innerHTML = '<h6>DENSITE POPULATION SOUS PREFECTORALE RAYON DE 5 KM AUTOUR DES FORETS CLASSEES ET PARCS</h6>'
                        }else if(nameCouche[1] == 'RISQUE_INTAXICATION_PAR_INTRANT_AGRICOLE_pg'){
                          div.innerHTML = '<h6>RISQUE INTAXICATION PAR INTRANT AGRICOLE</h6>'
                        }else{
                          div.innerHTML = '<h6>INDICE INTERACTION HOMME FAUNE ISSU DU NIVEAU INFILTRATION</h6>'
                        }
                        for (var i = 0; i < grades.length; i++) {
                          if(grades[i] == 'FORT'){
                            div.innerHTML +=
                            grades[i] + '<p style="background-color:#780000;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                  ;
                          }else if (grades[i] == 'MOYEN'){
                            div.innerHTML +=
                            grades[i] + '<p style="background-color:#9e2a2b;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                  ;
                          }else{
                          div.innerHTML +=
                          grades[i] + '<p style="background-color:#bc4749;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;
                        }
                            
                        }
                        return div;
                      };
                      //@ts-ignore
                      legendStock[nameCouche[1]].addTo(map);
                  break;
                  case nameCouche[1] == 'INDICE_PRESSION_ANTHROPIQUE_CONCENTRATION_LOCALITE_RAYON_DE_5_KM_AUTOUR_DES_FC_ET_PN_pg' || nameCouche[1] == 'INDICE_INTERACTION_HOMME_FAUNE_3_(CONCENTRATION_LOCALITE_RAYON_DE_5_KM_AUTOUR_DES_FORETS CLASSEES_ET_PARCS)_pg':
                      
                      //@ts-ignore
                      legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                      //@ts-ignore
                      legendStock[nameCouche[1]].onAdd = function (map) {
                      
                        var div = L.DomUtil.create('div', 'info legend'),
                            grades = ['FORT', 'MOYEN', 'FAIBLE'],
                            labels = [];
                        div.style.background= '#d6ccc2';
                        div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                        div.style.borderRadius= '5px';
                        div.style.width= '200px';
                        div.style.height= '250px';
                        div.style.padding= '6px 8px';
                       
                        // loop through our density intervals and generate a label with a colored square for each interval
                        if(nameCouche[1] == 'INDICE_INTERACTION_HOMME_FAUNE_3_(CONCENTRATION_LOCALITE_RAYON_DE_5_KM_AUTOUR_DES_FORETS CLASSEES_ET_PARCS)_pg'){
                          div.innerHTML = '<h6>CONCENTRATION LOCALITE RAYON DE 5 KM AUTOUR DES FORETS CLASSEES ET PARCS</h6>'
                        }else{
                          div.innerHTML = '<h6>INDICE PRESSION ANTHROPIQUE CONCENTRATION LOCALITE RAYON DE 5 KM AUTOUR DES FC ET PN</h6>'
                        }
                        
                        for (var i = 0; i < grades.length; i++) {
                          if(grades[i] == 'FORT'){
                            div.innerHTML +=
                            grades[i] + '<p style="background-color:#780000;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                  ;
                          }else if (grades[i] == 'MOYEN'){
                            div.innerHTML +=
                            grades[i] + '<p style="background-color:#9e2a2b;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                  ;
                          }else{
                          div.innerHTML +=
                          grades[i] + '<p style="background-color:#03071e;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;
                        }
                            
                        }
                        return div;
                      };
                      //@ts-ignore
                      legendStock[nameCouche[1]].addTo(map);
                  break;
                  case nameCouche[1] == 'INDICE_PRESSION_ANTHROPIQUE_CONCENTRATION_LOCALITE_RAYON_DE_10_KM_AUTOUR_DES_FC_ET_PN_pg':
                      
                      //@ts-ignore
                      legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                      //@ts-ignore
                      legendStock[nameCouche[1]].onAdd = function (map) {
                      
                        var div = L.DomUtil.create('div', 'info legend'),
                            grades = ['FORT', 'MOYEN', 'FAIBLE'],
                            labels = [];
                        div.style.background= '#d6ccc2';
                        div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                        div.style.borderRadius= '5px';
                        div.style.width= '200px';
                        div.style.height= '250px';
                        div.style.padding= '6px 8px';
                       
                        // loop through our density intervals and generate a label with a colored square for each interval
                        div.innerHTML = '<h6>INDICE PRESSION ANTHROPIQUE CONCENTRATION LOCALITE RAYON DE 10 KM AUTOUR DES FC ET PN</h6>' 
                        for (var i = 0; i < grades.length; i++) {
                          if(grades[i] == 'FORT'){
                            div.innerHTML +=
                            grades[i] + '<p style="background-color:#283618;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                  ;
                          }else if (grades[i] == 'MOYEN'){
                            div.innerHTML +=
                            grades[i] + '<p style="background-color:#606c38;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                  ;
                          }else{
                          div.innerHTML +=
                          grades[i] + '<p style="background-color:#e9edc9;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;
                        }
                            
                        }
                        return div;
                      };
                      //@ts-ignore
                      legendStock[nameCouche[1]].addTo(map);
                  break;
                  case nameCouche[1] == 'INDICE_PRESSION_ANTHROPIQUE_LONGUEUR_ROUTE_RAYON_DE_5_KM_AUTOUR_DES_FC_ET_PN_pg' || nameCouche[1] == 'INDICE_INTERACTION_HOMME_FAUNE_2_(LONGUEUR_ROUTE_RAYON_DE_5_KM_AUTOUR_DES_FORETS CLASSEES_ET_PARCS)_pg':
                   
                      //@ts-ignore
                      legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                      //@ts-ignore
                      legendStock[nameCouche[1]].onAdd = function (map) {
                      
                        var div = L.DomUtil.create('div', 'info legend'),
                            grades = ['FORT', 'MOYEN', 'FAIBLE'],
                            labels = [];
                        div.style.background= '#d6ccc2';
                        div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                        div.style.borderRadius= '5px';
                        div.style.width= '200px';
                        div.style.height= '250px';
                        div.style.padding= '6px 8px';
                       
                        // loop through our density intervals and generate a label with a colored square for each interval
                         
                        if(nameCouche[1] == 'INDICE_INTERACTION_HOMME_FAUNE_2_(LONGUEUR_ROUTE_RAYON_DE_5_KM_AUTOUR_DES_FORETS CLASSEES_ET_PARCS)_pg'){
                          div.innerHTML = '<h6>LONGUEUR ROUTE RAYON DE 5 KM AUTOUR DES FORETS CLASSEES ET PARCS</h6>'
                        }else{
                          div.innerHTML = '<h6>INDICE PRESSION ANTHROPIQUE LONGUEUR ROUTE RAYON DE 5 KM AUTOUR DES FC ET PN</h6>'
                        }
                        for (var i = 0; i < grades.length; i++) {
                          if(grades[i] == 'FORT'){
                            div.innerHTML +=
                            grades[i] + '<p style="background-color:#780000;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                  ;
                          }else if (grades[i] == 'MOYEN'){
                            div.innerHTML +=
                            grades[i] + '<p style="background-color:#9e2a2b;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                  ;
                          }else{
                          div.innerHTML +=
                          grades[i] + '<p style="background-color:#bc4749;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;
                        }
                            
                        }
                        return div;
                      };
                      //@ts-ignore
                      legendStock[nameCouche[1]].addTo(map);
                  break;
                  case nameCouche[1] == 'INDICE_PRESSION_ANTHROPIQUE_LONGUEUR_ROUTE_RAYON_DE_10_KM_AUTOUR_DES_FC_ET_PN_pg':
                      
                      //@ts-ignore
                      legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                      //@ts-ignore
                      legendStock[nameCouche[1]].onAdd = function (map) {
                      
                        var div = L.DomUtil.create('div', 'info legend'),
                            grades = ['FORT', 'MOYEN', 'FAIBLE'],
                            labels = [];
                        div.style.background= '#d6ccc2';
                        div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                        div.style.borderRadius= '5px';
                        div.style.width= '200px';
                        div.style.height= '250px';
                        div.style.padding= '6px 8px';
                       
                        // loop through our density intervals and generate a label with a colored square for each interval
                        div.innerHTML = '<h6>INDICE PRESSION ANTHROPIQUE LONGUEUR ROUTE RAYON DE 10 KM AUTOUR DES FC ET PN</h6>' 
                        for (var i = 0; i < grades.length; i++) {
                          if(grades[i] == 'FORT'){
                            div.innerHTML +=
                            grades[i] + '<p style="background-color:#283618;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                  ;
                          }else if (grades[i] == 'MOYEN'){
                            div.innerHTML +=
                            grades[i] + '<p style="background-color:#606c38;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                  ;
                          }else{
                          div.innerHTML +=
                          grades[i] + '<p style="background-color:#e9edc9;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;
                        }
                            
                        }
                        return div;
                      };
                      //@ts-ignore
                      legendStock[nameCouche[1]].addTo(map);
                  break;
                  case nameCouche[1] == 'CARTE_ALEA_INTERACTION_HOMME_FAUNE_SAUVAGE_pg':
                    //@ts-ignore
                    legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                    //@ts-ignore
                    legendStock[nameCouche[1]].onAdd = function (map) {
                    
                      var div = L.DomUtil.create('div', 'info legend'),
                          grades = ['FORT', 'MOYEN', 'FAIBLE'],
                          labels = [];
                      div.style.background= '#d6ccc2';
                      div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                      div.style.borderRadius= '5px';
                      div.style.width= '200px';
                      div.style.height= '250px';
                      div.style.padding= '6px 8px';
                     
                      // loop through our density intervals and generate a label with a colored square for each interval
                      div.innerHTML = '<h6>CARTE ALEA INTERACTION HOMME FAUNE SAUVAGE</h6>' 
                      for (var i = 0; i < grades.length; i++) {
                        if(grades[i] == 'FORT'){
                          div.innerHTML +=
                          grades[i] + '<p style="background-color:#780000;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;
                        }else if (grades[i] == 'MOYEN'){
                          div.innerHTML +=
                          grades[i] + '<p style="background-color:#9e2a2b;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;
                        }else{
                        div.innerHTML +=
                        grades[i] + '<p style="background-color:#bc4749;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                              ;
                      }
                          
                      }
                      return div;
                    };
                    //@ts-ignore
                    legendStock[nameCouche[1]].addTo(map);
                   break
                  case nameCouche[1] == 'CARTE_ATTENUATION_DU_RISQUE_ZOONOTIQUE_pg':
                       //@ts-ignore
                    legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                    //@ts-ignore
                    legendStock[nameCouche[1]].onAdd = function (map) {
                    
                      var div = L.DomUtil.create('div', 'info legend'),
                          grades = ['FORT', 'MOYEN', 'FAIBLE'],
                          labels = [];
                      div.style.background= '#d6ccc2';
                      div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                      div.style.borderRadius= '5px';
                      div.style.width= '200px';
                      div.style.height= '250px';
                      div.style.padding= '6px 8px';
                     
                      // loop through our density intervals and generate a label with a colored square for each interval
                      div.innerHTML = '<h6>CARTE ATTENUATION DU RISQUE ZOONOTIQUE</h6>' 
                      for (var i = 0; i < grades.length; i++) {
                        if(grades[i] == 'FORT'){
                          div.innerHTML +=
                          grades[i] + '<p style="background-color:#780000;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;
                        }else if (grades[i] == 'MOYEN'){
                          div.innerHTML +=
                          grades[i] + '<p style="background-color:#9e2a2b;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;
                        }else{
                        div.innerHTML +=
                        grades[i] + '<p style="background-color:#bc4749;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                              ;
                      }
                          
                      }
                      return div;
                    };
                    //@ts-ignore
                    legendStock[nameCouche[1]].addTo(map);
                    break;
                    case nameCouche[1] == 'CARTE_DU_RISQUE_ZOONOTIQUE_pg':
                       //@ts-ignore
                    legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                    //@ts-ignore
                    legendStock[nameCouche[1]].onAdd = function (map) {
                    
                      var div = L.DomUtil.create('div', 'info legend'),
                          grades = ['FORT', 'MOYEN', 'FAIBLE'],
                          labels = [];
                      div.style.background= '#d6ccc2';
                      div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                      div.style.borderRadius= '5px';
                      div.style.width= '200px';
                      div.style.height= '250px';
                      div.style.padding= '6px 8px';
                     
                      // loop through our density intervals and generate a label with a colored square for each interval
                      div.innerHTML = '<h6>CARTE DU RISQUE ZOONOTIQUE</h6>' 
                      for (var i = 0; i < grades.length; i++) {
                        if(grades[i] == 'FORT'){
                          div.innerHTML +=
                          grades[i] + '<p style="background-color:#780000;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;
                        }else if (grades[i] == 'MOYEN'){
                          div.innerHTML +=
                          grades[i] + '<p style="background-color:#9e2a2b;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;
                        }else{
                        div.innerHTML +=
                        grades[i] + '<p style="background-color:#bc4749;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                              ;
                      }
                          
                      }
                      return div;
                    };
                    //@ts-ignore
                    legendStock[nameCouche[1]].addTo(map);
                    break;  
                    case nameCouche[1] == 'CONCENTRATION_FAUNE_SAUVAGE_pg':
                        //@ts-ignore
                    legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                    //@ts-ignore
                    legendStock[nameCouche[1]].onAdd = function (map) {
                    
                      var div = L.DomUtil.create('div', 'info legend'),
                          grades = ['FORT', 'MOYEN', 'FAIBLE'],
                          labels = [];
                      div.style.background= '#d6ccc2';
                      div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                      div.style.borderRadius= '5px';
                      div.style.width= '200px';
                      div.style.height= '250px';
                      div.style.padding= '6px 8px';
                     
                      // loop through our density intervals and generate a label with a colored square for each interval
                      div.innerHTML = '<h6>CONCENTRATION FAUNE SAUVAGE</h6>' 
                      for (var i = 0; i < grades.length; i++) {
                        if(grades[i] == 'FORT'){
                          div.innerHTML +=
                          grades[i] + '<p style="background-color:#780000;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;
                        }else if (grades[i] == 'MOYEN'){
                          div.innerHTML +=
                          grades[i] + '<p style="background-color:#9e2a2b;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;
                        }else{
                        div.innerHTML +=
                        grades[i] + '<p style="background-color:#bc4749;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                              ;
                      }
                          
                      }
                      return div;
                    };
                    //@ts-ignore
                    legendStock[nameCouche[1]].addTo(map);
                       
                    break;  
                    case nameCouche[1] == 'CARTE_ENJEU_INDICE_PRESENCE_DE_FAUNE_SAUVAGE_pg':
                       //@ts-ignore
                       legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                       //@ts-ignore
                       legendStock[nameCouche[1]].onAdd = function (map) {
                       
                         var div = L.DomUtil.create('div', 'info legend'),
                             grades = ['FORT', 'MOYEN', 'FAIBLE'],
                             labels = [];
                         div.style.background= '#d6ccc2';
                         div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                         div.style.borderRadius= '5px';
                         div.style.width= '200px';
                         div.style.height= '250px';
                         div.style.padding= '6px 8px';
                        
                         // loop through our density intervals and generate a label with a colored square for each interval
                         div.innerHTML = '<h6>INDICE INTERACTION HOMME FAUNE ISSU DE VENTE ET CONSOMMATION ANIMAUX</h6>' 
                         for (var i = 0; i < grades.length; i++) {
                           if(grades[i] == 'FORT'){
                             div.innerHTML +=
                             grades[i] + '<p style="background-color:#283618;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                   ;
                           }else if (grades[i] == 'MOYEN'){
                             div.innerHTML +=
                             grades[i] + '<p style="background-color:#606c38;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                   ;
                           }else{
                           div.innerHTML +=
                           grades[i] + '<p style="background-color:#e9edc9;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                 ;
                         }
                             
                         }
                         return div;
                       };
                       //@ts-ignore
                       legendStock[nameCouche[1]].addTo(map);
                    break;  
  
                    case nameCouche[1] == 'AFFLEUREMENT_ROCHEUX_OCCUPATION_DU_SOL_pg':
                    //@ts-ignore
                    legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                    //@ts-ignore
                    legendStock[nameCouche[1]].onAdd = function (map) {
                    
                      var div = L.DomUtil.create('div', 'info legend')
                      div.style.background= '#d6ccc2';
                      div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                      div.style.borderRadius= '5px';
                      div.style.width= '200px';
                      div.style.height= '80px';
                      div.style.padding= '6px 8px';
                      // loop through our density intervals and generate a label with a colored square for each interval
                      div.innerHTML = '<h6>AFFLEUREMENT ROCHEUX OCCUPATION DU SOL</h6>' 
                      div.innerHTML +=
                          /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;*/
                            '<p style="background-color:#e77148;border: 2px solid red;width: 20px;height: 10px;"></p>'
                      
                      return div;
                    };
                    //@ts-ignore
                    legendStock[nameCouche[1]].addTo(map);
                      
                   break;
                   case nameCouche[1] == 'EXPLOITATION_AGRICOLE_OCCUPATION_DU_SOL_pg':
                    //@ts-ignore
                    legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                    //@ts-ignore
                    legendStock[nameCouche[1]].onAdd = function (map) {
                    
                      var div = L.DomUtil.create('div', 'info legend')
                      div.style.background= '#d6ccc2';
                      div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                      div.style.borderRadius= '5px';
                      div.style.width= '200px';
                      div.style.height= '80px';
                      div.style.padding= '6px 8px';
                      // loop through our density intervals and generate a label with a colored square for each interval
                      div.innerHTML = '<h6>EXPLOITATION AGRICOLE OCCUPATION DU SOL</h6>' 
                      div.innerHTML +=
                          /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;*/
                            '<p style="background-color:#987db7;border: 2px solid red;width: 20px;height: 10px;"></p>'
                      
                      return div;
                    };
                    //@ts-ignore
                    legendStock[nameCouche[1]].addTo(map);
                      
                   break;
                   case nameCouche[1] == 'FORET_OCCUPATION_DU_SOL_pg':
                    //@ts-ignore
                    legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                    //@ts-ignore
                    legendStock[nameCouche[1]].onAdd = function (map) {
                    
                      var div = L.DomUtil.create('div', 'info legend')
                      div.style.background= '#d6ccc2';
                      div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                      div.style.borderRadius= '5px';
                      div.style.width= '200px';
                      div.style.height= '80px';
                      div.style.padding= '6px 8px';
                      // loop through our density intervals and generate a label with a colored square for each interval
                      div.innerHTML = '<h6>FORET OCCUPATION DU SOL</h6>' 
                      div.innerHTML +=
                          /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;*/
                            '<p style="background-color:#becf50;border: 2px solid red;width: 20px;height: 10px;"></p>'
                      
                      return div;
                    };
                    //@ts-ignore
                    legendStock[nameCouche[1]].addTo(map);
                      
                   break;
                   case nameCouche[1] == 'HABITAT_ET_SOL_NU_OCCUPATION_DU_SOL_pg':
                    //@ts-ignore
                    legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                    //@ts-ignore
                    legendStock[nameCouche[1]].onAdd = function (map) {
                    
                      var div = L.DomUtil.create('div', 'info legend')
                      div.style.background= '#d6ccc2';
                      div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                      div.style.borderRadius= '5px';
                      div.style.width= '200px';
                      div.style.height= '80px';
                      div.style.padding= '6px 8px';
                      // loop through our density intervals and generate a label with a colored square for each interval
                      div.innerHTML = '<h6>HABITAT ET SOL NU OCCUPATION DU SOL</h6>' 
                      div.innerHTML +=
                          /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;*/
                            '<p style="background-color:#e15989;border: 2px solid red;width: 20px;height: 10px;"></p>'
                      
                      return div;
                    };
                    //@ts-ignore
                    legendStock[nameCouche[1]].addTo(map);
                      
                   break;
                   case nameCouche[1] == 'MARECAGE_OCCUPATION_DU_SOL_pg':
                    //@ts-ignore
                    legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                    //@ts-ignore
                    legendStock[nameCouche[1]].onAdd = function (map) {
                    
                      var div = L.DomUtil.create('div', 'info legend')
                      div.style.background= '#d6ccc2';
                      div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                      div.style.borderRadius= '5px';
                      div.style.width= '200px';
                      div.style.height= '80px';
                      div.style.padding= '6px 8px';
                      // loop through our density intervals and generate a label with a colored square for each interval
                      div.innerHTML = '<h6>MARECAGE OCCUPATION DU SOL</h6>' 
                      div.innerHTML +=
                          /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;*/
                            '<p style="background-color:#e5b636;border: 2px solid red;width: 20px;height: 10px;"></p>'
                      
                      return div;
                    };
                    //@ts-ignore
                    legendStock[nameCouche[1]].addTo(map);
                      
                   break;
                   case nameCouche[1] == 'PLAN_DEAU_OCCUPATION_DU_SOL_pg':
                    //@ts-ignore
                    legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                    //@ts-ignore
                    legendStock[nameCouche[1]].onAdd = function (map) {
                    
                      var div = L.DomUtil.create('div', 'info legend')
                      div.style.background= '#d6ccc2';
                      div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                      div.style.borderRadius= '5px';
                      div.style.width= '200px';
                      div.style.height= '80px';
                      div.style.padding= '6px 8px';
                      // loop through our density intervals and generate a label with a colored square for each interval
                      div.innerHTML = '<h6>PLAN DEAU OCCUPATION DU SOL</h6>' 
                      div.innerHTML +=
                          /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;*/
                            '<p style="background-color:#c43c39;border: 2px solid red;width: 20px;height: 10px;"></p>'
                      
                      return div;
                    };
                    //@ts-ignore
                    legendStock[nameCouche[1]].addTo(map);
                    pointer.CloseLoader()
                   break;
                   case nameCouche[1] == 'EXPLOITATION_AGRICOLE_OCCUPATION_DU_SOL_pg':
                    //@ts-ignore
                    legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                    //@ts-ignore
                    legendStock[nameCouche[1]].onAdd = function (map) {
                    
                      var div = L.DomUtil.create('div', 'info legend')
                      div.style.background= '#d6ccc2';
                      div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                      div.style.borderRadius= '5px';
                      div.style.width= '200px';
                      div.style.height= '80px';
                      div.style.padding= '6px 8px';
                      // loop through our density intervals and generate a label with a colored square for each interval
                      div.innerHTML = '<h6>EXPLOITATION AGRICOLE OCCUPATION DU SOL</h6>' 
                      div.innerHTML +=
                          /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;*/
                            '<p style="background-color:#987db7;border: 2px solid red;width: 20px;height: 10px;"></p>'
                      
                      return div;
                    };
                    //@ts-ignore
                    legendStock[nameCouche[1]].addTo(map);
                    pointer.CloseLoader()
                   break;
                   case nameCouche[1] == 'REBOISEMENT_OCCUPATION_DU_SOL_pg':
                    //@ts-ignore
                    legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                    //@ts-ignore
                    legendStock[nameCouche[1]].onAdd = function (map) {
                    
                      var div = L.DomUtil.create('div', 'info legend')
                      div.style.background= '#d6ccc2';
                      div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                      div.style.borderRadius= '5px';
                      div.style.width= '200px';
                      div.style.height= '80px';
                      div.style.padding= '6px 8px';
                      // loop through our density intervals and generate a label with a colored square for each interval
                      div.innerHTML = '<h6>REBOISEMENT OCCUPATION DU SOL</h6>' 
                      div.innerHTML +=
                          /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;*/
                            '<p style="background-color:#beb297;border: 2px solid red;width: 20px;height: 10px;"></p>'
                      
                      return div;
                    };
                    //@ts-ignore
                    legendStock[nameCouche[1]].addTo(map);
                    pointer.CloseLoader()
                   break;
  
                   case nameCouche[1] == 'SAVANE_ET_FORMATION_ARBUSTIVE_OCCUPATION_DU_SOL_pg':
                    //@ts-ignore
                    legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                    //@ts-ignore
                    legendStock[nameCouche[1]].onAdd = function (map) {
                    
                      var div = L.DomUtil.create('div', 'info legend')
                      div.style.background= '#d6ccc2';
                      div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                      div.style.borderRadius= '5px';
                      div.style.width= '200px';
                      div.style.height= '80px';
                      div.style.padding= '6px 8px';
                      // loop through our density intervals and generate a label with a colored square for each interval
                      div.innerHTML = '<h6>SAVANE ET FORMATION ARBUSTIVE OCCUPATION DU SOL</h6>' 
                      div.innerHTML +=
                          /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;*/
                            '<p style="background-color:#91522d;border: 2px solid red;width: 20px;height: 10px;"></p>'
                      
                      return div;
                    };
                    //@ts-ignore
                    legendStock[nameCouche[1]].addTo(map);
                    pointer.CloseLoader()
                   break;
  
                   case nameCouche[1] == 'INDICE_FAIBLE_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE_pg':
                    pointer.CloseLoader()
                    //@ts-ignore
                    legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                    //@ts-ignore
                    legendStock[nameCouche[1]].onAdd = function (map) {
                    
                      var div = L.DomUtil.create('div', 'info legend')
                      div.style.background= '#d6ccc2';
                      div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                      div.style.borderRadius= '5px';
                      div.style.width= '200px';
                      div.style.height= '80px';
                      div.style.padding= '6px 8px';
                      // loop through our density intervals and generate a label with a colored square for each interval
                      div.innerHTML = '<h6>INDICE FAIBLE INTOXICATION ANIMAUX PAR INTRANT AGRICOLE</h6>' 
                      div.innerHTML +=
                          /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;*/
                            '<p style="background-color:#7d8b8f;border: 2px solid red;width: 20px;height: 10px;"></p>'
                      
                      return div;
                    };
                    //@ts-ignore
                    legendStock[nameCouche[1]].addTo(map);
                    
                   break;
  
                   case nameCouche[1] == 'INDICE_FORT_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE_pg':
                    pointer.CloseLoader()
                    //@ts-ignore
                    legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                    //@ts-ignore
                    legendStock[nameCouche[1]].onAdd = function (map) {
                    
                      var div = L.DomUtil.create('div', 'info legend')
                      div.style.background= '#d6ccc2';
                      div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                      div.style.borderRadius= '5px';
                      div.style.width= '200px';
                      div.style.height= '80px';
                      div.style.padding= '6px 8px';
                      // loop through our density intervals and generate a label with a colored square for each interval
                      div.innerHTML = '<h6>INDICE FORT INTOXICATION ANIMAUX PAR INTRANT AGRICOLE</h6>' 
                      div.innerHTML +=
                          /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;*/
                            '<p style="background-color:#85b66f;border: 2px solid red;width: 20px;height: 10px;"></p>'
                      
                      return div;
                    };
                    //@ts-ignore
                    legendStock[nameCouche[1]].addTo(map);
                    
                   break;
  
                   case nameCouche[1] == 'INDICE_MOYEN_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE_pg':
                    //@ts-ignore
                    legendStock[nameCouche[1]] = L.control({position: 'bottomright'});
                    //@ts-ignore
                    legendStock[nameCouche[1]].onAdd = function (map) {
                    
                      var div = L.DomUtil.create('div', 'info legend')
                      div.style.background= '#d6ccc2';
                      div.style.boxShadow= '0 0 15px rgba(0,0,0,0.2)';
                      div.style.borderRadius= '5px';
                      div.style.width= '200px';
                      div.style.height= '80px';
                      div.style.padding= '6px 8px';
                      // loop through our density intervals and generate a label with a colored square for each interval
                      div.innerHTML = '<h6>INDICE MOYEN INTOXICATION ANIMAUX PAR INTRANT AGRICOLE</h6>' 
                      div.innerHTML +=
                          /*'<p style="background-color:#c6ac8f;border-radius: 50%;width: 15px;height: 15px;"></p>' 
                                ;*/
                            '<p style="background-color:#a47158;border: 2px solid red;width: 20px;height: 10px;"></p>'
                      
                      return div;
                    };
                    //@ts-ignore
                    legendStock[nameCouche[1]].addTo(map);
                    pointer.CloseLoader()
                   break;
                default:
                 
                  break;
              }
          // Charger la couche GeoJSON
          //@ts-ignore
          coucheDataMapStock[nameCouche[1]] = L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
              
              return L.circleMarker(latlng, styleMarqueur);
            },
            style: pointer.style,
            onEachFeature: function (feature, layer) {
              layer.on('click', pointer.afficherInfosSurClic.bind(this));
              layer.on('mouseover', pointer.highlightFeature.bind(this));
              layer.on('mouseout', function() {
                // Réinitialiser le style ici
                //@ts-ignore
                coucheDataMapStock[nameCouche[1]].resetStyle(this);
            });
            }
          });
          // Ajoutez la couche GeoJSON à la carte
          //@ts-ignore
          map.addLayer(coucheDataMapStock[nameCouche[1]]);
          pointer.CloseLoader()
          
        }
       
        // Utilisez les données JSON ici
      
      });
     }
   
  });


  map.on('overlayremove', function (eventLayer) {
    // Récupérez le nom de la couche retirée
    //@ts-ignore
    var nameCouche = eventLayer.layer.options.layers;
     nameCouche = nameCouche.split(':')
     var delcouche = nameCouche[1]
    // Supprimez les données associées à cette couche de l'objet
    //var layerToRemove = eventLayer.layer;
   
      if(nameCouche[1] == 'AFFLEUREMENT_ROCHEUX_OCCUPATION_DU_SOLNV'){
        //suppression de legende
      //@ts-ignore
      legendStock[delcouche].remove()
      
      //@ts-ignore
        delete legendStock[delcouche]
  } else if(nameCouche[1] == 'EXPLOITATION_AGRICOLE_OCCUPATION_DU_SOLNV'){
      //suppression de legende
      //@ts-ignore
      legendStock[delcouche].remove()
      
      //@ts-ignore
        delete legendStock[delcouche]
  }else if(nameCouche[1] == 'FORET_OCCUPATION_DU_SOLNV'){
      //suppression de legende
      //@ts-ignore
      legendStock[delcouche].remove()
      
      //@ts-ignore
        delete legendStock[delcouche]
  }else if(nameCouche[1] == 'HABITAT_ET_SOL_NU_OCCUPATION_DU_SOLNV'){
        //suppression de legende
        //@ts-ignore
        legendStock[delcouche].remove()
        
        //@ts-ignore
          delete legendStock[delcouche]
  }else if(nameCouche[1] == 'MARECAGE_OCCUPATION_DU_SOLNV'){
        //suppression de legende
        //@ts-ignore
        legendStock[delcouche].remove()
        
        //@ts-ignore
          delete legendStock[delcouche]
  }else if(nameCouche[1] == 'EXPLOITATION_AGRICOLE_OCCUPATION_DU_SOLNV'){
    //suppression de legende
        //@ts-ignore
        legendStock[delcouche].remove()
        
        //@ts-ignore
          delete legendStock[delcouche]
  }else if(nameCouche[1] == 'REBOISEMENT_OCCUPATION_DU_SOLNV'){
      //suppression de legende
        //@ts-ignore
        legendStock[delcouche].remove()
        
        //@ts-ignore
          delete legendStock[delcouche]
      
  }else if(nameCouche[1] == 'INDICE_FAIBLE_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLENV'){
        //suppression de legende
        //@ts-ignore
        legendStock[delcouche].remove()
        
        //@ts-ignore
          delete legendStock[delcouche]
  }else if(nameCouche[1] == 'INDICE_FORT_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLENV'){
      //suppression de legende
        //@ts-ignore
        legendStock[delcouche].remove()
        
        //@ts-ignore
          delete legendStock[delcouche]
  }else if(nameCouche[1] == 'INDICE_MOYEN_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLENV'){
    //suppression de legende
        //@ts-ignore
        legendStock[delcouche].remove()
        
        //@ts-ignore
          delete legendStock[delcouche]
  }else if(nameCouche[1] == 'SAVANE_ET_FORMATION_ARBUSTIVE_OCCUPATION_DU_SOLNV'){
    //suppression de legende
        //@ts-ignore
        legendStock[delcouche].remove()
        
        //@ts-ignore
          delete legendStock[delcouche]
  }else if(nameCouche[1] == "INDICE_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE"){
      //suppression de legende
    //@ts-ignore
    legendStock[delcouche].remove()
    
    //@ts-ignore
      delete legendStock[delcouche]

   }else if (nameCouche[1] == "OCCUPATION_DU_SOL"){
       //suppression de legende
    //@ts-ignore
    legendStock[delcouche].remove()
    
    //@ts-ignore
      delete legendStock[delcouche]
   }else{
    // Supprimez la couche de la carte
    //@ts-ignore
    map.removeLayer(coucheDataMapStock[delcouche]);
    //@ts-ignore
    delete coucheDataMap[delcouche];
     //@ts-ignore
    delete coucheDataMapStock[delcouche];
    map.invalidateSize();
   // map.removeLayer(layer); // Supprimez la couche de la carte

   //suppression de legende
    //@ts-ignore
    legendStock[delcouche].remove()
    
    //@ts-ignore
      delete legendStock[delcouche]
   
   }
   
   
  });
    //@ts-ignore
    const info = L.control();
  //@ts-ignore
    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };
    //@ts-ignore
    info.update = function (props) {
        this._div.innerHTML = '<h4>Information Carte</h4>' +
            (props ?
              '<b>Coordonnées:</b><br>' + props.lng + ', ' + props.lat :
              'Survolez la carte');
    };
  
  info.addTo(map);
  
  map.on('mousemove', function (event) {
      info.update(event.latlng
        );
  });
  // Interroger des informations attributaires




  
  
  
   //intergration de style

  

   map.invalidateSize();
  

  }

  chargementDate(){
    var pt = this
    $(function () {
      'use strict';
      $.fn.dataTable.ext.errMode = 'throw';
      $(".datatables-basic").DataTable().destroy();
      var dt_basic_table = $('.datatables-basic');
    
      // DataTable with buttons
      // --------------------------------------------------------------------
    
      if (dt_basic_table.length) {
        var dt_basic = dt_basic_table.DataTable({
          data: pt.recupDonneeTab,
          columns: [
            { data: 'DISTRICT_N' },  // Colonne "full_name"
            { data: 'DPT_NAM' },  // Colonne "full_name"
            { data: 'LAT_WGS84' },  // Colonne "full_name"
            { data: 'LOCALITY_N' },  // Colonne "email"
            { data: 'LON_WGS84' },  // Colonne "start_date"
            { data: 'REGION_NAM' },  // Colonne "salary"
            { data: 'SUBDPT_NAM' }  // Colonne "status"
          
          ],
          responsive: true,
          order: [[2, 'desc']],
          dom: '<"card-header"<"head-label text-center"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
          displayLength: 7,
          lengthMenu: [7, 10, 25, 50, 75, 100],
          buttons: [
            {
              extend: 'collection',
              className: 'btn btn-label-primary dropdown-toggle me-2',
              text: '<i class="mdi mdi-export-variant me-1"></i>Export',
              buttons: [
                {
                  extend: 'print',
                  text: '<i class="mdi mdi-printer-outline me-1" ></i>Print',
                  className: 'dropdown-item',
                  exportOptions: { columns: [0, 1, 2, 3, 4] }
                },
                {
                  extend: 'csv',
                  text: '<i class="mdi mdi-file-document-outline me-1" ></i>Csv',
                  className: 'dropdown-item',
                  exportOptions: { columns:  [0, 1, 2, 3, 4] }
                },
                {
                  extend: 'excel',
                  text: '<i class="mdi mdi-file-excel-outline me-1"></i>Excel',
                  className: 'dropdown-item',
                  exportOptions: { columns:  [0, 1, 2, 3, 4] }
                },
                {
                  extend: 'pdf',
                  text: '<i class="mdi mdi-file-pdf-box me-1"></i>Pdf',
                  className: 'dropdown-item',
                  exportOptions: { columns:  [0, 1, 2, 3, 4]}
                },
                {
                  extend: 'copy',
                  text: '<i class="mdi mdi-content-copy me-1" ></i>Copy',
                  className: 'dropdown-item',
                  exportOptions: { columns:  [0, 1, 2, 3, 4] }
                }
              ]
            }
          ]
        });
        
        $('div.head-label').html('<h5 class="card-title mb-0">Consultion</h5>');
      }
});
  }

  supprLegend(legendName:any){
    if(legendName == 'VILLE_CHEF-LIEU_DE_DEPARTEMENT_pg'){
      //@ts-ignore
      this.legendVILLE_CHEFLIEU_DE_DEPARTEMENT_pg.remove()
    }
  }

  openModal(){
    $('#pricingModal').modal('show');
    setTimeout(() => {
      this.chargementDate()
    }, 2000);
  }

  ngOnInit(): void {
    var pt = this
    if (!sessionStorage.getItem('isLoggedIn')) {
      window.location.href = '/auth';
    }
    setTimeout(() => {
      this.CarteMap();
    }, 1000);
  }
}
