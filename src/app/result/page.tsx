'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Send, HelpCircle, Menu, BarChart2, Settings, Users, BookOpen, ChevronDown, Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User, LogOut } from 'lucide-react'

const MotionButton = motion(Button)

export default function Dashboard() {
  const [isDragging, setIsDragging] = useState(false)
  const [activeTab, setActiveTab] = useState('original')
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    // Handle file drop logic here
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  if (!mounted) return null

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-8 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-transparent bg-clip-text">DocVision</h1>
        <nav className="space-y-6">
          <a href="#" className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
            <FileText className="h-5 w-5" />
            <span>Documents</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
            <BarChart2 className="h-5 w-5" />
            <span>Analytics</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
            <Users className="h-5 w-5" />
            <span>Team</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </a>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <MotionButton
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </MotionButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Documents</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BarChart2 className="mr-2 h-4 w-4" />
                  <span>Analytics</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Team</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <h1 className="text-xl font-bold md:hidden bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-transparent bg-clip-text ml-2">DocVision</h1>
          </div>
          <div className="flex items-center space-x-4">
            <MotionButton
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </MotionButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <MotionButton
                  variant="outline"
                  className="relative h-8 rounded-full px-2 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    className="rounded-full object-cover h-6 w-6"
                    src="/placeholder.svg?height=32&width=32"
                    alt="User avatar"
                  />
                  <span className="font-medium text-sm">John Doe</span>
                  <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </MotionButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50 dark:bg-gray-900">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* PDF panel with tabs */}
            <Card className="col-span-1 md:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Document Viewer</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="original">Original PDF</TabsTrigger>
                    <TabsTrigger value="modified">Enhanced PDF</TabsTrigger>
                  </TabsList>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TabsContent value="original">
                        <motion.div
                          className={`bg-gray-100 dark:bg-gray-700 h-[calc(100vh-400px)] rounded-lg flex items-center justify-center border-2 border-dashed ${
                            isDragging ? 'border-[#6366F1]' : 'border-gray-300 dark:border-gray-600'
                          }`}
                          animate={{ scale: isDragging ? 1.05 : 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                        >
                          <div className="text-center">
                            <FileText className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Drag and drop your PDF here or click to upload</p>
                          </div>
                        </motion.div>
                      </TabsContent>
                      <TabsContent value="modified">
                        <div className="bg-gray-100 dark:bg-gray-700 h-[calc(100vh-400px)] rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <BookOpen className="mx-auto h-12 w-12 text-[#6366F1]" />
                            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Enhanced PDF with learning aids</p>
                            <MotionButton
                              className="mt-4 bg-[#6366F1] text-white hover:bg-[#5457E5]"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Generate Enhanced PDF
                            </MotionButton>
                          </div>
                        </div>
                      </TabsContent>
                    </motion.div>
                  </AnimatePresence>
                </Tabs>
              </CardContent>
            </Card>

            {/* Right panel with summary and quiz cards */}
            <div className="col-span-1 space-y-6">
              <Card className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Generate Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Create a comprehensive summary of your document with AI assistance.</p>
                  <MotionButton
                    className="mt-4 bg-white text-[#6366F1] hover:bg-gray-100"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Generate
                  </MotionButton>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Create Quiz</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Generate an interactive quiz based on your document content.</p>
                  <MotionButton
                    className="mt-4 bg-white text-[#8B5CF6] hover:bg-gray-100"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Create
                  </MotionButton>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Learning Enhancements</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Select enhancements to apply to your PDF:</p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="form-checkbox text-[#6366F1]" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Highlight Key Concepts</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="form-checkbox text-[#6366F1]" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Add Margin Notes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="form-checkbox text-[#6366F1]" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Insert Practice Questions</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="form-checkbox text-[#6366F1]" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Create Mind Maps</span>
                    </label>
                  </div>
                  <MotionButton
                    className="mt-4 w-full bg-[#6366F1] text-white hover:bg-[#5457E5]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Apply Enhancements
                  </MotionButton>
                </CardContent>
              </Card>
            </div>

            {/* LLM Chat Interface */}
            <Card className="col-span-1 md:col-span-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Document Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px] w-full rounded-md border border-gray-200 dark:border-gray-700 p-4">
                  <ul className="space-y-2">
                    {[
                      "Aerospace Engineering Fundamentals",
                      "Aircraft Structures and Materials",
                      "Propulsion Systems Overview",
                      "Avionics and Flight Control Systems",
                      "Aerodynamics and Flight Mechanics",
                      "Space Systems Engineering",
                      "Aircraft Maintenance and Safety Protocols",
                      "Rocket Propulsion Technology",
                      "Satellite Communications Systems",
                      "UAV Design and Operation"
                    ].map((doc, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{doc}</span>
                      </motion.li>
                    ))}
                  </ul>
                </ScrollArea>
                <form className="mt-4 flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Ask a question about your documents..."
                    className="flex-grow"
                  />
                  <MotionButton
                    type="submit"
                    className="bg-[#6366F1] hover:bg-[#5457E5] text-white transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </MotionButton>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}