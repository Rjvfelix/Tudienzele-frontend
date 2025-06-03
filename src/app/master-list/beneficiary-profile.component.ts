import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-beneficiary-profile',
  templateUrl: './beneficiary-profile.component.html',
  styleUrls: ['./beneficiary-profile.component.css']
})
export class BeneficiaryProfileComponent {
  @Input() beneficiary: any;
}

