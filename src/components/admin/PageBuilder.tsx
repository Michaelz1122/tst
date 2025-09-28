'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Eye, 
  MoveUp, 
  MoveDown, 
  Type, 
  Image, 
  Video, 
  Code, 
  FileText,
  Heading1,
  Heading2,
  Heading3,
  List,
  Quote,
  Link as LinkIcon,
  Layout,
  Monitor,
  Tablet,
  Smartphone,
  RefreshCw,
  Download,
  Send,
  BarChart3
} from 'lucide-react'

interface ContentBlock {
  id: string
  type: 'heading' | 'paragraph' | 'image' | 'video' | 'code' | 'list' | 'quote' | 'button' | 'link'
  content: string
  props?: {
    level?: number
    src?: string
    alt?: string
    href?: string
    buttonText?: string
    ordered?: boolean
    language?: string
  }
  styles?: {
    textAlign?: 'left' | 'center' | 'right'
    fontSize?: string
    color?: string
    backgroundColor?: string
    padding?: string
    margin?: string
  }
}

interface PageData {
  id: string
  title: string
  slug: string
  status: 'published' | 'draft'
  seoTitle?: string
  seoDescription?: string
  blocks: ContentBlock[]
}

export default function PageBuilder() {
  const [page, setPage] = useState<PageData>({
    id: '1',
    title: 'Home Page',
    slug: '/',
    status: 'published',
    seoTitle: 'Welcome to Our Website',
    seoDescription: 'Discover amazing content and services',
    blocks: [
      {
        id: '1',
        type: 'heading',
        content: 'Welcome to Our Website',
        props: { level: 1 },
        styles: { textAlign: 'center', fontSize: '2.5rem' }
      },
      {
        id: '2',
        type: 'paragraph',
        content: 'We provide amazing services that help businesses grow and succeed in the digital world. Our team of experts is dedicated to delivering exceptional results.',
        styles: { textAlign: 'center', fontSize: '1.1rem' }
      },
      {
        id: '3',
        type: 'heading',
        content: 'Our Services',
        props: { level: 2 },
        styles: { textAlign: 'center' }
      },
      {
        id: '4',
        type: 'list',
        content: 'Web Development\nDigital Marketing\nSEO Optimization\nContent Creation',
        props: { ordered: false }
      }
    ]
  })

  const [selectedBlock, setSelectedBlock] = useState<ContentBlock | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [blockCounter, setBlockCounter] = useState(1)
  const [publishDate, setPublishDate] = useState(() => {
    // Only set the date on the client side to avoid hydration mismatch
    if (typeof window !== 'undefined') {
      return new Date().toISOString().slice(0, 16)
    }
    return ''
  })

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: `block_${blockCounter}`,
      type,
      content: type === 'heading' ? 'New Heading' : 
               type === 'paragraph' ? 'Enter your text here...' :
               type === 'button' ? 'Click Me' :
               type === 'link' ? 'Link Text' : '',
      props: type === 'heading' ? { level: 2 } : {},
      styles: { textAlign: 'left' }
    }
    setPage({ ...page, blocks: [...page.blocks, newBlock] })
    setBlockCounter(blockCounter + 1)
  }

  const updateBlock = (blockId: string, updates: Partial<ContentBlock>) => {
    setPage({
      ...page,
      blocks: page.blocks.map(block => 
        block.id === blockId ? { ...block, ...updates } : block
      )
    })
  }

  const deleteBlock = (blockId: string) => {
    setPage({
      ...page,
      blocks: page.blocks.filter(block => block.id !== blockId)
    })
  }

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const index = page.blocks.findIndex(block => block.id === blockId)
    if (index === -1) return

    const newBlocks = [...page.blocks]
    if (direction === 'up' && index > 0) {
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]]
    } else if (direction === 'down' && index < newBlocks.length - 1) {
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]]
    }

    setPage({ ...page, blocks: newBlocks })
  }

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return '375px'
      case 'tablet': return '768px'
      default: return '100%'
    }
  }

  const renderBlock = (block: ContentBlock, isPreview = false) => {
    const commonProps = {
      key: block.id,
      className: `p-4 border rounded-lg mb-4 cursor-pointer ${!isPreview ? 'min-h-[60px]' : ''}`,
      onClick: () => !isPreview && setSelectedBlock(block)
    }

    const styles = block.styles || {}
    const styleProps = {
      textAlign: styles.textAlign || 'left',
      fontSize: styles.fontSize,
      color: styles.color,
      backgroundColor: styles.backgroundColor,
      padding: styles.padding,
      margin: styles.margin
    }

    switch (block.type) {
      case 'heading':
        const headingLevel = block.props?.level || 2
        const headingProps = {
          h1: { as: 'h1', className: 'text-4xl font-bold' },
          h2: { as: 'h2', className: 'text-3xl font-semibold' },
          h3: { as: 'h3', className: 'text-2xl font-medium' },
          h4: { as: 'h4', className: 'text-xl font-medium' },
          h5: { as: 'h5', className: 'text-lg font-medium' },
          h6: { as: 'h6', className: 'text-base font-medium' }
        }
        const HeadingComponent = headingProps[`h${Math.min(Math.max(headingLevel, 1), 6)}` as keyof typeof headingProps]
        return (
          <div {...commonProps}>
            <HeadingComponent.as style={styleProps} className={HeadingComponent.className}>
              {block.content || 'Heading Text'}
            </HeadingComponent.as>
          </div>
        )

      case 'paragraph':
        return (
          <div {...commonProps}>
            <p style={styleProps}>
              {block.content || 'Paragraph text...'}
            </p>
          </div>
        )

      case 'list':
        const items = block.content.split('\n').filter(item => item.trim())
        const isOrdered = block.props?.ordered || false
        const ListTag = isOrdered ? 'ol' : 'ul'
        return (
          <div {...commonProps}>
            <ListTag style={styleProps} className={isOrdered ? 'list-decimal list-inside' : 'list-disc list-inside'}>
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ListTag>
          </div>
        )

      case 'quote':
        return (
          <div {...commonProps}>
            <blockquote style={styleProps} className="border-l-4 border-gray-300 pl-4 italic">
              {block.content || 'Quote text...'}
            </blockquote>
          </div>
        )

      case 'button':
        return (
          <div {...commonProps}>
            <button 
              style={styleProps}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {block.content || 'Button Text'}
            </button>
          </div>
        )

      case 'link':
        return (
          <div {...commonProps}>
            <a 
              href={block.props?.href || '#'} 
              style={styleProps}
              className="text-blue-500 hover:underline"
            >
              {block.content || 'Link Text'}
            </a>
          </div>
        )

      case 'image':
        return (
          <div {...commonProps}>
            <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded">
              <Image className="mx-auto h-12 w-12 text-gray-400" alt="Image placeholder" />
              <p className="mt-2 text-sm text-gray-500">
                {block.props?.src ? 'Image Loaded' : 'Click to add image'}
              </p>
            </div>
          </div>
        )

      case 'video':
        return (
          <div {...commonProps}>
            <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded">
              <Video className="mx-auto h-12 w-12 text-gray-400" alt="Video placeholder" />
              <p className="mt-2 text-sm text-gray-500">
                {block.props?.src ? 'Video Loaded' : 'Click to add video'}
              </p>
            </div>
          </div>
        )

      case 'code':
        return (
          <div {...commonProps}>
            <pre style={styleProps} className="bg-gray-100 p-4 rounded overflow-x-auto">
              <code>{block.content || '// Code here'}</code>
            </pre>
          </div>
        )

      default:
        return (
          <div {...commonProps}>
            <p>Unknown block type</p>
          </div>
        )
    }
  }

  const BlockEditor = ({ block, onClose }: { block: ContentBlock, onClose: () => void }) => {
    const [editedBlock, setEditedBlock] = useState(block)

    const saveChanges = () => {
      updateBlock(block.id, editedBlock)
      onClose()
    }

    return (
      <Dialog open={!!block} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit {block.type}</DialogTitle>
            <DialogDescription>
              Make changes to your content block
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                value={editedBlock.content}
                onChange={(e) => setEditedBlock({ ...editedBlock, content: e.target.value })}
                rows={4}
                placeholder="Enter content..."
              />
            </div>

            {block.type === 'heading' && (
              <div className="space-y-2">
                <Label>Heading Level</Label>
                <Select 
                  value={editedBlock.props?.level?.toString() || '2'} 
                  onValueChange={(value) => setEditedBlock({ 
                    ...editedBlock, 
                    props: { ...editedBlock.props, level: parseInt(value) } 
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">H1</SelectItem>
                    <SelectItem value="2">H2</SelectItem>
                    <SelectItem value="3">H3</SelectItem>
                    <SelectItem value="4">H4</SelectItem>
                    <SelectItem value="5">H5</SelectItem>
                    <SelectItem value="6">H6</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {block.type === 'list' && (
              <div className="space-y-2">
                <Label>List Type</Label>
                <Select 
                  value={editedBlock.props?.ordered ? 'ordered' : 'unordered'} 
                  onValueChange={(value) => setEditedBlock({ 
                    ...editedBlock, 
                    props: { ...editedBlock.props, ordered: value === 'ordered' } 
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unordered">Bullet List</SelectItem>
                    <SelectItem value="ordered">Numbered List</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {block.type === 'link' && (
              <div className="space-y-2">
                <Label>URL</Label>
                <Input
                  value={editedBlock.props?.href || ''}
                  onChange={(e) => setEditedBlock({ 
                    ...editedBlock, 
                    props: { ...editedBlock.props, href: e.target.value } 
                  })}
                  placeholder="https://example.com"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Text Alignment</Label>
              <Select 
                value={editedBlock.styles?.textAlign || 'left'} 
                onValueChange={(value: 'left' | 'center' | 'right') => setEditedBlock({ 
                  ...editedBlock, 
                  styles: { ...editedBlock.styles, textAlign: value } 
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={saveChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Page Builder</h1>
          <p className="text-muted-foreground">
            Edit your page content with full control over every element
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setIsPreviewMode(!isPreviewMode)}
          >
            <Eye className="mr-2 h-4 w-4" />
            {isPreviewMode ? 'Edit Mode' : 'Preview'}
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Page
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="settings">Page Settings</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="publish">Publish</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Content Blocks */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Page Content</CardTitle>
                  <CardDescription>
                    Click on any element to edit it. Drag to reorder.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="min-h-[400px] p-4 border rounded-lg bg-white">
                    {page.blocks.map(block => renderBlock(block, isPreviewMode))}
                    {page.blocks.length === 0 && (
                      <div className="text-center py-12 text-muted-foreground">
                        <FileText className="mx-auto h-12 w-12 mb-4" />
                        <p>No content blocks yet. Add some blocks to get started.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Block Library */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add Blocks</CardTitle>
                  <CardDescription>
                    Drag or click to add content blocks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => addBlock('heading')}
                  >
                    <Heading1 className="mr-2 h-4 w-4" />
                    Heading
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => addBlock('paragraph')}
                  >
                    <Type className="mr-2 h-4 w-4" />
                    Paragraph
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => addBlock('list')}
                  >
                    <List className="mr-2 h-4 w-4" />
                    List
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => addBlock('quote')}
                  >
                    <Quote className="mr-2 h-4 w-4" />
                    Quote
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => addBlock('button')}
                  >
                    <Type className="mr-2 h-4 w-4" />
                    Button
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => addBlock('link')}
                  >
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Link
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => addBlock('image')}
                  >
                    <Image className="mr-2 h-4 w-4" alt="" />
                    Image
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => addBlock('video')}
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Video
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => addBlock('code')}
                  >
                    <Code className="mr-2 h-4 w-4" />
                    Code
                  </Button>
                </CardContent>
              </Card>

              {selectedBlock && !isPreviewMode && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Selected Block</CardTitle>
                    <CardDescription>
                      Edit or manage the selected content block
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Badge variant="outline">{selectedBlock.type}</Badge>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedBlock(selectedBlock)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => moveBlock(selectedBlock.id, 'up')}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => moveBlock(selectedBlock.id, 'down')}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => deleteBlock(selectedBlock.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Page Settings</CardTitle>
              <CardDescription>
                Configure basic page settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pageTitle">Page Title</Label>
                  <Input
                    id="pageTitle"
                    value={page.title}
                    onChange={(e) => setPage({ ...page, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pageSlug">Page Slug</Label>
                  <Input
                    id="pageSlug"
                    value={page.slug}
                    onChange={(e) => setPage({ ...page, slug: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pageStatus">Status</Label>
                <Select 
                  value={page.status} 
                  onValueChange={(value: 'published' | 'draft') => setPage({ ...page, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Optimize your page for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  value={page.seoTitle || ''}
                  onChange={(e) => setPage({ ...page, seoTitle: e.target.value })}
                  placeholder="Enter SEO title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seoDescription">Meta Description</Label>
                <Textarea
                  id="seoDescription"
                  value={page.seoDescription || ''}
                  onChange={(e) => setPage({ ...page, seoDescription: e.target.value })}
                  rows={3}
                  placeholder="Enter meta description"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="h-5 w-5" />
                Page Templates
              </CardTitle>
              <CardDescription>
                Choose from professionally designed templates to get started quickly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 cursor-pointer transition-colors">
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded mb-3"></div>
                  <h3 className="font-semibold">Business Landing Page</h3>
                  <p className="text-sm text-gray-600">Professional business layout with hero section</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">Business</Badge>
                    <Badge variant="secondary">Modern</Badge>
                  </div>
                </div>
                <div className="border rounded-lg p-4 cursor-pointer transition-colors">
                  <div className="aspect-video bg-gradient-to-br from-green-500 to-teal-600 rounded mb-3"></div>
                  <h3 className="font-semibold">Portfolio Showcase</h3>
                  <p className="text-sm text-gray-600">Creative portfolio with gallery sections</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">Portfolio</Badge>
                    <Badge variant="secondary">Creative</Badge>
                  </div>
                </div>
                <div className="border rounded-lg p-4 cursor-pointer transition-colors">
                  <div className="aspect-video bg-gradient-to-br from-orange-500 to-red-600 rounded mb-3"></div>
                  <h3 className="font-semibold">E-commerce Product</h3>
                  <p className="text-sm text-gray-600">Product showcase with call-to-action</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">E-commerce</Badge>
                    <Badge variant="secondary">Sales</Badge>
                  </div>
                </div>
                <div className="border rounded-lg p-4 cursor-pointer transition-colors">
                  <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-600 rounded mb-3"></div>
                  <h3 className="font-semibold">Service Provider</h3>
                  <p className="text-sm text-gray-600">Service-based business layout</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">Services</Badge>
                    <Badge variant="secondary">Professional</Badge>
                  </div>
                </div>
                <div className="border rounded-lg p-4 cursor-pointer transition-colors">
                  <div className="aspect-video bg-gradient-to-br from-indigo-500 to-blue-600 rounded mb-3"></div>
                  <h3 className="font-semibold">Blog Article</h3>
                  <p className="text-sm text-gray-600">Content-focused blog layout</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">Blog</Badge>
                    <Badge variant="secondary">Content</Badge>
                  </div>
                </div>
                <div className="border rounded-lg p-4 cursor-pointer transition-colors">
                  <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 rounded mb-3"></div>
                  <h3 className="font-semibold">Minimal Portfolio</h3>
                  <p className="text-sm text-gray-600">Clean, minimal design approach</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">Minimal</Badge>
                    <Badge variant="secondary">Portfolio</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Page Preview
              </CardTitle>
              <CardDescription>
                Preview your page across different devices and screen sizes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button 
                    variant={previewMode === 'desktop' ? 'default' : 'outline'}
                    onClick={() => setPreviewMode('desktop')}
                    size="sm"
                  >
                    <Monitor className="mr-2 h-4 w-4" />
                    Desktop
                  </Button>
                  <Button 
                    variant={previewMode === 'tablet' ? 'default' : 'outline'}
                    onClick={() => setPreviewMode('tablet')}
                    size="sm"
                  >
                    <Tablet className="mr-2 h-4 w-4" />
                    Tablet
                  </Button>
                  <Button 
                    variant={previewMode === 'mobile' ? 'default' : 'outline'}
                    onClick={() => setPreviewMode('mobile')}
                    size="sm"
                  >
                    <Smartphone className="mr-2 h-4 w-4" />
                    Mobile
                  </Button>
                </div>
                
                <div className="border rounded-lg overflow-hidden bg-white">
                  <div className="bg-gray-100 p-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Preview</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4" style={{ maxWidth: getPreviewWidth(), margin: '0 auto' }}>
                    {page.blocks.map(block => renderBlock(block, true))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publish" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Publish Settings
                </CardTitle>
                <CardDescription>
                  Configure publishing options and deployment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Publish Status</Label>
                  <Select value={page.status} onValueChange={(value: 'published' | 'draft') => setPage({ ...page, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Publish Date</Label>
                  <Input 
                    type="datetime-local" 
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Deployment Target</Label>
                  <Select defaultValue="production">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="notify" className="rounded" />
                  <Label htmlFor="notify">Notify team members</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="backup" className="rounded" defaultChecked />
                  <Label htmlFor="backup">Create backup before publishing</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Publishing History
                </CardTitle>
                <CardDescription>
                  Track your publishing activity and changes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Published</p>
                      <p className="text-sm text-gray-600">2 hours ago</p>
                    </div>
                    <Badge className="bg-green-600 text-white">Live</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Updated</p>
                      <p className="text-sm text-gray-600">1 day ago</p>
                    </div>
                    <Badge variant="secondary">Draft</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Published</p>
                      <p className="text-sm text-gray-600">3 days ago</p>
                    </div>
                    <Badge variant="outline">Archived</Badge>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Publish Page
                  </Button>
                  <Button variant="outline" className="w-full mt-2">
                    <Download className="mr-2 h-4 w-4" />
                    Export as HTML
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {selectedBlock && (
        <BlockEditor 
          block={selectedBlock} 
          onClose={() => setSelectedBlock(null)} 
        />
      )}
    </div>
  )
}