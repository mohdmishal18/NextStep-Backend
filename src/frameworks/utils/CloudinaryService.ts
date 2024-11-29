import * as cloudinary from 'cloudinary'

import * as dotenv from 'dotenv';
dotenv.config()

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME as string,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true,
});

export class CloudinaryService {

    async deleteImage(imageId: string, folderPath: string) {
        try {
            const fullPath = `${folderPath}/${imageId}`; // Construct the full path of the image
            
            const result = await cloudinary.v2.uploader.destroy(fullPath); // Attempt to delete the image
            console.log('Deleted image from Cloudinary:', result); // Log the result
            return result; // Optionally return the result for further processing if needed
        } catch (error) {
            console.error('Error deleting image from Cloudinary:', error); // Log any errors
            throw new Error('Error deleting image from Cloudinary'); // Throw an error for the caller to handle
        }
    }
    
  }