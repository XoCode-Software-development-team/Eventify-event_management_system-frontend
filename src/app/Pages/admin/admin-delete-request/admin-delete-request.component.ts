import { Component, OnInit, ViewChild } from '@angular/core';
import { TabCardComponent } from 'src/app/Components/tab-card/tab-card.component';
import { Category } from 'src/app/Interfaces/interfaces';
import { CapitalizePipe } from 'src/app/Pipes/Capitalize.pipe';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource/serviceAndResource.service';

@Component({
  selector: 'app-admin-delete-request',
  templateUrl: './admin-delete-request.component.html',
  styleUrls: ['./admin-delete-request.component.scss'],
})
export class AdminDeleteRequestComponent implements OnInit {
  // Reference to the TabCardComponent instance
  @ViewChild('tabCard') tabCardComponent!: TabCardComponent;

  constructor(private _serviceAndResource: ServiceAndResourceService) {}

  noData: boolean = false;
  // Array to hold data for the table
  dataSource: string[] = [];

  // Array to hold categories for delete request
  categories: Category[] = [];

  capitalizedTag = new CapitalizePipe().transform(this.checkUrlString()); //Capitalize text

  // Array of displayed column names for the table
  displayedColumns: string[] = ['No', this.capitalizedTag, 'Rating', 'Action'];

  // Lifecycle hook, called after Angular has initialized all data-bound properties
  ngOnInit(): void {
    this.getCategoriesOfDeleteRequest();
  }

  // Fetch services/resources based on the selected category
  getServicesAndResources(categoryId: string): void {
    this.noData = false;
    this.dataSource = [];
    this._serviceAndResource
      .getServiceAndResourceListOfDeleteRequest(categoryId)
      .subscribe({
        next: (res: any) => {
          if (res != null) {
            this.dataSource = res;
            this.noData = res.length == 0 ? true : false;
          }
        },
        error: (err: any) => {
          console.log(err);
          this.noData = true;
        },
      });
  }

  // Fetch categories of delete request
  getCategoriesOfDeleteRequest(): void {
    this.noData = false;
    this._serviceAndResource.getCategoriesListOfDeleteRequest().subscribe({
      next: (res: any) => {
        if (res != null) {
          // Map received data to Category interface and assign to categories array
          this.categories = res.map((item: any) => ({
            id: item.categoryId,
            categoryName:
              this.checkUrlString() === 'service'
                ? item.serviceCategoryName
                : item.resourceCategoryName,
          }));
          this.noData = res.length == 0 ? true : false;
        }
      },
      error: (err: any) => {
        console.log(err);
        this.noData = true;
      },
    });
  }

  // Delete service/resource based on ID
  deleteServiceAndResource(id: string): void {
    this._serviceAndResource.deleteServiceAndResourceFromVendorRequest(id).subscribe({
        next: (res: any) => {
          alert(`Delete ${this.checkUrlString()} successfully.`);
          if (res.remainingCount > 0) {
            this.checkUrlString() === 'service'
              ? this.getServicesAndResources(res.deletedServiceCategoryId)
              : this.getServicesAndResources(res.deletedResourceCategoryId);
          } else {
            // Reset categories array and fetch categories again
            this.categories = [];
            this.getCategoriesOfDeleteRequest();
            // Refresh tab card component
            this.tabCardComponent.ngOnInit();
          }
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  // Remove service/resource based on ID
  removeServiceAndResource(id: string): void {
    this._serviceAndResource
      .removeServiceAndResourceFromVendorRequest(id)
      .subscribe({
        next: (res: any) => {
          alert('Delete request reject successfully.');
          if (res.remainingCount > 0) {
            this.checkUrlString() === 'service'
              ? this.getServicesAndResources(res.deletedServiceCategoryId)
              : this.getServicesAndResources(res.deletedResourceCategoryId);
          } else {
            // Fetch categories again and refresh tab card component
            this.getCategoriesOfDeleteRequest();
            this.tabCardComponent.ngOnInit();
          }
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  // Identify whether service or resource
  checkUrlString(): string {
    return this._serviceAndResource.checkUrlString();
  }
}