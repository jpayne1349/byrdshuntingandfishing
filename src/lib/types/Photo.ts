import { generateUUID } from "$lib/helpers/id";
import { fb } from "$lib/stores/firebase";
import { photoStore } from "$lib/stores/photos";
import { instanceToPlain } from "class-transformer";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { get } from "svelte/store";
import { MyEvent } from "./Event";

export class Photo implements PhotoInstance {
  id: string;
  added: number;
  updated?: number;
  hidden: boolean;
  index: number;

  title: string;
  description?: string;
  category: string;
  subcategory: string;

  price?: string;
  url?: string;

  constructor(options: { id?: string; added?: number; updated?: number; hidden?: boolean; index?: number; title: string; description?: string; category: string; subcategory: string; price?: string; url?: string }) {
    // Restore or generate default values
    this.id = options.id || generateUUID("photo_");
    this.added = options.added || Math.floor(Date.now() / 1000);
    if (options.updated) this.updated = options.updated;
    this.hidden = options.hidden ?? false;

    // Required fields
    this.title = options.title;
    this.category = options.category;
    this.subcategory = options.subcategory;

    //dependent on category & subcategory
    this.index = options.index ?? Photo.nextAvailableIndex(this.category, this.subcategory);

    // Optional fields
    if (options.description) this.description = options.description;
    if (options.price) this.price = options.price;
    if (options.url) this.url = options.url;
  }

  //   only performed by newly created photos
  async savePhoto(file: File) {
    const firebaseObject = get(fb);
    // SAVE TO STORAGE
    const storagePath = this.category + "/" + this.subcategory + "/" + this.id;
    const photoRef = ref(firebaseObject.storage, storagePath);
    const upload = await uploadBytes(photoRef, file);
    console.log("Uploaded file: ", upload);
    this.url = await getDownloadURL(photoRef);
    // SAVE TO DB
    let plainObject = instanceToPlain(this, { exposeUnsetFields: false });
    const docRef = doc(firebaseObject.db, "photos", plainObject.id);
    await setDoc(docRef, plainObject);
  }

  async updatePhoto() {
    if (this.url) {
      this.updated = Math.floor(Date.now() / 1000);
    }
    // try {
    const firebaseObject = get(fb);
    // UPDATE IN DB
    let plainObject = instanceToPlain(this, { exposeUnsetFields: false });
    const docRef = doc(firebaseObject.db, "photos", plainObject.id);
    await setDoc(docRef, plainObject);
  }

  /**
   *
   * @param
   *
   */
  async updateIndexes(originalIndex: number): Promise<void> {
    if (this.index == originalIndex) {
      // photo wasnt moved or was added to the end of the list
      return;
    }
    let allPhotos = get(photoStore).all;

    // Determine if we're moving up or down
    const movingDown = this.index < originalIndex;

    // Find all photos with defined indices that need shifting
    const affectedPhotos = allPhotos
      .filter((photo): photo is Photo => {
        if (
          photo.index === undefined || // Skip undefined indices
          photo.id === this.id || // Skip the current photo
          photo.category !== this.category || // Skip different categories
          photo.subcategory !== this.subcategory // Skip different subcategories
        ) {
          return false;
        }

        // Moving to a lower index
        if (movingDown) {
          return photo.index >= this.index && photo.index < originalIndex;
        }
        // Moving to a higher index
        return photo.index <= this.index && photo.index > originalIndex;
      })
      .sort((a, b) => a.index! - b.index!); // Sort by ascending index

    // Shift indices for affected photos
    affectedPhotos.forEach((photo) => {
      if (movingDown) {
        // Moving down: Increment indices
        photo.index! += 1;
      } else {
        // Moving up: Decrement indices
        photo.index! -= 1;
      }
    });

    // convert the photo object into a class instance and return all update promises
    const savePromises = affectedPhotos.map((photo) => {
      // console.log("sim update photo method for: ", photo);
      photo.updatePhoto();
    });

    await Promise.all(savePromises); // Wait for all save operations to complete

    new MyEvent({
      type: "photos.indexes.updated",
      style: "success",
      title: "Photos Shifted",
      description: "Display order updated for affected photos.",
      visibility: "local",
      persist: false,
    });
  }

  // Returns the next available number in the index list
  static nextAvailableIndex(category: string, subcategory: string): number {
    const allPhotos = get(photoStore).all;

    const existingIndexes = allPhotos
      .filter(
        (photo) =>
          !photo.hidden && // Exclude hidden photos
          photo.category === category && // Match category
          photo.subcategory === subcategory, // Match subcategory
      )
      .map((photo) => photo.index)
      .filter((index): index is number => index !== undefined); // Exclude undefined indices

    return existingIndexes.length + 1;
  }

  static separatePhotos(): {
    [category: string]: { [subcategory: string]: Photo[] };
  } {
    const separatedPhotos: {
      [category: string]: { [subcategory: string]: Photo[] };
    } = {};

    const allPhotos = get(photoStore).all;

    allPhotos.forEach((photo) => {
      const categoryKey = photo.hidden ? "hidden" : photo.category;
      const subcategoryKey = photo.hidden ? "hidden" : photo.subcategory;

      // Ensure the category exists, or make it a new empty object
      if (!separatedPhotos[categoryKey]) {
        separatedPhotos[categoryKey] = {};
      }

      // Ensure the subcategory exists under the category
      if (!separatedPhotos[categoryKey][subcategoryKey]) {
        separatedPhotos[categoryKey][subcategoryKey] = [];
      }

      // Add the photo to the appropriate subcategory
      separatedPhotos[categoryKey][subcategoryKey].push(photo);

      // Sort the array by the index property
      separatedPhotos[categoryKey][subcategoryKey].sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
    });

    return separatedPhotos;
  }
}

// Extend PhotoObject to include class methods
export interface PhotoInstance extends PhotoObject {
  updatePhoto(): Promise<void>;
  updateIndexes(originalIndex: number): Promise<void>;
}

export interface PhotoObject {
  id: string;
  added: number;
  updated?: number;
  hidden: boolean;
  index: number;

  title: string;
  description?: string;
  category: string;
  subcategory: string;

  price?: string;
  url?: string;
}
