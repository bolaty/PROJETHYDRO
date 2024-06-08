import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as L from 'leaflet';
import 'leaflet.wms';
import { layer } from 'leaflet.wms';
declare var $: any;
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
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

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

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
    var DISTRICT_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:DISTRICT_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
   })
   DISTRICT_pg.bringToBack()

   var REGIONS_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:REGIONS_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   
   }).bringToFront()

   var DEPARTEMENTS_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:DEPARTEMENTS_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
   }).bringToFront()

   var SOUS_PREFECTURES_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:SOUS_PREFECTURES_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
    opacity: 0.4 // Réglez l'opacité à 70%
   }).bringToFront()

   var VILLAGE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:VILLAGE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
    opacity: 0.4 // Réglez l'opacité à 70%
   }).bringToFront()

   var VILLE_CHEF_LIEU_DE_DEPARTEMENT_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:VILLE_CHEF-LIEU_DE_DEPARTEMENT_pg',
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
    layers: 'dbHydrographieNew:CAMPEMENTS_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   }).bringToFront()
   
   //HYDROGRAPHIE
   
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

   var HYDROGRAPHIE_SURFACE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:HYDROGRAPHIE_SURFACE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true,
   }).bringToFront()

   var FORETS_CLASSEES_PARCS_NATIONAUX_ET_RESERVES_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:FORETS_CLASSEES_PARCS_NATIONAUX_ET_RESERVES_pg',
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
   
   


   //INDICE
   

   var INTERACTION_HFS_NIVEAU_INFILTRATION_SITES_CONCENTRATION_FS_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:INTERACTION_H-FS_NIVEAU_INFILTRATION_SITES_CONCENTRATION_FS_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
   }).bringToFront()

   var INTERACTION_HFS_PNOMBRE_SITES_VENTE_CONSOMMATION_FS_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:INTERACTION_H-FS_PNOMBRE_SITES_VENTE_CONSOMMATION_FS_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
   }).bringToFront()

   var POPULATION_SOUSPREFECTURE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:POPULATION_SOUS-PREFECTURE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
   }).bringToFront()

   var PROTECTION_FCPARC_NOMBRE_AGENTS_FORESTIERS_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:PROTECTION_FC- PARC_NOMBRE_AGENTS_FORESTIERS_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
   }).bringToFront()

   var PROTECTION_FCPARC_NOMBRE_PATROUILLE_ANNUELLE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:PROTECTION_FC-PARC_NOMBRE_PATROUILLE_ANNUELLE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
   }).bringToFront()
   
   //CARTE
   var CARTE_ALEA_INTERACTION_HOMME_FAUNE_SAUVAGE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:CARTE_ALEA_INTERACTION_HOMME_FAUNE_SAUVAGE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
   }).bringToFront()

   var CARTE_ATTENUATION_DU_RISQUE_ZOONOTIQUE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:CARTE_ATTENUATION_DU_RISQUE_ZOONOTIQUE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
   }).bringToFront()

   var CARTE_DU_RISQUE_ZOONOTIQUE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:CARTE_DU_RISQUE_ZOONOTIQUE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
   }).bringToFront()

   
   var CARTE_ENJEU_INDICE_DE_PRESENCE_DE_LA_FAUNE_SAUVAGE_pg = new L.TileLayer.WMS('http://localhost:8080/geoserver/wms', {
    layers: 'dbHydrographieNew:CARTE_ENJEU_INDICE_DE_PRESENCE_DE_LA_FAUNE_SAUVAGE_pg',
    //styles?: string | undefined;
    format: 'image/png',
    transparent: true
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


  
   //initialisation des groupes

   //var groupeCartes = L.layerGroup([wmsLayer, wmsLayer1, wmsLayer2]);

   //initialisation des modeles de vue
   var baseMaps = {
    "Open Street Map": osm,
    "Open Street Map OT": osmHOT,
    "Open Topo Map":OpenTopoMap
   };

    //preparation des couches

   var overlayMaps = {
    'DISTRICT':DISTRICT_pg,
    'REGIONS':REGIONS_pg,
    'DEPARTEMENTS':DEPARTEMENTS_pg,
    'SOUS PREFECTURES':SOUS_PREFECTURES_pg,
    'VILLE CHEF LIEU DE DISTRICT':VILLE_CHEFLIEU_DE_DISTRICT_pg,
    'VILLE_CHEF LIEU DE DEPARTEMENT':VILLE_CHEF_LIEU_DE_DEPARTEMENT_pg,
    'VILLE_CHEF LIEU DE REGION':VILLE_CHEFLIEU_DE_REGION_pg,
    'VILLE_CHEF LIEU DE SOUS PREFECTURE':VILLE_CHEFLIEU_DE_SOUS_PREFECTURE_pg,
    'VILLAGE':VILLAGE_pg,
    'CAMPEMENTS':CAMPEMENTS_pg,

    //'HYDROGRAPHIE DISTRICT DE MONTAGNES':HYDROGRAPHIE_DISTRICT_DE__MONTAGNES_pg,
    'HYDROGRAPHIE LIGNE FLEUVE CAVALLY':HYDROGRAPHIE_LIGNE_FLEUVE_CAVALLY_pg,
    'HYDROGRAPHIE_LIGNE RIVIERE MAJEURE':HYDROGRAPHIE_LIGNE_RIVIERE_MAJEURE_pg,
    'HYDROGRAPHIE LIGNE RIVIERE MINEURE':HYDROGRAPHIE_LIGNE_RIVIERE_MINEURE_pg,
    'HYDROGRAPHIE SURFACE':HYDROGRAPHIE_SURFACE_pg,
    'FORETS CLASSEES PARCS NATIONAUX ET RESERVES':FORETS_CLASSEES_PARCS_NATIONAUX_ET_RESERVES_pg,
    'RESEAU ROUTIER PISTE':RESEAU_ROUTIER_PISTE_pg,
    'RESEAU ROUTIER ROUTE BITUMEE':RESEAU_ROUTIER_ROUTE_BITUMEE_pg,
    'RESEAU ROUTIER ROUTE NON BITUMEE':RESEAU_ROUTIER_ROUTE_NON_BITUMEE_pg,

   //INDICE
   'INTERACTION HFS NIVEAU INFILTRATION SITES CONCENTRATION FS':INTERACTION_HFS_NIVEAU_INFILTRATION_SITES_CONCENTRATION_FS_pg,
   'INTERACTION HFS PNOMBRE SITES VENTE CONSOMMATION FS':INTERACTION_HFS_PNOMBRE_SITES_VENTE_CONSOMMATION_FS_pg,
   'POPULATION SOUSPREFECTURE':POPULATION_SOUSPREFECTURE_pg,
   'PROTECTION FCPARC NOMBRE AGENTS FORESTIERS':PROTECTION_FCPARC_NOMBRE_AGENTS_FORESTIERS_pg,
   'PROTECTION FCPARC NOMBRE PATROUILLE ANNUELLE':PROTECTION_FCPARC_NOMBRE_PATROUILLE_ANNUELLE_pg,

    'CARTE ALEA INTERACTION HOMME FAUNE SAUVAGE':CARTE_ALEA_INTERACTION_HOMME_FAUNE_SAUVAGE_pg,
    'CARTE ATTENUATION DU RISQUE ZOONOTIQUE':CARTE_ATTENUATION_DU_RISQUE_ZOONOTIQUE_pg,
    'CARTE DU RISQUE ZOONOTIQUE':CARTE_DU_RISQUE_ZOONOTIQUE_pg,

    'CARTE ENJEU INDICE DE PRESENCE DE LA FAUNE SAUVAGE':CARTE_ENJEU_INDICE_DE_PRESENCE_DE_LA_FAUNE_SAUVAGE_pg,
    'CONCENTRATION FAUNE SAUVAGE':CONCENTRATION_FAUNE_SAUVAGE_pg,
    'COURBES DE NIVEAUX':COURBES_DE_NIVEAUX_pg
    
   };
  // this.recupCouche.push(overlayMaps)
   //ajout des couches a la cartes.
   var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
   var coucheDataMap = {};
  var coucheDataMapStock = {};
  var pointer = this
   map.on('overlayadd', function (eventLayer) {
    // Réagissez au clic sur le groupe de couches ici
    //alert("Le groupe de couches a été ajouté à la carte.");
    layerControl
  //@ts-ignore
    var nameCouche = eventLayer.layer.options.layers.split(':')
     var lien = 'assets/GeoJSONFile/' + nameCouche[1] + '.json'
     
    pointer.http.get(lien).subscribe(data => {
      console.log(data);
     // pointer.recupDonnee =[]
    
      //@ts-ignore
      if(data.features == undefined || data.features == null){

      }else{
       // Utilisez le nom de la couche comme clé pour associer les données à la couche
       //@ts-ignore
       coucheDataMap[nameCouche[1]] = data.features;
        //@ts-ignore
        //coucheDataMapStock[nameCouche[1]] = eventLayer;
        var styleDepartement = {
          color: "green",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.2,
          zIndex: 3,
      };
        // Charger la couche GeoJSON
        //@ts-ignore
        coucheDataMapStock[nameCouche[1]] = L.geoJSON(data, {
          //style: styleDepartement,
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
       
        
      }
     
      // Utilisez les données JSON ici
    
    });
  });
   //@ts-ignore
   var legend = L.control({position: 'bottomright'});
//@ts-ignore
legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 10, 20, 50, 100, 200, 500, 1000],
      labels = [];

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
          '<i style="background:' + pointer.getColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }

  return div;
};

legend.addTo(map);
  map.on('overlayremove', function (eventLayer) {
    // Récupérez le nom de la couche retirée
    //@ts-ignore
    var nameCouche = eventLayer.layer.options.layers;
     nameCouche = nameCouche.split(':')
     var delcouche = nameCouche[1]
    // Supprimez les données associées à cette couche de l'objet
    //var layerToRemove = eventLayer.layer;

  // Supprimez la couche de la carte
  //@ts-ignore
  map.removeLayer(coucheDataMapStock[delcouche]);
    //@ts-ignore
    delete coucheDataMap[delcouche];
     //@ts-ignore
    delete coucheDataMapStock[delcouche];
    map.invalidateSize();
   // map.removeLayer(layer); // Supprimez la couche de la carte
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

  openModal(){
    $('#pricingModal').modal('show');
    setTimeout(() => {
      this.chargementDate()
    }, 2000);
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem('isLoggedIn')) {
      window.location.href = '/auth';
    }
    setTimeout(() => {
      this.CarteMap();
    }, 1000);
  }
}