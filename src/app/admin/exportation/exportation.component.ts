import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as L from 'leaflet';
import 'leaflet.wms';
import 'leaflet-rastercoords';
import { layer } from 'leaflet.wms';
declare var $: any;
import  Swal  from "sweetalert2"
@Component({
  selector: 'app-exportation',
  templateUrl: './exportation.component.html',
  styleUrls: ['./exportation.component.scss']
})
export class ExportationComponent {
  tableauObjets:any = [
    
    { libelle: 'VILLE CHEF LIEU DE DISTRICT', valeur: 'VILLE_CHEF-LIEU_DE_DISTRICT_pg', source: 'VILLE_CHEF-LIEU_DE_DISTRICT' },
    { libelle: 'VILLE_CHEF LIEU DE DEPARTEMENT', valeur: 'VILLE_CHEF-LIEU_DE_DEPARTEMENT_pg', source: 'VILLE_CHEF-LIEU_DE_DEPARTEMENT' },
    { libelle: 'VILLE_CHEF LIEU DE REGION', valeur: 'VILLE_CHEF-LIEU_DE_REGION_pg', source: 'VILLE_CHEF-LIEU_DE_REGION' },
    { libelle: 'VILLE_CHEF LIEU DE SOUS PREFECTURE', valeur: 'VILLE_CHEF-LIEU_DE_SOUS_PREFECTURE_pg', source: 'VILLE_CHEF-LIEU_DE_SOUS_PREFECTURE' },
    { libelle: 'VILLAGE', valeur: 'VILLAGE_pg', source: 'VILLAGE' },
    { libelle: 'CAMPEMENTS', valeur: 'CAMPEMENTS_pg', source: 'CAMPEMENTS' },
    { libelle: 'DISTRICT', valeur: 'DISTRICT_pg', source: 'DISTRICT' },
    { libelle: 'REGIONS', valeur: 'REGIONS_pg', source: 'REGIONS' },
    { libelle: 'DEPARTEMENTS', valeur: 'DEPARTEMENTS_pg', source: 'DEPARTEMENTS' },
    { libelle: 'SOUS PREFECTURES', valeur: 'SOUS_PREFECTURES_pg', source: 'SOUS_PREFECTURES' },
    { libelle: 'ILOTS FORETS', valeur: 'ILOTS_FORETS_HORS_FORETS_CLASSEES_ET_PARCS_pg', source: 'ILOTS_FORETS_HORS_FORETS_CLASSEES_ET_PARCS' },
    { libelle: 'POP SOUSPREFECTURE', valeur: 'POPULATION_SOUS-PREFECTURE_pg', source: 'VILLE_CHEFLIEU_DE_DISTRICT_pg' },
    { libelle: 'DENSITE POPULATION', valeur: 'DENSITE_POPULATION_SOUS__PREFECTORALE_pg', source: 'DENSITE_POPULATION_SOUS__PREFECTORALE' },
    { libelle: 'FORETS CLASSEES ET PARCS', valeur: 'FORETS_CLASSEES_PARCS_NATIONAUX_ET_RESERVES_pg', source: 'FORETS_CLASSEES_PARCS_NATIONAUX_ET_RESERVES' },
    { libelle: 'AFFLEUREMENT ROCHEUX ', valeur: 'AFFLEUREMENT_ROCHEUX_OCCUPATION_DU_SOL_pg', source: 'AFFLEUREMENT_ROCHEUX_OCCUPATION_DU_SOL' },
    { libelle: 'EXPLOITATION AGRICOLE ', valeur: 'EXPLOITATION_AGRICOLE_OCCUPATION_DU_SOL_pg', source: 'EXPLOITATION_AGRICOLE_OCCUPATION_DU_SOL' },
    { libelle: 'FORET ', valeur: 'FORET_OCCUPATION_DU_SOL_pg', source: 'FORET_OCCUPATION_DU_SOL' },
    { libelle: 'HABITAT ET SOL NU ', valeur: 'HABITAT_ET_SOL_NU_OCCUPATION_DU_SOL_pg', source: 'HABITAT_ET_SOL_NU_OCCUPATION_DU_SOL' },
    { libelle: 'MARECAGE ', valeur: 'MARECAGE_OCCUPATION_DU_SOL_pg', source: 'MARECAGE_OCCUPATION_DU_SOL' },
    { libelle: 'PLAN D EAU ', valeur: 'PLAN_DEAU_OCCUPATION_DU_SOL_pg', source: "PLAN_D'EAU_OCCUPATION_DU_SOL"},
    { libelle: 'REBOISEMENT ', valeur: 'REBOISEMENT_OCCUPATION_DU_SOL_pg', source: 'REBOISEMENT_OCCUPATION_DU_SOL' },
    { libelle: 'SAVANE ET FORMATION ', valeur: 'SAVANE_ET_FORMATION_ARBUSTIVE_OCCUPATION_DU_SOL_pg', source: 'SAVANE_ET_FORMATION_ARBUSTIVE_OCCUPATION_DU_SOL' },
    { libelle: 'HYDROGRAPHIE FLEUVE', valeur: 'HYDROGRAPHIE_LIGNE_FLEUVE_CAVALLY_pg', source: 'HYDROGRAPHIE_LIGNE_FLEUVE_CAVALLY' },
    { libelle: 'HYDROGRAPHIE RIVIERE MAJEURE', valeur: 'HYDROGRAPHIE_LIGNE_RIVIERE_MAJEURE_pg', source: 'HYDROGRAPHIE_LIGNE_RIVIERE_MAJEURE' },
    { libelle: 'HYDROGRAPHIE RIVIERE MINEURE', valeur: 'HYDROGRAPHIE_LIGNE_RIVIERE_MINEURE_pg', source: 'HYDROGRAPHIE_LIGNE_RIVIERE_MINEURE' },
    { libelle: 'HYDROGRAPHIE SURFACE', valeur: 'HYDROGRAPHIE_SURFACE_pg', source: 'HYDROGRAPHIE_SURFACE' },
    { libelle: 'RESEAU ROUTIER PISTE', valeur: 'RESEAU_ROUTIER_PISTE_pg', source: 'VILLE_CHEFLIEU_DE_DISTRICT_pg' },
    { libelle: 'RESEAU ROUTIER ROUTE BITUMEE', valeur: 'RESEAU_ROUTIER_ROUTE_BITUMEE_pg', source: 'VILLE_CHEFLIEU_DE_DISTRICT_pg' },
    { libelle: 'RESEAU ROUTIER ROUTE NON BITUMEE', valeur: 'RESEAU_ROUTIER_ROUTE_NON_BITUMEE_pg', source: 'VILLE_CHEFLIEU_DE_DISTRICT_pg' },
    { libelle: 'INDICE FINAL INTERFACE HUMAIN FAUNE ', valeur: 'INDICE_FINAL_DE_RISQUE_DE_ZOONOSE_DANS_LE_DISTRICT_DES_MONTAGNE_AVEC_ZONE_TAMPON_DE_5KM_pg', source: 'VILLE_CHEFLIEU_DE_DISTRICT_pg' },
    { libelle: 'INDICE VENTE ET CONSOMMATION', valeur: 'INDICE_INTERACTION_HOMME_FAUNE_1_(VENTE_ET_CONSOMMATION_FAUNE_SAUVAGE)_pg', source: 'INDICE_INTERACTION_HOMME_FAUNE_1_(VENTE_ET_CONSOMMATION_FAUNE_SAUVAGE)' },
    { libelle: 'LONGUEUR ROUTE RAYON DE 5 KM', valeur: 'INDICE_INTERACTION_HOMME_FAUNE_2_(LONGUEUR_ROUTE_RAYON_DE_5_KM_AUTOUR_DES_FORETS CLASSEES_ET_PARCS)_pg', source: 'INDICE_INTERACTION_HOMME_FAUNE_2_(LONGUEUR_ROUTE_RAYON_DE_5_KM_AUTOUR_DES_FORETS CLASSEES_ET_PARCS)' },
    { libelle: 'CONCENTRATION LOCALITE RAYON DE 5 KM', valeur: 'INDICE_INTERACTION_HOMME_FAUNE_3_(CONCENTRATION_LOCALITE_RAYON_DE_5_KM_AUTOUR_DES_FORETS CLASSEES_ET_PARCS)_pg', source: 'INDICE_INTERACTION_HOMME_FAUNE_3_(CONCENTRATION_LOCALITE_RAYON_DE_5_KM_AUTOUR_DES_FORETS CLASSEES_ET_PARCS)' },
    { libelle: 'NIVEAU_INFILTRATION', valeur: 'INDICE_INTERACTION_HOMME_FAUNE_4_(NIVEAU_INFILTRATION)_pg', source: 'INDICE_INTERACTION_HOMME_FAUNE_4_(NIVEAU_INFILTRATION)' },
    { libelle: 'DENSITE POP SOUS PREFECT RAYON DE 5 KM', valeur: 'INDICE_INTERACTION_HOMME_FAUNE_5_(DENSITE_POPULATION_SOUS__PREFECTORALE_RAYON_DE_5_KM_AUTOUR_DES_FORETS_CLASSEES_ET_PARCS)_pg', source: 'INDICE_INTERACTION_HOMME_FAUNE_5_(DENSITE_POPULATION_SOUS__PREFECTORALE_RAYON_DE_5_KM_AUTOUR_DES_FORETS_CLASSEES_ET_PARCS)' },
    { libelle: 'INDICE FAIBLE INTOXICATION ', valeur: 'INDICE_FAIBLE_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE_pg', source: 'POTENTIEL_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE' },
    { libelle: 'INDICE FORT INTOXICATION ', valeur: 'INDICE_FORT_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE_pg', source: 'POTENTIEL_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE' },
    { libelle: 'INDICE MOYEN INTOXICATION ', valeur: 'INDICE_MOYEN_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE_pg', source: 'POTENTIEL_INTOXICATION_ANIMAUX_PAR_INTRANT_AGRICOLE' }
];
active_2:any =''
elmtsTab:any 

recupCouche:any =[]
recupDonnee:any =[]
recupDonneeTab:any =[]
tabform:any =[
  'ID',
  'NOM',
  'PRENOMS',
  'AGE',
  'NIVEAU',
  'PRO'
]
statForm:boolean=true
stattabformselect:boolean=false
URL:any =''
FILENAME:any =''

URLCPG:any =''
URLDBF:any =''
URLPRJ:any =''
URLQIX:any =''
URLSBN:any =''
URLSBX:any =''
URLSHP:any =''
URLSHX:any =''

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



SelectInvoice(index: number, obj:any) {
  this.statForm = false
  this.ShowLoader()
  this.elmtsTab = obj

  if(this.tabform.length> 0){
    this.recupDonneeTab = []
     this.tabform = []
     
    /* var tbody = document.querySelector('table tbody')
    if(tbody){
       tbody.parentNode?.removeChild(tbody)
    }*/
  }
  // Réinitialiser la classe active pour tous les éléments
  for (let i = 0; i < this.tableauObjets.length; i++) {
    const element = document.querySelector('.elemclic' + i);
    if (element) {
      element.classList.remove('active');
    }
  }
  
  // Ajouter la classe active à l'élément cliqué
  const clickedElement = document.querySelector('.elemclic' + index);
  if (clickedElement) {
    clickedElement.classList.add('active');
  }

  var lien = 'assets/donnee/' + obj.valeur + '.json'
  this.URL = lien
  this.FILENAME = obj.source
  this.URLCPG = 'assets/donneesource/' + obj.source + '.cpg'
  this.URLDBF= 'assets/donneesource/' + obj.source + '.dbf'
  this.URLPRJ= 'assets/donneesource/' + obj.source + '.prj'
  this.URLQIX= 'assets/donneesource/' + obj.source + '.qix'
  this.URLSBN= 'assets/donneesource/' + obj.source + '.sbn'
  this.URLSBX= 'assets/donneesource/' + obj.source + '.sbx'
  this.URLSHP= 'assets/donneesource/' + obj.source + '.shp'
  this.URLSHX= 'assets/donneesource/' + obj.source + '.shx'
  this.http.get(lien).subscribe(data => {
    console.log(data);
   // pointer.recupDonnee =[]
   this.stattabformselect = true
   this.tabform =[]
    //@ts-ignore
    if(data.features == undefined || data.features == null){

    }else{
     // Utilisez le nom de la couche comme clé pour associer les données à la couche
     this.recupDonneeTab = []
     //@ts-ignore
   
     for(let i =0;i<data.features.length;i++){//@ts-ignore
      this.recupDonneeTab.push(data.features[i].properties)
     }
      var objs ={
         data: ''
      }
      var tabformss =[]
     for (const key in this.recupDonneeTab[0]) {
      if (this.recupDonneeTab[0].hasOwnProperty(key)) {
        //propertiesList += `<li>${key}: ${properties[key]}</li>`;
        objs ={
          data: key
       }
       tabformss.push(objs)
       objs ={
        data: ''
       }
      }
    }
    this.tabform = tabformss
    this.statForm = true
   // this.CloseLoader()
    setTimeout(() => {
      
      this.chargementDate()
    }, 9000);
     
    
    }
   
  });
}

chargementDatedelete(){
  var pt = this
    $(function () {
      'use strict';
      $.fn.dataTable.ext.errMode = 'throw';
      $(".datatables-basic").DataTable().destroy();
      var dt_basic_table = $('.datatables-basic');
    
      
  });
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
      var indices = pt.tabform.map((v:any, i:any) => i)
      if (dt_basic_table.length) {
        var dt_basic = dt_basic_table.DataTable({
          data: pt.recupDonneeTab,
          columns: pt.tabform/*[
            { data: 'AIRE_KM2' },  // Colonne "full_name"
            { data: 'DISTRICT' },  // Colonne "full_name"
            { data: 'PERIM_KM' },  // Colonne "full_name"
            { data: 'POP_F_14' },  // Colonne "email"
            { data: 'POP_H_14' },  // Colonne "start_date"
            { data: 'POP_T_14' }  // Colonne "status"
          
          ]*/,
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
                  exportOptions: { columns: indices /*[0, 1, 2, 3, 4] */}
                },
                {
                  extend: 'csv',
                  text: '<i class="mdi mdi-file-document-outline me-1" ></i>Csv',
                  className: 'dropdown-item',
                  exportOptions: { columns:  indices /*[0, 1, 2, 3, 4] */ }
                },
                {
                  extend: 'excel',
                  text: '<i class="mdi mdi-file-excel-outline me-1"></i>Excel',
                  className: 'dropdown-item',
                  exportOptions: { columns:  indices /*[0, 1, 2, 3, 4] */ }
                },
                {
                  extend: 'pdf',
                  text: '<i class="mdi mdi-file-pdf-box me-1"></i>Pdf',
                  className: 'dropdown-item',
                  exportOptions: { columns:  indices /*[0, 1, 2, 3, 4] */}
                },
                {
                  extend: 'copy',
                  text: '<i class="mdi mdi-content-copy me-1" ></i>Copy',
                  className: 'dropdown-item',
                  exportOptions: { columns:  indices /*[0, 1, 2, 3, 4] */ }
                }
              ]
            }
          ]
        });
        
        $('div.head-label').html('<h5 class="card-title mb-0">Consultation</h5>');
      }
  });

  this.CloseLoader()

  }

  telechargerJSON(){
    const lien1 = document.createElement('a')

    lien1.setAttribute('href', this.URLCPG)
    lien1.setAttribute('download', this.FILENAME)

    
    lien1.style.display = 'none'
    document.body.appendChild(lien1)
    lien1.click()
    document.body.removeChild(lien1)

    const lien2 = document.createElement('a')

    lien2.setAttribute('href', this.URLDBF)
    lien2.setAttribute('download', this.FILENAME)

    
    lien2.style.display = 'none'
    document.body.appendChild(lien2)
    lien2.click()
    document.body.removeChild(lien2)


    const lien3 = document.createElement('a')

    lien3.setAttribute('href', this.URLPRJ)
    lien3.setAttribute('download', this.FILENAME)

    
    lien3.style.display = 'none'
    document.body.appendChild(lien3)
    lien3.click()
    document.body.removeChild(lien3)


    const lien4 = document.createElement('a')

    lien4.setAttribute('href', this.URLQIX)
    lien4.setAttribute('download', this.FILENAME)

    
    lien4.style.display = 'none'
    document.body.appendChild(lien4)
    lien4.click()
    document.body.removeChild(lien4)

    const lien5 = document.createElement('a')

    lien5.setAttribute('href', this.URLSBN)
    lien5.setAttribute('download', this.FILENAME)

    
    lien5.style.display = 'none'
    document.body.appendChild(lien5)
    lien5.click()
    document.body.removeChild(lien5)

    const lien6 = document.createElement('a')

    lien6.setAttribute('href', this.URLSBX)
    lien6.setAttribute('download', this.FILENAME)

    
    lien6.style.display = 'none'
    document.body.appendChild(lien6)
    lien6.click()
    document.body.removeChild(lien6)

    const lien7 = document.createElement('a')

    lien7.setAttribute('href', this.URLSHP)
    lien7.setAttribute('download', this.FILENAME)

    
    lien7.style.display = 'none'
    document.body.appendChild(lien7)
    lien7.click()
    document.body.removeChild(lien7)

    const lien8 = document.createElement('a')

    lien8.setAttribute('href', this.URLSHX)
    lien8.setAttribute('download', this.FILENAME)

    
    lien8.style.display = 'none'
    document.body.appendChild(lien8)
    lien8.click()
    document.body.removeChild(lien8)
  }


  ngOnInit(): void {
    if (!sessionStorage.getItem('isLoggedIn')) {
      window.location.href = '/auth';
    }
  }
}
