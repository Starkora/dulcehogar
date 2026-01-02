import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary, validateCloudinaryConfig } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    // Validar configuración de Cloudinary
    if (!validateCloudinaryConfig()) {
      return NextResponse.json(
        { 
          error: 'Cloudinary no está configurado. Revisa las variables de entorno.' 
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No se proporcionó ningún archivo' },
        { status: 400 }
      );
    }

    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no válido. Solo se permiten imágenes (JPG, PNG, GIF, WEBP)' },
        { status: 400 }
      );
    }

    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'El archivo es muy grande. Máximo 5MB' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Determinar la carpeta según el tipo (productos o galeria)
    const folder = formData.get('folder') as string || 'productos';

    // Subir a Cloudinary
    const result = await uploadToCloudinary(buffer, folder);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Error al subir el archivo' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      url: result.url,
      message: 'Imagen subida correctamente a Cloudinary'
    });

  } catch (error) {
    console.error('Error al subir imagen:', error);
    return NextResponse.json(
      { error: 'Error al subir la imagen' },
      { status: 500 }
    );
  }
}
