import { PrismaClient, UserRole, PostStatus, CommentStatus, FileCategory } from '@prisma/client'
import bcrypt from 'bcryptjs'
import slugify from 'slugify'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 데이터베이스 시드 시작...')

  // 관리자 계정 생성
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  const hashedPassword = await bcrypt.hash(adminPassword, 12)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: '관리자',
      password: hashedPassword,
      role: UserRole.SUPER_ADMIN,
      emailVerified: new Date(),
    },
  })

  console.log('👤 관리자 계정 생성 완료:', admin.email)

  // 카테고리 생성
  const categories = [
    {
      name: '회계관리',
      description: '예산 편성, 결산, 회계 처리 등 회계 업무 관련 정보',
      color: '#3B82F6',
      order: 1,
    },
    {
      name: '인사관리',
      description: '채용, 인사평가, 급여 관리 등 인사 업무 관련 정보',
      color: '#10B981',
      order: 2,
    },
    {
      name: '문서관리',
      description: '공문서 작성, 계약서 관리, 문서 보관 등 문서 관련 업무',
      color: '#F59E0B',
      order: 3,
    },
    {
      name: '시설관리',
      description: '사무실 관리, 장비 구매, 유지보수 등 시설 관련 업무',
      color: '#EF4444',
      order: 4,
    },
    {
      name: '법무업무',
      description: '법률 검토, 계약 관리, 규정 제정 등 법무 관련 업무',
      color: '#8B5CF6',
      order: 5,
    },
    {
      name: '구매관리',
      description: '물품 구매, 계약 체결, 공급업체 관리 등 구매 관련 업무',
      color: '#06B6D4',
      order: 6,
    },
  ]

  for (const categoryData of categories) {
    const slug = slugify(categoryData.name, { lower: true, locale: 'ko' })
    await prisma.category.upsert({
      where: { slug },
      update: {},
      create: {
        ...categoryData,
        slug,
      },
    })
  }

  console.log('📁 카테고리 생성 완료')

  // 태그 생성
  const tags = [
    '예산편성', '결산', '세무', '급여', '채용', '평가',
    '계약서', '공문', '회의록', '보고서', '법률검토',
    '구매', '입찰', '시설관리', '장비', '유지보수',
    '규정', '매뉴얼', '프로세스', '체크리스트', '양식',
  ]

  for (const tagName of tags) {
    const slug = slugify(tagName, { lower: true, locale: 'ko' })
    await prisma.tag.upsert({
      where: { slug },
      update: {},
      create: {
        name: tagName,
        slug,
        color: '#64748B',
      },
    })
  }

  console.log('🏷️  태그 생성 완료')

  // 샘플 포스트 생성
  const accountingCategory = await prisma.category.findUnique({
    where: { slug: slugify('회계관리', { lower: true, locale: 'ko' }) },
  })

  const budgetTag = await prisma.tag.findUnique({
    where: { slug: slugify('예산편성', { lower: true, locale: 'ko' }) },
  })

  if (accountingCategory && budgetTag) {
    const samplePost = await prisma.post.create({
      data: {
        title: '2024년 예산 편성 가이드라인',
        slug: 'budget-guidelines-2024',
        content: `
# 2024년 예산 편성 가이드라인

총무부에서 제공하는 2024년 예산 편성을 위한 상세 가이드라인입니다.

## 1. 예산 편성 원칙

### 기본 원칙
- 효율성과 경제성을 고려한 예산 편성
- 전년도 실적 분석을 통한 합리적 예산 책정
- 조직 목표와 연계된 예산 배분

### 예산 분류
1. **운영비**
   - 인건비
   - 사무용품비
   - 유지관리비

2. **사업비**
   - 프로젝트 예산
   - 교육훈련비
   - 시설개선비

## 2. 예산 편성 절차

### 1단계: 예산 편성 방침 수립
- 경영진 예산 방침 결정
- 부서별 예산 한도 설정
- 예산 편성 일정 공지

### 2단계: 부서별 예산 요구서 작성
- 각 부서에서 예산 요구서 제출
- 사업계획과 연계하여 작성
- 전년도 실적 대비 증감 사유 명시

### 3단계: 예산 심의 및 조정
- 총무부에서 1차 검토
- 경영진 심의
- 부서별 조정 협의

### 4단계: 최종 예산 확정
- 이사회 승인
- 부서별 예산 통지
- 예산 집행 지침 배포

## 3. 주요 체크포인트

- ✅ 전년도 실적 대비 합리적 증감률
- ✅ 법정 의무 경비 반영
- ✅ 비상 예비비 확보
- ✅ 월별 현금흐름 검토

## 4. 참고 자료

예산 편성에 필요한 양식과 매뉴얼은 첨부파일을 참조하시기 바랍니다.
        `,
        excerpt: '2024년 예산 편성을 위한 원칙, 절차, 체크포인트를 정리한 종합 가이드라인입니다.',
        status: PostStatus.PUBLISHED,
        publishedAt: new Date(),
        authorId: admin.id,
        categoryId: accountingCategory.id,
        metaTitle: '2024년 예산 편성 가이드라인 | 총무업무 가이드',
        metaDescription: '효율적인 예산 편성을 위한 원칙과 절차를 상세히 안내합니다. 총무 담당자 필수 가이드.',
        metaKeywords: ['예산편성', '회계관리', '총무업무', '예산가이드라인'],
      },
    })

    // 포스트에 태그 연결
    await prisma.postTag.create({
      data: {
        postId: samplePost.id,
        tagId: budgetTag.id,
      },
    })

    console.log('📝 샘플 포스트 생성 완료')
  }

  // 사이트 설정
  const siteSettings = [
    {
      key: 'site_name',
      value: process.env.SITE_NAME || '총무업무 가이드',
      type: 'string',
    },
    {
      key: 'site_description',
      value: process.env.SITE_DESCRIPTION || '총무 업무에 필요한 모든 정보와 자료를 제공하는 전문 블로그',
      type: 'string',
    },
    {
      key: 'site_url',
      value: process.env.SITE_URL || 'http://localhost:3000',
      type: 'string',
    },
    {
      key: 'posts_per_page',
      value: '10',
      type: 'number',
    },
    {
      key: 'comments_enabled',
      value: 'true',
      type: 'boolean',
    },
    {
      key: 'comment_moderation',
      value: 'true',
      type: 'boolean',
    },
  ]

  for (const setting of siteSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    })
  }

  console.log('⚙️  사이트 설정 완료')

  console.log('✅ 데이터베이스 시드 완료!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ 시드 실행 중 오류 발생:', e)
    await prisma.$disconnect()
    process.exit(1)
  })