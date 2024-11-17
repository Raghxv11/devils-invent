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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from 'next/image'

const MotionButton = motion(Button)

export default function Dashboard() {
  const [isDragging, setIsDragging] = useState(false)
  const [activeTab, setActiveTab] = useState('original')
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [quizOpen, setQuizOpen] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const questions = [
    {
      id: 1,
      question: "What powers the main hydraulic system of the Hawker 800XP?",
      options: [
        "Electric pumps",
        "Two engine-driven pumps",
        "APU-driven pump",
        "Single central hydraulic pump"
      ],
      correctAnswer: "Two engine-driven pumps",
      correctIndex: 1
    },
    {
      id: 2,
      question: "The aircraft's fire extinguishing system for engines is described as a \"two-shot system.\" What does this mean?",
      options: [
        "It can protect against two different types of fires",
        "It can extinguish fires in two separate engines simultaneously",
        "It provides two separate discharge opportunities for the same engine",
        "It requires two pilots to activate"
      ],
      correctAnswer: "It provides two separate discharge opportunities for the same engine",
      correctIndex: 2
    },
    {
      id: 3,
      question: "Which component is used to remove moisture from the air conditioning system?",
      options: [
        "Ram air heat exchanger",
        "Water separator",
        "Cooling turbine",
        "Dorsal intake duct"
      ],
      correctAnswer: "Water separator",
      correctIndex: 1
    },
    {
      id: 4,
      question: "How is cabin pressurization normally controlled?",
      options: [
        "Through a single outflow valve",
        "Through two outflow/safety valves",
        "Direct engine bleed control",
        "Manual control only"
      ],
      correctAnswer: "Through two outflow/safety valves",
      correctIndex: 1
    },
    {
      id: 5,
      question: "Which system is used for anti-icing the wing and horizontal stabilizer leading edges?",
      options: [
        "Electrical heating",
        "Engine bleed air",
        "TKS fluid system",
        "Pneumatic boots"
      ],
      correctAnswer: "TKS fluid system",
      correctIndex: 2
    },
    {
      id: 6,
      question: "How are the primary flight controls (ailerons, rudder, and elevators) actuated?",
      options: [
        "Hydraulically",
        "Electrically",
        "Mechanically",
        "Pneumatically"
      ],
      correctAnswer: "Mechanically",
      correctIndex: 2
    },
    {
      id: 7,
      question: "What backup system is available for flap operation if the main hydraulic system fails?",
      options: [
        "Electric motor",
        "Manual hand crank",
        "Auxiliary hydraulic system",
        "Emergency pneumatic system"
      ],
      correctAnswer: "Auxiliary hydraulic system",
      correctIndex: 2
    },
    {
      id: 8,
      question: "The APU serves multiple functions EXCEPT:",
      options: [
        "Providing electrical power",
        "Charging aircraft batteries",
        "Providing thrust for taxi",
        "Supplying bleed air for air conditioning"
      ],
      correctAnswer: "Providing thrust for taxi",
      correctIndex: 2
    },
    {
      id: 9,
      question: "In the event of pressurization system failure, what backup system is available?",
      options: [
        "Emergency oxygen only",
        "Emergency pressurization through separate ducting from #2 Engine",
        "Manual pressure control only",
        "None of the above"
      ],
      correctAnswer: "Emergency pressurization through separate ducting from #2 Engine",
      correctIndex: 1
    },
    {
      id: 10,
      question: "How many static vent plates does the pitot-static system utilize?",
      options: [
        "Two",
        "Three",
        "Four",
        "Six"
      ],
      correctAnswer: "Four",
      correctIndex: 2
    }
  ]

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

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctIndex) {
      setScore(score + 1)
    }
    
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      setShowResults(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResults(false)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

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
                          className={`bg-gray-100 dark:bg-gray-700 h-[calc(100vh-200px)] rounded-lg flex items-center justify-center border-2 border-dashed ${
                            isDragging ? 'border-[#6366F1]' : 'border-gray-300 dark:border-gray-600'
                          }`}
                          animate={{ scale: isDragging ? 1.05 : 1 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                        >
                          <div className="h-full w-full relative">
                            <Image 
                              src="/before.jpeg" 
                              alt="Before" 
                              fill
                              className="object-contain"
                              priority
                            />
                          </div>
                        </motion.div>
                      </TabsContent>
                      <TabsContent value="modified">
                        <div className="bg-gray-100 dark:bg-gray-700 h-[calc(100vh-200px)] rounded-lg flex items-center justify-center">
                          <div className="h-full w-full relative">
                            <Image 
                              src="/final.gif" 
                              alt="After" 
                              fill
                              className="object-contain"
                              priority
                            />
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
                  <CardTitle className="text-lg font-semibold">View Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">We have created a comprehensive summary of your document with AI assistance.</p>
                  <MotionButton
                    className="mt-4 bg-white text-[#6366F1] hover:bg-gray-100"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSummaryOpen(true)}
                  >
                    View
                  </MotionButton>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">View Quiz</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">We have generated an interactive quiz based on your document content.</p>
                  <MotionButton
                    className="mt-4 bg-white text-[#8B5CF6] hover:bg-gray-100"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuizOpen(true)}
                  >
                    View
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

      {/* Summary Dialog */}
      <Dialog open={summaryOpen} onOpenChange={setSummaryOpen}>
        <DialogContent className="max-w-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <DialogHeader className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-transparent bg-clip-text">
              Document Summary
            </DialogTitle>
          </DialogHeader>
          <div className="mt-6 text-gray-700 dark:text-gray-300 space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg leading-relaxed font-medium"
            >
              The Hawker 800XP is a sophisticated business aircraft equipped with dual TFE 731-5BR-1A turbofan engines and comprehensive systems for safe operation in various conditions. Key systems include:
            </motion.p>
            <motion.ul 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid gap-3"
            >
              {[
                "Twin Garrett AiResearch TFE 731-5BR-1A turbofan engines with TR5000BA thrust reverser system",
                "Self-sufficient APU providing electrical power and bleed air for ground operations",
                "Dual-shot engine fire extinguishing system and separate APU fire protection",
                "Engine bleed air-based air conditioning and pressurization systems",
                "TKS fluid system for wings/stabilizers with electrical heating for windows/sensors",
                "Mechanical primary controls with hydraulic secondary controls",
                "EFIS 86 E or SPZ 8000 Electronic Flight Instrument Systems"
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm"
                >
                  <div className="flex-shrink-0 w-2 h-2 bg-[#6366F1] rounded-full" />
                  <span className="text-sm">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quiz Dialog */}
      <Dialog open={quizOpen} onOpenChange={(open) => {
        setQuizOpen(open)
        if (!open) resetQuiz()
      }}>
        <DialogContent className="max-w-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <DialogHeader className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-transparent bg-clip-text">
              Knowledge Check
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-6 text-gray-700 dark:text-gray-300">
            {!showResults ? (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Question {currentQuestion + 1} of {questions.length}</span>
                  <span className="text-sm font-medium">Score: {score}</span>
                </div>
                
                <p className="text-lg font-medium">{questions[currentQuestion].question}</p>
                
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      className={`w-full text-left p-4 rounded-lg border transition-colors ${
                        selectedAnswer === index
                          ? 'border-[#6366F1] bg-[#6366F1]/10'
                          : 'border-gray-200 dark:border-gray-700 hover:border-[#6366F1]'
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
                
                <MotionButton
                  className="w-full bg-[#6366F1] text-white"
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </MotionButton>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
              >
                <h3 className="text-2xl font-bold">Quiz Complete!</h3>
                <p className="text-lg">Your score: {score} out of {questions.length}</p>
                <p className="text-sm">
                  ({Math.round((score / questions.length) * 100)}% correct)
                </p>
                <MotionButton
                  className="bg-[#6366F1] text-white"
                  onClick={resetQuiz}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Retry Quiz
                </MotionButton>
              </motion.div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}