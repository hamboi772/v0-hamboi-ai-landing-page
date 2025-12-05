import React from "react";
import ChatWidget from "../components/ChatWidget";

export const metadata = {
  title: "Hamboi AI — Landing",
  description: "Landing page and quick chat for Hamboi AI",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Hamboi AI</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
            Lightweight AI landing page and quick interactive chat — built with
            Next.js and Tailwind. Use the chat below to test interactions.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="rounded-xl p-6 bg-gray-50 dark:bg-gray-800/60 shadow">
              <h2 className="text-2xl font-semibold">Hero / Pitch</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Promote your AI product, explain core benefits, and provide a
                lightweight demo directly on the landing page.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Live demo via the embedded chat widget</li>
                <li>• Easy to extend with OpenAI or other providers</li>
                <li>• Deployable to Vercel / similar platforms</li>
              </ul>
            </div>

            <div className="rounded-xl p-6 bg-gray-50 dark:bg-gray-800/60 shadow">
              <h3 className="font-medium">Get started</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                To connect to a real model, replace the API route with your
                provider call and secure keys with environment variables.
              </p>
            </div>
          </div>

          <div className="rounded-xl p-6 bg-gray-50 dark:bg-gray-800/60 shadow">
            <h2 className="text-2xl font-semibold mb-4">Chat demo</h2>
            <ChatWidget />
          </div>
        </section>
      </div>
    </main>
  );
}
