// S3 base URL for images
const S3_BASE_URL = 'https://mype-uploads.s3.eu-central-1.amazonaws.com/kp-images'

/**
 * Converts a local /images/ path to an S3 URL
 * Example: /images/guest-photos/gvantsa-veltauri.jpg
 *       -> https://mype-uploads.s3.eu-central-1.amazonaws.com/kp-images/guest-photos/gvantsa-veltauri.jpg
 */
export function getImageUrl(localPath: string): string {
  // If it's already an absolute URL, return as-is
  if (localPath.startsWith('http://') || localPath.startsWith('https://')) {
    return localPath
  }

  // Remove leading /images/ and construct S3 URL
  const relativePath = localPath.replace(/^\/images\//, '')
  return `${S3_BASE_URL}/${relativePath}`
}

/**
 * Helper for use in template literals
 */
export function img(path: string): string {
  return getImageUrl(`/images/${path}`)
}
