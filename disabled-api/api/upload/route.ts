import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { uploadFileToSupabase } from '@/lib/file-upload'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const description = formData.get('description') as string
    const version = formData.get('version') as string
    const isPublic = formData.get('isPublic') === 'true'

    if (!file) {
      return NextResponse.json(
        { error: '파일이 선택되지 않았습니다.' },
        { status: 400 }
      )
    }

    // Upload file
    const result = await uploadFileToSupabase(file, session.user.id, {
      description,
      version,
      isPublic
    })

    return NextResponse.json({
      success: true,
      file: result
    })
  } catch (error) {
    console.error('File upload API error:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : '파일 업로드 실패' 
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const fileId = searchParams.get('id')

    if (!fileId) {
      return NextResponse.json(
        { error: '파일 ID가 필요합니다.' },
        { status: 400 }
      )
    }

    // Delete file
    const { deleteFileFromSupabase } = await import('@/lib/file-upload')
    await deleteFileFromSupabase(fileId, session.user.id)

    return NextResponse.json({
      success: true,
      message: '파일이 성공적으로 삭제되었습니다.'
    })
  } catch (error) {
    console.error('File deletion API error:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : '파일 삭제 실패' 
      },
      { status: 500 }
    )
  }
}