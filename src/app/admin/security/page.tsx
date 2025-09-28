'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { 
  Shield, 
  Lock, 
  Key, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Users,
  Database,
  Network,
  FileText,
  Settings,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react'

interface SecurityLog {
  id: string
  timestamp: string
  level: 'info' | 'warning' | 'error' | 'success'
  message: string
  user: string
  ip: string
  action: string
}

interface SecuritySetting {
  id: string
  name: string
  description: string
  enabled: boolean
  category: 'authentication' | 'data' | 'network' | 'general'
}

export default function SecurityPage() {
  const [logs, setLogs] = useState<SecurityLog[]>([])
  const [settings, setSettings] = useState<SecuritySetting[]>([])
  const [activeTab, setActiveTab] = useState('overview')
  const [showPassword, setShowPassword] = useState(false)

  // Mock data for demonstration
  useEffect(() => {
    const mockLogs: SecurityLog[] = [
      {
        id: '1',
        timestamp: '2024-01-20 14:30:25',
        level: 'success',
        message: 'User login successful',
        user: 'admin@example.com',
        ip: '192.168.1.100',
        action: 'login'
      },
      {
        id: '2',
        timestamp: '2024-01-20 14:25:10',
        level: 'warning',
        message: 'Multiple failed login attempts detected',
        user: 'unknown',
        ip: '192.168.1.150',
        action: 'failed_login'
      },
      {
        id: '3',
        timestamp: '2024-01-20 14:20:45',
        level: 'info',
        message: 'Password changed for user',
        user: 'admin@example.com',
        ip: '192.168.1.100',
        action: 'password_change'
      },
      {
        id: '4',
        timestamp: '2024-01-20 14:15:30',
        level: 'error',
        message: 'Unauthorized access attempt to admin panel',
        user: 'unknown',
        ip: '192.168.1.200',
        action: 'unauthorized_access'
      },
      {
        id: '5',
        timestamp: '2024-01-20 14:10:15',
        level: 'success',
        message: 'Security scan completed',
        user: 'system',
        ip: 'localhost',
        action: 'security_scan'
      }
    ]

    const mockSettings: SecuritySetting[] = [
      {
        id: '1',
        name: 'Two-Factor Authentication',
        description: 'Require 2FA for all admin users',
        enabled: true,
        category: 'authentication'
      },
      {
        id: '2',
        name: 'Password Strength Requirements',
        description: 'Enforce strong password policies',
        enabled: true,
        category: 'authentication'
      },
      {
        id: '3',
        name: 'Login Attempt Limiting',
        description: 'Limit failed login attempts to prevent brute force attacks',
        enabled: true,
        category: 'authentication'
      },
      {
        id: '4',
        name: 'Session Timeout',
        description: 'Automatically log out inactive users',
        enabled: true,
        category: 'authentication'
      },
      {
        id: '5',
        name: 'Data Encryption',
        description: 'Encrypt sensitive data at rest and in transit',
        enabled: true,
        category: 'data'
      },
      {
        id: '6',
        name: 'Regular Backups',
        description: 'Automated daily backups of all data',
        enabled: true,
        category: 'data'
      },
      {
        id: '7',
        name: 'SSL/TLS Enforcement',
        description: 'Require HTTPS for all connections',
        enabled: true,
        category: 'network'
      },
      {
        id: '8',
        name: 'Firewall Protection',
        description: 'Active firewall with intrusion detection',
        enabled: true,
        category: 'network'
      },
      {
        id: '9',
        name: 'Security Logging',
        description: 'Comprehensive logging of all security events',
        enabled: true,
        category: 'general'
      },
      {
        id: '10',
        name: 'Automatic Updates',
        description: 'Keep system and dependencies updated',
        enabled: false,
        category: 'general'
      }
    ]

    setLogs(mockLogs)
    setSettings(mockSettings)
  }, [])

  const toggleSetting = (settingId: string) => {
    setSettings(settings.map(setting => 
      setting.id === settingId 
        ? { ...setting, enabled: !setting.enabled }
        : setting
    ))
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'success': return 'bg-green-500 text-white'
      case 'warning': return 'bg-yellow-500 text-white'
      case 'error': return 'bg-red-500 text-white'
      case 'info': return 'bg-blue-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'success': return <CheckCircle className="w-4 h-4" />
      case 'warning': return <AlertTriangle className="w-4 h-4" />
      case 'error': return <XCircle className="w-4 h-4" />
      case 'info': return <Eye className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'authentication': return <Key className="w-5 h-5" />
      case 'data': return <Database className="w-5 h-5" />
      case 'network': return <Network className="w-5 h-5" />
      case 'general': return <Settings className="w-5 h-5" />
      default: return <Shield className="w-5 h-5" />
    }
  }

  const securityStats = {
    totalEvents: logs.length,
    successfulLogins: logs.filter(log => log.level === 'success' && log.action === 'login').length,
    failedAttempts: logs.filter(log => log.level === 'warning' && log.action === 'failed_login').length,
    securityScore: 85
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
                Security Center
              </h1>
              <p className="text-gray-200 mt-2">Monitor and manage your website security settings and logs</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-gray-600"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button
                variant="outline"
                className="border-gray-600"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Logs
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Security Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Security Score</CardTitle>
              <Shield className="h-4 w-4 text-gray-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{securityStats.securityScore}%</div>
              <p className="text-xs text-gray-200">
                Overall security health
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Total Events</CardTitle>
              <FileText className="h-4 w-4 text-gray-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{securityStats.totalEvents}</div>
              <p className="text-xs text-gray-200">
                Security events logged
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Successful Logins</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{securityStats.successfulLogins}</div>
              <p className="text-xs text-gray-200">
                Authentication successes
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Failed Attempts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{securityStats.failedAttempts}</div>
              <p className="text-xs text-gray-200">
                Blocked attempts
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Security Logs */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Security Logs
                </CardTitle>
                <CardDescription className="text-gray-200">
                  Recent security events and activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {logs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={getLevelColor(log.level)}>
                          {getLevelIcon(log.level)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{log.message}</span>
                            <Badge variant="outline" className="border-gray-600 text-gray-200">
                              {log.action}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-200">
                            {log.user} • {log.ip} • {log.timestamp}
                          </div>
                        </div>
                      </div>
                      <Badge className={getLevelColor(log.level)}>
                        {log.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Settings */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </CardTitle>
                <CardDescription className="text-gray-200">
                  Configure security options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {settings.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-purple-400">
                          {getCategoryIcon(setting.category)}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium text-sm">{setting.name}</h4>
                          <p className="text-xs text-gray-200">{setting.description}</p>
                        </div>
                      </div>
                      <Switch
                        checked={setting.enabled}
                        onCheckedChange={() => toggleSetting(setting.id)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Security Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                Password Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-200">Minimum Length</span>
                <Input
                  type="number"
                  defaultValue="12"
                  className="w-20 bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-200">Require Uppercase</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-200">Require Numbers</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-200">Require Special Characters</span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-200">Password Expiry (days)</span>
                <Input
                  type="number"
                  defaultValue="90"
                  className="w-20 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                User Access Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-200">Max Login Attempts</span>
                <Input
                  type="number"
                  defaultValue="5"
                  className="w-20 bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-200">Lockout Duration (minutes)</span>
                <Input
                  type="number"
                  defaultValue="15"
                  className="w-20 bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-200">Session Timeout (minutes)</span>
                <Input
                  type="number"
                  defaultValue="30"
                  className="w-20 bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-200">Concurrent Sessions</span>
                <Input
                  type="number"
                  defaultValue="3"
                  className="w-20 bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-200">IP Whitelisting</span>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}