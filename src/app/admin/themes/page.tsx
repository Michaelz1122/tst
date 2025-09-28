'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Palette, 
  Download, 
  Upload, 
  Save, 
  Eye, 
  Edit3, 
  Trash2, 
  Plus,
  Copy,
  Sparkles,
  Settings,
  Check,
  X,
  Moon,
  Sun,
  Monitor,
  Brush,
  Layout,
  Type,
  Sliders
} from 'lucide-react'

interface Theme {
  id: string
  name: string
  description: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
    border: string
  }
  typography: {
    fontFamily: string
    fontSize: {
      xs: string
      sm: string
      base: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
    }
    fontWeight: {
      light: string
      normal: string
      medium: string
      semibold: string
      bold: string
    }
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    '2xl': string
  }
  borderRadius: {
    none: string
    sm: string
    md: string
    lg: string
    full: string
  }
  shadows: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  customCSS: string
  isActive: boolean
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export default function ThemesPage() {
  const [themes, setThemes] = useState<Theme[]>([])
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('colors')
  const [previewMode, setPreviewMode] = useState<'light' | 'dark' | 'auto'>('auto')

  const [newTheme, setNewTheme] = useState({
    name: '',
    description: ''
  })

  // Mock data for demonstration
  useEffect(() => {
    const mockThemes: Theme[] = [
      {
        id: '1',
        name: 'Modern Dark',
        description: 'Professional dark theme with purple accents',
        colors: {
          primary: '#8b5cf6',
          secondary: '#ec4899',
          accent: '#f59e0b',
          background: '#0f172a',
          surface: '#1e293b',
          text: '#f8fafc',
          textSecondary: '#94a3b8',
          border: '#334155'
        },
        typography: {
          fontFamily: 'Inter, sans-serif',
          fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem'
          },
          fontWeight: {
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700'
          }
        },
        spacing: {
          xs: '0.5rem',
          sm: '0.75rem',
          md: '1rem',
          lg: '1.5rem',
          xl: '2rem',
          '2xl': '3rem'
        },
        borderRadius: {
          none: '0px',
          sm: '0.125rem',
          md: '0.375rem',
          lg: '0.5rem',
          full: '9999px'
        },
        shadows: {
          sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
          xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
        },
        customCSS: '',
        isActive: true,
        isDefault: false,
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20'
      },
      {
        id: '2',
        name: 'Light Professional',
        description: 'Clean light theme with blue accents',
        colors: {
          primary: '#3b82f6',
          secondary: '#06b6d4',
          accent: '#10b981',
          background: '#ffffff',
          surface: '#f8fafc',
          text: '#1e293b',
          textSecondary: '#64748b',
          border: '#e2e8f0'
        },
        typography: {
          fontFamily: 'Inter, sans-serif',
          fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem'
          },
          fontWeight: {
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700'
          }
        },
        spacing: {
          xs: '0.5rem',
          sm: '0.75rem',
          md: '1rem',
          lg: '1.5rem',
          xl: '2rem',
          '2xl': '3rem'
        },
        borderRadius: {
          none: '0px',
          sm: '0.125rem',
          md: '0.375rem',
          lg: '0.5rem',
          full: '9999px'
        },
        shadows: {
          sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
          xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
        },
        customCSS: '',
        isActive: false,
        isDefault: true,
        createdAt: '2024-01-10',
        updatedAt: '2024-01-18'
      }
    ]
    setThemes(mockThemes)
    setSelectedTheme(mockThemes[0])
  }, [])

  const createNewTheme = () => {
    if (!newTheme.name) return

    const theme: Theme = {
      id: Date.now().toString(),
      name: newTheme.name,
      description: newTheme.description,
      colors: {
        primary: '#8b5cf6',
        secondary: '#ec4899',
        accent: '#f59e0b',
        background: '#0f172a',
        surface: '#1e293b',
        text: '#f8fafc',
        textSecondary: '#94a3b8',
        border: '#334155'
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem'
        },
        fontWeight: {
          light: '300',
          normal: '400',
          medium: '500',
          semibold: '600',
          bold: '700'
        }
      },
      spacing: {
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem'
      },
      borderRadius: {
        none: '0px',
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        full: '9999px'
      },
      shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
      },
      customCSS: '',
      isActive: false,
      isDefault: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setThemes([theme, ...themes])
    setSelectedTheme(theme)
    setIsEditing(true)
    
    setNewTheme({ name: '', description: '' })
  }

  const updateTheme = () => {
    if (!selectedTheme) return

    const updatedTheme = {
      ...selectedTheme,
      updatedAt: new Date().toISOString()
    }

    setThemes(themes.map(t => t.id === selectedTheme.id ? updatedTheme : t))
    setSelectedTheme(updatedTheme)
  }

  const deleteTheme = (themeId: string) => {
    setThemes(themes.filter(t => t.id !== themeId))
    if (selectedTheme?.id === themeId) {
      setSelectedTheme(themes[0] || null)
    }
  }

  const duplicateTheme = (theme: Theme) => {
    const duplicatedTheme = {
      ...theme,
      id: Date.now().toString(),
      name: `${theme.name} (Copy)`,
      isActive: false,
      isDefault: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setThemes([duplicatedTheme, ...themes])
  }

  const activateTheme = (themeId: string) => {
    setThemes(themes.map(t => ({
      ...t,
      isActive: t.id === themeId
    })))
    if (selectedTheme?.id === themeId) {
      setSelectedTheme({ ...selectedTheme, isActive: true })
    }
  }

  const setAsDefault = (themeId: string) => {
    setThemes(themes.map(t => ({
      ...t,
      isDefault: t.id === themeId
    })))
    if (selectedTheme?.id === themeId) {
      setSelectedTheme({ ...selectedTheme, isDefault: true })
    }
  }

  const generateCSS = (theme: Theme) => {
    return `
:root {
  /* Colors */
  --color-primary: ${theme.colors.primary};
  --color-secondary: ${theme.colors.secondary};
  --color-accent: ${theme.colors.accent};
  --color-background: ${theme.colors.background};
  --color-surface: ${theme.colors.surface};
  --color-text: ${theme.colors.text};
  --color-text-secondary: ${theme.colors.textSecondary};
  --color-border: ${theme.colors.border};
  
  /* Typography */
  --font-family: ${theme.typography.fontFamily};
  --font-size-xs: ${theme.typography.fontSize.xs};
  --font-size-sm: ${theme.typography.fontSize.sm};
  --font-size-base: ${theme.typography.fontSize.base};
  --font-size-lg: ${theme.typography.fontSize.lg};
  --font-size-xl: ${theme.typography.fontSize.xl};
  --font-size-2xl: ${theme.typography.fontSize['2xl']};
  --font-size-3xl: ${theme.typography.fontSize['3xl']};
  --font-weight-light: ${theme.typography.fontWeight.light};
  --font-weight-normal: ${theme.typography.fontWeight.normal};
  --font-weight-medium: ${theme.typography.fontWeight.medium};
  --font-weight-semibold: ${theme.typography.fontWeight.semibold};
  --font-weight-bold: ${theme.typography.fontWeight.bold};
  
  /* Spacing */
  --spacing-xs: ${theme.spacing.xs};
  --spacing-sm: ${theme.spacing.sm};
  --spacing-md: ${theme.spacing.md};
  --spacing-lg: ${theme.spacing.lg};
  --spacing-xl: ${theme.spacing.xl};
  --spacing-2xl: ${theme.spacing['2xl']};
  
  /* Border Radius */
  --radius-none: ${theme.borderRadius.none};
  --radius-sm: ${theme.borderRadius.sm};
  --radius-md: ${theme.borderRadius.md};
  --radius-lg: ${theme.borderRadius.lg};
  --radius-full: ${theme.borderRadius.full};
  
  /* Shadows */
  --shadow-sm: ${theme.shadows.sm};
  --shadow-md: ${theme.shadows.md};
  --shadow-lg: ${theme.shadows.lg};
  --shadow-xl: ${theme.shadows.xl};
}

${theme.customCSS}
    `.trim()
  }

  const downloadTheme = () => {
    if (!selectedTheme) return

    const css = generateCSS(selectedTheme)
    const blob = new Blob([css], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedTheme.name.toLowerCase().replace(/\s+/g, '-')}-theme.css`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">
                Theme Manager
              </h1>
              <p className="text-gray-200 mt-2">Create, customize, and manage website themes with our powerful theme editor</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  const modal = document.getElementById('createThemeModal')
                  if (modal) modal.classList.remove('hidden')
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Theme
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Create Theme Modal */}
        <div id="createThemeModal" className="hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Create New Theme</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Theme Name</label>
                <Input
                  value={newTheme.name}
                  onChange={(e) => setNewTheme({ ...newTheme, name: e.target.value })}
                  placeholder="Enter theme name"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={newTheme.description}
                  onChange={(e) => setNewTheme({ ...newTheme, description: e.target.value })}
                  placeholder="Theme description"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button
                onClick={createNewTheme}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
              >
                Create Theme
              </Button>
              <Button
                onClick={() => {
                  const modal = document.getElementById('createThemeModal')
                  if (modal) modal.classList.add('hidden')
                }}
                variant="outline"
                className="border-gray-600"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Themes List */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Themes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {themes.map((theme) => (
                  <div
                    key={theme.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedTheme?.id === theme.id
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-gray-600'
                    }`}
                    onClick={() => setSelectedTheme(theme)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-white">{theme.name}</h4>
                          {theme.isActive && <Badge className="bg-green-500 text-white">Active</Badge>}
                          {theme.isDefault && <Badge className="bg-blue-500 text-white">Default</Badge>}
                        </div>
                        <p className="text-sm text-gray-200">{theme.description}</p>
                        <div className="flex gap-1 mt-2">
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-600"
                            style={{ backgroundColor: theme.colors.primary }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-600"
                            style={{ backgroundColor: theme.colors.secondary }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-600"
                            style={{ backgroundColor: theme.colors.accent }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Theme Editor */}
          <div className="lg:col-span-3">
            {selectedTheme ? (
              <div className="space-y-6">
                {/* Theme Actions */}
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">{selectedTheme.name}</h3>
                        <p className="text-gray-200">{selectedTheme.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setIsEditing(!isEditing)}
                          variant={isEditing ? 'outline' : 'default'}
                          size="sm"
                          className={isEditing ? 'border-gray-600' : 'bg-blue-500'}
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          {isEditing ? 'Preview' : 'Edit'}
                        </Button>
                        <Button
                          onClick={() => duplicateTheme(selectedTheme)}
                          variant="outline"
                          size="sm"
                          className="border-gray-600"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </Button>
                        {!selectedTheme.isActive && (
                          <Button
                            onClick={() => activateTheme(selectedTheme.id)}
                            size="sm"
                            className="bg-green-500"
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Activate
                          </Button>
                        )}
                        <Button
                          onClick={downloadTheme}
                          variant="outline"
                          size="sm"
                          className="border-gray-600"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        {!selectedTheme.isDefault && (
                          <Button
                            onClick={() => deleteTheme(selectedTheme.id)}
                            variant="outline"
                            size="sm"
                            className="border-red-600 text-red-400"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Theme Editor Tabs */}
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-0">
                    <div className="h-[600px]">
                      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                        <TabsList className="grid w-full grid-cols-5 border-b border-gray-700">
                          <TabsTrigger value="colors" className="data-[state=active]:bg-purple-500">
                            <Palette className="w-4 h-4 mr-2" />
                            Colors
                          </TabsTrigger>
                          <TabsTrigger value="typography" className="data-[state=active]:bg-purple-500">
                            <Type className="w-4 h-4 mr-2" />
                            Typography
                          </TabsTrigger>
                          <TabsTrigger value="spacing" className="data-[state=active]:bg-purple-500">
                            <Layout className="w-4 h-4 mr-2" />
                            Spacing
                          </TabsTrigger>
                          <TabsTrigger value="advanced" className="data-[state=active]:bg-purple-500">
                            <Sliders className="w-4 h-4 mr-2" />
                            Advanced
                          </TabsTrigger>
                          <TabsTrigger value="preview" className="data-[state=active]:bg-purple-500">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="colors" className="h-[calc(100%-48px)] p-6 overflow-auto">
                          <div className="grid grid-cols-2 gap-6">
                            {Object.entries(selectedTheme.colors).map(([key, value]) => (
                              <div key={key}>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                  {key.charAt(0).toUpperCase() + key.slice(1)}
                                </label>
                                <div className="flex gap-2">
                                  <Input
                                    type="color"
                                    value={value}
                                    onChange={(e) => setSelectedTheme(prev => prev ? {
                                      ...prev,
                                      colors: { ...prev.colors, [key]: e.target.value }
                                    } : null)}
                                    className="w-16 h-10 p-1 bg-gray-700 border-gray-600"
                                  />
                                  <Input
                                    value={value}
                                    onChange={(e) => setSelectedTheme(prev => prev ? {
                                      ...prev,
                                      colors: { ...prev.colors, [key]: e.target.value }
                                    } : null)}
                                    className="flex-1 bg-gray-700 border-gray-600 text-white font-mono text-sm"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="typography" className="h-[calc(100%-48px)] p-6 overflow-auto">
                          <div className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-200 mb-2">
                                Font Family
                              </label>
                              <Select
                                value={selectedTheme.typography.fontFamily}
                                onValueChange={(value) => setSelectedTheme(prev => prev ? {
                                  ...prev,
                                  typography: { ...prev.typography, fontFamily: value }
                                } : null)}
                              >
                                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-700 border-gray-600">
                                  <SelectItem value="Inter, sans-serif">Inter</SelectItem>
                                  <SelectItem value="Roboto, sans-serif">Roboto</SelectItem>
                                  <SelectItem value="Open Sans, sans-serif">Open Sans</SelectItem>
                                  <SelectItem value="Lato, sans-serif">Lato</SelectItem>
                                  <SelectItem value="Montserrat, sans-serif">Montserrat</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-200 mb-2">
                                Font Sizes
                              </label>
                              <div className="grid grid-cols-2 gap-4">
                                {Object.entries(selectedTheme.typography.fontSize).map(([key, value]) => (
                                  <div key={key}>
                                    <label className="block text-xs text-gray-200 mb-1">
                                      {key.toUpperCase()}
                                    </label>
                                    <Input
                                      value={value}
                                      onChange={(e) => setSelectedTheme(prev => prev ? {
                                        ...prev,
                                        typography: {
                                          ...prev.typography,
                                          fontSize: { ...prev.typography.fontSize, [key]: e.target.value }
                                        }
                                      } : null)}
                                      className="bg-gray-700 border-gray-600 text-white"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-200 mb-2">
                                Font Weights
                              </label>
                              <div className="grid grid-cols-3 gap-4">
                                {Object.entries(selectedTheme.typography.fontWeight).map(([key, value]) => (
                                  <div key={key}>
                                    <label className="block text-xs text-gray-200 mb-1">
                                      {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </label>
                                    <Input
                                      value={value}
                                      onChange={(e) => setSelectedTheme(prev => prev ? {
                                        ...prev,
                                        typography: {
                                          ...prev.typography,
                                          fontWeight: { ...prev.typography.fontWeight, [key]: e.target.value }
                                        }
                                      } : null)}
                                      className="bg-gray-700 border-gray-600 text-white"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="spacing" className="h-[calc(100%-48px)] p-6 overflow-auto">
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(selectedTheme.spacing).map(([key, value]) => (
                              <div key={key}>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                  {key.toUpperCase()}
                                </label>
                                <Input
                                  value={value}
                                  onChange={(e) => setSelectedTheme(prev => prev ? {
                                    ...prev,
                                    spacing: { ...prev.spacing, [key]: e.target.value }
                                  } : null)}
                                  className="bg-gray-700 border-gray-600 text-white"
                                />
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="advanced" className="h-[calc(100%-48px)] p-6 overflow-auto">
                          <div className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-200 mb-2">
                                Border Radius
                              </label>
                              <div className="grid grid-cols-3 gap-4">
                                {Object.entries(selectedTheme.borderRadius).map(([key, value]) => (
                                  <div key={key}>
                                    <label className="block text-xs text-gray-200 mb-1">
                                      {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </label>
                                    <Input
                                      value={value}
                                      onChange={(e) => setSelectedTheme(prev => prev ? {
                                        ...prev,
                                        borderRadius: { ...prev.borderRadius, [key]: e.target.value }
                                      } : null)}
                                      className="bg-gray-700 border-gray-600 text-white"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-200 mb-2">
                                Shadows
                              </label>
                              <div className="grid grid-cols-2 gap-4">
                                {Object.entries(selectedTheme.shadows).map(([key, value]) => (
                                  <div key={key}>
                                    <label className="block text-xs text-gray-200 mb-1">
                                      {key.toUpperCase()}
                                    </label>
                                    <Input
                                      value={value}
                                      onChange={(e) => setSelectedTheme(prev => prev ? {
                                        ...prev,
                                        shadows: { ...prev.shadows, [key]: e.target.value }
                                      } : null)}
                                      className="bg-gray-700 border-gray-600 text-white font-mono text-sm"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-200 mb-2">
                                Custom CSS
                              </label>
                              <Textarea
                                value={selectedTheme.customCSS}
                                onChange={(e) => setSelectedTheme(prev => prev ? {
                                  ...prev,
                                  customCSS: e.target.value
                                } : null)}
                                className="bg-gray-700 border-gray-600 text-white font-mono text-sm"
                                placeholder="Custom CSS rules..."
                                rows={6}
                              />
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="preview" className="h-[calc(100%-48px)] p-6 overflow-auto">
                          <div className="space-y-6">
                            <div className="flex items-center justify-between">
                              <h4 className="text-white font-medium">Theme Preview</h4>
                              <div className="flex gap-2">
                                <Button
                                  variant={previewMode === 'light' ? 'default' : 'outline'}
                                  size="sm"
                                  onClick={() => setPreviewMode('light')}
                                  className={previewMode === 'light' ? 'bg-yellow-500' : 'border-gray-600'}
                                >
                                  <Sun className="w-4 h-4 mr-2" />
                                  Light
                                </Button>
                                <Button
                                  variant={previewMode === 'dark' ? 'default' : 'outline'}
                                  size="sm"
                                  onClick={() => setPreviewMode('dark')}
                                  className={previewMode === 'dark' ? 'bg-purple-500' : 'border-gray-600'}
                                >
                                  <Moon className="w-4 h-4 mr-2" />
                                  Dark
                                </Button>
                                <Button
                                  variant={previewMode === 'auto' ? 'default' : 'outline'}
                                  size="sm"
                                  onClick={() => setPreviewMode('auto')}
                                  className={previewMode === 'auto' ? 'bg-blue-500' : 'border-gray-600'}
                                >
                                  <Monitor className="w-4 h-4 mr-2" />
                                  Auto
                                </Button>
                              </div>
                            </div>
                            
                            <div className="border border-gray-700 rounded-lg p-6">
                              <div className="space-y-4">
                                <div className="text-center">
                                  <h1 className="text-3xl font-bold mb-2" style={{ color: selectedTheme.colors.text }}>
                                    Heading 1
                                  </h1>
                                  <p className="text-lg" style={{ color: selectedTheme.colors.textSecondary }}>
                                    This is a sample paragraph in secondary text color.
                                  </p>
                                </div>
                                
                                <div className="flex gap-4 justify-center">
                                  <button 
                                    className="px-4 py-2 rounded-lg font-medium"
                                    style={{ 
                                      backgroundColor: selectedTheme.colors.primary,
                                      color: selectedTheme.colors.background
                                    }}
                                  >
                                    Primary Button
                                  </button>
                                  <button 
                                    className="px-4 py-2 rounded-lg font-medium border"
                                    style={{ 
                                      borderColor: selectedTheme.colors.border,
                                      color: selectedTheme.colors.text
                                    }}
                                  >
                                    Secondary Button
                                  </button>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-4 mt-6">
                                  <div 
                                    className="p-4 rounded-lg text-center"
                                    style={{ 
                                      backgroundColor: selectedTheme.colors.surface,
                                      borderColor: selectedTheme.colors.border,
                                      borderWidth: '1px',
                                      borderStyle: 'solid'
                                    }}
                                  >
                                    <div className="w-12 h-12 mx-auto mb-2 rounded-full" style={{ backgroundColor: selectedTheme.colors.primary }}></div>
                                    <p style={{ color: selectedTheme.colors.text }}>Card 1</p>
                                  </div>
                                  <div 
                                    className="p-4 rounded-lg text-center"
                                    style={{ 
                                      backgroundColor: selectedTheme.colors.surface,
                                      borderColor: selectedTheme.colors.border,
                                      borderWidth: '1px',
                                      borderStyle: 'solid'
                                    }}
                                  >
                                    <div className="w-12 h-12 mx-auto mb-2 rounded-full" style={{ backgroundColor: selectedTheme.colors.secondary }}></div>
                                    <p style={{ color: selectedTheme.colors.text }}>Card 2</p>
                                  </div>
                                  <div 
                                    className="p-4 rounded-lg text-center"
                                    style={{ 
                                      backgroundColor: selectedTheme.colors.surface,
                                      borderColor: selectedTheme.colors.border,
                                      borderWidth: '1px',
                                      borderStyle: 'solid'
                                    }}
                                  >
                                    <div className="w-12 h-12 mx-auto mb-2 rounded-full" style={{ backgroundColor: selectedTheme.colors.accent }}></div>
                                    <p style={{ color: selectedTheme.colors.text }}>Card 3</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-200 mb-2">
                                Generated CSS
                              </label>
                              <Textarea
                                value={generateCSS(selectedTheme)}
                                readOnly
                                className="bg-gray-900 text-green-400 font-mono text-sm"
                                rows={10}
                              />
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                      
                      {/* Save Button */}
                      <div className="absolute bottom-4 right-4">
                        <Button
                          onClick={updateTheme}
                          className="bg-gradient-to-r from-purple-500 to-pink-500"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="flex items-center justify-center h-[600px]">
                  <div className="text-center">
                    <Palette className="w-16 h-16 mx-auto mb-4 text-gray-200" />
                    <h3 className="text-xl font-bold text-white mb-2">No Theme Selected</h3>
                    <p className="text-gray-200 mb-4">Select a theme from the list or create a new one to get started</p>
                    <Button
                      onClick={() => {
                        const modal = document.getElementById('createThemeModal')
                        if (modal) modal.classList.remove('hidden')
                      }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Theme
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}