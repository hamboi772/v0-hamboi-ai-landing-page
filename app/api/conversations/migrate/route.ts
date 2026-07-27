import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

interface MigrationRequest {
  messages: Array<{
    role: 'user' | 'assistant'
    content: string
    createdAt: string
  }>
  conversationTitle?: string
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized - missing auth token' },
        { status: 401 }
      )
    }

    // Verify the auth token and get user
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    )

    const token = authHeader.replace('Bearer ', '')
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUserByCookie(request)

    if (authError || !user) {
      // Fallback: try to verify token directly
      const { data, error } = await supabase.auth.getUser(token)
      if (error || !data.user) {
        return NextResponse.json(
          { error: 'Invalid auth token' },
          { status: 401 }
        )
      }
    }

    // Get the authenticated user's ID
    const userId = user?.id

    const body: MigrationRequest = await request.json()
    const { messages, conversationTitle } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required for migration' },
        { status: 400 }
      )
    }

    // Create a new conversation for this user
    const { data: conversation, error: conversationError } = await supabase
      .from('conversations')
      .insert({
        user_id: userId,
        title: conversationTitle || 'Migrated Conversation',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (conversationError || !conversation) {
      console.error('[v0] Failed to create conversation:', conversationError)
      return NextResponse.json(
        { error: 'Failed to create conversation' },
        { status: 500 }
      )
    }

    // Insert all messages into the new conversation
    const messagesToInsert = messages.map((msg) => ({
      conversation_id: conversation.id,
      role: msg.role,
      content: msg.content,
      created_at: msg.createdAt,
    }))

    const { error: messagesError } = await supabase
      .from('messages')
      .insert(messagesToInsert)

    if (messagesError) {
      console.error('[v0] Failed to insert messages:', messagesError)
      return NextResponse.json(
        { error: 'Failed to migrate messages' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      conversation: {
        id: conversation.id,
        title: conversation.title,
        messageCount: messages.length,
      },
    })
  } catch (error) {
    console.error('[v0] Migration API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
