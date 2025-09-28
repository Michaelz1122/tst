'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { 
  Target, 
  Users, 
  TrendingUp, 
  Lightbulb, 
  FileText, 
  Download, 
  RefreshCw,
  CheckCircle,
  Zap,
  Star,
  ArrowRight,
  Calendar,
  DollarSign,
  BarChart3,
  MessageSquare,
  Eye,
  Share2,
  Heart,
  Award,
  Radio,
  Tv,
  Smartphone,
  Monitor,
  Megaphone,
  Filter,
  Settings,
  Activity
} from 'lucide-react'

export default function MediaBuyingPlanToolArabic() {
  const [activeTab, setActiveTab] = useState('campaign-overview')
  const [formData, setFormData] = useState({
    campaignName: '',
    industry: '',
    budget: '',
    duration: '',
    targetAudience: '',
    campaignGoal: '',
    geographicTarget: ''
  })
  const [generatedPlan, setGeneratedPlan] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const mediaBuyingSections = [
    {
      id: 'campaign-overview',
      title: 'نظرة عامة على الحملة',
      description: 'تحليل شامل لأهداف الحملة والجمهور المستهدف',
      icon: Target,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'channel-selection',
      title: 'اختيار القنوات',
      description: 'تحديد أفضل القنوات الإعلانية لتحقيق الأهداف',
      icon: Radio,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'budget-allocation',
      title: 'توزيع الميزانية',
      description: 'تخصيص الميزانية بشكل فعال بين القنوات المختلفة',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'targeting-strategy',
      title: 'استراتيجية الاستهداف',
      description: 'تحديد الجمهور المستهدف بدقة لزيادة فعالية الإعلانات',
      icon: Users,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'ad-creative',
      title: 'الإبداع الإعلاني',
      description: 'تصميم إعلانات جذابة وفعالة',
      icon: Lightbulb,
      color: 'from-yellow-500 to-amber-500'
    },
    {
      id: 'performance-tracking',
      title: 'تتبع الأداء',
      description: 'قياس وتحليل أداء الحملة الإعلانية',
      icon: BarChart3,
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  const industryOptions = [
    { value: 'technology', label: 'التكنولوجيا' },
    { value: 'healthcare', label: 'الرعاية الصحية' },
    { value: 'education', label: 'التعليم' },
    { value: 'retail', label: 'تجارة التجزئة' },
    { value: 'food-beverage', label: 'المطاعم والمشروبات' },
    { value: 'real-estate', label: 'العقارات' },
    { value: 'automotive', label: 'السيارات' },
    { value: 'fashion', label: 'الأزياء' },
    { value: 'finance', label: 'التمويل' },
    { value: 'travel-tourism', label: 'السفر والسياحة' },
    { value: 'beauty-cosmetics', label: 'التجميل والعناية' },
    { value: 'fitness-wellness', label: 'اللياقة والصحة' },
    { value: 'entertainment', label: 'الترفيه' },
    { value: 'professional-services', label: 'الخدمات المهنية' },
    { value: 'manufacturing', label: 'التصنيع' }
  ]

  const budgetOptions = [
    { value: '5000-10000', label: '5,000 - 10,000 ج.م' },
    { value: '10000-25000', label: '10,000 - 25,000 ج.م' },
    { value: '25000-50000', label: '25,000 - 50,000 ج.م' },
    { value: '50000-100000', label: '50,000 - 100,000 ج.م' },
    { value: '100000+', label: '100,000+ ج.م' }
  ]

  const durationOptions = [
    { value: '1-month', label: 'شهر واحد' },
    { value: '3-months', label: '3 أشهر' },
    { value: '6-months', label: '6 أشهر' },
    { value: '1-year', label: 'سنة واحدة' },
    { value: '2-years', label: 'سنتان' }
  ]

  const campaignGoals = [
    { value: 'brand-awareness', label: 'زيادة الوعي بالعلامة التجارية' },
    { value: 'lead-generation', label: 'توليد العملاء المحتملين' },
    { value: 'sales-conversion', label: 'زيادة المبيعات والتحويل' },
    { value: 'website-traffic', label: 'زيادة حركة المرور للموقع' },
    { value: 'app-installs', label: 'تحميلات التطبيق' },
    { value: 'video-views', label: 'مشاهدات الفيديو' },
    { value: 'social-engagement', label: 'زيادة التفاعل الاجتماعي' },
    { value: 'local-reach', label: 'الوصول المحلي في مصر' }
  ]

  const geographicTargets = [
    { value: 'local', label: 'محلي (مدينة واحدة)' },
    { value: 'regional', label: 'إقليمي (عدة مدن)' },
    { value: 'national', label: 'وطني (جميع المحافظات)' },
    { value: 'gcc', label: 'مجلس التعاون الخليجي' },
    { value: 'middle-east', label: 'الشرق الأوسط' },
    { value: 'international', label: 'دولي' },
    { value: 'cairo-alex', label: 'القاهرة والإسكندرية' },
    { value: 'delta-region', label: 'منطقة الدلتا' },
    { value: 'upper-egypt', label: 'الصعيد' }
  ]

  const generateCampaignOverview = () => {
    const industryText = industryOptions.find(opt => opt.value === formData.industry)?.label || formData.industry
    const budgetText = budgetOptions.find(opt => opt.value === formData.budget)?.label || formData.budget
    const durationText = durationOptions.find(opt => opt.value === formData.duration)?.label || formData.duration
    const goalText = campaignGoals.find(opt => opt.value === formData.campaignGoal)?.label || formData.campaignGoal
    const geoText = geographicTargets.find(opt => opt.value === formData.geographicTarget)?.label || formData.geographicTarget

    return `📊 **نظرة عامة على خطة شراء الإعلانات**

### 🎯 **معلومات الحملة:**
**اسم الحملة:** ${formData.campaignName}
**الصناعة:** ${industryText}
**الميزانية:** ${budgetText}
**المدة:** ${durationText}
**الهدف الرئيسي:** ${goalText}
**الجمهور المستهدف:** ${formData.targetAudience}
**النطاق الجغرافي:** ${geoText}

---

### 🚀 **أهداف الحملة:**
**الهدف الرئيسي:** ${goalText}

**الأهداف الثانوية:**
• زيادة التفاعل مع العلامة التجارية
• بناء قاعدة عملاء مخلصين
• تحسين صورة العلامة التجارية
• زيادة حصة السوق
• تحقيق عائد استثمار إيجابي

**المؤشرات الرئيسية للأداء (KPIs):**
• عدد مرات الظهور: 1,000,000+
• مدى الوصول: 500,000+ مستخدم فريد
• معدل التفاعل: 3-5%
• تكلفة النقرة (CPC): 1-5 ج.م
• معدل التحويل: 2-4%

---

### 📈 **توقعات الأداء:**
**الشهر الأول:**
• بناء الوعي الأولي: 20-30%
• توليد 50-100 عميل محتمل
• تحقيق ROI بنسبة 150-200%

**الشهر الثاني:**
• زيادة الوعي بنسبة 40-50%
• توليد 100-200 عميل محتمل
• تحقيق ROI بنسبة 200-250%

**الشهر الثالث:**
• استقرار الأداء: 60-70%
• توليد 200-300 عميل محتمل
• تحقيق ROI بنسبة 250-300%

---

### 💡 **عوامل النجاح:**
1. **فهم عميق للجمهور المستهدف**
2. **اختيار القنوات الإعلانية المناسبة**
3. **محتوى إعلاني جذاب وفعال**
4. **توزيع ميزاني متوازن**
5. **مراقبة وتحليل مستمر للأداء**
6. **المرونة في تعديل الاستراتيجية**

---
#خطة_إعلانية #تسويق #إعلانات`
  }

  const generateChannelSelection = () => {
    const industryText = industryOptions.find(opt => opt.value === formData.industry)?.label || formData.industry
    const budgetText = budgetOptions.find(opt => opt.value === formData.budget)?.label || formData.budget
    const geoText = geographicTargets.find(opt => opt.value === formData.geographicTarget)?.label || formData.geographicTarget

    return `📺 **اختيار القنوات الإعلانية للسوق المصري**

### 🎯 **تحليل القنوات المناسبة لـ ${industryText} في السوق المصري:**

#### **القنوات الرقمية (موصى بها بشدة للسوق المصري)**

**1. منصات ميتا (فيسبوك وإنستجرام) (55% من الميزانية)**
**فيسبوك مصر:**
• الجمهور: 25-55 سنة، يغطي جميع المحافظات المصرية
• الميزة: استهداف دقيق جداً حسب المحافظات والاهتمامات
• التكلفة: 0.5-3 ج.م للنقرة (الأقل في السوق المصري)
• الأنسبى ل: ${campaignGoals.find(opt => opt.value === formData.campaignGoal)?.label || 'جميع الأهداف'}
• الميزة المصرية: إعلانات باللهجة المصرية تؤدي أداءً أفضل بنسبة 40%

**لينكدإن (للمهن والأعمال):**
• الجمهور: 30-55 سنة، محترفون
• الميزة: جودة عالية للجمهور
• التكلفة: 3-8 ج.م للنقرة
• الأنسبى ل: توليد العملاء المحتملين

**تيك توك (للجمهور الشاب):**
• الجمهور: 16-35 سنة
• الميزة: تفاعل عالي جداً
• التكلفة: 0.5-2 ج.م للمشاهدة
• الأنسبى ل: الوعي بالعلامة التجارية

---

**2. محركات البحث (30% من الميزانية)**

**جوجل ADS:**
• الجمهور: الباحثون بنشاط
• الميزة: نوايا شرائية عالية
• التكلفة: 2-10 ج.م للنقرة
• الأنسبى ل: المبيعات المباشرة

**بينج ADS:**
• الجمهور: مستخدمي ويندوز وOffice
• الميزة: تكلفة أقل أحياناً
• التكلفة: 1-7 ج.م للنقرة
• الأنسبى ل: زيادة حركة المرور

---

**3. الإعلانات المصورة (15% من الميزانية)**

**يوتيوب:**
• الجمهور: متنوع، جميع الأعمار
• الميزة: فيديو طويل المدى
• التكلفة: 0.1-1 ج.م للمشاهدة
• الأنسبى ل: الوعي بالعلامة التجارية

**تيك توك (فيديو):**
• الجمهور: 16-35 سنة
• الميزة: تفاعل عالي جداً
• التكلفة: 0.05-0.5 ج.م للمشاهدة
• الأنسبى ل: الوصول السريع

---

#### **القنوات التقليدية (اختيارية)**

**1. التلفزيون (10% من الميزانية)**
**القنوات المحلية:**
• الجمهور: واسع ومتنوع
• الميزة: تغطية واسعة
• التكلفة: 5,000-20,000 ج.م للإعلان
• الأنسبى ل: الوعي بالعلامة التجارية

**القنوات الفضائية:**
• الجمهور: ${geoText === 'national' ? 'جميع المحافظات' : geoText === 'gcc' ? 'مجلس التعاون' : 'الشرق الأوسط'}
• الميزة: تغطية إقليمية/دولية
• التكلفة: 10,000-50,000 ج.م للإعلان
• الأنسبى ل: العلامات التجارية الكبيرة

---

**2. الإذاعة (5% من الميزانية)**
**محطات FM:**
• الجمهور: سائقو السيارات
• الميزة: تكلفة معقولة
• التكلفة: 500-2,000 ج.م للإعلان
• الأنسبى ل: الوعي المحلي

---

### 📊 **توصيات القنوات حسب الهدف:**

**لزيادة الوعي بالعلامة التجارية:**
1. فيسبوك/إنستجرام (40%)
2. يوتيوب (25%)
3. تلفزيون (20%)
4. تيك توك (15%)

**لتوليد العملاء المحتملين:**
1. جوجل ADS (45%)
2. لينكدإن (30%)
3. فيسبوك/إنستجرام (25%)

**لزيادة المبيعات:**
1. جوجل ADS (50%)
2. فيسبوك/إنستجرام (30%)
3. إعادة الاستهداف (20%)

---

### 💰 **توزيع الميزانية المقترح (${budgetText}):**
**القنوات الرقمية (85%):**
• منصات التواصل: ${formData.budget === '5000-10000' ? '3,400 ج.م' : 
  formData.budget === '10000-25000' ? '8,500 ج.م' :
  formData.budget === '25000-50000' ? '21,250 ج.م' :
  formData.budget === '50000-100000' ? '42,500 ج.م' : '85,000+ ج.م'}
• محركات البحث: ${formData.budget === '5000-10000' ? '2,550 ج.م' : 
  formData.budget === '10000-25000' ? '6,375 ج.م' :
  formData.budget === '25000-50000' ? '15,938 ج.م' :
  formData.budget === '50000-100000' ? '31,875 ج.م' : '63,750+ ج.م'}
• الإعلانات المصورة: ${formData.budget === '5000-10000' ? '1,275 ج.م' : 
  formData.budget === '10000-25000' ? '3,188 ج.م' :
  formData.budget === '25000-50000' ? '7,969 ج.م' :
  formData.budget === '50000-100000' ? '15,938 ج.م' : '31,875+ ج.م'}

**القنوات التقليدية (15%):**
• تلفزيون: ${formData.budget === '5000-10000' ? '600 ج.م' : 
  formData.budget === '10000-25000' ? '1,500 ج.م' :
  formData.budget === '25000-50000' ? '3,750 ج.م' :
  formData.budget === '50000-100000' ? '7,500 ج.م' : '15,000+ ج.م'}
• إذاعة: ${formData.budget === '5000-10000' ? '150 ج.م' : 
  formData.budget === '10000-25000' ? '375 ج.م' :
  formData.budget === '25000-50000' ? '938 ج.م' :
  formData.budget === '50000-100000' ? '1,875 ج.م' : '3,750+ ج.م'}

---
#قنوات_إعلانية #تسويق_رقمي #إعلانات`
  }

  const generateBudgetAllocation = () => {
    const budgetText = budgetOptions.find(opt => opt.value === formData.budget)?.label || formData.budget
    const durationText = durationOptions.find(opt => opt.value === formData.duration)?.label || formData.duration

    return `💰 **توزيع الميزانية الإعلانية**

### 📊 **نظرة عامة على الميزانية:**
**الميزانية الإجمالية:** ${budgetText}
**المدة:** ${durationText}
**متوسط الإنفاق الشهري:** ${formData.budget === '5000-10000' ? '5,000 ج.م' : 
  formData.budget === '10000-25000' ? '15,000 ج.م' :
  formData.budget === '25000-50000' ? '35,000 ج.م' :
  formData.budget === '50000-100000' ? '65,000 ج.م' : '150,000+ ج.م'}

---

### 🎯 **توزيع الميزانية حسب القنوات:**

#### **1. منصات التواصل الاجتماعي (45%)**
**فيسبوك (20%):**
• الإنفاق اليومي: ${formData.budget === '5000-10000' ? '33 ج.م' : 
  formData.budget === '10000-25000' ? '100 ج.م' :
  formData.budget === '25000-50000' ? '233 ج.م' :
  formData.budget === '50000-100000' ? '433 ج.م' : '1,000+ ج.م'}
• التكلفة المتوقعة للنقرة: 1-3 ج.م
• عدد النقرات المتوقع: 1,000-3,000 شهرياً

**إنستجرام (15%):**
• الإنفاق اليومي: ${formData.budget === '5000-10000' ? '25 ج.م' : 
  formData.budget === '10000-25000' ? '75 ج.م' :
  formData.budget === '25000-50000' ? '175 ج.م' :
  formData.budget === '50000-100000' ? '325 ج.م' : '750+ ج.م'}
• التكلفة المتوقعة للنقرة: 2-5 ج.م
• عدد النقرات المتوقع: 500-1,500 شهرياً

**لينكدإن (5%):**
• الإنفاق اليومي: ${formData.budget === '5000-10000' ? '8 ج.م' : 
  formData.budget === '10000-25000' ? '25 ج.م' :
  formData.budget === '25000-50000' ? '58 ج.م' :
  formData.budget === '50000-100000' ? '108 ج.م' : '250+ ج.م'}
• التكلفة المتوقعة للنقرة: 3-8 ج.م
• عدد النقرات المتوقع: 100-300 شهرياً

**تيك توك (5%):**
• الإنفاق اليومي: ${formData.budget === '5000-10000' ? '8 ج.م' : 
  formData.budget === '10000-25000' ? '25 ج.م' :
  formData.budget === '25000-50000' ? '58 ج.م' :
  formData.budget === '50000-100000' ? '108 ج.م' : '250+ ج.م'}
• التكلفة المتوقعة للمشاهدة: 0.05-0.5 ج.م
• عدد المشاهدات المتوقع: 10,000-50,000 شهرياً

---

#### **2. محركات البحث (30%)**
**جوجل ADS (25%):**
• الإنفاق اليومي: ${formData.budget === '5000-10000' ? '42 ج.م' : 
  formData.budget === '10000-25000' ? '125 ج.م' :
  formData.budget === '25000-50000' ? '292 ج.م' :
  formData.budget === '50000-100000' ? '542 ج.م' : '1,250+ ج.م'}
• التكلفة المتوقعة للنقرة: 2-10 ج.م
• عدد النقرات المتوقع: 500-2,500 شهرياً

**بينج ADS (5%):**
• الإنفاق اليومي: ${formData.budget === '5000-10000' ? '8 ج.م' : 
  formData.budget === '10000-25000' ? '25 ج.م' :
  formData.budget === '25000-50000' ? '58 ج.م' :
  formData.budget === '50000-100000' ? '108 ج.م' : '250+ ج.م'}
• التكلفة المتوقعة للنقرة: 1-7 ج.م
• عدد النقرات المتوقع: 200-1,000 شهرياً

---

#### **3. الإعلانات المصورة (15%)**
**يوتيوب (10%):**
• الإنفاق اليومي: ${formData.budget === '5000-10000' ? '17 ج.م' : 
  formData.budget === '10000-25000' ? '50 ج.م' :
  formData.budget === '25000-50000' ? '117 ج.م' :
  formData.budget === '50000-100000' ? '217 ج.م' : '500+ ج.م'}
• التكلفة المتوقعة للمشاهدة: 0.1-1 ج.م
• عدد المشاهدات المتوقع: 20,000-100,000 شهرياً

**تيك توك فيديو (5%):**
• الإنفاق اليومي: ${formData.budget === '5000-10000' ? '8 ج.م' : 
  formData.budget === '10000-25000' ? '25 ج.م' :
  formData.budget === '25000-50000' ? '58 ج.م' :
  formData.budget === '50000-100000' ? '108 ج.م' : '250+ ج.م'}
• التكلفة المتوقعة للمشاهدة: 0.05-0.5 ج.م
• عدد المشاهدات المتوقع: 10,000-50,000 شهرياً

---

#### **4. القنوات التقليدية (10%)**
**تلفزيون (8%):**
• الإنفاق الشهري: ${formData.budget === '5000-10000' ? '400 ج.م' : 
  formData.budget === '10000-25000' ? '1,200 ج.م' :
  formData.budget === '25000-50000' ? '2,800 ج.م' :
  formData.budget === '50000-100000' ? '5,200 ج.م' : '12,000+ ج.م'}
• عدد مرات البث: 10-20 شهرياً
• الجمهور المتوقع: 500,000-2,000,000 مشاهد

**إذاعة (2%):**
• الإنفاق الشهري: ${formData.budget === '5000-10000' ? '100 ج.م' : 
  formData.budget === '10000-25000' ? '300 ج.م' :
  formData.budget === '25000-50000' ? '700 ج.م' :
  formData.budget === '50000-100000' ? '1,300 ج.م' : '3,000+ ج.م'}
• عدد مرات البث: 20-40 شهرياً
• الجمهور المتوقع: 100,000-500,000 مستمع

---

### 📈 **توقعات العائد على الاستثمار:**

#### **أفضل سيناريو (ROI 300%):**
• تكلفة اكتساب العميل: 100-200 ج.م
• قيمة العميل: 600-1,200 ج.م
• معدل التحويل: 4-6%
• الإيرادات المتوقعة: 3x الميزانية

#### **سيناريو متوسط (ROI 200%):**
• تكلفة اكتساب العميل: 150-300 ج.م
• قيمة العميل: 450-900 ج.م
• معدل التحويل: 2-4%
• الإيرادات المتوقعة: 2x الميزانية

#### **أسوأ سيناريو (ROI 100%):**
• تكلفة اكتساب العميل: 250-500 ج.م
• قيمة العميل: 375-750 ج.م
• معدل التحويل: 1-2%
• الإيرادات المتوقعة: 1x الميزانية

---

### 💡 **نصائح لتحسين الميزانية:**
1. **ابدأ بميزانية صغيرة واختبر القنوات**
2. **ركز على القنوات الأعلى عائداً**
3. **استخدم إعادة الاستهداف لزيادة التحويل**
4. **راقب الأداء يومياً وعدل الميزانية**
5. **خصص 10% من الميزانية للتجارب**

---
#ميزانية #إعلانات #تسويق_رقمي`
  }

  const generateTargetingStrategy = () => {
    const geoText = geographicTargets.find(opt => opt.value === formData.geographicTarget)?.label || formData.geographicTarget

    return `🎯 **استراتيجية الاستهداف**

### 🎪 **شرائح الجمهور المستهدف:**

#### **الشريحة الرئيسية (70% من الميزانية)**
**الخصائص الديموغرافية:**
• العمر: 25-45 سنة
• الجنس: ذكور وإناث
• المستوى التعليمي: جامعي فما فوق
• الدخل الشهري: 5,000+ ج.م
• الموقع: ${geoText}
• الحالة الاجتماعية: متزوج/عازب

**الاهتمامات والسلوك:**
• التكنولوجيا والابتكار
• التطور المهني
• التسوق الإلكتروني
• محتوى تعليمي
• منتجات وخدمات عالية الجودة

**المنصات المفضلة:**
• فيسبوك: 2-3 ساعات يومياً
• إنستجرام: 1-2 ساعة يومياً
• يوتيوب: 1-2 ساعة يومياً
• لينكدإن: 30 دقيقة يومياً

---

#### **الشريحة الثانوية (20% من الميزانية)**
**الخصائص الديموغرافية:**
• العمر: 18-24 سنة و 46-60 سنة
• المستوى التعليمي: ثانوي فما فوق
• الدخل الشهري: 3,000+ ج.م
• الموقع: ${geoText}

**الاهتمامات والسلوك:**
• البحث عن قيمة مقابل السعر
• الاهتمام بالعروض والتخفيضات
• محتوى ترفيهي
• منتجات بأسعار معقولة

**المنصات المفضلة:**
• تيك توك: 1-2 ساعة يومياً
• فيسبوك: 1 ساعة يومياً
• يوتيوب: 1 ساعة يومياً

---

#### **الشريحة التجريبية (10% من الميزانية)**
**الخصائص الديموغرافية:**
• العمر: جميع الأعمار
• المستوى التعليمي: متنوع
• الدخل الشهري: متنوع
• الموقع: ${geoText}

**الاستهداف السلوكي:**
• المستخدمون النشطون مؤخراً
• المهتمون بالمنافسين
• الباحثون عن كلمات مفتاحية ذات صلة
• زوار الموقع الإلكتروني

---

### 🗺️ **الاستهداف الجغرافي:**

#### **المستوى 1: ${geoText} (60%)**
**الاستهداف التفصيلي:**
• المدن الرئيسية: القاهرة، الإسكندرية، الجيزة
• المناطق الحضرية: 80%
• المناطق الريفية: 20%
• الأحياء الراقية: التركيز الأعلى

**أوقات النشاط:**
• الصباح: 9 صباحاً - 12 ظهراً
• المساء: 6 مساءً - 11 مساءً
• نهاية الأسبوع: أعلى تفاعل

---

#### **المستوى 2: المناطق المجاورة (30%)**
**الاستهداف التفصيلي:**
• المدن الثانوية: طنطا، المنصورة، الزقازيق
• المناطق شبه الحضرية: 60%
• المناطق الريفية: 40%

**أوقات النشاط:**
• المساء: 7 مساءً - 10 مساءً
• عطلة نهاية الأسبوع

---

#### **المستوى 3: التوسع (10%)**
**الاستهداف التفصيلي:**
• جميع المحافظات
• التركيز على المراكز التجارية
• الاستهداف العشوائي للاختبار

---

### 📱 **استهداف المنصات:**

#### **فيسبوك وإنستجرام:**
**الاستهداف الديموغرافي:**
• العمر: 25-45 سنة
• الموقع: ${geoText}
• الاهتمامات: التكنولوجيا، الأعمال، التسوق
• السلوك: متسوقون عبر الإنترنت

**الاستهداف المخصص:**
• مشابهي الجمهور الحالي
• زوار الموقع الإلكتروني
• المهتمون بالمنافسين
• مستخدمو الأجهزة المحمولة

**الاستهداف التفصيلي:**
• مستخدمو iPhone وAndroid
• اتصال WiFi و4G
• اللغة: العربية

---

#### **جوجل ADS:**
**الكلمات المفتاحية:**
• كلمات العلامة التجارية
• كلمات المنتج/الخدمة
• كلمات المشكلة/الحل
• كلمات المنافسين

**الاستهداف الجغرافي:**
• ${geoText}
• نطاق 50 كم حول المدن الرئيسية
• استثناء المناطق غير المرغوبة

**الاستهداف بالجهاز:**
• أجهزة محمولة: 70%
• أجهزة كمبيوتر: 25%
• أجهزة لوحية: 5%

---

#### **لينكدإن:**
**الاستهداف الوظيفي:**
• المديرون والمديرون التنفيذيون
• أصحاب الأعمال
• المحترفون والمستشارون
• موظفو التسويق والمبيعات

**الاستهداف بالصناعة:**
• التكنولوجيا
• الخدمات المالية
• التعليم
• الرعاية الصحية
• تجارة التجزئة

**الاستهداف بحجم الشركة:**
• الشركات الصغيرة (10-50 موظف)
• الشركات المتوسطة (50-200 موظف)
• الشركات الكبيرة (200+ موظف)

---

### 🔄 **استراتيجية إعادة الاستهداف:**

#### **جميع الزوار (100%):**
• زوار الموقع الإلكتروني خلال الـ 30 يوماً الماضية
• متفاعلو منصات التواصل خلال الـ 14 يوماً الماضية
• مشاهدي الفيديوهات خلال الـ 7 أيام الماضية

---

#### **زوار الصفحات المهمة (80%):**
• زوار صفحة الأسعار
• زوار صفحة التواصل
• زوار صفحة المنتجات/الخدمات
• زوار صفقة "من نحن"

---

#### **المهتمون بالشراء (60%):**
• أضافوا للسلة ولكن لم يشتروا
• بدأوا عملية الشراء ولكن لم يكملوها
• زاروا صفحة الدفع
• شاهدوا إعلانات المنتجات

---

#### **العملاء الحاليون (40%):**
• اشتروا خلال الـ 90 يوماً الماضية
• مشتركين في النشرة البريدية
• متابعي الحسابات الرسمية
• عملاء مخلصين

---

### 📊 **مؤشرات نجاح الاستهداف:**
• معدل النقر (CTR): 2-5%
• معدل التحويل: 3-8%
• تكلفة النقرة (CPC): 1-5 ج.م
• تكلفة الاكتساب (CPA): 50-200 ج.م
• عائد الاستثمار (ROI): 200-400%

---
#استهداف #تسويق_رقمي #إعلانات`
  }

  const generateAdCreative = () => {
    return `🎨 **الإبداع الإعلاني**

### 🎯 **استراتيجية الإبداع:**
**الرسالة الرئيسية:** "الحل الأمثل لاحتياجاتك"
**النبرة:** احترافية، واثقة، ملهمة
**الأسلوب:** واضح، مباشر، جذاب
**القيم:** الجودة، الابتكار، الثقة

---

### 📱 **تصاميم الإعلانات حسب المنصة:**

#### **فيسبوك وإنستجرام:**

**إعلانات الصور (1:1):**
**التصميم:**
• خلفية متدرجة من الأزرق إلى الأرجواني
• صورة المنتج/الخدمة في المنتصف
• شعار العلامة التجارية في الزاوية
• نص واضح ومقروء

**النص:**
**العنوان:** "اكتشف الحل الذي كنت تنتظره!"
**النص الرئيسي:** "منتجنا المبتكر مصمم خصيصاً لتلبية جميع احتياجاتك. جودة عالية بأسعار تنافسية تبدأ من 500 ج.م."
**دعوة للعمل:** "اطلب الآن واحصل على خصم 20%"

**المواصفات الفنية:**
• الحجم: 1080x1080 بكسل
• الصيغة: PNG أو JPG
• الحجم الأقصى: 30 ميجابايت
• النص: أقل من 20% من الصورة

---

**إعلانات الفيديو (9:16):**
**السيناريو:**
• 0-3 ثوانٍ: مشكلة العميل مع عرض جذاب
• 3-6 ثوانٍ: تقديم الحل (المنتج/الخدمة)
• 6-9 ثوانٍ: فوائد ومميزات المنتج
• 9-12 ثانية: دعوة للعمل وعروض خاصة
• 12-15 ثانية: شعار ومعلومات التواصل

**الموسيقى:** خلفية حماسية ومحفزة
**الصوت:** صوت واضح واحترافي
**الترجمة:** نصوص عربية واضحة
**المدة:** 15-30 ثانية

---

**إعلانات الكاروسيل:**
**الشريحة 1:** منتج مع عرض خاص
**الشريحة 2:** مميزات المنتج
**الشريحة 3:** آراء العملاء
**الشريحة 4:** كيفية الطلب
**الشريحة 5:** ضمان الجودة

---

#### **يوتيوب:**

**إعلانات قابلة للتجاوز (In-Stream):**
**المدة:** 15-20 ثانية
**المحتوى:** عرض سريع للمنتج مع دعوة قوية للعمل
**الاستهداف:** بداية الفيديوهات الشبيهة
**الميزة:** تكلفة منخفضة، وصول واسع

**إعلانات غير قابلة للتجاوز:**
**المدة:** 15-30 ثانية
**المحتوى:** عرض تفصيلي مع فوائد واضحة
**الاستهداف:** منتصف الفيديوهات الطويلة
**الميزة:** تفاعل عالي، تركيز أكبر

---

#### **تيك توك:**

**إعلانات In-Feed:**
**المدة:** 9-15 ثانية
**المحتوى:** محتوى سريع وجذاب ومضحك
**الأسلوب:** يعكس اتجاهات المنصة
**الموسيقى:** استخدام الأغاني الشائعة

**إعلانات TopView:**
**المدة:** 5-60 ثانية
**المحتوى:** إعلانات عالية الجودة
**الميزة:** ظهور في أعلى الصفحة
**التكلفة:** أعلى ولكن فعالية أكبر

---

#### **لينكدإن:**

**إعلانات الصور:**
**التصميم:** احترافي ورسمي
**النص:** يركز على الفوائد المهنية
**الاستهداف:** المديرين وصناع القرار

**إعلانات الفيديو:**
**المدة:** 30-60 ثانية
**المحتوى:** عروض تقديمية، دراسات حالة
**الأسلوب:** مهني ومقنع

---

### 🎨 **دليل العلامة التجارية:**

#### **الألوان:**
**الألوان الأساسية:**
• الأزرق الداكن: #1a237e
• الأرجواني: #7b1fa2
• الأبيض: #ffffff

**الألوان الثانوية:**
• الأزرق الفاتح: #3f51b5
• الوردي: #e91e63
• الرمادي: #757575

#### **الخطوط:**
**العناوين:** Cairo Bold
**النص:** Cairo Regular
**العروض:** Cairo Black

#### **الشعار:**
• الاستخدام: دائماً في الزاوية العلوية اليمنى
• الحجم: لا يقل عن 40x40 بكسل
• المسافة: 20 بكسل من الحواف
• الخلفية: دائماً واضحة

---

### 📝 **نماذج نصية إعلانية:**

#### **لزيادة الوعي بالعلامة التجارية:**
**العنوان:** "ثورة في عالم [الصناعة]"
**النص:** "اكتشف كيف غيرت منتجاتنا حياة آلاف العملاء. جودة عالية بأسعار تنافسية تبدأ من 500 ج.م."
**دعوة للعمل:** "تعرف المزيد"

#### **لتوليد العملاء المحتملين:**
**العنوان:** "هل تبحث عن حل لمشكلتك؟"
**نص:** "منتجنا المصمم خصيصاً لك يقدم حلولاً مبتكرة. احصل على استشارة مجانية الآن."
**دعوة للعمل:** "احصل على عرض سعر"

#### **لزيادة المبيعات:**
**العنوان:** "عرض خاص لمدة محدودة"
**نص:** "خصم 20% على جميع المنتجات + شحن مجاني. الفرصة محدودة، لا تفوتها!"
**دعوة للعمل:** "اشترِ الآن"

---

### 🎭 **استراتيجية المحتوى الإعلاني:**

#### **مراحل رحلة العميل:**

**مرحلة الوعي:**
• المحتوى: تعليمي، معلوماتي
• الهدف: جذب الانتباه
• المنصات: فيسبوك، يوتيوت، تيك توك
• التكلفة: منخفضة

**مرحلة الاهتمام:**
• المحتوى: مقارنات، مميزات
• الهدف: بناء الثقة
• المنصات: جوجل، فيسبوك، لينكدإن
• التكلفة: متوسطة

**مرحلة القرار:**
• المحتوى: عروض، شهادات
• الهدف: تحفيز الشراء
• المنصات: جوجل، إعادة الاستهداف
• التكلفة: عالية

**مرحلة الشراء:**
• المحتوى: عروض خاصة، تخفيضات
• الهدف: إتمام الشراء
• المنصات: إعادة الاستهداف، بريد إلكتروني
• التكلفة: متوسطة

---

### 🔄 **اختبار وتحسين الإعلانات:**

#### **اختبار A/B:**
**عناصر الاختبار:**
• الصور مقابل الفيديو
• نصوص مختلفة
• دعوات عمل متعددة
• ألوان وتصاميم متنوعة

**مقاييس النجاح:**
• معدل النقر (CTR)
• معدل التحويل (CR)
• تكلفة النقرة (CPC)
• تكلفة الاكتساب (CPA)

#### **جدول الاختبار:**
• الأسبوع 1: اختبار الصور
• الأسبوع 2: اختبار الفيديو
• الأسبوع 3: اختبار النصوص
• الأسبوع 4: تحسين الأفضل أداءً

---

### 📊 **مؤشرات أداء الإبداع:**
• معدل النقر: 2-5%
• وقت المشاهدة: 50%+ للفيديو
• التفاعل: 3-8%
• المشاركة: 1-3%
• الذاكرة: 60-80%

---
#إبداع_إعلاني #تصميم #تسويق_رقمي`
  }

  const generatePerformanceTracking = () => {
    return `📊 **تتبع الأداء**

### 🎯 **نظام تتبع متكامل:**

#### **المؤشرات الرئيسية للأداء (KPIs):**

**مؤشرات الوصول:**
• عدد مرات الظهور (Impressions)
• مدى الوصول (Reach)
• تكرار الظهور (Frequency)
• حصة الصوت (Share of Voice)

**مؤشرات التفاعل:**
• معدل النقر (CTR)
• معدل التفاعل (Engagement Rate)
• وقت المشاهدة (View Time)
• عمق التمرير (Scroll Depth)

**مؤشرات التحويل:**
• عدد التحويلات (Conversions)
• معدل التحويل (Conversion Rate)
• تكلفة التحويل (Cost per Conversion)
• قيمة التحويل (Conversion Value)

**مؤشرات الربحية:**
• العائد على الإنفاق الإعلاني (ROAS)
• العائد على الاستثمار (ROI)
• تكلفة اكتساب العميل (CAC)
• قيمة العميل مدى الحياة (LTV)

---

### 📱 **تتبع حسب المنصة:**

#### **فيسبوك وإنستجرام:**
**المؤشرات الأساسية:**
• مرات الظهور: 500,000+ شهرياً
• مدى الوصول: 200,000+ مستخدم فريد
• معدل النقر: 2-5%
• تكلفة النقرة: 1-3 ج.م

**مؤشرات التفاعل:**
• الإعجابات: 10,000+ شهرياً
• التعليقات: 1,000+ شهرياً
• المشاركات: 500+ شهرياً
• الحفظ: 200+ شهرياً

**مؤشرات التحويل:**
• التحويلات: 100-300 شهرياً
• معدل التحويل: 3-8%
• تكلفة التحويل: 50-150 ج.م
• ROAS: 200-400%

---

#### **جوجل ADS:**
**مؤشرات البحث:**
• مرات الظهور: 200,000+ شهرياً
• النقرات: 2,000-5,000 شهرياً
• معدل النقر: 2-5%
• تكلفة النقرة: 2-10 ج.م

**مؤشرات التحويل:**
• التحويلات: 50-200 شهرياً
• معدل التحويل: 2-6%
• تكلفة التحويل: 100-300 ج.م
• الجودة: 5-10/10

---

#### **يوتيوب:**
**مؤشرات المشاهدة:**
• المشاهدات: 100,000+ شهرياً
• وقت المشاهدة: 50,000+ دقيقة
• معدل المشاهدة: 30-60%
• تكلفة المشاهدة: 0.1-1 ج.م

**مؤشرات التفاعل:**
• الإعجابات: 1,000+ شهرياً
• التعليقات: 200+ شهرياً
• المشاركات: 100+ شهرياً
• الاشتراكات: 50+ شهرياً

---

#### **تيك توك:**
**مؤشرات الأداء:**
• المشاهدات: 200,000+ شهرياً
• التفاعل: 10,000+ شهرياً
• معدل التفاعل: 5-15%
• تكلفة التفاعل: 0.05-0.5 ج.م

---

### 📈 **أدوات التتبع والمقاييس:**

#### **أدوات التحليل:**
**Google Analytics:**
• تتبع الزوار والسلوك
• تحليل مسارات التحويل
• قياس العائد على الاستثمار
• تقارير مخصصة

**Facebook Pixel:**
• تتبع التحويلات
• إعادة الاستهداف
• قياس الأداء
• تحسين الإعلانات

**Google Tag Manager:**
• إدارة العلامات
• تتبع الأحداث
• تكامل مع أدوات أخرى
• مرونة في التتبع

---

#### **لوحات التحكم:**
**لوحة تحكم يومية:**
• أداء الحملات الحالية
• الإنفاق اليومي
• التفاعل والتحويلات
• تنبيهات الأداء

**لوحة تحكم أسبوعية:**
• ملخص الأسبوع
• مقارنة بالأهداف
• تحليل الاتجاهات
• توصيات التحسين

**لوحة تحكم شهرية:**
• تقرير شامل الأداء
• تحليل العائد على الاستثمار
• مقارنة بالمنافسين
• تخطيط الشهر القادم

---

### 🎯 **أهداف الأداء:**

#### **أهداف شهرية:**
**الوصول:**
• مرات الظهور: 1,000,000+
• مدى الوصول: 500,000+
• تكرار الظهور: 2-4 مرات

**التفاعل:**
• معدل النقر: 3-5%
• معدل التفاعل: 5-10%
• وقت المشاهدة: 60%+

**التحويل:**
• التحويلات: 200-500
• معدل التحويل: 4-8%
• تكلفة التحويل: 50-150 ج.م

**الربحية:**
• ROAS: 250-400%
• ROI: 200-300%
• CAC: 100-200 ج.م

---

#### **أهداف ربع سنوية:**
**نمو الوصول:** 20-30%
**تحسين التفاعل:** 15-25%
**زيادة التحويلات:** 25-35%
**تحسين الربحية:** 30-50%

---

### 🔄 **استراتيجية التحسين المستمر:**

#### **تحسين يومي:**
• مراجعة أداء الحملات
• تعديل الميزانية
• إيقاف الإعلانات ذات الأداء الضعيف
• زيادة ميزانية الإعلانات الناجحة

#### **تحسين أسبوعي:**
• تحليل الاتجاهات
• اختبار A/B جديد
• تحسين الاستهداف
• تحديث المحتوى الإعلاني

#### **تحسين شهري:**
• تقييم شامل للأداء
• إعادة توزيع الميزانية
• تطوير استراتيجيات جديدة
• تخطيط للشهر القادم

---

### 📊 **نظام التقارير:**

#### **تقارير يومية:**
• ملخص سريع للأداء
• الإنفاق اليومي
• التفاعل والتحويلات
• تنبيهات هامة

#### **تقارير أسبوعية:**
• تحليل مفصل الأداء
• مقارنة بالأهداف
• تحليل المنافسة
• توصيات التحسين

#### **تقارير شهرية:**
• تقرير شامل الأداء
• تحليل العائد على الاستثمار
• تحليل الجمهور
• تخطيط استراتيجي

#### **تقارير ربع سنوية:**
• تقييم استراتيجي
• تحليل السوق
• مقارنة سنوية
• تخطيط طويل المدى

---

### 🚨 **نظام التنبيهات:**

#### **تنبيهات الأداء:**
• انخفاض معدل النقر أقل من 1%
• زيادة تكلفة النقرة أعلى من 10 ج.م
• انخفاض معدل التحويل أقل من 1%
• تجاوز الميزانية اليومية

#### **تنبيهات الفرص:**
• أداء إعلان أعلى من المتوسط بنسبة 50%
• فرصة للوصول لجمهور جديد
• انخفاض تكلفة التحويل
• زيادة غير متوقعة في التفاعل

#### **تنبيهات الميزانية:**
• استهلاك 80% من الميزانية
• انخفاض الأداء مع زيادة الإنفاق
• فرصة لزيادة الميزانية
• إعادة توزيع الميزانية المطلوبة

---

### 📱 **تطبيقات الموبايل للتتبع:**
• Facebook Ads Manager
• Google Ads App
• Analytics Mobile
• Custom Dashboard Apps

---
#تتبع_الأداء #تحليل #تسويق_رقمي`
  }

  const generatePlan = async () => {
    setIsGenerating(true)
    
    // Simulate AI generation with timeout
    setTimeout(() => {
      let plan = ''
      
      switch (activeTab) {
        case 'campaign-overview':
          plan = generateCampaignOverview()
          break
        case 'channel-selection':
          plan = generateChannelSelection()
          break
        case 'budget-allocation':
          plan = generateBudgetAllocation()
          break
        case 'targeting-strategy':
          plan = generateTargetingStrategy()
          break
        case 'ad-creative':
          plan = generateAdCreative()
          break
        case 'performance-tracking':
          plan = generatePerformanceTracking()
          break
        default:
          plan = generateCampaignOverview()
      }
      
      setGeneratedPlan(plan)
      setIsGenerating(false)
    }, 3000)
  }

  const resetForm = () => {
    setFormData({
      campaignName: '',
      industry: '',
      budget: '',
      duration: '',
      targetAudience: '',
      campaignGoal: '',
      geographicTarget: ''
    })
    setGeneratedPlan('')
  }

  const downloadAsPDF = () => {
    const blob = new Blob([generatedPlan], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeTab}-خطة-شراء-الإعلانات.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navigation currentPath="/media-buying-plan-tool-ar" />
      
      <div className="pt-25 pb-12">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full mb-6">
              <Target className="w-4 h-4" />
              <span className="text-sm font-medium">أداة تخطيط شراء الإعلانات</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              أداة تخطيط شراء الإعلانات
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              قم بإنشاء خطة إعلانية متكاملة مع تحليل مفصل للقنوات والميزانيات والاستهداف
            </p>
          </motion.div>

          {/* Tools Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mediaBuyingSections.map((section, index) => (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`p-4 md:p-6 rounded-2xl border transition-all duration-300 text-left ${
                    activeTab === section.id
                      ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50 text-white'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-purple-500/30'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 md:p-3 rounded-xl ${activeTab === section.id ? 'bg-purple-500/20' : 'bg-white/5'}`}>
                      <section.icon className={`w-6 h-6 ${
                        activeTab === section.id ? 'text-purple-400' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{section.title}</h3>
                      <p className="text-xs md:text-sm opacity-70">{section.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-4 md:p-8 border border-white/10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <FileText className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                  معلومات الحملة الإعلانية
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      اسم الحملة الإعلانية *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                      value={formData.campaignName}
                      onChange={(e) => handleInputChange('campaignName', e.target.value)}
                      placeholder="مثال: حملة إطلاق المنتج الجديد"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      المجال/الصناعة *
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white"
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      required
                    >
                      <option value="">اختر المجال</option>
                      {industryOptions.map(option => (
                        <option key={option.value} value={option.value} className="bg-gray-900">
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      ميزانية الحملة *
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white"
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      required
                    >
                      <option value="">اختر الميزانية</option>
                      {budgetOptions.map(option => (
                        <option key={option.value} value={option.value} className="bg-gray-900">
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      مدة الحملة *
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      required
                    >
                      <option value="">اختر المدة</option>
                      {durationOptions.map(option => (
                        <option key={option.value} value={option.value} className="bg-gray-900">
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      الجمهور المستهدف *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white placeholder-gray-400"
                      value={formData.targetAudience}
                      onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                      placeholder="مثال: الشباب من 25-35 سنة، المهنيين، رائدات الأعمال"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      الهدف الرئيسي للحملة *
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white"
                      value={formData.campaignGoal}
                      onChange={(e) => handleInputChange('campaignGoal', e.target.value)}
                      required
                    >
                      <option value="">اختر الهدف</option>
                      {campaignGoals.map(option => (
                        <option key={option.value} value={option.value} className="bg-gray-900">
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      النطاق الجغرافي المستهدف *
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-white"
                      value={formData.geographicTarget}
                      onChange={(e) => handleInputChange('geographicTarget', e.target.value)}
                      required
                    >
                      <option value="">اختر النطاق الجغرافي</option>
                      {geographicTargets.map(option => (
                        <option key={option.value} value={option.value} className="bg-gray-900">
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={generatePlan}
                      disabled={isGenerating || !formData.campaignName}
                      className="flex-1"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                          جاري الإنشاء...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          إنشاء الخطة
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={resetForm}
                      variant="outline"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      إعادة تعيين
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Output */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-4 md:p-8 border border-white/10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <FileText className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                  الخطة المُنشأة
                </h3>
                
                {generatedPlan ? (
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4 md:p-6 border border-white/20 max-h-80 overflow-y-auto">
                      <div className="text-white whitespace-pre-wrap leading-relaxed font-mono text-sm">
                        {generatedPlan}
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button
                        onClick={downloadAsPDF}
                        variant="outline"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        تحميل
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 md:py-12">
                    <Star className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-400 mb-2">لم يتم إنشاء أي خطة بعد</p>
                    <p className="text-sm text-gray-500">املأ النموذج وانقر على "إنشاء الخطة" للبدء</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}