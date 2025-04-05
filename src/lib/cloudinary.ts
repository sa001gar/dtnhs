
// Utility for handling Cloudinary uploads

export const uploadToCloudinary = async (file: File) => {
  try {
    // Create a FormData object to prepare the file for upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'school_uploads');

    // Get Cloudinary cloud name from env variable
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    
    if (!cloudName) {
      throw new Error('Cloudinary cloud name is not configured');
    }

    // Upload to Cloudinary directly from the browser
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    const data = await response.json();
    
    // Return the Cloudinary URL and other metadata
    return {
      url: data.secure_url,
      publicId: data.public_id,
      width: data.width,
      height: data.height,
      format: data.format,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};
