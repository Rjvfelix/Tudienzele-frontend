import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.css']
})
export class MasterListComponent implements OnInit {
  beneficiaries: any[] = [];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: gql`
        query GetAllBeneficiaries {
          getAllBeneficiaries {
            id
            firstname
            postname
            lastname
          }
        }
      `
    })
    .valueChanges
    .subscribe(({ data, loading, error }) => {
      this.beneficiaries = data?.getAllBeneficiaries;
      this.loading = loading;
      this.error = error;
    });
  }
}

