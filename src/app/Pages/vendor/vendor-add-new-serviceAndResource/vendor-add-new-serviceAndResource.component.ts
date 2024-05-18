import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Button,
  Category,
  FeatureAndFacility,
  PriceModel,
} from 'src/app/Interfaces/interfaces';
import { ServiceAndResourceService } from 'src/app/Services/serviceAndResource/serviceAndResource.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { CapitalizePipe } from 'src/app/Pipes/Capitalize.pipe';

@Component({
  selector: 'app-vendor-add-new-service',
  templateUrl: './vendor-add-new-serviceAndResource.component.html',
  styleUrls: ['./vendor-add-new-serviceAndResource.component.scss'],
})
export class VendorAddNewServiceAndResourceComponent implements OnInit {
  constructor(
    private _announcer: LiveAnnouncer, // Service/Resource for announcing messages for accessibility
    private _serviceAndResource: ServiceAndResourceService,
    private _fireStorage: AngularFireStorage, // Service/Resource for interacting with Firebase Storage
    private _router: Router
  ) {}

  addOnBlur = true; // MatChipInputAddOnBlur
  isLoading: boolean = false; // Indicates whether data is loading
  categories: Category[] = []; // Holds the list of categories
  pricingModels: PriceModel[] = []; // Holds the list of pricing models
  featuresAndFacilities: FeatureAndFacility[] = []; // Holds the list of service features
  serviceResourceForm!: FormGroup; // Form group for service/resource input fields

  capitalizedTag = new CapitalizePipe().transform(this.checkUrlString()); //Capitalize text

  imageFiles: File[] = []; // Holds the list of images
  videoFiles: File[] = []; // Holds the list of videos
  pdfFiles: File[] = []; // Holds the list of pdfs
  imageUrls: string[] = []; // Holds the URLs of uploaded images
  videoUrls: string[] = []; // Holds the URLs of uploaded videos
  pdfUrls: string[] = []; // Holds the URLs of uploaded pdfs


  // Maximum size allowed for images and videos
  maxImageSize = 10485760; // 10 megabytes (10 * 1024 * 1024 bytes)
  maxVideoSize = this.maxImageSize * 50;
  maxPdfSize = this.maxImageSize;

  saveButton: Button = {
    // Save button configuration
    url: '',
    type: 'submit',
    text: `Save ${this.capitalizedTag}`,
    icon: '',
    class: ['hideIcon'], // Scss class list
    disable: true, // Initially disabled until form is valid
  };

  resetButton: Button = {
    // Reset button configuration
    url: '',
    type: 'reset',
    text: 'Reset',
    icon: '',
    class: ['hideIcon', 'btn3', 'btn'],
    disable: false,
  };

  vendorId: string = '2a5e7b73-df8e-4b43-b2b1-32a1e82e03ee'; // Id of the vendor (temporary)
  // vendorId: string = "b0ae24d4-03a5-4a3e-83b3-2e9c7f3245db";

  ngOnInit(): void {
    // Scroll to top on initialization
    window.onload = function () {
      window.scrollTo(0, 0);
    };

    // Initialize form and fetch categories and price models
    this.formHandle();
    this.getCategories();
    this.getPriceModels();
  }

  // Image and Video file upload handlers
  onSelect(event: any, files: File[]) {
    if (files.length < 5) {
      files.push(...event.addedFiles); // Add selected files
    }
    console.log(event);
  }

  onRemove(event: any, files: File[]) {
    console.log(event);
    files.splice(files.indexOf(event), 1); // Remove file
  }

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  // Feature chips add
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our feature
    if (value) {
      this.featuresAndFacilities.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  // Feature chips remove
  remove(feature: FeatureAndFacility): void {
    const index = this.featuresAndFacilities.indexOf(feature);

    if (index >= 0) {
      this.featuresAndFacilities.splice(index, 1); // Remove feature

      // Announce feature removal for accessibility
      this._announcer.announce(`Removed ${feature.name}`);
    }
  }

  // Feature chips edit
  edit(feature: FeatureAndFacility, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove feature if it no longer has a name
    if (!value) {
      this.remove(feature);
      return;
    }

    // Update feature name
    const index = this.featuresAndFacilities.indexOf(feature);
    if (index >= 0) {
      this.featuresAndFacilities[index].name = value;
    }
  }

  //Initialize form
  formHandle() {

    if (this.checkUrlString() === 'service') {
      this.serviceResourceForm = new FormGroup({
        serviceName: new FormControl(null),
        serviceCategory: new FormControl(null),
        serviceDescription: new FormControl(null),
        serviceMaxCapacity: new FormControl(
          0,
          Validators.pattern('^-?(0|[1-9][0-9]*)$')
        ),
        serviceFeatures: new FormControl([]),
        serviceLocations: new FormArray([
          new FormGroup({
            country: new FormControl(null),
            stateProvinceRegion: new FormControl(null),
            district: new FormControl(null),
            cityTownArea: new FormControl(null),
            houseNoStreetRoad: new FormControl(null),
          }),
        ]),
        servicePricePackages: new FormArray([
          new FormGroup({
            packageName: new FormControl(null),
            priceModel: new FormControl(null),
            basePrice: new FormControl(null),
          }),
        ]),
        images: new FormControl([]),
        videos: new FormControl([]),
      });
    } else {

      this.serviceResourceForm = new FormGroup({
        resourceName: new FormControl(null),
        resourceCategory: new FormControl(null),
        resourceDescription: new FormControl(null),
        resourceMaxCapacity: new FormControl(
          0,
          Validators.pattern('^-?(0|[1-9][0-9]*)$')
        ),
        resourceFeatures: new FormControl([]),
        resourceLocations: new FormArray([
          new FormGroup({
            country: new FormControl(null),
            stateProvinceRegion: new FormControl(null),
            district: new FormControl(null),
            cityTownArea: new FormControl(null),
            houseNoStreetRoad: new FormControl(null),
          }),
        ]),
        resourcePricePackages: new FormArray([
          new FormGroup({
            packageName: new FormControl(null),
            priceModel: new FormControl(null),
            basePrice: new FormControl(null),
          }),
        ]),
        images: new FormControl([]),
        videos: new FormControl([]),
        manuals: new FormControl([])
      });
    }


    // Enable save button when form is valid
    this.serviceResourceForm.valueChanges.subscribe(() => {
      if (this.serviceResourceForm.valid) this.saveButton.disable = false;
    });
  }

  // Location management
  addLocation() {
    const control = this.serviceResourceForm.get(this.checkUrlString()+'Locations') as FormArray;
    control.push(
      new FormGroup({
        country: new FormControl(null),
        stateProvinceRegion: new FormControl(null),
        cityTownArea: new FormControl(null),
        district: new FormControl(null),
        houseNoStreetRoad: new FormControl(null),
      })
    );
  }

  removeLocation(index: any) {
    const control = this.serviceResourceForm.get(this.checkUrlString()+'Locations') as FormArray;
    control.removeAt(index);
  }

  // Package management
  addPackage() {
    const control = this.serviceResourceForm.get(this.checkUrlString()+'PricePackages') as FormArray;
    control.push(
      new FormGroup({
        packageName: new FormControl(null),
        priceModel: new FormControl(null),
        basePrice: new FormControl(null),
      })
    );
  }

  removePackage(index: any) {
    const control = this.serviceResourceForm.get(this.checkUrlString()+'PricePackages') as FormArray;
    control.removeAt(index);
  }

  // Helper functions for accessing form controls
  getControls(arrayName: string) {
    return (this.serviceResourceForm.get(arrayName) as FormArray).controls;
  }

  // Method to get a specific form control within the sub-array
  getArrayControls(index: number, arrayName: string, controlName: string) {
    const control = (this.serviceResourceForm.get(arrayName) as FormArray)
      .at(index)
      .get(controlName);
    return control;
  }

  // Submit form
  async saveForm(mouseEvent: MouseEvent) {
    if (this.imageFiles.length < 5) {
      alert("Minimum five images are needed.");
      return
    }
    console.log(mouseEvent);
    this.isLoading = true;

    //when submit the form add featuresAndFacilities array to serviceResourceForm
    this.serviceResourceForm
      .get(this.checkUrlString()+'Features')
      ?.setValue(this.featuresAndFacilities);

    // Upload images videos and Pdfs to Firebase Storage and set URLs in form
    await this.getFirebaseLink(this.imageFiles, this.imageUrls, 'images');
    this.serviceResourceForm.get('images')?.setValue(this.imageUrls);

    await this.getFirebaseLink(this.videoFiles, this.videoUrls, 'videos');
    this.serviceResourceForm.get('videos')?.setValue(this.videoUrls);

    if (this.checkUrlString() != 'service') {
      await this.getFirebaseLink(this.pdfFiles, this.pdfUrls, 'manuals');
      this.serviceResourceForm.get('manuals')?.setValue(this.pdfUrls);
    }

    console.log(this.serviceResourceForm.value);
    // Add new service/resource using service
    await this.addNewServiceResource(this.serviceResourceForm.value);

    this._router.navigate([`/vendor/${this.checkUrlString()}s/all`]); //navigate to the services/resources page

    this.isLoading = false;
  }

  // Reset form to initial state
  resetForm() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.formHandle(); // Reset form
    this.serviceResourceForm.reset();
    this.serviceResourceForm.markAsUntouched();
    this.serviceResourceForm.markAsPristine();
    this.featuresAndFacilities = []; // Clear features
    this.imageFiles = []; // Clear images
    this.videoFiles = []; // Clear videos
    this.pdfFiles = []; //Clear manuals
  }

  // Fetch categories from service/resource
  getCategories() {
    this._serviceAndResource.getCategoriesList().subscribe({
      next: (res: any) => {
        // Map response to category array
        this.categories = res.map((item: any) => ({
          id: item.categoryId,
          categoryName:
            this.checkUrlString() === 'service'
              ? item.serviceCategoryName
              : item.resourceCategoryName,
        }));
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // Fetch price models from service/resource
  getPriceModels() {
    this._serviceAndResource.getPriceModelsList().subscribe({
      next: (res: any) => {
        // Map response to pricing model array
        this.pricingModels = res.map((item: any) => ({
          id: item.modelId,
          priceModelName: item.modelName,
        }));
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // Upload files to Firebase Storage and get download URLs
  async getFirebaseLink(
    files: File[],
    fileUrls: string[],
    fileContent: string
  ) {
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(file);
        const path = `${this.checkUrlString()}-${fileContent}/${file.name}`;
        const uploadTask = await this._fireStorage.upload(path, file);
        const url = await uploadTask.ref.getDownloadURL();
        fileUrls.push(url); // Push URL to array
      }
    }
  }

  // Add new service/resource using service
  async addNewServiceResource(formData: any) {
    this._serviceAndResource.addNewServiceAndResource(this.vendorId, formData).subscribe({
      next: (res: any) => {
        console.log(res);
        alert(this.capitalizedTag+' Added Successfully');
      },
      error: (err: any) => {
        console.log(err);
        alert('Failed to add '+this.checkUrlString())
      },
    });
  }
    // Identify whether service or resource
    checkUrlString(): string {
      return this._serviceAndResource.checkUrlString();
    }
}