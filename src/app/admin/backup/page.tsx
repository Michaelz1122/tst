'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { 
  Database, 
  Download, 
  Upload, 
  RefreshCw, 
  Clock, 
  HardDrive, 
  Cloud,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  FileText,
  Settings,
  Play,
  Pause,
  Trash2,
  Archive
} from 'lucide-react'

interface Backup {
  id: string
  name: string
  type: 'full' | 'incremental' | 'database' | 'files'
  size: string
  status: 'completed' | 'in_progress' | 'failed' | 'scheduled'
  createdAt: string
  description: string
  location: string
}

interface BackupSchedule {
  id: string
  name: string
  frequency: 'daily' | 'weekly' | 'monthly'
  time: string
  enabled: boolean
  type: 'full' | 'incremental'
  nextRun: string
  retention: number
}

export default function BackupPage() {
  const [backups, setBackups] = useState<Backup[]>([])
  const [schedules, setSchedules] = useState<BackupSchedule[]>([])
  const [isCreatingBackup, setIsCreatingBackup] = useState(false)
  const [backupProgress, setBackupProgress] = useState(0)

  // Mock data for demonstration
  useEffect(() => {
    const mockBackups: Backup[] = [
      {
        id: '1',
        name: 'Full Backup - Daily',
        type: 'full',
        size: '2.4 GB',
        status: 'completed',
        createdAt: '2024-01-20 02:00:00',
        description: 'Complete system backup including database and files',
        location: 'Local Storage'
      },
      {
        id: '2',
        name: 'Database Backup',
        type: 'database',
        size: '450 MB',
        status: 'completed',
        createdAt: '2024-01-20 06:00:00',
        description: 'Database only backup',
        location: 'Cloud Storage'
      },
      {
        id: '3',
        name: 'Incremental Backup',
        type: 'incremental',
        size: '125 MB',
        status: 'in_progress',
        createdAt: '2024-01-20 12:00:00',
        description: 'Incremental backup of changed files',
        location: 'Local Storage'
      },
      {
        id: '4',
        name: 'Scheduled Backup',
        type: 'full',
        size: '2.1 GB',
        status: 'scheduled',
        createdAt: '2024-01-21 02:00:00',
        description: 'Scheduled full backup',
        location: 'Cloud Storage'
      },
      {
        id: '5',
        name: 'Failed Backup',
        type: 'database',
        size: '0 MB',
        status: 'failed',
        createdAt: '2024-01-19 18:00:00',
        description: 'Backup failed due to storage space',
        location: 'Local Storage'
      }
    ]

    const mockSchedules: BackupSchedule[] = [
      {
        id: '1',
        name: 'Daily Full Backup',
        frequency: 'daily',
        time: '02:00',
        enabled: true,
        type: 'full',
        nextRun: '2024-01-21 02:00:00',
        retention: 30
      },
      {
        id: '2',
        name: 'Weekly Database Backup',
        frequency: 'weekly',
        time: '06:00',
        enabled: true,
        type: 'full',
        nextRun: '2024-01-22 06:00:00',
        retention: 90
      },
      {
        id: '3',
        name: 'Monthly Archive',
        frequency: 'monthly',
        time: '01:00',
        enabled: false,
        type: 'full',
        nextRun: '2024-02-01 01:00:00',
        retention: 365
      }
    ]

    setBackups(mockBackups)
    setSchedules(mockSchedules)
  }, [])

  const createBackup = (type: 'full' | 'incremental' | 'database' | 'files') => {
    setIsCreatingBackup(true)
    setBackupProgress(0)
    
    // Simulate backup progress
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsCreatingBackup(false)
          
          // Add new backup to list
          const newBackup: Backup = {
            id: Date.now().toString(),
            name: `${type.charAt(0).toUpperCase() + type.slice(1)} Backup - Manual`,
            type,
            size: type === 'full' ? '2.4 GB' : type === 'database' ? '450 MB' : '125 MB',
            status: 'completed',
            createdAt: new Date().toISOString(),
            description: `Manual ${type} backup`,
            location: 'Local Storage'
          }
          setBackups([newBackup, ...backups])
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const toggleSchedule = (scheduleId: string) => {
    setSchedules(schedules.map(schedule => 
      schedule.id === scheduleId 
        ? { ...schedule, enabled: !schedule.enabled }
        : schedule
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500 text-white'
      case 'in_progress': return 'bg-blue-500 text-white'
      case 'failed': return 'bg-red-500 text-white'
      case 'scheduled': return 'bg-yellow-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'in_progress': return <RefreshCw className="w-4 h-4 animate-spin" />
      case 'failed': return <XCircle className="w-4 h-4" />
      case 'scheduled': return <Clock className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'full': return <Database className="w-5 h-5" />
      case 'incremental': return <Archive className="w-5 h-5" />
      case 'database': return <HardDrive className="w-5 h-5" />
      case 'files': return <FileText className="w-5 h-5" />
      default: return <Database className="w-5 h-5" />
    }
  }

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'Daily'
      case 'weekly': return 'Weekly'
      case 'monthly': return 'Monthly'
      default: return frequency
    }
  }

  const backupStats = {
    totalBackups: backups.length,
    successfulBackups: backups.filter(b => b.status === 'completed').length,
    failedBackups: backups.filter(b => b.status === 'failed').length,
    totalSize: '5.1 GB'
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
                Backup Manager
              </h1>
              <p className="text-gray-200 mt-2">Create, schedule, and manage system backups</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => createBackup('full')}
                disabled={isCreatingBackup}
                className="bg-gradient-to-r from-purple-500 to-pink-500"
              >
                <Database className="w-4 h-4 mr-2" />
                Create Backup
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Backup Progress */}
        {isCreatingBackup && (
          <Card className="bg-gray-800/50 border-gray-700 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Creating Backup...</h3>
                <span className="text-sm text-gray-200">{backupProgress}%</span>
              </div>
              <Progress value={backupProgress} className="h-2 bg-gray-700" />
              <p className="text-sm text-gray-200 mt-2">Please wait while your backup is being created...</p>
            </CardContent>
          </Card>
        )}

        {/* Backup Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Total Backups</CardTitle>
              <Database className="h-4 w-4 text-gray-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{backupStats.totalBackups}</div>
              <p className="text-xs text-gray-200">
                Backup files created
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Successful</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{backupStats.successfulBackups}</div>
              <p className="text-xs text-gray-200">
                Completed backups
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Failed</CardTitle>
              <XCircle className="h-4 w-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{backupStats.failedBackups}</div>
              <p className="text-xs text-gray-200">
                Failed backups
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Total Size</CardTitle>
              <HardDrive className="h-4 w-4 text-gray-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{backupStats.totalSize}</div>
              <p className="text-xs text-gray-200">
                Storage used
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Backups */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Recent Backups
                </CardTitle>
                <CardDescription className="text-gray-200">
                  Latest backup operations and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {backups.map((backup) => (
                    <div key={backup.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-purple-400">
                          {getTypeIcon(backup.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{backup.name}</span>
                            <Badge variant="outline" className="border-gray-600 text-gray-200">
                              {backup.type}
                            </Badge>
                            <Badge className={getStatusColor(backup.status)}>
                              {backup.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-200">
                            {backup.size} • {backup.location} • {backup.createdAt}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {backup.description}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {backup.status === 'completed' && (
                          <Button variant="outline" size="sm" className="border-gray-600">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="border-gray-600">
                          {getStatusIcon(backup.status)}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Backup Schedules */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Backup Schedules
                </CardTitle>
                <CardDescription className="text-gray-200">
                  Automated backup schedules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedules.map((schedule) => (
                    <div key={schedule.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm">{schedule.name}</h4>
                        <div className="text-xs text-gray-200">
                          {getFrequencyText(schedule.frequency)} at {schedule.time}
                        </div>
                        <div className="text-xs text-gray-500">
                          Next: {schedule.nextRun} • Retention: {schedule.retention} days
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={schedule.enabled}
                          onCheckedChange={() => toggleSchedule(schedule.id)}
                        />
                        <Button variant="outline" size="sm" className="border-gray-600">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Button
            onClick={() => createBackup('full')}
            disabled={isCreatingBackup}
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-20"
          >
            <div className="flex flex-col items-center gap-2">
              <Database className="w-6 h-6" />
              <span>Full Backup</span>
            </div>
          </Button>
          <Button
            onClick={() => createBackup('database')}
            disabled={isCreatingBackup}
            variant="outline"
            className="border-gray-600 h-20"
          >
            <div className="flex flex-col items-center gap-2">
              <HardDrive className="w-6 h-6" />
              <span>Database Only</span>
            </div>
          </Button>
          <Button
            onClick={() => createBackup('incremental')}
            disabled={isCreatingBackup}
            variant="outline"
            className="border-gray-600 h-20"
          >
            <div className="flex flex-col items-center gap-2">
              <Archive className="w-6 h-6" />
              <span>Incremental</span>
            </div>
          </Button>
          <Button
            variant="outline"
            className="border-gray-600 h-20"
          >
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-6 h-6" />
              <span>Restore</span>
            </div>
          </Button>
        </div>

        {/* Storage Information */}
        <Card className="bg-gray-800/50 border-gray-700 mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="w-5 h-5" />
              Storage Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-white font-medium mb-2">Local Storage</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-200">Used</span>
                    <span className="text-white">15.2 GB / 50 GB</span>
                  </div>
                  <Progress value={30} className="h-2 bg-gray-700" />
                  <div className="text-xs text-gray-500">30% used</div>
                </div>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Cloud Storage</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-200">Used</span>
                    <span className="text-white">8.7 GB / 100 GB</span>
                  </div>
                  <Progress value={8.7} className="h-2 bg-gray-700" />
                  <div className="text-xs text-gray-500">8.7% used</div>
                </div>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Backup Retention</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-200">Daily Backups</span>
                    <span className="text-white">30 days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-200">Weekly Backups</span>
                    <span className="text-white">90 days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-200">Monthly Backups</span>
                    <span className="text-white">365 days</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}