"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, Github, Bug, Zap, Shield, Workflow } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-violet-950 to-gray-900">
      <Navbar />

      <main className="container mx-auto px-6">
        <section className="py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-block px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-violet-500/30">
              <span className="text-sm font-medium bg-gradient-to-r from-violet-400 to-red-400 bg-clip-text text-transparent">
                AI-Powered Bug Detection & Resolution
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold leading-tight text-white">
              Turn User Feedback Into
              <span className="block bg-gradient-to-r from-violet-400 via-red-400 to-violet-400 bg-clip-text text-transparent">
                Actionable Insights
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Seamlessly integrate our AI voice agent into your ecosystem.
              Detect errors, gather feedback, and automatically create GitHub issues.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-violet-500 to-red-500 text-white hover:opacity-90 transition-opacity text-lg px-8 py-6">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-transparent bg-gradient-to-r from-red-500 to-violet-500 bg-clip-padding opacity-80 text-lg px-8 py-6 relative before:absolute before:inset-0 before:bg-gray-900 before:m-[2px] before:rounded-[calc(0.5rem-2px)] before:-z-10">
                <span className="bg-gradient-to-r from-red-400 to-violet-400 bg-clip-text text-transparent">Watch Demo</span>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border border-violet-500/30 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all hover:-translate-y-1">
                <CardContent className="p-8 space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Mic className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Voice-First Feedback</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Our AI voice agent engages users naturally when errors occur,
                    gathering detailed feedback through conversational interactions.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-violet-500/30 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all hover:-translate-y-1">
                <CardContent className="p-8 space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Bug className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Smart Bug Detection</h3>
                  <p className="text-gray-300 leading-relaxed">
                    AI analyzes your codebase on GitHub to pinpoint the exact
                    location of bugs based on user feedback and error patterns.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-violet-500/30 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all hover:-translate-y-1">
                <CardContent className="p-8 space-y-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Github className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Auto Issue Creation</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Automatically generates comprehensive GitHub issues with
                    context, reproduction steps, and suggested code locations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-red-400 bg-clip-text text-transparent">
                How It Works
              </h2>
              <p className="text-xl text-gray-300">
                Seamless integration in four simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-violet-500/30 hover:bg-white/10 transition-all">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-violet-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <div className="flex items-start space-x-4 mt-4">
                  <Zap className="w-8 h-8 text-violet-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">Integrate Component</h3>
                    <p className="text-gray-300">
                      Add our lightweight popup component to your application with just a few lines of code.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-violet-500/30 hover:bg-white/10 transition-all">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-violet-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <div className="flex items-start space-x-4 mt-4">
                  <Shield className="w-8 h-8 text-violet-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">Error Detection</h3>
                    <p className="text-gray-300">
                      Our AI automatically detects errors and prompts users to share their experience.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-violet-500/30 hover:bg-white/10 transition-all">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-violet-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <div className="flex items-start space-x-4 mt-4">
                  <Mic className="w-8 h-8 text-violet-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">Collect Feedback</h3>
                    <p className="text-gray-300">
                      Voice agent asks targeted questions to understand the issue and user context.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-violet-500/30 hover:bg-white/10 transition-all">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-violet-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  4
                </div>
                <div className="flex items-start space-x-4 mt-4">
                  <Workflow className="w-8 h-8 text-violet-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">GitHub Integration</h3>
                    <p className="text-gray-300">
                      AI locates the bug in your codebase and creates a detailed GitHub issue automatically.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-red-500 to-violet-700 rounded-3xl p-12 text-center text-white">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>

              <div className="relative z-10 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold">
                  Ready to Transform Your Feedback Loop?
                </h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  Join forward-thinking companies using AI to streamline bug reporting and resolution.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <Button size="lg" className="bg-white text-violet-600 hover:bg-gray-100 text-lg px-8 py-6">
                    Get Started Free
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                    Contact Sales
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-6 py-12 mt-20 border-t border-violet-500/30">
        <div className="text-center text-gray-400">
          <p>&copy; 2024 Reportif.ai. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
