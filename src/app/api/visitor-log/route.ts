import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { path, referer } = body

    // Get client IP address
    const forwarded = request.headers.get('x-forwarded-for')
    const ipAddress = forwarded 
      ? forwarded.split(',')[0].trim()
      : request.headers.get('x-real-ip') || 
        request.ip || 
        'unknown'

    // Get user agent
    const userAgent = request.headers.get('user-agent')

    // Log visitor
    await supabase.rpc('log_visitor', {
      ip_addr: ipAddress,
      user_agent_str: userAgent,
      referer_str: referer,
      page_path: path
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Visitor log error:', error)
    // Don't return error to client - visitor logging is not critical
    return NextResponse.json({ success: true })
  }
}