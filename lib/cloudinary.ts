import { v2 as cloudinary } from 'cloudinary';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Sube una imagen a Cloudinary
 * @param file - El archivo a subir (como Buffer o base64 string)
 * @param folder - La carpeta en Cloudinary donde guardar la imagen
 * @returns Un objeto con el resultado de la subida
 */
export async function uploadToCloudinary(
  file: Buffer | string,
  folder: string = 'dulcehogar'
): Promise<UploadResult> {
  try {
    // Convertir Buffer a base64 si es necesario
    const fileStr = Buffer.isBuffer(file)
      ? `data:image/jpeg;base64,${file.toString('base64')}`
      : file;

    // Subir a Cloudinary
    const result = await cloudinary.uploader.upload(fileStr, {
      folder: `dulcehogar/${folder}`,
      resource_type: 'image',
      transformation: [
        { width: 1200, height: 1200, crop: 'limit' }, // Limitar tamaño máximo
        { quality: 'auto' }, // Optimización automática
        { fetch_format: 'auto' }, // Formato automático (WebP cuando sea posible)
      ],
    });

    return {
      success: true,
      url: result.secure_url,
    };
  } catch (error) {
    console.error('Error subiendo a Cloudinary:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido al subir imagen',
    };
  }
}

/**
 * Elimina una imagen de Cloudinary
 * @param publicId - El public_id de la imagen en Cloudinary
 * @returns Un objeto con el resultado de la eliminación
 */
export async function deleteFromCloudinary(publicId: string): Promise<UploadResult> {
  try {
    await cloudinary.uploader.destroy(publicId);
    return {
      success: true,
    };
  } catch (error) {
    console.error('Error eliminando de Cloudinary:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido al eliminar imagen',
    };
  }
}

/**
 * Valida que las credenciales de Cloudinary estén configuradas
 */
export function validateCloudinaryConfig(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

export default cloudinary;
