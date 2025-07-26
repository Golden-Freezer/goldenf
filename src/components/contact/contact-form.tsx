'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FormData {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  subject: '',
  category: '',
  message: '',
};

const contactCategories = [
  { value: 'general', label: '일반 문의' },
  { value: 'content', label: '콘텐츠 제안' },
  { value: 'collaboration', label: '협업 문의' },
  { value: 'technical', label: '기술적 문제' },
  { value: 'business', label: '비즈니스 문의' },
  { value: 'other', label: '기타' },
];

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // 실제 환경에서는 API 엔드포인트로 전송
      // 현재는 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 성공 처리
      setSubmitStatus('success');
      setFormData(initialFormData);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.subject && formData.message;

  if (submitStatus === 'success') {
    return (
      <Card className="text-center">
        <CardContent className="p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">✅</span>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            문의가 성공적으로 전송되었습니다
          </h3>
          <p className="text-muted-foreground mb-6">
            빠른 시일 내에 답변드리겠습니다. 문의해주셔서 감사합니다.
          </p>
          <Button 
            onClick={() => setSubmitStatus('idle')}
            variant="outline"
          >
            새 문의 작성
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name and Email */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            이름 *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
            placeholder="홍길동"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            이메일 *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
            placeholder="hong@example.com"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
          문의 유형
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
        >
          <option value="">문의 유형을 선택해주세요</option>
          {contactCategories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
          제목 *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
          placeholder="문의 제목을 입력해주세요"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          문의 내용 *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          rows={6}
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground resize-vertical"
          placeholder="문의하실 내용을 상세히 입력해주세요"
        />
      </div>

      {/* Privacy Notice */}
      <div className="bg-muted/30 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">개인정보 수집 및 이용 안내:</span> 
          문의 처리를 위해 입력하신 개인정보를 수집하며, 문의 답변 완료 후 즉시 파기됩니다. 
          자세한 내용은 <a href="/privacy" className="text-primary hover:underline">개인정보처리방침</a>을 참고해주세요.
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="min-w-32"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              전송 중...
            </div>
          ) : (
            '문의 전송'
          )}
        </Button>
      </div>

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-destructive text-sm">
            문의 전송 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 이메일로 직접 연락주세요.
          </p>
        </div>
      )}
    </form>
  );
}