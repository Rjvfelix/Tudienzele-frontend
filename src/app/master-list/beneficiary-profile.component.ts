import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-beneficiary-profile',
  templateUrl: './beneficiary-profile.component.html',
  styleUrls: ['./beneficiary-profile.component.css']
})
export class BeneficiaryProfileComponent implements OnChanges {
  @Input() beneficiary: any;

  ngOnChanges() {
    console.log('BeneficiaryProfileComponent beneficiary:', this.beneficiary);
  }

  getOtherKeys(obj: any): string[] {
    if (!obj) return [];
    const known = [
      'id', 'codeBeneficiary', 'firstname', 'postname', 'lastname',
      'menage', 'isHead', 'liaisonChefMenage', 'contact', 'sexe',
      'isNaissanceKnown', 'dateNaissance', 'age', 'statusMatrimonial',
      'education', 'handicap', 'agr', 'serviceFinaciere', 'observations',
      'logaltoCode', 'createdBy', 'createdDate', 'lastModifiedBy', 'lastModifiedDate',
      'deleted', 'synced'
    ];
    return Object.keys(obj).filter(k => known.indexOf(k) === -1);
  }
}

