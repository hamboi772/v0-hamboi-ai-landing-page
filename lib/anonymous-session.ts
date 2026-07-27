import { v4 as uuidv4 } from 'uuid'

const ANONYMOUS_SESSION_KEY = 'hamboi_anonymous_session_id'
const ANONYMOUS_MESSAGES_KEY = 'hamboi_anonymous_messages'

export interface AnonymousMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}

export interface AnonymousSession {
  sessionId: string
  messages: AnonymousMessage[]
  createdAt: string
}

/**
 * Get or create an anonymous session in localStorage
 */
export function getOrCreateAnonymousSession(): string {
  if (typeof window === 'undefined') return ''

  let sessionId = localStorage.getItem(ANONYMOUS_SESSION_KEY)
  if (!sessionId) {
    sessionId = uuidv4()
    localStorage.setItem(ANONYMOUS_SESSION_KEY, sessionId)
  }
  return sessionId
}

/**
 * Check if user has an active anonymous session
 */
export function hasAnonymousSession(): boolean {
  if (typeof window === 'undefined') return false
  return !!localStorage.getItem(ANONYMOUS_SESSION_KEY)
}

/**
 * Get all anonymous messages from current session
 */
export function getAnonymousMessages(): AnonymousMessage[] {
  if (typeof window === 'undefined') return []

  const messages = localStorage.getItem(ANONYMOUS_MESSAGES_KEY)
  return messages ? JSON.parse(messages) : []
}

/**
 * Add a message to anonymous session
 */
export function addAnonymousMessage(
  role: 'user' | 'assistant',
  content: string
): AnonymousMessage {
  if (typeof window === 'undefined') throw new Error('Cannot add anonymous message in server context')

  const message: AnonymousMessage = {
    id: uuidv4(),
    role,
    content,
    createdAt: new Date().toISOString(),
  }

  const messages = getAnonymousMessages()
  messages.push(message)
  localStorage.setItem(ANONYMOUS_MESSAGES_KEY, JSON.stringify(messages))

  return message
}

/**
 * Clear anonymous session and messages
 */
export function clearAnonymousSession(): void {
  if (typeof window === 'undefined') return

  localStorage.removeItem(ANONYMOUS_SESSION_KEY)
  localStorage.removeItem(ANONYMOUS_MESSAGES_KEY)
}

/**
 * Get the current anonymous session with all messages
 */
export function getCurrentAnonymousSession(): AnonymousSession | null {
  if (typeof window === 'undefined') return null

  const sessionId = localStorage.getItem(ANONYMOUS_SESSION_KEY)
  if (!sessionId) return null

  return {
    sessionId,
    messages: getAnonymousMessages(),
    createdAt: new Date().toISOString(),
  }
}
