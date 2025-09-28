'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '@/components/Navigation'
import ToolOutput from '@/components/ToolOutput'
import RTLWrapper from '@/components/RTLWrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Palette, 
  Eye, 
  Target, 
  Zap, 
  CheckCircle, 
  AlertTriangle,
  Lightbulb,
  Video,
  Image,
  Type,
  MousePointer,
  RefreshCw,
  Download,
  Copy,
  ArrowRight,
  Clock,
  Star,
  TrendingUp,
  Users
} from 'lucide-react'

export default function CreativeOptimizationToolAR() {
  const [activeTab, setActiveTab] = useState('hook-rate')
  const [formData, setFormData] = useState({
    adType: 'video',
    hookType: 'shock',
    retentionRate: '',
    ctr: '',
    audience: '',
    product: '',
    tone: 'professional',
    cta: '',
    creativeElements: ''
  })
  const [generatedAnalysis, setGeneratedAnalysis] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [metrics, setMetrics] = useState<any[]>([])
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [score, setScore] = useState<number | undefined>(undefined)

  const optimizationTools = [
    {
      id: 'hook-rate',
      title: 'محلل معدل الجذب',
      description: 'قياس قدرة إعلانك على جذب الانتباه في أول 3 ثوانٍ',
      icon: Eye,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'creative-review',
      title: 'قالب مراجعة الإبداع',
      description: 'تقييم شامل لعناصر إعلانك الإبداعية',
      icon: Palette,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'performance-prediction',
      title: 'التنبؤ بالأداء',
      description: 'التنبؤ بأداء الإبداع بناءً على العوامل الرئيسية',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    }
  ]

  const adTypes = [
    { value: 'video', label: 'إعلان فيديو' },
    { value: 'image', label: 'إعلان صورة' },
    { value: 'carousel', label: 'إعلان دائري' },
    { value: 'story', label: 'إعلان قصة' }
  ]

  const hookTypes = [
    { value: 'shock', label: 'صدمة/مفاجأة' },
    { value: 'question', label: 'سؤال استفزازي' },
    { value: 'problem', label: 'تحديد المشكلة' },
    { value: 'benefit', label: 'فائدة قوية' },
    { value: 'story', label: 'بداية قصة' },
    { value: 'curiosity', label: 'فجوة الفضول' }
  ]

  const generateHookRateAnalysis = () => {
    const retentionRate = parseFloat(formData.retentionRate) || 0
    const ctr = parseFloat(formData.ctr) || 0

    const getHookPerformance = (retention: number) => {
      if (retention >= 80) return { status: 'ممتاز', color: 'text-green-400', icon: '🔥', message: 'أداء جذب استثنائي!' }
      if (retention >= 60) return { status: 'جيد', color: 'text-yellow-400', icon: '⭐', message: 'جذب solid مع مجال للتحسين' }
      if (retention >= 40) return { status: 'متوسط', color: 'text-orange-400', icon: '⚠️', message: 'الجذب يحتاج تحسينًا كبيرًا' }
      return { status: 'ضعيف', color: 'text-red-400', icon: '❌', message: 'الجذب يفشل في جذب الانتباه' }
    }

    const hookPerformance = getHookPerformance(retentionRate)

    const getCtrPerformance = (ctr: number) => {
      if (ctr >= 2) return { status: 'ممتاز', color: 'text-green-400', icon: '🎯', message: 'معدل نقرة استثنائي' }
      if (ctr >= 1) return { status: 'جيد', color: 'text-yellow-400', icon: '👍', message: 'أداء نقرة جيد' }
      if (ctr >= 0.5) return { status: 'متوسط', color: 'text-orange-400', icon: '📊', message: 'معدل نقرة متوسط - يمكن تحسينه' }
      return { status: 'ضعيف', color: 'text-red-400', icon: '📉', message: 'معدل نقرة منخفض يحتاج اهتمامًا' }
    }

    const ctrPerformance = getCtrPerformance(ctr)

    const calculateHookScore = (retention: number, ctr: number) => {
      let score = 0
      
      // Retention rate scoring (higher is better)
      if (retention >= 80) score += 50
      else if (retention >= 60) score += 35
      else if (retention >= 40) score += 20
      else score += 10
      
      // CTR scoring (higher is better)
      if (ctr >= 2) score += 50
      else if (ctr >= 1) score += 35
      else if (ctr >= 0.5) score += 20
      else score += 10
      
      return Math.min(100, score)
    }

    const hookScore = calculateHookScore(retentionRate, ctr)

    return `🎯 **تقرير تحليل معدل الجذب**

## 📊 **نظرة عامة على الأداء**

### **فعالية الجذب**
| المؤشر | القيمة | الحالة | المعيار |
|--------|-------|---------|-----------|
| **معدل الاحتفاظ 3 ثوانٍ** | ${retentionRate.toFixed(1)}% | ${hookPerformance.icon} ${hookPerformance.status} | >60% |
| **معدل النقرة (CTR)** | ${ctr.toFixed(2)}% | ${ctrPerformance.icon} ${ctrPerformance.status} | >1% |
| **درجة الجذب الإجمالية** | ${hookScore}/100 | ${hookScore >= 70 ? '✅ ممتاز' : hookScore >= 50 ? '⚠️ جيد' : '❌ يحتاج عمل'} | >70/100 |

## 🔍 **تحليل مفصل**

### **تقييم أداء الجذب**
${hookPerformance.message}

**نوع الجذب الحالي:** ${hookTypes.find(h => h.value === formData.hookType)?.label || 'غير معروف'}

**التحليل:**
${retentionRate >= 80 ? 
  '✅ **أداء جذب ممتاز!** أول 3 ثوانٍ فعالة جدًا في جذب والحفاظ على انتباه الجمهور. هذا يشير إلى تنفيذ إبداعي قوي وتوافق مع الجمهور.' :
  retentionRate >= 60 ? 
  '⚠️ **أداء جذب جيد.** جذبك يعمل بشكل جيد ولكن هناك مجال للتحسين. فكر في اختبار المتغيرات لتحسين الاحتفاظ بشكل أكبر.' :
  retentionRate >= 40 ? 
  '❌ **أداء جذب متوسط.** جذبك يفقد جزءًا كبيرًا من المشاهدين في أول 3 ثوانٍ. هذا يحتاج اهتمامًا فوريًا وإعادة تصميم.' :
  '❌ **أداء جذب ضعيف.** جذبك يفشل في جذب الانتباه. معظم المشاهدين يتوقفون عن المشاهدة قبل رؤية رسالتك الرئيسية.'
}

### **تحليل CTR**
${ctrPerformance.message}

**التحليل:**
${ctr >= 2 ? 
  '✅ **CTR استثنائي!** إبداعك لا يجذب الانتباه فقط بل يجبر المستخدمين على اتخاذ إجراء. هذا يشير إلى توافق قوي بين الجذب ودعوة العمل.' :
  ctr >= 1 ? 
  '⚠️ **CTR جيد.** المستخدمون ينقرون بمعدل صحي. قد تكون هناك فرص لتحسين تدفق الإبداع إلى CTA.' :
  ctr >= 0.5 ? 
  '❌ **CTR متوسط.** بينما قد يعمل جذبك، فإن الانتقال إلى الإجراء يحتاج تحسينًا. فكر في وضوح CTA واستمرارية الإبداع.' :
  '❌ **CTR منخفض.** المستخدمون لا يشعرون بالرغبة في النقر رغم مشاهدتهم لإبداعك. هذا يشير إلى انفصال بين الجذب والإجراء المطلوب.'
}

## 🛠️ **توصيات التحسين**

### **إجراءات فورية (${hookScore < 50 ? 'أولوية عالية' : 'أولوية متوسطة'})**
${hookScore < 50 ? 
  '🔥 **حرج: أعد تصميم جذبك فورًا**\\n• اختبر أنواع جذب مختلفة (صدمة، سؤال، فائدة)\\n• حسّن الجودة البصرية في أول 3 ثوانٍ\\n• أضف محفزات عاطفية أقوى\\n• فكر في اختبار A/B مع إبداعات جديدة\\n\\n🎯 **أصلح انفصال CTA-الإبداع**\\n• اجعل CTA أكثر بروزًا ووضوحًا\\n• تأكد من تدفق الإبداع بشكل طبيعي إلى CTA\\n• اختبر مواضع CTA وصياغة مختلفة' :
  '📈 **استمر في التحسين**\\n• اختبر متغيرات الجذب لتحسينات تدريجية\\n• راقب الأداء عبر شرائح الجمهور المختلفة\\n• فكر في توسيع العناصر الناجحة إلى إبداعات أخرى'
}

### **استراتيجيات تحسين الجذب**
بناءً على نوع جذبك الحالي (${hookTypes.find(h => h.value === formData.hookType)?.label}):

${formData.hookType === 'shock' ? 
  '**تحسين جذب الصدمة/المفاجأة:**\\n• زد التأثير البصري مع صور درامية أكثر\\n• أضف عناصر غير متوقعة في أول ثانيتين\\n• استخدم المؤثرات الصوتية أو الموسيقى لتعزيز المفاجأة\\n• اختبر مستويات صدمة مختلفة (خفيفة مقابل درامية)' :
  formData.hookType === 'question' ? 
  '**تحسين جذب السؤال:**\\n• اجعل الأسئلة أكثر استفزازًا وملاءمة\\n• تأكد من أن الأسئلة تتوافق مع نقاط ألم الجمهور\\n• أضف تعزيزًا بصريًا للسؤال\\n• اختبر موضع السؤال (بصري مقابل صوتي)' :
  formData.hookType === 'problem' ? 
  '**تحسين جذب المشكلة:**\\n• اجعل تحديد المشكلة أكثر فورية ووضوحًا\\n• استخدم سيناريوهات قابلة للارتباط في أول 3 ثوانٍ\\n• أضف وزنًا عاطفيًا لعرض المشكلة\\n• اختبر شدود مشكلة مختلفة' :
  formData.hookType === 'benefit' ? 
  '**تحسين جذب الفائدة:**\\n• قدم الفوائد بشكل بصري وفوري أكثر\\n• استخدم لغة أقوى تركز على الفائدة\\n• أضف عناصر مصداقية أو دليل اجتماعي مبكرًا\\n• اختبر أنماط عرض فائدة مختلفة' :
  formData.hookType === 'story' ? 
  '**تحسين جذب القصة:**\\n• اجعل بداية القصة أكثر جاذبية وفورية\\n• استخدم عناصر سرد قصصي بصري أقوى\\n• أضف مقدمة شخصية أو صراع مبكرًا\\n• اختبر أساليب بداية قصة مختلفة' :
  '**تحسين الجذب العام:**\\n• اختبر أنواع جذب متعددة للعثور على الأفضل أداءً\\n• حسّن جودة الإنتاج والجاذبية البصرية\\n• أضف محفزات عاطفية أو نفسية أقوى\\n• تأكد من توافق الجذب مع تفضيلات الجمهور المستهدف'
}

### **اقتراحات تعزيز الإبداع**
• **الجودة البصرية:** ترقية قيمة الإنتاج والإضاءة والتركيب
• **التحسين الصوتي:** أضف موسيقى أو مؤثرات صوتية مقنعة
• **النص التراكبي:** ضمّن الرسائل الرئيسية في أول 3 ثوانٍ
• **علم نفس الألوان:** استخدم ألوانًا تثير المشاعر المطلوبة
• **الإيقاع:** اضبط التوقيت لأقصى تأثير

## 📈 **التنبؤ بالأداء**

بناءً على المقاييس الحالية، الأداء المتوقع بعد التحسين:

| المؤشر | الحالي | المُحسَّن | التحسين |
|--------|---------|------------|-------------|
| **معدل الاحتفاظ** | ${retentionRate.toFixed(1)}% | ${Math.min(95, retentionRate + 20).toFixed(1)}% | +${Math.min(20, 95 - retentionRate).toFixed(1)}% |
| **CTR** | ${ctr.toFixed(2)}% | ${Math.min(5, ctr + 1).toFixed(2)}% | +${Math.min(1, 5 - ctr).toFixed(2)}% |
| **درجة الجذب** | ${hookScore}/100 | ${Math.min(100, hookScore + 25)}/100 | +${Math.min(25, 100 - hookScore)} نقطة |

## 🎯 **استراتيجية الاختبار**

### **إطار اختبار A/B**
1. **متغير الاختبار:** نوع الجذب والعناصر الإبداعية
2. **حجم العينة:** 1000 انطباع كحد أدنى لكل متغير
3. **المدة:** 3-7 أيام حسب حركة المرور
4. **مقاييس النجاح:** معدل الاحتفاظ >70%، CTR >1.5%

### **متغيرات الاختبار المراد اعتبارها**
- **المتغير أ:** ${hookTypes.find(h => h.value === formData.hookType)?.label} (الحالي)
- **المتغير ب:** ${hookTypes.find(h => h => h.value !== formData.hookType)?.label || 'نوع جذب بديل'}
- **المتغير ج:** جودة بصرية محسنة بنفس الجذب
- **المتغير د:** نفس الجذب مع عرض CTA محسن

## 📊 **الخطوات التالية**
1. **الأسبوع 1:** نفذ توصيات التحسين الفورية
2. **الأسبوع 2:** أطلق اختبارات A/B مع متغيرات إبداعية جديدة
3. **الأسبوع 3:** حلل نتائج الاختبار وحدد الفائزين
4. **الأسبوع 4:** وسع الإبداعات الناجحة ووثق التعلمات

---
*تحليل معدل الجذب بناءً على معايير الصناعة وممارسات الإبداع الأفضل*`
  }

  const generateCreativeReview = () => {
    const creativeElements = formData.creativeElements || 'visual, copy, cta'
    const elements = creativeElements.split(',').map(e => e.trim())

    const reviewTemplate = `🎨 **قالب مراجعة الإبداع**

## 📋 **تقييم الإبداع**

### **المعلومات الأساسية**
- **نوع الإعلان:** ${adTypes.find(a => a.value === formData.adType)?.label || 'غير معروف'}
- **المنتج/الخدمة:** ${formData.product || 'غير محدد'}
- **الجمهور المستهدف:** ${formData.audience || 'غير محدد'}
- **النبرة:** ${formData.tone || 'احترافية'}
- **العناصر الإبداعية:** ${elements.join(', ')}

## 🔍 **مراجعة عنصر بعنصر**

### **1. العناصر البصرية ${elements.includes('visual') ? '✅' : '⚠️'}**
${elements.includes('visual') ? 
  '**التقييم:** تم تضمين العناصر البصرية في المراجعة\\n\\n**الأسئلة الرئيسية:**\\n• هل يظهر العنصر البصري المنتج/الخدمة بوضوح؟\\n• هل الجودة البصرية احترافية وجذابة؟\\n• هل العنصر البصري يبرز في التدفق؟\\n• هل العنصر البصري يدعم الرسالة الرئيسية؟\\n\\n**التوصيات:**\\n• تأكد من صور عالية الدقة واحترافية\\n• استخدم ألوانًا تتوافق مع العلامة التجارية وتثير المشاعر المطلوبة\\n• ضمّن المنتج بشكل بارز وواضح\\n• اختبر تركيبات وتخطيطات بصرية مختلفة' :
  '**التقييم:** العناصر البصرية غير محددة\\n\\n**التوصيات:**\\n• أضف تقييم العناصر البصرية إلى عملية المراجعة\\n• ضمّن تقييم جودة الصورة/الفيديو\\n• قيم توافق العناصر البصرية مع إرشادات العلامة التجارية\\n• راقب التأثير البصري في بيئة التدفق'
}

### **2. النسخة/الرسالة ${elements.includes('copy') ? '✅' : '⚠️'}**
${elements.includes('copy') ? 
  '**التقييم:** تم تضمين عناصر النسخة في المراجعة\\n\\n**الأسئلة الرئيسية:**\\n• هل النسخة توضح عرض القيمة بوضوح؟\\n• هل تعالج نقاط ألم أو رغبات العملاء؟\\n• هل الرسالة مختصرة وسهلة الفهم؟\\n• هل تتضمن دعوة عمل واضحة؟\\n\\n**التوصيات:**\\n• ركز على الفوائد بدلاً من الميزات\\n• استخدم لغة تركز على العميل\\n• احتفظ بالرسائل قصيرة وقابلة للمسح\\n• ضمّن CTAs قوية وموجهة نحو الإجراء' :
  '**التقييم:** عناصر النسخة غير محددة\\n\\n**التوصيات:**\\n• أضف تقييم النسخة إلى عملية المراجعة\\n• قيم وضوح الرسالة والتأثير\\n• قيم فعالية CTA وبروزها\\n• راقب توافق النسخة مع الجمهور المستهدف'
}

### **3. دعوة العمل (CTA) ${elements.includes('cta') ? '✅' : '⚠️'}**
${elements.includes('cta') ? 
  '**التقييم:** تم تضمين عناصر CTA في المراجعة\\n\\n**الأسئلة الرئيسية:**\\n• هل CTA مرئي وواضح ومفهوم؟\\n• هل يستخدم لغة موجهة نحو الإجراء؟\\n• هل فائدة النقر واضحة؟\\n• هل يخلق إلحاحًا أو حافزًا؟\\n\\n**التوصيات:**\\n• استخدم كلمات إجراء واضحة ومباشرة (اشترِ الآن، ابدأ، تعلم المزيد)\\n• اجعل أزرار CTA بارزة بصريًا\\n• ضمّن عرض القيمة في CTA أو بالقرب منها\\n• اختبر مواضع CTA وصياغة مختلفة' :
  '**التقييم:** عناصر CTA غير محددة\\n\\n**التوصيات:**\\n• أضف تقييم CTA إلى عملية المراجعة\\n• قيم وضوح CTA وبروزه\\n• قيم توافق CTA مع أهداف الحملة\\n• راقب فعالية CTA في دفع الإجراء'
}

## 🎯 **فعالية الإبداع الإجمالية**

### **إطار التقييم**
قيم كل عنصر على مقياس من 1-10:

| العنصر | الدرجة (1-10) | الوزن | الدرجة المرجحة | الملاحظات |
|---------|--------------|--------|----------------|-------|
| **التأثير البصري** | [الدرجة] | 30% | [المحسوبة] | [ملاحظات التقييم] |
| **وضوح الرسالة** | [الدرجة] | 30% | [المحسوبة] | [ملاحظات التقييم] |
| **توافق العلامة** | [الدرجة] | 20% | [المحسوبة] | [ملاحظات التقييم] |
| **فعالية CTA** | [الدرجة] | 20% | [المحسوبة] | [ملاحظات التقييم] |
| **الدرجة الإجمالية** | | **100%** | **[الإجمالي]** | **[التقييم الإجمالي]** |

### **مؤشرات الأداء**
**ممتاز (8-10):** الإبداع فعال جدًا وجاهز للتوسع
**جيد (6-7):** الإبداع يعمل بشكل جيد مع تحسين طفح مطلوب
**متوسط (4-5):** الإبداع لديه إمكانات ولكن يحتاج تحسينًا كبيرًا
**ضعيف (1-3):** الإبداع يحتاج إعادة تصميم كاملة

## 🛠️ **قائمة التحسين**

### **عناصر الأولوية العالية**
- [ ] الجودة البصرية تلبي المعايير الاحترافية
- [ ] الرسالة واضحة ومقنعة
- [ ] CTA بارز وموجه نحو الإجراء
- [ ] الإبداع يتوافق مع إرشادات العلامة التجارية
- [ ] الإبداع يبرز في البيئة التنافسية

### **عناصر الأولوية المتوسطة**
- [ ] مخطط الألوان يثير المشاعر المطلوبة
- [ ] الطباعة قابلة للقراءة وعلى العلامة التجارية
- [ ] التخطيط يوجه العين إلى العناصر الرئيسية
- [ ] الإبداع يعمل عبر مواضع مختلفة
- [ ] الرسالة تتوافق مع الجمهور المستهدف

### **عناصر الأولوية المنخفضة**
- [ ] الإبداع يتضمن عناصر العلامة التجارية الدقيقة
- [ ] الحركة/الرسوم المتحركة سلسة وهادفة
- [ ] الإبداع لديه خصائص قابلة للمشاركة
- [ ] الإبداع يدعم إطار اختبار A/B
- [ ] توثيق الإبداع كامل

## 📊 **توصيات الاختبار**

### **أفكار اختبار A/B**
1. **اختبار بصري:** نفس الرسالة، تنفيذ بصري مختلف
2. **اختبار النسخة:** نفس البصري، نهج رسالة مختلف
3. **اختبار CTA:** نفس الإبداع، دعوة عمل مختلفة
4. **اختبار التخطيط:** نفس العناصر، ترتيب مختلف

### **مقاييس النجاح**
- **الأساسي:** رفع CTR بنسبة 20% أو أكثر
- **الثانوي:** تحسين معدل التحويل
- **الثالثوي:** مقاييس رفع العلامة والتذكر

## 🎯 **الخطوات التالية**
1. **أكمل المراجعة:** املأ إطار التقييم أعلاه
2. **حدد الفجوات:** لاحظ المجالات التي تحتاج تحسينًا
3. **أنشئ متغيرات:** طور نسخًا محسنة
4. **اختبر وتعلم:** أطلق اختبارات A/B وقس النتائج
5. **وسع الفائزين:** قم بتعميم الإبداعات الناجحة على نطاق واسع

---
*قالب مراجعة الإبداع بناءً على أفضل ممارسات الصناعة ومبادئ تحسين التحويل*`
  }

  const generatePerformancePrediction = () => {
    const adType = formData.adType
    const hookType = formData.hookType
    const audience = formData.audience
    const product = formData.product

    const getAdTypeScore = (type: string) => {
      const scores: any = {
        'video': { base: 85, potential: 95, reason: 'إعلانات الفيديو عادة ما لديها تفاعل أعلى وإمكانات سرد القصص' },
        'image': { base: 70, potential: 85, reason: 'إعلانات الصور بسيطة وواضحة ولكن محدودة في سرد القصص' },
        'carousel': { base: 75, potential: 90, reason: 'الإعلانات الدائرية تسمح بعرض منتجات متعددة' },
        'story': { base: 80, potential: 92, reason: 'إعلانات القصة لديها انتباه كامل للشاشة وتجربة غامرة' }
      }
      return scores[type] || scores.video
    }

    const getHookTypeScore = (type: string) => {
      const scores: any = {
        'shock': { base: 80, potential: 90, reason: 'جذوب الصدمة يجذب الانتباه الفوري ولكن قد ينفر بعض الجماهير' },
        'question': { base: 75, potential: 88, reason: 'الأسئلة تثير الفضول وهي آمنة بشكل عام' },
        'problem': { base: 78, potential: 87, reason: 'تحديد المشكلة يخلق صلة وحاجة' },
        'benefit': { base: 82, potential: 91, reason: 'جذوب الفائدة يوصل القيمة فورًا' },
        'story': { base: 85, potential: 93, reason: 'افتتاحيات القصة تخلق روابط عاطفية' },
        'curiosity': { base: 77, potential: 89, reason: 'فجوات الفضول تدفع التفاعل والإكمال' }
      }
      return scores[type] || scores.benefit
    }

    const adTypeScore = getAdTypeScore(adType)
    const hookTypeScore = getHookTypeScore(hookType)

    const calculateOverallScore = () => {
      const adTypeWeight = 0.4
      const hookTypeWeight = 0.6
      
      return Math.round((adTypeScore.base * adTypeWeight) + (hookTypeScore.base * hookTypeWeight))
    }

    const overallScore = calculateOverallScore()

    const getPerformanceLevel = (score: number) => {
      if (score >= 85) return { level: 'ممتاز', color: 'text-green-400', icon: '🏆', message: 'أداء استثنائي متوقع' }
      if (score >= 70) return { level: 'جيد', color: 'text-yellow-400', icon: '⭐', message: 'أداء قوي متوقع' }
      if (score >= 55) return { level: 'متوسط', color: 'text-orange-400', icon: '📊', message: 'أداء معتدل متوقع' }
      return { level: 'أقل من المتوسط', color: 'text-red-400', icon: '⚠️', message: 'تم تحديد مخاوف الأداء' }
    }

    const performance = getPerformanceLevel(overallScore)

    return `🔮 **التنبؤ بأداء الإبداع**

## 📊 **توقعات الأداء**

### **التنبؤ الإجمالي**
**درجة الأداء المتوقعة:** ${overallScore}/100
**مستوى الأداء:** ${performance.icon} ${performance.level}
**التقييم:** ${performance.message}

<div style="background: linear-gradient(90deg, #10b981 0%, #10b981 ${overallScore}%, #374151 ${overallScore}%, #374151 100%); height: 20px; border-radius: 10px; margin: 10px 0;"></div>

## 🎯 **تحليل العوامل**

### **1. تأثير نوع الإعلان**
**المحدد:** ${adTypes.find(a => a.value === adType)?.label || 'غير معروف'}
**الدرجة الأساسية:** ${adTypeScore.base}/100
**الدرجة المحتملة:** ${adTypeScore.potential}/100

**التحليل:** ${adTypeScore.reason}

**خصائص الأداء:**
- **إمكانات التفاعل:** ${adType === 'video' ? 'عالية - الفيديو يسمح بسرد القصص والاتصال العاطفي' : adType === 'image' ? 'متوسطة - بسيط وواضح لكن محدود العمق' : adType === 'carousel' ? 'عالية - المنتجات المتعددة تزيد التفاعل' : 'عالية - انتباه كامل للشاشة يدفع التركيز'}
- **تعقيد الإنتاج:** ${adType === 'video' ? 'عالي - يتطلب موارد وخبرة أكثر' : adType === 'image' ? 'منخفض - أسهل في الإنتاج والاختبار' : adType === 'carousel' ? 'متوسط - الصور المتعددة تتطلب تنسيقًا' : 'متوسط - التنسيق الرأسي يحتاج تحسينًا محددًا'}
- **ملاءمة المنصة:** ${adType === 'video' ? 'ممتاز - يعمل بشكل جيد عبر جميع المنصات الرئيسية' : adType === 'image' ? 'جيد - توافق عالمي' : adType === 'carousel' ? 'جيد جدًا - مثالي لعرض المنتجات' : 'ممتاز - مثالي للمنصات المحملة أولاً'}

### **2. تأثير نوع الجذب**
**المحدد:** ${hookTypes.find(h => h.value === hookType)?.label || 'غير معروف'}
**الدرجة الأساسية:** ${hookTypeScore.base}/100
**الدرجة المحتملة:** ${hookTypeScore.potential}/100

**التحليل:** ${hookTypeScore.reason}

**خصائص الأداء:**
- **جذب الانتباه:** ${hookType === 'shock' ? 'مرتفع جدًا - تأثير فوري لكن محفوف بالمخاطرة' : hookType === 'question' ? 'مرتفع - يثير الفضول بأمان' : hookType === 'problem' ? 'مرتفع - يخلق صلة وحاجة' : hookType === 'benefit' ? 'مرتفع - يوصل القيمة بوضوح' : hookType === 'story' ? 'مرتفع جدًا - اتصال عاطفي' : 'مرتفع - يدفع الإكمال'}
- **توافق الجمهور:** ${hookType === 'shock' ? 'متوسط - قد ينفر بعض الفئات الديموغرافية' : hookType === 'question' ? 'مرتفع - عالمي القابلية للارتباط' : hookType === 'problem' ? 'مرتفع - قوي للجماهير المستهدفة' : hookType === 'benefit' ? 'مرتفع جدًا - عرض قيمة واضح' : hookType === 'story' ? 'مرتفع جدًا - جاذبية عاطفية واسعة' : 'مرتفع - الفضول عالمي'}
- **سلامة العلامة:** ${hookType === 'shock' ? 'منخفضة - مخاطر أعلى للارتباط السلبي' : hookType === 'question' ? 'مرتفعة - آمن وإيجابي بشكل عام' : hookType === 'problem' ? 'متوسطة - تعتمد على إطار المشكلة' : hookType === 'benefit' ? 'مرتفعة جدًا - ارتباط إيجابي بالعلامة التجارية' : hookType === 'story' ? 'مرتفعة - عاطفي لكن آمن بشكل عام' : 'متوسطة - تعتمد على نهج الفضول'}

## 📈 **المقاييس المتوقعة**

بناءً على البيانات التاريخية ومعايير الصناعة، إليك نطاقات الأداء المتوقعة:

| المؤشر | محافظ | متوقع | متفائل | متوسط الصناعة |
|--------|-------------|----------|------------|------------------|
| **CTR (%)** | ${Math.max(0.3, overallScore * 0.015).toFixed(2)} | ${Math.max(0.5, overallScore * 0.025).toFixed(2)} | ${Math.max(0.8, overallScore * 0.035).toFixed(2)} | 1.0% |
| **معدل التحويل (%)** | ${Math.max(0.5, overallScore * 0.08).toFixed(1)} | ${Math.max(1.0, overallScore * 0.12).toFixed(1)} | ${Math.max(2.0, overallScore * 0.18).toFixed(1)} | 2.0% |
| **معدل الاحتفاظ (%)** | ${Math.max(40, overallScore * 0.6).toFixed(0)} | ${Math.max(55, overallScore * 0.75).toFixed(0)} | ${Math.max(70, overallScore * 0.9).toFixed(0)} | 60% |
| **CPM ($)** | ${Math.min(30, 50 - overallScore * 0.3).toFixed(2)} | ${Math.min(20, 35 - overallScore * 0.2).toFixed(2)} | ${Math.min(10, 25 - overallScore * 0.15).toFixed(2)} | $15.00 |

## 🎯 **احتمالية النجاح**

### **احتمال النجاح**
- **نجاح مرتفع (>80% درجة):** ${overallScore >= 80 ? '✅ محتمل جدًا' : overallScore >= 70 ? '⚠️ ممكن مع التحسين' : '❌ غير محتمل بدون تغييرات'}
- **نجاح معتدل (60-79% درجة):** ${overallScore >= 60 && overallScore < 80 ? '✅ محتمل' : overallScore >= 50 && overallScore < 60 ? '⚠️ ممكن بجهد' : '❌ صعب'}
- **نجاح منخفض (<60% درجة):** ${overallScore < 60 ? '⚠️ يتطلب تغييرات كبيرة' : '✅ غير محتمل أن يحتاج تغييرات رئيسية'}

### **عوامل النجاح الرئيسية**
${overallScore >= 80 ? 
  '🎉 **موقف قوي للنجاح!**\\n• مزيج نوع الإعلان والجذب ممتاز\\n• إمكانات تفاعل وتحويل عالية\\n• ميزة تنافسية في مقاييس الأداء\\n• جاهز للتوسع بثقة' :
  overallScore >= 60 ? 
  '⚠️ **أساس جيد مع تحسين مطلوب**\\n• نهج إبداعي صلب\\n• بعض العناصر تحتاج إلى صقل\\n• إمكانية أداء جيد مع تعديلات\\n• يوصى بالاختبار قبل التوسع الكامل' :
  '❌ **تحسينات كبيرة مطلوبة**\\n• المزيج الحالي تحت الأداء\\n• عناصر متعددة تحتاج إلى إعادة تصميم\\n• مخاطر عالية للأداء الضعيف\\n• يوصى بإعادة تصميم الإبداع قبل الإطلاق'
}

## 🛠️ **توصيات التحسين**

### **تأثير عالٍ (${overallScore >= 70 ? 'اختياري' : 'أساسي'})**
${overallScore >= 70 ? 
  '• ضبط تنفيذ الجذب لأقصى تأثير\\n• اختبر العروض البصرية المختلفة\\n• حسّن موضع CTA ووضوحه\\n• فكر في تعديلات رسائلية طفيفة' :
  '• أعد النظر في نوع الجذب - اختبر البدائل\\n• قيم ملاءمة نوع الإعلان للأهداف\\n• أعد تصميم العناصر البصرية لتأثير أفضل\\n• أعد التفكير في نهج الرسالة بالكامل'
}

### **تأثير متوسط (${overallScore >= 70 ? 'موصى به' : 'حرج'})**
• اختبر A/B متغيرات إبداعية مختلفة
• حسّن لمتطلبات المنصة المحددة
• حسّن جودة الإنتاج واللمسة النهائية
• عزز اتساق العلامة التجارية والتعرف

### **استراتيجية الاختبار**
1. **المرحلة 1:** اختبر 3-4 متغيرات إبداعية بجذوب مختلفة
2. **المرحلة 2:** حسّن المتغير الفائز بناءً على بيانات الأداء
3. **المرحلة 3:** وسع الإبداع الناجح إلى جماهير أوسع
4. **المرحلة 4:** راقب بشكل مستمر وكرر بناءً على النتائج

## 📊 **تقييم المخاطر**

### **عوامل المخاطر المنخفضة**
- **ملاءمة نوع الإعلان:** ${adTypeScore.base >= 75 ? '✅ مناسب جيدًا لأهداف الحملة' : '⚠️ قد لا يكون الخيار الأمثل'}
- **فعالية نوع الجذب:** ${hookTypeScore.base >= 75 ? '✅ اختيار جذب قوي' : '⚠️ الجذب قد يكون دون الأداء'}

### **عوامل المخاطر المتوسطة**
- **توافق الجمهور:** ${audience ? '✅ الجمهور المستهدف محدد' : '⚠️ الجمهور غير محدد بوضوح'}
- **ملاءمة المنتج:** ${product ? '✅ المنتج محدد بوضوح' : '⚠️ تعريف المنتج غير واضح'}

### **عوامل المخاطر العالية**
- **تنفيذ الإبداع:** جودة الإبداع النهائي لم تحدد بعد
- **ظروف السوق:** العوامل الخارجية قد تؤثر على الأداء
- **المشهد التنافسي:** نشاط المنافسين قد يؤثر على النتائج

## 🎯 **التوصية النهائية**

**التقييم الإجمالي:** ${performance.level} أداء متوقع

**قرار الإطلاق:** ${overallScore >= 70 ? '✅ **تقدم** - الإبداع يظهر إمكانات قوية' : overallScore >= 55 ? '⚠️ **تقدم بحذر** - الإبداع يحتاج تحسينًا أولاً' : '❌ **توقف** - الإبداع يحتاج إعادة تصميم كبيرة'}

**الخطوات الفورية:**
${overallScore >= 70 ? 
  '1. أنهِ الإنتاج الإبداعي بالاتجاه الحالي\\n2. جهز للإطلاق مع إعداد المراقبة\\n3. خطط للتوسع بناءً على الأداء الأولي\\n4. وثق التعلمات لحملات مستقبلية' :
  overallScore >= 55 ? 
  '1. نفذ توصيات التحسين الموصى بها\\n2. اختبر متغيرات إبداعية متعددة\\n3. تحقق من الأداء باختبار ميزانية صغيرة\\n4. وسع فقط إذا كان الأداء يلبي العتبات' :
  '1. أعد تصميم العناصر الإبداعية\\n2. أعد النظر في مزيج نوع الإعلان والجذب\\n3. اختبر نهجًا إبداعيًا全新 بالكامل\\n4. أطلق فقط عندما تتحسن مؤشرات الأداء'
}

---
*التنبؤ بالأداء بناءً على البيانات التاريخية ومعايير الصناعة وممارسات الإبداع الأفضل*`
  }

  const generateAnalysis = async () => {
    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tool: 'creative-optimization',
          formData,
          language: 'ar',
          context: `Active tab: ${activeTab}, Tool: ${optimizationTools.find(t => t.id === activeTab)?.title}`
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate analysis')
      }

      const result = await response.json()
      
      setGeneratedAnalysis(result.content)
      setMetrics(result.metrics || [])
      setRecommendations(result.recommendations || [])
      setScore(result.score || 85)
      
    } catch (error) {
      console.error('AI generation error:', error)
      // Fallback to original generation
      let analysis = ''
      
      switch (activeTab) {
        case 'hook-rate':
          analysis = generateHookRateAnalysis()
          break
        case 'creative-review':
          analysis = generateCreativeReview()
          break
        case 'performance-prediction':
          analysis = generatePerformancePrediction()
          break
        default:
          analysis = generateHookRateAnalysis()
      }
      
      setGeneratedAnalysis(analysis)
    } finally {
      setIsGenerating(false)
    }
  }

  const resetForm = () => {
    setFormData({
      adType: 'video',
      hookType: 'shock',
      retentionRate: '',
      ctr: '',
      audience: '',
      product: '',
      tone: 'professional',
      cta: '',
      creativeElements: ''
    })
    setGeneratedAnalysis('')
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedAnalysis)
      alert('تم النسخ إلى الحافظة!')
    } catch (err) {
      console.error('Failed to copy: ', err)
      alert('فشل النسخ، يرجى المحاولة مرة أخرى.')
    }
  }

  const downloadAsText = () => {
    const blob = new Blob([generatedAnalysis], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeTab}-analysis.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <RTLWrapper className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <Navigation currentPath="/creative-optimization-tool-ar" />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <motion.div 
                className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Palette className="w-4 h-4" />
                <span className="text-sm font-medium">مجموعة تحسين الإبداع</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  أداة تحسين الإبداع
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                قيس معدلات الجذب، راجع العناصر الإبداعية، وتنبأ بالأداء. 
                حسّن إبداعاتك بناءً على البيانات، ليس فقط المشاعر.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  استكشف الأدوات
                </button>
                <button 
                  onClick={() => document.getElementById('optimizer')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  ابدأ التحسين
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">أدوات تحسين الإبداع</h2>
              <p className="text-xl text-gray-400">اختر الأداة المناسبة لاحتياجاتك الإبداعية</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {optimizationTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveTab(tool.id)}
                  className={`bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border cursor-pointer transition-all duration-300 hover:scale-105 ${
                    activeTab === tool.id 
                      ? 'border-purple-500/50 shadow-lg shadow-purple-500/20' 
                      : 'border-white/10 hover:border-purple-500/30'
                  }`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <tool.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{tool.title}</h3>
                  <p className="text-gray-300 mb-4">{tool.description}</p>
                  <div className="flex items-center gap-2 text-purple-400">
                    <ArrowRight className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {activeTab === tool.id ? 'محدد' : 'اختر الأداة'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Optimizer Section */}
        <section id="optimizer" className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">حسّن إبداعك</h2>
              <p className="text-xl text-gray-400">أدخل بياناتك الإبداعية للتحليل الشامل</p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Input Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                      <Palette className="w-8 h-8 text-purple-400" />
                      بيانات الإبداع
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          نوع الإعلان
                        </label>
                        <select
                          value={formData.adType}
                          onChange={(e) => handleInputChange('adType', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          {adTypes.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          نوع الجذب
                        </label>
                        <select
                          value={formData.hookType}
                          onChange={(e) => handleInputChange('hookType', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          {hookTypes.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          معدل الاحتفاظ 3 ثوانٍ (%)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.retentionRate}
                          onChange={(e) => handleInputChange('retentionRate', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="65.5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          CTR (%)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.ctr}
                          onChange={(e) => handleInputChange('ctr', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="1.2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          الجمهور المستهدف
                        </label>
                        <input
                          type="text"
                          value={formData.audience}
                          onChange={(e) => handleInputChange('audience', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="المحترفون الشباب، 25-35"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          المنتج/الخدمة
                        </label>
                        <input
                          type="text"
                          value={formData.product}
                          onChange={(e) => handleInputChange('product', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="اشتراك تطبيق اللياقة"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          العناصر الإبداعية
                        </label>
                        <input
                          type="text"
                          value={formData.creativeElements}
                          onChange={(e) => handleInputChange('creativeElements', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="بصري، نسخة، CTA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          النبرة
                        </label>
                        <select
                          value={formData.tone}
                          onChange={(e) => handleInputChange('tone', e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="professional">احترافية</option>
                          <option value="friendly">ودية</option>
                          <option value="urgent">عاجلة</option>
                          <option value="emotional">عاطفية</option>
                          <option value="humorous">مرحة</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={generateAnalysis}
                        disabled={isGenerating}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                            جاري التحليل...
                          </>
                        ) : (
                          <>
                            <Zap className="w-5 h-5 mr-2" />
                            إنشاء التحليل
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={resetForm}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        إعادة تعيين
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Output */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <ToolOutput
                  title={optimizationTools.find(t => t.id === activeTab)?.title || 'تحسين الإبداع'}
                  content={generatedAnalysis}
                  metrics={metrics}
                  recommendations={recommendations}
                  score={score}
                  isLoading={isGenerating}
                  onCopy={copyToClipboard}
                  onDownload={downloadAsText}
                  language="ar"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">لماذا تحسين الإبداع؟</h2>
              <p className="text-xl text-gray-400">قرارات إبداعية قائمة على البيانات لأداء أفضل</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-2xl border border-purple-500/20 backdrop-blur-sm"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">تحليل معدل الجذب</h3>
                <p className="text-gray-300">
                  قس قدرة إعلانك على جذب الانتباه في الثواني الحرجة الأولى. اختبر أنواع الجذب المختلفة وحسّن لأقصى احتفاظ.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-8 rounded-2xl border border-blue-500/20 backdrop-blur-sm"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">مراجعة الإبداع</h3>
                <p className="text-gray-300">
                  تقييم شامل للعناصر البصرية والنسخة وCTAs. احصل على تغذية راجدة منظمة وتوصيات قابلة للتنفيذ للتحسين.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-8 rounded-2xl border border-green-500/20 backdrop-blur-sm"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">التنبؤ بالأداء</h3>
                <p className="text-gray-300">
                  تنبأ بأداء الإبداع قبل الإطلاق. احصل على احتمالية النجاح وتقييم المخاطر وتوصيات الإطلاق المدعومة بالبيانات.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </RTLWrapper>
  )
}