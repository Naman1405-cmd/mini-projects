import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Moon, Sun, RefreshCw, Download, Upload, FileText } from "lucide-react"

interface CodeEditorProps {
  onHtmlChange?: (value: string) => void
  onCssChange?: (value: string) => void
  onJsChange?: (value: string) => void
}

export default function CodeEditor({ onHtmlChange, onCssChange, onJsChange }: CodeEditorProps) {
  const { theme, setTheme } = useTheme()
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
</head>
<body>
    <div class="container">
        <h1>Hello, World!</h1>
        <p>Welcome to your code editor.</p>
        <button id="click-btn">Click me!</button>
    </div>
</body>
</html>`)

  const [cssCode, setCssCode] = useState(`body {
    margin: 0;
    padding: 20px;
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: white;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    padding: 50px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    backdrop-filter: blur(10px);
}

h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

button {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 12px 24px;
    font-size: 16px;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 20px;
    transition: background 0.3s ease;
}

button:hover {
    background: #ee5a52;
}`)

  const [jsCode, setJsCode] = useState(`document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('click-btn');
    let clickCount = 0;
    
    if (button) {
        button.addEventListener('click', function() {
            clickCount++;
            
            if (clickCount === 1) {
                this.textContent = 'Clicked once!';
                this.style.background = '#4ecdc4';
            } else if (clickCount === 2) {
                this.textContent = 'Double clicked!';
                this.style.background = '#45b7aa';
            } else {
                this.textContent = \`Clicked \${clickCount} times!\`;
                this.style.background = '#ff6b6b';
            }
            
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }, 50);
        });
    }
    
    console.log('JavaScript is running!');
});`)

  const previewRef = useRef<HTMLIFrameElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updatePreview = () => {
    if (!previewRef.current) return

    const fullHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Preview</title>
          <style>${cssCode}</style>
      </head>
      <body>
          ${htmlCode}
          <script>${jsCode}<\/script>
      </body>
      </html>
    `

    previewRef.current.srcdoc = fullHTML
  }

  useEffect(() => {
    updatePreview()
  }, [htmlCode, cssCode, jsCode])

  useEffect(() => {
    onHtmlChange?.(htmlCode)
    onCssChange?.(cssCode)
    onJsChange?.(jsCode)
  }, [htmlCode, cssCode, jsCode, onHtmlChange, onCssChange, onJsChange])

  useEffect(() => {
    const saved = localStorage.getItem('codeEditorProject')
    if (saved) {
      try {
        const projectData = JSON.parse(saved)
        if (projectData.html) setHtmlCode(projectData.html)
        if (projectData.css) setCssCode(projectData.css)
        if (projectData.js) setJsCode(projectData.js)
      } catch (error) {
        console.error('Error loading saved project:', error)
      }
    }
  }, [])

  useEffect(() => {
    const projectData = {
      html: htmlCode,
      css: cssCode,
      js: jsCode,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('codeEditorProject', JSON.stringify(projectData))
  }, [htmlCode, cssCode, jsCode])

  const handleNewProject = () => {
    if (confirm('Create a new project? This will clear all current code.')) {
      setHtmlCode('<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>New Project</title>\n</head>\n<body>\n    <h1>New Project</h1>\n</body>\n</html>')
      setCssCode('body {\n    margin: 0;\n    padding: 20px;\n    font-family: Arial, sans-serif;\n}')
      setJsCode('console.log("Hello, World!");')
    }
  }

  const handleSaveProject = () => {
    const projectData = {
      html: htmlCode,
      css: cssCode,
      js: jsCode,
      timestamp: new Date().toISOString()
    }

    const dataStr = JSON.stringify(projectData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `code-project-${Date.now()}.json`
    link.click()
    
    URL.revokeObjectURL(url)
  }

  const handleLoadProject = () => {
    fileInputRef.current?.click()
  }

  const handleFileLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const projectData = JSON.parse(e.target?.result as string)
          setHtmlCode(projectData.html || '')
          setCssCode(projectData.css || '')
          setJsCode(projectData.js || '')
        } catch (error) {
          alert('Error loading project file.')
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <header className="bg-card border-b border-border px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Code Editor Pro</h1>
          <div className="flex items-center gap-2">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handleNewProject}
              data-testid="button-new"
            >
              <FileText className="w-4 h-4 mr-2" />
              New
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handleSaveProject}
              data-testid="button-save"
            >
              <Download className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handleLoadProject}
              data-testid="button-load"
            >
              <Upload className="w-4 h-4 mr-2" />
              Load
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Theme:</span>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>
      </header>

      <div className="flex-1 flex min-h-0">
        <div className="flex-1 flex min-h-0">
          <div className="w-1/3 flex flex-col bg-card border-r border-border min-h-0">
            <div className="flex bg-muted border-b border-border">
              <div className="px-4 py-2 text-sm font-medium border-r border-border flex-1 bg-card text-foreground border-b-2 border-b-primary">
                HTML
              </div>
            </div>
            <div className="flex-1 min-h-0">
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className="w-full h-full p-4 bg-transparent border-none outline-none resize-none font-mono text-sm leading-relaxed text-foreground"
                placeholder="Enter your HTML code here..."
                data-testid="textarea-html"
              />
            </div>
          </div>

          <div className="w-1/3 flex flex-col bg-card border-r border-border min-h-0">
            <div className="flex bg-muted border-b border-border">
              <div className="px-4 py-2 text-sm font-medium border-r border-border flex-1 bg-card text-foreground border-b-2 border-b-primary">
                CSS
              </div>
            </div>
            <div className="flex-1 min-h-0">
              <textarea
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
                className="w-full h-full p-4 bg-transparent border-none outline-none resize-none font-mono text-sm leading-relaxed text-foreground"
                placeholder="Enter your CSS code here..."
                data-testid="textarea-css"
              />
            </div>
          </div>

          <div className="w-1/3 flex flex-col bg-card min-h-0">
            <div className="flex bg-muted border-b border-border">
              <div className="px-4 py-2 text-sm font-medium border-r border-border flex-1 bg-card text-foreground border-b-2 border-b-primary">
                JavaScript
              </div>
            </div>
            <div className="flex-1 min-h-0">
              <textarea
                value={jsCode}
                onChange={(e) => setJsCode(e.target.value)}
                className="w-full h-full p-4 bg-transparent border-none outline-none resize-none font-mono text-sm leading-relaxed text-foreground"
                placeholder="Enter your JavaScript code here..."
                data-testid="textarea-js"
              />
            </div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col bg-card border-l border-border min-h-0">
          <div className="bg-muted border-b border-border px-4 py-2 flex items-center justify-between">
            <span className="text-sm font-medium">Preview</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={updatePreview}
              data-testid="button-refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex-1 min-h-0">
            <iframe
              ref={previewRef}
              className="w-full h-full border-none bg-white"
              title="Preview"
              data-testid="iframe-preview"
            />
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileLoad}
        className="hidden"
        data-testid="input-file"
      />
    </div>
  )
}
