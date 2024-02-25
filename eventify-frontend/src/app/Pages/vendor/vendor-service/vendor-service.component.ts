import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorServiceService } from 'src/app/Services/vendor-service/vendor-service.service';

@Component({
  selector: 'app-vendor-service',
  templateUrl: './vendor-service.component.html',
  styleUrls: ['./vendor-service.component.scss']
})
export class VendorServiceComponent {
  constructor(
    private _vendorService: VendorServiceService
  ) {}

  dataSource: string[] = [];

  categories: string[] = [];

  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: string[] = [
    'No',
    'Service',
    'Availability',
    'Action',
  ];

  getServices(category: string) {
    this._vendorService.getServiceListByCategory(category).subscribe({
      next: (res: any) => {
        this.dataSource = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getCategories() {
    this._vendorService.getCategoriesList().subscribe({
      next: (res: any) => {
        this.categories = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  deleteService(id: string) {
    this._vendorService.deleteService(id).subscribe({
      next: (res: any) => {
        if (res.remainingCount > 0) {
          this.getServices(res.deletedService.category);
        } else {
          location.reload();
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  changeSuspendState(id: string){
    this._vendorService.changeSuspendState(id).subscribe({
      next: (res:any) => {
        this.getServices(res.category);
      },
      error: (err:any) => {
        console.log(err);
      }
    })
  }
}