"use client"

export function ShareGraphicsGenerator() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Hamboi MindCare - Share Graphics</h1>

      {/* Instagram Post */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Instagram Post (1080x1080)</h2>
        <div className="w-full max-w-2xl aspect-square bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 rounded-lg p-12 flex flex-col justify-between text-white">
          <div>
            <h3 className="text-5xl font-bold mb-4">You're Not Alone</h3>
            <p className="text-2xl mb-6">Free mental health support for Nigerian teens</p>
          </div>
          <div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 mb-4">
              <p className="text-lg font-semibold mb-2">Get instant support:</p>
              <ul className="space-y-2">
                <li>💬 AI-powered chat support</li>
                <li>📞 Crisis hotlines</li>
                <li>📚 Mental health resources</li>
                <li>💡 Daily wellness tips</li>
              </ul>
            </div>
            <p className="text-xl font-bold">hamboi-mindcare.vercel.app</p>
            <p className="text-sm opacity-80">Install the app from your browser</p>
          </div>
        </div>
      </div>

      {/* WhatsApp Status */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">WhatsApp Status (1080x1920)</h2>
        <div className="w-full max-w-md aspect-[9/16] bg-gradient-to-b from-blue-600 to-purple-600 rounded-lg p-8 flex flex-col justify-center items-center text-white text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-4xl">🧠</span>
            </div>
            <h3 className="text-4xl font-bold mb-4">HAMBOI</h3>
            <p className="text-xl">MindCare</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
            <p className="text-2xl font-bold mb-2">Mental Health Support</p>
            <p className="text-lg">For Nigerian Teenagers</p>
          </div>
          <p className="text-lg">Tap the link to install →</p>
        </div>
      </div>

      {/* Twitter Card */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Twitter Card (1200x628)</h2>
        <div className="w-full max-w-4xl aspect-[1200/628] bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-12 flex items-center justify-between text-white">
          <div className="flex-1">
            <h3 className="text-5xl font-bold mb-4">Hamboi MindCare</h3>
            <p className="text-2xl mb-6">Free mental health support for Nigerian teens</p>
            <div className="flex gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-sm">AI Chat</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-sm">Crisis Support</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-sm">Resources</p>
              </div>
            </div>
          </div>
          <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center">
            <span className="text-8xl">🧠</span>
          </div>
        </div>
      </div>
    </div>
  )
}
