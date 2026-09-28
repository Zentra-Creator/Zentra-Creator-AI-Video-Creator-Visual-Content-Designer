/**
 * Video loading optimization utilities for Cloudinary hosted video assets.
 * 
 * - Injects f_auto,q_auto,vc_auto,w_xxx parameters for fast streaming and instant start
 * - Generates fast-loading lightweight poster image frames (so browser paints immediately)
 * - Manages IntersectionObserver lazy autoplay so offscreen videos don't consume mobile bandwidth
 */

/**
 * Optimizes Cloudinary video URLs for web streaming:
 * - f_auto: delivers modern container (webm / mp4 / av1) suitable for the device
 * - q_auto: smart bitrate compression
 * - vc_auto: optimized video codec for fast decode
 * - w_width: downscale video dimensions to actual card size (e.g. 720px for mobile/cards)
 */
export function getOptimizedVideoUrl(url: string, maxWidth = 800): string {
  if (!url) return '';
  if (!url.includes('cloudinary.com') || !url.includes('/video/upload/')) {
    return url;
  }

  // Check if transformations are already present
  if (url.includes('/video/upload/f_auto') || url.includes('/video/upload/q_auto')) {
    return url;
  }

  const transform = `f_auto,q_auto:eco,vc_auto,w_${maxWidth}`;
  return url.replace('/video/upload/', `/video/upload/${transform}/`);
}

/**
 * Generates an instant preview poster frame URL from Cloudinary video:
 * Extracts frame 0 as an optimized JPEG/WebP image.
 * This guarantees the card shows a sharp thumbnail immediately while video initializes.
 */
export function getVideoPosterUrl(url: string, maxWidth = 640): string {
  if (!url) return '';
  if (url.includes('cloudinary.com') && url.includes('/video/upload/')) {
    // Replace extension to jpg and add so_0 (start-offset 0)
    const base = url.replace(/\.(mp4|mov|webm)$/i, '.jpg');
    return base.replace(
      '/video/upload/',
      `/video/upload/so_0,f_auto,q_auto:good,w_${maxWidth}/`
    );
  }
  return '';
}
