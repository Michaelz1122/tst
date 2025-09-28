'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Globe, Search, TrendingUp, Target, FileText, Plus, Edit, Trash2, Eye, Download, Upload, BarChart3, AlertTriangle, CheckCircle } from 'lucide-react'

interface SEOPage {
  id: string
  title: string
  url: string
  metaTitle: string
  metaDescription: string
  keywords: string
  status: 'optimized' | 'needs-improvement' | 'not-optimized'
  lastAnalyzed: string
  score: number
}

interface SEOAudit {
  id: string
  page: string
  issue: string
  severity: 'high' | 'medium' | 'low'
  description: string
  recommendation: string
  status: 'open' | 'in-progress' | 'resolved'
}

export default function AdminSEOManagement() {
  const [pages, setPages] = useState<SEOPage[]>([
    {
      id: '1',
      title: 'Home',
      url: '/',
      metaTitle: 'Michael Zahy - Performance Marketing Expert',
      metaDescription: 'Strategic media buyer and performance marketing expert dedicated to helping businesses achieve exceptional results through data-driven digital advertising campaigns.',
      keywords: 'performance marketing, media buying, digital advertising, ROI optimization',
      status: 'optimized',
      lastAnalyzed: '2024-01-20',
      score: 92
    },
    {
      id: '2',
      title: 'Services',
      url: '/services',
      metaTitle: 'Digital Marketing Services | Performance Marketing Solutions',
      metaDescription: 'Comprehensive digital marketing services including Meta Ads management, performance marketing, and growth hacking strategies for business success.',
      keywords: 'digital marketing, Meta Ads, growth hacking, marketing services',
      status: 'needs-improvement',
      lastAnalyzed: '2024-01-19',
      score: 78
    },
    {
      id: '3',
      title: 'About',
      url: '/about',
      metaTitle: 'About Michael Zahy | Performance Marketing Expert',
      metaDescription: 'Learn about Michael Zahy, a performance marketing expert with proven results in helping businesses achieve exceptional ROI through strategic digital marketing.',
      keywords: 'about, Michael Zahy, performance marketing expert, marketing consultant',
      status: 'optimized',
      lastAnalyzed: '2024-01-18',
      score: 88
    },
    {
      id: '4',
      title: 'Contact',
      url: '/contact',
      metaTitle: 'Contact Michael Zahy | Performance Marketing Consultant',
      metaDescription: 'Get in touch with Michael Zahy for performance marketing consulting and digital advertising services. Let\'s discuss how to grow your business.',
      keywords: 'contact, marketing consultant, get in touch, marketing services',
      status: 'not-optimized',
      lastAnalyzed: '2024-01-17',
      score: 65
    }
  ])

  const [audits, setAudits] = useState<SEOAudit[]>([
    {
      id: '1',
      page: 'Home',
      issue: 'Missing H1 tag',
      severity: 'high',
      description: 'The home page is missing a proper H1 tag',
      recommendation: 'Add a descriptive H1 tag that includes main keywords',
      status: 'open'
    },
    {
      id: '2',
      page: 'Services',
      issue: 'Meta description too long',
      severity: 'medium',
      description: 'Meta description exceeds 160 characters',
      recommendation: 'Shorten meta description to 150-160 characters',
      status: 'in-progress'
    },
    {
      id: '3',
      page: 'Contact',
      issue: 'Missing alt text on images',
      severity: 'medium',
      description: 'Images are missing descriptive alt text',
      recommendation: 'Add descriptive alt text to all images',
      status: 'open'
    },
    {
      id: '4',
      page: 'About',
      issue: 'Slow page load speed',
      severity: 'high',
      description: 'Page load time exceeds 3 seconds',
      recommendation: 'Optimize images and minify CSS/JS files',
      status: 'resolved'
    }
  ])

  const [globalSettings, setGlobalSettings] = useState({
    siteName: 'Michael Zahy Marketing',
    defaultMetaDescription: 'Performance marketing expert helping businesses achieve exceptional ROI through data-driven digital advertising campaigns.',
    defaultKeywords: 'performance marketing, media buying, digital advertising, ROI optimization',
    robotsTxt: 'User-agent: *\nAllow: /\n\nSitemap: https://michaelzahy.com/sitemap.xml',
    sitemapUrl: 'https://michaelzahy.com/sitemap.xml',
    googleAnalyticsId: 'G-XXXXXXXXXX',
    googleSearchConsole: 'https://search.google.com/search-console',
    bingWebmasterTools: 'https://www.bing.com/webmasters',
    enableSitemap: true,
    enableRobotsTxt: true,
    enableCanonicalUrls: true,
    enableStructuredData: true,
    enableOpenGraph: true,
    enableTwitterCards: true
  })

  const [selectedPage, setSelectedPage] = useState<SEOPage | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isAuditDialogOpen, setIsAuditDialogOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'optimized': 'default',
      'needs-improvement': 'secondary',
      'not-optimized': 'destructive'
    }
    
    const colors: { [key: string]: string } = {
      'optimized': 'bg-green-500',
      'needs-improvement': 'bg-yellow-500',
      'not-optimized': 'bg-red-500'
    }
    
    return (
      <Badge variant={variants[status] || 'outline'} className={colors[status]}>
        {status.replace('-', ' ')}
      </Badge>
    )
  }

  const getSeverityBadge = (severity: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'high': 'destructive',
      'medium': 'secondary',
      'low': 'outline'
    }
    
    return (
      <Badge variant={variants[severity] || 'outline'}>
        {severity}
      </Badge>
    )
  }

  const getAuditStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'open': 'destructive',
      'in-progress': 'secondary',
      'resolved': 'default'
    }
    
    const icons = {
      'open': <AlertTriangle className="w-3 h-3" />,
      'in-progress': <Target className="w-3 h-3" />,
      'resolved': <CheckCircle className="w-3 h-3" />
    }
    
    return (
      <Badge variant={variants[status] || 'outline'} className="flex items-center gap-1">
        {icons[status]}
        {status.replace('-', ' ')}
      </Badge>
    )
  }

  const handleEditPage = (page: SEOPage) => {
    setSelectedPage(page)
    setIsEditing(true)
  }

  const handleSavePage = () => {
    if (selectedPage) {
      setPages(pages.map(page => 
        page.id === selectedPage.id ? selectedPage : page
      ))
      setIsEditing(false)
      setSelectedPage(null)
    }
  }

  const runSEOAudit = () => {
    // Simulate SEO audit
    alert('SEO audit started! This will analyze all pages for SEO optimization opportunities.')
  }

  const generateSitemap = () => {
    // Simulate sitemap generation
    alert('Sitemap generated successfully!')
  }

  const exportSEOData = () => {
    // Simulate data export
    alert('SEO data exported successfully!')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SEO Management</h1>
          <p className="text-muted-foreground">
            Optimize your website for search engines and improve visibility
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={runSEOAudit}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Run SEO Audit
          </Button>
          <Button variant="outline" onClick={generateSitemap}>
            <Upload className="mr-2 h-4 w-4" />
            Generate Sitemap
          </Button>
          <Button variant="outline" onClick={exportSEOData}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="pages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pages">Page SEO</TabsTrigger>
          <TabsTrigger value="audits">SEO Audits</TabsTrigger>
          <TabsTrigger value="settings">Global Settings</TabsTrigger>
          <TabsTrigger value="analytics">SEO Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Page SEO Optimization
              </CardTitle>
              <CardDescription>
                Manage SEO settings for individual pages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Meta Title</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Analyzed</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pages.map((page) => (
                    <TableRow key={page.id}>
                      <TableCell className="font-medium">{page.title}</TableCell>
                      <TableCell>{page.url}</TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate">
                          {page.metaTitle}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                page.score >= 80 ? 'bg-green-500' : 
                                page.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${page.score}%` }}
                            />
                          </div>
                          <span className="text-sm">{page.score}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(page.status)}</TableCell>
                      <TableCell>{page.lastAnalyzed}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditPage(page)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <a href={page.url} target="_blank">
                              <Eye className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                SEO Audits & Issues
              </CardTitle>
              <CardDescription>
                Track and resolve SEO optimization issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-red-100 text-red-800">
                    {audits.filter(a => a.severity === 'high').length} High Priority
                  </Badge>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    {audits.filter(a => a.severity === 'medium').length} Medium Priority
                  </Badge>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    {audits.filter(a => a.severity === 'low').length} Low Priority
                  </Badge>
                </div>
                <Button onClick={() => setIsAuditDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Audit
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {audits.map((audit) => (
                    <TableRow key={audit.id}>
                      <TableCell className="font-medium">{audit.page}</TableCell>
                      <TableCell>{audit.issue}</TableCell>
                      <TableCell>{getSeverityBadge(audit.severity)}</TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate">
                          {audit.description}
                        </div>
                      </TableCell>
                      <TableCell>{getAuditStatusBadge(audit.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Target className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Global SEO Settings
              </CardTitle>
              <CardDescription>
                Configure global SEO settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={globalSettings.siteName}
                    onChange={(e) => setGlobalSettings({ ...globalSettings, siteName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultMetaDescription">Default Meta Description</Label>
                  <Textarea
                    id="defaultMetaDescription"
                    value={globalSettings.defaultMetaDescription}
                    onChange={(e) => setGlobalSettings({ ...globalSettings, defaultMetaDescription: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="defaultKeywords">Default Keywords</Label>
                <Input
                  id="defaultKeywords"
                  value={globalSettings.defaultKeywords}
                  onChange={(e) => setGlobalSettings({ ...globalSettings, defaultKeywords: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                  <Input
                    id="googleAnalyticsId"
                    value={globalSettings.googleAnalyticsId}
                    onChange={(e) => setGlobalSettings({ ...globalSettings, googleAnalyticsId: e.target.value })}
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="googleSearchConsole">Google Search Console</Label>
                  <Input
                    id="googleSearchConsole"
                    value={globalSettings.googleSearchConsole}
                    onChange={(e) => setGlobalSettings({ ...globalSettings, googleSearchConsole: e.target.value })}
                    placeholder="https://search.google.com/search-console"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="robotsTxt">Robots.txt</Label>
                <Textarea
                  id="robotsTxt"
                  value={globalSettings.robotsTxt}
                  onChange={(e) => setGlobalSettings({ ...globalSettings, robotsTxt: e.target.value })}
                  rows={6}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sitemapUrl">Sitemap URL</Label>
                  <Input
                    id="sitemapUrl"
                    value={globalSettings.sitemapUrl}
                    onChange={(e) => setGlobalSettings({ ...globalSettings, sitemapUrl: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bingWebmasterTools">Bing Webmaster Tools</Label>
                  <Input
                    id="bingWebmasterTools"
                    value={globalSettings.bingWebmasterTools}
                    onChange={(e) => setGlobalSettings({ ...globalSettings, bingWebmasterTools: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableSitemap">Enable Sitemap</Label>
                    <p className="text-sm text-muted-foreground">
                      Generate XML sitemap
                    </p>
                  </div>
                  <Switch
                    id="enableSitemap"
                    checked={globalSettings.enableSitemap}
                    onCheckedChange={(checked) => setGlobalSettings({ ...globalSettings, enableSitemap: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableRobotsTxt">Enable Robots.txt</Label>
                    <p className="text-sm text-muted-foreground">
                      Generate robots.txt file
                    </p>
                  </div>
                  <Switch
                    id="enableRobotsTxt"
                    checked={globalSettings.enableRobotsTxt}
                    onCheckedChange={(checked) => setGlobalSettings({ ...globalSettings, enableRobotsTxt: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableCanonicalUrls">Enable Canonical URLs</Label>
                    <p className="text-sm text-muted-foreground">
                      Add canonical tags
                    </p>
                  </div>
                  <Switch
                    id="enableCanonicalUrls"
                    checked={globalSettings.enableCanonicalUrls}
                    onCheckedChange={(checked) => setGlobalSettings({ ...globalSettings, enableCanonicalUrls: checked })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableStructuredData">Enable Structured Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Add JSON-LD structured data
                    </p>
                  </div>
                  <Switch
                    id="enableStructuredData"
                    checked={globalSettings.enableStructuredData}
                    onCheckedChange={(checked) => setGlobalSettings({ ...globalSettings, enableStructuredData: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableOpenGraph">Enable Open Graph</Label>
                    <p className="text-sm text-muted-foreground">
                      Add Open Graph tags
                    </p>
                  </div>
                  <Switch
                    id="enableOpenGraph"
                    checked={globalSettings.enableOpenGraph}
                    onCheckedChange={(checked) => setGlobalSettings({ ...globalSettings, enableOpenGraph: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableTwitterCards">Enable Twitter Cards</Label>
                    <p className="text-sm text-muted-foreground">
                      Add Twitter Card tags
                    </p>
                  </div>
                  <Switch
                    id="enableTwitterCards"
                    checked={globalSettings.enableTwitterCards}
                    onCheckedChange={(checked) => setGlobalSettings({ ...globalSettings, enableTwitterCards: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Organic Traffic</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,234</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Keywords Ranked</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">847</div>
                <p className="text-xs text-muted-foreground">
                  +23 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Backlinks</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">
                  +45 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Position</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.7</div>
                <p className="text-xs text-muted-foreground">
                  +1.2 from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Keywords</CardTitle>
              <CardDescription>
                Keywords driving the most organic traffic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { keyword: 'performance marketing', position: 3, traffic: 2340, change: '+2' },
                  { keyword: 'media buying expert', position: 1, traffic: 1890, change: '0' },
                  { keyword: 'digital advertising ROI', position: 5, traffic: 1650, change: '+3' },
                  { keyword: 'Facebook ads specialist', position: 2, traffic: 1420, change: '-1' },
                  { keyword: 'marketing consultant', position: 8, traffic: 980, change: '+4' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                        <span className="text-sm font-semibold">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{item.keyword}</p>
                        <p className="text-sm text-muted-foreground">
                          Position: #{item.position} • {item.traffic} visitors/month
                        </p>
                      </div>
                    </div>
                    <Badge variant={item.change.startsWith('+') ? 'default' : 'secondary'}>
                      {item.change}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Page SEO Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Page SEO</DialogTitle>
            <DialogDescription>
              Update SEO settings for {selectedPage?.title}
            </DialogDescription>
          </DialogHeader>
          {selectedPage && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={selectedPage.metaTitle}
                  onChange={(e) => setSelectedPage({ ...selectedPage, metaTitle: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  {selectedPage.metaTitle.length}/60 characters
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={selectedPage.metaDescription}
                  onChange={(e) => setSelectedPage({ ...selectedPage, metaDescription: e.target.value })}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {selectedPage.metaDescription.length}/160 characters
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  value={selectedPage.keywords}
                  onChange={(e) => setSelectedPage({ ...selectedPage, keywords: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Separate keywords with commas
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePage}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Audit Dialog */}
      <Dialog open={isAuditDialogOpen} onOpenChange={setIsAuditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New SEO Audit</DialogTitle>
            <DialogDescription>
              Set up a new SEO audit for your website
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="auditType">Audit Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select audit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full SEO Audit</SelectItem>
                  <SelectItem value="technical">Technical SEO</SelectItem>
                  <SelectItem value="content">Content Analysis</SelectItem>
                  <SelectItem value="backlinks">Backlink Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="auditPages">Pages to Audit</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select pages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pages</SelectItem>
                  <SelectItem value="home">Home Page Only</SelectItem>
                  <SelectItem value="custom">Custom Selection</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAuditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setIsAuditDialogOpen(false)
              runSEOAudit()
            }}>
              Start Audit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}