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
  page = 0;
  size = 20;
  totalPages = 1;
  isLoadingMore = false;
  selectedBeneficiary: any = null;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.loadPage(0);
  }

  loadPage(page: number) {
    if (this.isLoadingMore || (this.totalPages && page >= this.totalPages)) return;
    this.isLoadingMore = true;
    this.apollo.query<any>({
      query: gql`
        query GetBeneficiariesPaginated($page: Int!, $size: Int!) {
          getBeneficiariesPaginated(page: $page, size: $size) {
            content {
              id
              firstname
              postname
              lastname
              codeBeneficiary
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
        const result = data.getBeneficiariesPaginated;
        if (page === 0) {
          this.beneficiaries = result.content;
        } else {
          this.beneficiaries = [...this.beneficiaries, ...result.content];
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

  onEdit(beneficiary: any) {
    // TODO: ouvrir le formulaire d'édition du bénéficiaire
    console.log('Edit beneficiary', beneficiary);
  }

  onDelete(beneficiary: any) {
    // TODO: afficher une confirmation et supprimer le bénéficiaire
    console.log('Delete beneficiary', beneficiary);
  }

  onView(beneficiary: any) {
    this.selectedBeneficiary = beneficiary;
  }

  closeProfileModal() {
    this.selectedBeneficiary = null;
  }
}
