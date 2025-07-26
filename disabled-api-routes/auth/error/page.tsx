'use client'

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = () => {
    switch (error) {
      case 'Configuration':
        return '서버 설정에 문제가 있습니다. 관리자에게 문의하세요.'
      case 'AccessDenied':
        return '접근이 거부되었습니다.'
      case 'Verification':
        return '인증 토큰이 만료되었거나 이미 사용되었습니다.'
      case 'OAuthSignin':
      case 'OAuthCallback':
      case 'OAuthCreateAccount':
      case 'EmailCreateAccount':
      case 'Callback':
        return '로그인 중 오류가 발생했습니다. 다시 시도해주세요.'
      case 'OAuthAccountNotLinked':
        return '이메일이 다른 계정과 연결되어 있습니다.'
      case 'EmailSignin':
        return '이메일 전송에 실패했습니다.'
      case 'CredentialsSignin':
        return '이메일 또는 비밀번호가 올바르지 않습니다.'
      case 'SessionRequired':
        return '이 페이지에 접근하려면 로그인이 필요합니다.'
      default:
        return '알 수 없는 오류가 발생했습니다.'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">인증 오류</CardTitle>
          <CardDescription className="text-center">
            로그인 중 문제가 발생했습니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-sm text-red-800 text-center">
              {getErrorMessage()}
            </p>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link href="/auth/login">
                다시 로그인
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">
                홈으로 돌아가기
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}