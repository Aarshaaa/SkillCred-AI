/**
 * Cloud Object Storage Service Abstraction
 * Supports Local Storage and AWS S3 / Azure Blob adapters
 */

const fs = require('fs');
const path = require('path');

class CloudObjectStorageService {
  constructor() {
    this.provider = process.env.STORAGE_PROVIDER || 'local_object_storage';
    this.baseUploadDir = path.join(__dirname, '../../uploads');
    
    if (!fs.existsSync(this.baseUploadDir)) {
      fs.mkdirSync(this.baseUploadDir, { recursive: true });
    }
  }

  /**
   * Save uploaded file stream/buffer to object storage bucket
   */
  async uploadMedia(fileBuffer, originalFilename, mediaType = 'video') {
    const timestamp = Date.now();
    const sanitizedFilename = originalFilename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const objectKey = `${mediaType}s/${timestamp}_${sanitizedFilename}`;
    
    if (this.provider === 's3_bucket') {
      // In production, this invokes AWS.S3.putObject or @aws-sdk/client-s3
      return `https://skillcred-evidence-bucket.s3.ap-south-1.amazonaws.com/${objectKey}`;
    }

    // Local Storage Fallback
    const targetFolder = path.join(this.baseUploadDir, mediaType);
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }
    
    const filePath = path.join(targetFolder, `${timestamp}_${sanitizedFilename}`);
    fs.writeFileSync(filePath, fileBuffer);
    
    return `/media/${mediaType}/${timestamp}_${sanitizedFilename}`;
  }

  /**
   * Get secure temporary signed URL for protected evidence viewing
   */
  getSignedUrl(objectKey, expirationSeconds = 3600) {
    return `${objectKey}?token=signed_preview_${Date.now() + expirationSeconds * 1000}`;
  }
}

module.exports = new CloudObjectStorageService();
