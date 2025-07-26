import { supabase, uploadFile, getPublicUrl, deleteFile } from './supabase'
import { createFileUpload } from './database'
import { FileCategory } from '@/types/supabase'

// File type mappings for Korean business documents
const FILE_TYPE_MAP: Record<string, FileCategory> = {
  'pdf': 'DOCUMENT',
  'doc': 'DOCUMENT',
  'docx': 'DOCUMENT',
  'hwp': 'DOCUMENT',
  'txt': 'DOCUMENT',
  'xls': 'SPREADSHEET',
  'xlsx': 'SPREADSHEET',
  'ppt': 'PRESENTATION',
  'pptx': 'PRESENTATION',
  'jpg': 'IMAGE',
  'jpeg': 'IMAGE',
  'png': 'IMAGE',
  'gif': 'IMAGE',
  'webp': 'IMAGE',
  'zip': 'ARCHIVE',
  'rar': 'ARCHIVE',
  '7z': 'ARCHIVE',
  'exe': 'PROGRAM',
  'msi': 'PROGRAM'
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_EXTENSIONS = [
  'pdf', 'doc', 'docx', 'hwp', 'txt',
  'xls', 'xlsx', 'ppt', 'pptx',
  'jpg', 'jpeg', 'png', 'gif', 'webp',
  'zip', 'rar', '7z', 'exe', 'msi'
]

export interface FileUploadResult {
  id: string
  filename: string
  originalName: string
  url: string
  size: number
  category: FileCategory
  path: string
}

export const validateFile = (file: File): { valid: boolean; error?: string } => {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `파일 크기가 너무 큽니다. 최대 ${MAX_FILE_SIZE / 1024 / 1024}MB까지 업로드 가능합니다.`
    }
  }

  // Check file extension
  const extension = file.name.split('.').pop()?.toLowerCase()
  if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
    return {
      valid: false,
      error: `지원하지 않는 파일 형식입니다. 허용된 형식: ${ALLOWED_EXTENSIONS.join(', ')}`
    }
  }

  return { valid: true }
}

export const generateUniqueFilename = (originalName: string): string => {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 8)
  const extension = originalName.split('.').pop()
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '')
  
  // Handle Korean characters in filename
  const sanitizedName = nameWithoutExt
    .replace(/[^a-zA-Z0-9가-힣\-_]/g, '_')
    .substring(0, 50)
  
  return `${timestamp}_${randomString}_${sanitizedName}.${extension}`
}

export const uploadFileToSupabase = async (
  file: File,
  uploaderId: string,
  options?: {
    description?: string
    version?: string
    isPublic?: boolean
    category?: FileCategory
  }
): Promise<FileUploadResult> => {
  // Validate file
  const validation = validateFile(file)
  if (!validation.valid) {
    throw new Error(validation.error)
  }

  // Generate unique filename
  const filename = generateUniqueFilename(file.name)
  const extension = file.name.split('.').pop()?.toLowerCase()
  const category = options?.category || FILE_TYPE_MAP[extension!] || 'OTHER'

  // Determine bucket based on file type
  const bucket = category === 'IMAGE' ? 'images' : 'documents'
  
  // Create path with date folder structure
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const path = `${year}/${month}/${filename}`

  try {
    // Upload to Supabase Storage
    const uploadResult = await uploadFile(bucket, path, file, {
      cacheControl: '3600',
      contentType: file.type,
      upsert: false
    })

    // Get public URL
    const publicUrl = getPublicUrl(bucket, path)

    // Save file metadata to database
    const fileRecord = await createFileUpload({
      filename,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      path,
      url: publicUrl,
      category,
      description: options?.description,
      version: options?.version,
      isPublic: options?.isPublic || false,
      uploaderId
    })

    return {
      id: fileRecord.id,
      filename: fileRecord.filename,
      originalName: fileRecord.originalName,
      url: fileRecord.url || publicUrl,
      size: fileRecord.size,
      category: fileRecord.category,
      path: fileRecord.path
    }
  } catch (error) {
    console.error('File upload error:', error)
    throw new Error(`파일 업로드 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`)
  }
}

export const deleteFileFromSupabase = async (fileId: string, uploaderId: string): Promise<void> => {
  try {
    // Get file record
    const { data: fileRecord, error: fetchError } = await supabase
      .from('file_uploads')
      .select('*')
      .eq('id', fileId)
      .eq('uploaderId', uploaderId)
      .single()

    if (fetchError || !fileRecord) {
      throw new Error('파일을 찾을 수 없거나 권한이 없습니다.')
    }

    // Determine bucket
    const bucket = fileRecord.category === 'IMAGE' ? 'images' : 'documents'

    // Delete from storage
    await deleteFile(bucket, fileRecord.path)

    // Delete from database
    const { error: deleteError } = await supabase
      .from('file_uploads')
      .delete()
      .eq('id', fileId)

    if (deleteError) {
      throw new Error('파일 데이터베이스 기록 삭제 실패')
    }
  } catch (error) {
    console.error('File deletion error:', error)
    throw new Error(`파일 삭제 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`)
  }
}

export const getFileUrl = (bucket: string, path: string): string => {
  return getPublicUrl(bucket, path)
}

// Helper function to attach files to posts
export const attachFilesToPost = async (postId: string, fileIds: string[]): Promise<void> => {
  try {
    const attachments = fileIds.map(fileId => ({
      postId,
      fileId
    }))

    const { error } = await supabase
      .from('post_uploads')
      .insert(attachments)

    if (error) {
      throw new Error('파일 첨부 실패')
    }
  } catch (error) {
    console.error('File attachment error:', error)
    throw new Error(`파일 첨부 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`)
  }
}

// Helper function to detach files from posts
export const detachFilesFromPost = async (postId: string, fileIds?: string[]): Promise<void> => {
  try {
    let query = supabase
      .from('post_uploads')
      .delete()
      .eq('postId', postId)

    if (fileIds && fileIds.length > 0) {
      query = query.in('fileId', fileIds)
    }

    const { error } = await query

    if (error) {
      throw new Error('파일 첨부 해제 실패')
    }
  } catch (error) {
    console.error('File detachment error:', error)
    throw new Error(`파일 첨부 해제 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`)
  }
}

// Helper function to get file download stats
export const getFileDownloadStats = async (fileId: string): Promise<number> => {
  // This would require additional tracking table in real implementation
  // For now, return 0
  return 0
}

// Helper function to generate file preview URL for images
export const getFilePreviewUrl = (file: FileUploadResult): string | null => {
  if (file.category === 'IMAGE') {
    // Supabase Storage can generate thumbnails
    return `${file.url}?width=300&height=200&resize=cover`
  }
  return null
}

// Helper function to get file icon based on type
export const getFileIcon = (category: FileCategory, mimeType?: string): string => {
  switch (category) {
    case 'DOCUMENT':
      if (mimeType?.includes('pdf')) return '📄'
      if (mimeType?.includes('word') || mimeType?.includes('hwp')) return '📝'
      return '📄'
    case 'SPREADSHEET':
      return '📊'
    case 'PRESENTATION':
      return '📽️'
    case 'IMAGE':
      return '🖼️'
    case 'ARCHIVE':
      return '🗜️'
    case 'PROGRAM':
      return '⚙️'
    default:
      return '📁'
  }
}