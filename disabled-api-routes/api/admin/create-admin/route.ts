import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createAdminSchema = z.object({
  name: z.string().min(1, '이름을 입력하세요'),
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
  secretKey: z.string().min(1, '시크릿 키를 입력하세요')
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // 입력값 검증
    const validatedData = createAdminSchema.parse(body)
    
    // 시크릿 키 확인 (환경 변수로 설정된 키와 비교)
    const adminSecretKey = process.env.ADMIN_CREATE_SECRET || 'goldenf-admin-2024'
    if (validatedData.secretKey !== adminSecretKey) {
      return NextResponse.json(
        { error: '올바르지 않은 시크릿 키입니다.' },
        { status: 403 }
      )
    }
    
    // 기존 관리자 계정 확인
    const existingAdmin = await prisma.user.findFirst({
      where: {
        OR: [
          { role: 'ADMIN' },
          { role: 'SUPER_ADMIN' }
        ]
      }
    })
    
    if (existingAdmin) {
      return NextResponse.json(
        { error: '이미 관리자 계정이 존재합니다.' },
        { status: 400 }
      )
    }
    
    // 이메일 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.email
      }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: '이미 사용 중인 이메일입니다.' },
        { status: 400 }
      )
    }
    
    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(validatedData.password, 10)
    
    // 관리자 계정 생성
    const admin = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: 'ADMIN', // 기본 관리자 권한
        emailVerified: new Date() // 관리자는 바로 인증됨
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    })
    
    return NextResponse.json({
      message: '관리자 계정이 성공적으로 생성되었습니다.',
      admin
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    
    console.error('Admin creation error:', error)
    return NextResponse.json(
      { error: '관리자 계정 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}