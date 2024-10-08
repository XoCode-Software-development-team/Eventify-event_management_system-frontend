import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { servicesAndResourcesCard } from 'src/app/Interfaces/interfaces';
import { PageEvent } from '@angular/material/paginator';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-all-service',
  templateUrl: './all-serviceAndResource.component.html',
  styleUrls: ['./all-serviceAndResource.component.scss'],
})
export class AllServiceAndResourceComponent implements OnInit {
  pageSize = 4;
  mapStart:boolean = false;
  query:string = '';
  currentPage = 0;
  isLoading = false;
  servicesAndResources: servicesAndResourcesCard[] = [];
  totalItems = 0;
  sortBy = 'sNameAZ';
  filters: {
    price: {
      minValue: number | null;
      maxValue: number | null;
      modelId: number | null;
    } | null;
    categories: number[] | null;
    rate: number | null;
  } = {
    price: null,
    categories: null,
    rate: null,
  };

  constructor(
    private _serviceAndResource: ServiceAndResourceService,
    private _toastService: ToastService,
    private _cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getServicesAndResources();
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.getServicesAndResources();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getServicesAndResources() {
    this.isLoading = true;
    if (
      this.filters.categories == null ||
      this.filters.categories.length == 0
    ) {
      setTimeout(() => {
        this.isLoading = false;
      }, 5000);
      return;
    }
    this.servicesAndResources = [];
    this._serviceAndResource
      .getServicesAndResourcesForClients({
        page: this.currentPage,
        pageSize: this.pageSize,
        sortBy: this.sortBy,
        filters: this.filters,
      })
      .subscribe({
        next: (res: any) => {
          this.servicesAndResources = res.data;
          console.log(res)
          this.totalItems = res.totalItems;
          // console.log(this.servicesAndResources)
        },
        error: (err: any) => {
          // console.error(err);
          this._toastService.showMessage(
            `Failed to fetch ${this.checkUrlString()}s. Please try again later.`,
            'error'
          );
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  sortServicesAndResources(sortBy: string) {
    this.sortBy = sortBy;
    this.getServicesAndResources();
  }

  priceFilter(data: any) {
    this.filters.price = {
      minValue: data.minValue,
      maxValue: data.maxValue,
      modelId: data.priceModelId,
    };
    this.getServicesAndResources();
  }

  categoryFilter(checkedCategoryIds: any[]) {
    this.filters.categories = checkedCategoryIds;
    this.getServicesAndResources();
  }

  rateFilter(selectedRate: any) {
    this.filters.rate = selectedRate;
    this.getServicesAndResources();
  }

  checkUrlString(): string {
    return this._serviceAndResource.checkUrlString();
  }

  hideAll($event: { started: boolean, data?: string }) {
    this.query = $event.data || '';
    this.mapStart = $event.started;
    this._cdr.detectChanges();
  }
  
}
