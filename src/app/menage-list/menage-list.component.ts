import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-menage-list',
  templateUrl: './menage-list.component.html',
  styleUrls: ['./menage-list.component.css']
})
export class MenageListComponent implements OnInit {
  menages: any[] = [];
  loading = true;
  error: any;
  page = 0;
  size = 20;
  totalPages = 1;
  isLoadingMore = false;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.loadPage(0);
  }

  loadPage(page: number) {
    if (this.isLoadingMore || (this.totalPages && page >= this.totalPages)) return;
    this.isLoadingMore = true;
    this.apollo.query<any>({
      query: gql`
        query GetMenagesPaginated($page: Int!, $size: Int!) {
          getMenagesPaginated(page: $page, size: $size) {
            content {
              id
              codeMenage
              name
              village { id name }
              subVillage { id name }
              chefMenage { id firstname lastname }
              address
              Latitude
              Longitude
              presenceInfra
              typeAgriculture
              betail
              organisationAgricole
              residence
              accesTerre
              createdBy
              createdDate
              lastModifiedBy
              lastModifiedDate
            }
            totalElements
            totalPages
          }
        }
      `,
      variables: { page, size: this.size },
      fetchPolicy: 'network-only'
    }).subscribe({
      next: ({ data }) => {
        const result = data.getMenagesPaginated;
        if (page === 0) {
          this.menages = result.content;
        } else {
          this.menages = [...this.menages, ...result.content];
        }
        this.totalPages = result.totalPages;
        this.page = page;
        this.loading = false;
        this.isLoadingMore = false;
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
        this.isLoadingMore = false;
      }
    });
  }

  onScroll() {
    if (!this.loading && !this.isLoadingMore && this.page + 1 < this.totalPages) {
      this.loadPage(this.page + 1);
    }
  }

  handleTableScroll(event: any) {
    const element = event.target;
    // Correction de la détection du bas du scroll (plus tolérante)
    if (element.scrollTop + element.clientHeight >= element.scrollHeight - 2) {
      this.onScroll();
    }
  }
}

