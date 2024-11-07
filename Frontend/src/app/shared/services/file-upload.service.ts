import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL,list } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private fstorage: Storage) { }

  async imgUpload(files: FileList, userId: string, challenge: string, meal?: string): Promise<string[]> {
    console.log(challenge);
    const uploadPromises: Promise<string>[] = [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
  
      if (file) {
        let storageRefPath = `Challenge/${userId}`;
  
        // Update path for profile upload
        if (challenge === 'profile') {
          storageRefPath += `/profile/avtar.jpg`;
        } else if (challenge) {
          if (meal) {
            storageRefPath += `/${challenge}/${meal}`;
          } else {
            storageRefPath += `/${challenge}/${file.name}`;
          }
        } else {
          storageRefPath += `/default/${file.name}`;
        }
  
        const storageRef = ref(this.fstorage, storageRefPath);
        uploadPromises.push(this.uploadFileAndGetURL(storageRef, file));
      }
    }
  
    try {
      const downloadURLs = await Promise.all(uploadPromises);
      return downloadURLs;
    } catch (error) {
      console.error('Upload failed', error);
      throw error;  // Re-throw the error so the caller can handle it
    }
  }

  private uploadFileAndGetURL(storageRef: any, file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          // Progress monitoring (optional)
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
        }
      );
    });
  }

  async imgURLs(id: string, challengeId: string): Promise<string[]> {
    // console.log("Challenge/fR6pl4fa72R2KS2Br7iDN7xbPAN2/-O3bWXf9sLl40c-OEh-h")    
    // console.log("Challenge/"+id+"/"+challengeId)
    const address = String("Challenge/"+id+"/"+challengeId)
    // console.log(address)
    const storageRef = ref(this.fstorage, address);
    // console.log("Challenge/"+id+"/"+challengeId)
    const listResult = await list(storageRef);
    const downloadURLs: string[] = [];
  
    for (const itemRef of listResult.items) {
      const url = await getDownloadURL(itemRef);
      downloadURLs.push(url);
    }
    console.log('Files available at', downloadURLs);  
    return downloadURLs;
  }
}
