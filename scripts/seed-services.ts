/**
 * Seed script for Global Technova Services
 * Posts 13 services to the API endpoint
 * Run with: ts-node scripts/seed-services.ts
 */

interface ServiceFeature {
  feature_en: string;
  feature_ar: string;
}

interface Service {
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  shortDescription_en: string;
  shortDescription_ar: string;
  icon: string;
  color: string;
  features: ServiceFeature[];
  images: string[];
  slug: string;
}

const services: Service[] = [
  {
    name_en: "Digital Transformation",
    name_ar: "تحول رقمي",
    description_en: "Comprehensive digital transformation services to modernize your business operations and leverage cutting-edge technologies for sustainable growth and competitive advantage.",
    description_ar: "خدمات شاملة للتحول الرقمي لتحديث عمليات عملك والاستفادة من أحدث التقنيات لتحقيق نمو مستدام وميزة تنافسية.",
    shortDescription_en: "Modernize your business with cutting-edge technology",
    shortDescription_ar: "حدد أعمالك بأحدث التقنيات",
    icon: "rocket",
    color: "#3B82F6",
    features: [
      { feature_en: "Cloud Migration", feature_ar: "الانتقال إلى السحابة" },
      { feature_en: "Process Automation", feature_ar: "أتمتة العمليات" },
      { feature_en: "Data Analytics", feature_ar: "تحليل البيانات" },
      { feature_en: "AI Integration", feature_ar: "تكامل الذكاء الاصطناعي" },
    ],
    images: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    slug: "digital-transformation",
  },
  {
    name_en: "Cloud Solutions",
    name_ar: "حلول السحابة",
    description_en: "Scalable cloud infrastructure and migration services designed to optimize your IT resources, reduce costs, and enhance operational flexibility with enterprise-grade security.",
    description_ar: "بنية تحتية قابلة للتوسع وخدمات انتقال إلى السحابة مصممة لتحسين موارد تكنولوجيا المعلومات الخاصة بك، وتقليل التكاليف، وتعزيز المرونة التشغيلية مع أمنية على مستوى المؤسسة.",
    shortDescription_en: "Scalable cloud infrastructure for modern businesses",
    shortDescription_ar: "بنية تحتية سحابية قابلة للتوسع للشركات الحديثة",
    icon: "cloud",
    color: "#8B5CF6",
    features: [
      { feature_en: "AWS & Azure", feature_ar: "AWS و Azure" },
      { feature_en: "Hybrid Cloud", feature_ar: "سحابة هجينة" },
      { feature_en: "DevOps Pipeline", feature_ar: "أنبوب DevOps" },
      { feature_en: "24/7 Monitoring", feature_ar: "مراقبة 24/7" },
    ],
    images: [
      "https://images.unsplash.com/photo-1544027993-37c5e8542c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    slug: "cloud-solutions",
  },
  {
    name_en: "Cyber Security",
    name_ar: "الأمن السيبراني",
    description_en: "Enterprise-grade security solutions protecting your digital assets, ensuring compliance with international standards, and providing proactive threat detection and incident response.",
    description_ar: "حلول أمان على مستوى المؤسسة تحمي أصولك الرقمية، وضمان الامتثال للمعايير الدولية، وتوفير اكتشاف استباقي للتهديدات والاستجابة للحوادث.",
    shortDescription_en: "Enterprise security and threat protection",
    shortDescription_ar: "أمن المؤسسة وحماية من التهديدات",
    icon: "shield",
    color: "#EF4444",
    features: [
      { feature_en: "Threat Detection", feature_ar: "كشف التهديدات" },
      { feature_en: "Penetration Testing", feature_ar: "اختبار الاختراق" },
      { feature_en: "Compliance Audit", feature_ar: "تدقيق الامتثال" },
      { feature_en: "Security Training", feature_ar: "تدريب أمني" },
    ],
    images: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    slug: "cyber-security",
  },
  {
    name_en: "Enterprise Software",
    name_ar: "برمجيات المؤسسات",
    description_en: "Custom enterprise software development delivering robust, scalable applications tailored to your business processes and designed for long-term growth and adaptability.",
    description_ar: "تطوير برمجيات مؤسسية مخصصة تقدم تطبيقات قوية وقابلة للتوسع مصممة خصيصاً لعمليات عملك وللنمو والتكيف على المدى الطويل.",
    shortDescription_en: "Custom enterprise applications for scale",
    shortDescription_ar: "تطبيقات مؤسسية مخصصة للتوسع",
    icon: "code",
    color: "#10B981",
    features: [
      { feature_en: "CRM Systems", feature_ar: "أنظمة إدارة العلاقات" },
      { feature_en: "ERP Solutions", feature_ar: "حلول تخطيط الموارد" },
      { feature_en: "Workflow Automation", feature_ar: "أتمتة سير العمل" },
      { feature_en: "API Integration", feature_ar: "تكامل واجهة البرمجة" },
    ],
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    slug: "enterprise-software",
  },
  {
    name_en: "Data Analytics",
    name_ar: "تحليل البيانات",
    description_en: "Advanced analytics and business intelligence solutions transforming raw data into actionable insights, driving strategic decision-making and operational excellence.",
    description_ar: "تحليلات متقدمة وحلول ذكاء الأعمال التي تحول البيانات الخام إلى رؤى قابلة للتنفيذ، وتدفع صنع القرار الاستراتيجي والتميز التشغيلي.",
    shortDescription_en: "Transform data into actionable insights",
    shortDescription_ar: "حول البيانات إلى رؤى قابلة للتنفيذ",
    icon: "bar chart",
    color: "#F59E0B",
    features: [
      { feature_en: "Predictive Analytics", feature_ar: "التحليلات التنبؤية" },
      { feature_en: "Real-time Dashboards", feature_ar: "لوحات معلومات في الوقت الفعلي" },
      { feature_en: "Data Visualization", feature_ar: "تصور البيانات" },
      { feature_en: "Big Data Processing", feature_ar: "معالجة البيانات الكبيرة" },
    ],
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    slug: "data-analytics",
  },
  {
    name_en: "AI & Machine Learning",
    name_ar: "الذكاء الاصطناعي وتعلم الآلة",
    description_en: "Cutting-edge AI and machine learning solutions that automate complex processes, enhance customer experiences, and unlock new business opportunities through intelligent automation.",
    description_ar: "حلول ذكاء اصطناعي وتعلم آلة متطورة تُبَسّط العمليات المعقدة، وتعزز تجارب العملاء، وتفتح فرص عمل جديدة من خلال أتمتة ذكية.",
    shortDescription_en: "Intelligent automation for next-gen solutions",
    shortDescription_ar: "أتمتة ذكية لحلول الجيل القادم",
    icon: "brain",
    color: "#8B5CF6",
    features: [
      { feature_en: "NLP Solutions", feature_ar: "حلول معالجة اللغة" },
      { feature_en: "Computer Vision", feature_ar: "الرؤية الحاسوبية" },
      { feature_en: "Recommendation Engines", feature_ar: "محركات التوصية" },
      { feature_en: "Chatbot Development", feature_ar: "تطوير روبوتات الدردشة" },
    ],
    images: [
      "https://images.unsplash.com/photo-1677442135722-5f1d0ecc1b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    slug: "ai-machine-learning",
  },
  {
    name_en: "Mobile Applications",
    name_ar: "تطبيقات الموبايل",
    description_en: "Native and cross-platform mobile app development delivering seamless user experiences across iOS and Android with performance-optimized, feature-rich applications.",
    description_ar: "تطوير تطبيقات محمولة أصلية ومتقاطعة المنصات تقدم تجارب مستخدم سلسة عبر iOS و Android مع تطبيقات غنية بالميزات ومُحسّنة للأداء.",
    shortDescription_en: "Native and cross-platform mobile apps",
    shortDescription_ar: "تطبيقات محمولة أصلية ومتقاطعة المنصات",
    icon: "mobile",
    color: "#10B981",
    features: [
      { feature_en: "iOS Development", feature_ar: "تطوير آي أو إس" },
      { feature_en: "Android Development", feature_ar: "تطوير أندرويد" },
      { feature_en: "React Native", feature_ar: "رياكت نيتيف" },
      { feature_en: "App Store Deployment", feature_ar: "نشر متجر التطبيقات" },
    ],
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    slug: "mobile-applications",
  },
  {
    name_en: "Web Development",
    name_ar: "تطوير الويب",
    description_en: "Modern web development creating responsive, high-performance websites and web applications using the latest technologies and frameworks for exceptional user experiences.",
    description_ar: "تطوير ويب حديث يخلق مواقع ويب وتطبيقات ويب عالية الأداء والاستجابة باستخدام أحدث التقنيات والأطر لتجارب مستخدم استثنائية.",
    shortDescription_en: "Modern responsive web development",
    shortDescription_ar: "تطوير ويب حديث ومتجاوب",
    icon: "globe",
    color: "#3B82F6",
    features: [
      { feature_en: "React & Vue", feature_ar: "رياكت وفيو" },
      { feature_en: "Progressive Web Apps", feature_ar: "تطبيقات ويب تدريجية" },
      { feature_en: "E-commerce Solutions", feature_ar: "حلول التجارة الإلكترونية" },
      { feature_en: "Performance Optimization", feature_ar: "تحسين الأداء" },
    ],
    images: [
      "https://images.unsplash.com/photo-1555066932-43868a4af1d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    slug: "web-development",
  },
  {
    name_en: "UI/UX Design",
    name_ar: "تصميم واجهة المستخدم",
    description_en: "User-centered design approach creating intuitive, engaging interfaces that enhance user satisfaction and drive conversion through research-driven design methodologies.",
    description_ar: "نهج تصميم مركز على المستخدم يخلق واجهات بديهية وجذابة تعزز رضا المستخدم وتدفع التحويل من خلال منهجيات تصميم مدعومة بالبحث.",
    shortDescription_en: "User-centered design for engaging experiences",
    shortDescription_ar: "تصميم مركز على المستخدم لتجارب جذابة",
    icon: "palette",
    color: "#F59E0B",
    features: [
      { feature_en: "User Research", feature_ar: "بحث المستخدمين" },
      { feature_en: "Wireframing", feature_ar: "إطار سلكي" },
      { feature_en: "Prototyping", feature_ar: "نمذجة أولية" },
      { feature_en: "Usability Testing", feature_ar: "اختبار قابلية الاستخدام" },
    ],
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    slug: "ui-ux-design",
  },
  {
    name_en: "IT Consulting",
    name_ar: "الاستشارات التقنية",
    description_en: "Strategic technology consulting providing expert guidance on digital initiatives, technology stack selection, and implementation roadmaps aligned with business objectives.",
    description_ar: "استشارات تكنولوجية استراتيجية تقدم إرشادات خبيرة حول المبادرات الرقمية، واختيار مجموعة التقنيات، ومسارات التنفيذ المتوافقة مع الأهداف التجارية.",
    shortDescription_en: "Strategic technology guidance and planning",
    shortDescription_ar: "توجيه وتخطيط تكنولوجي استراتيجي",
    icon: "briefcase",
    color: "#EF4444",
    features: [
      { feature_en: "Technology Assessment", feature_ar: "تقييم التكنولوجيا" },
      { feature_en: "Digital Strategy", feature_ar: "استراتيجية رقمية" },
      { feature_en: "Process Optimization", feature_ar: "تحسين العمليات" },
      { feature_en: "Change Management", feature_ar: "إدارة التغيير" },
    ],
    images: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    slug: "it-consulting",
  },
  {
    name_en: "DevOps Services",
    name_ar: "خدمات DevOps",
    description_en: "End-to-end DevOps implementation streamlining development workflows, enabling continuous integration and deployment with automated testing and monitoring.",
    description_ar: "تنفيذ شامل لـ DevOps يُبَسّط سير عمل التطوير، ويتيح التكامل والنشر المستمرين مع اختبار ومراقبة آلية.",
    shortDescription_en: "Streamlined development and deployment automation",
    shortDescription_ar: "أتمتة مبسطة للتطوير والنشر",
    icon: "settings",
    color: "#10B981",
    features: [
      { feature_en: "CI/CD Pipeline", feature_ar: "أنبوب CI/CD" },
      { feature_en: "Container Orchestration", feature_ar: "أوركسترا الحاويات" },
      { feature_en: "Automated Testing", feature_ar: "اختبار آلي" },
      { feature_en: "Infrastructure as Code", feature_ar: "البنية التحتية ككود" },
    ],
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    slug: "devops-services",
  },
  {
    name_en: "Blockchain Solutions",
    name_ar: "حلول البلوك تشين",
    description_en: "Innovative blockchain development creating secure, transparent decentralized applications and smart contracts for various industries including finance and supply chain.",
    description_ar: "تطوير بلوك تشين مبتكر يخلق تطبيقات لامركزية آمنة وشفافة وعقود ذكية لقطاعات مختلفة تشمل المالية وسلسلة التوريد.",
    shortDescription_en: "Secure decentralized applications and smart contracts",
    shortDescription_ar: "تطبيقات لامركزية وعقود ذكية آمنة",
    icon: "cube",
    color: "#8B5CF6",
    features: [
      { feature_en: "Smart Contracts", feature_ar: "العقود الذكية" },
      { feature_en: "DApp Development", feature_ar: "تطوير تطبيقات لامركزية" },
      { feature_en: "Token Creation", feature_ar: "إنشاء الرموز" },
      { feature_en: "Blockchain Integration", feature_ar: "تكامل البلوك تشين" },
    ],
    images: [
      "https://images.unsplash.com/photo-1631740795543-7b24c4b2d665?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    slug: "blockchain-solutions",
  },
  {
    name_en: "IoT Solutions",
    name_ar: "حلول إنترنت الأشياء",
    description_en: "Comprehensive IoT platform development connecting devices and sensors to create intelligent ecosystems with real-time monitoring and automated control capabilities.",
    description_ar: "تطوير منصة إنترنت أشياء شاملة تربط الأجهزة والمستشعرات لإنشاء أنظمة بيئية ذكية بمراقبة في الوقت الفعلي وقدرات تحكم آلية.",
    shortDescription_en: "Intelligent device connectivity and monitoring",
    shortDescription_ar: "اتصال ومراقبة أجهزة ذكية",
    icon: "smartphone",
    color: "#3B82F6",
    features: [
      { feature_en: "Device Management", feature_ar: "إدارة الأجهزة" },
      { feature_en: "Real-time Monitoring", feature_ar: "مراقبة في الوقت الفعلي" },
      { feature_en: "Sensor Integration", feature_ar: "تكامل المستشعرات" },
      { feature_en: "Edge Computing", feature_ar: "الحوسبة الحافة" },
    ],
    images: [
      "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    slug: "iot-solutions",
  },
];

async function seedServices() {
  console.log(`Starting seed of ${services.length} services...\n`);

  const results = {
    success: [] as string[],
    failed: [] as { slug: string; error: string }[],
  };

  for (const service of services) {
    try {
      console.log(`Posting service: ${service.name_en} (${service.slug})...`);

      const response = await fetch(
        "https://api.globaltechnova.com/api/v1/services/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(service),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(\`HTTP \${response.status}: \${errorText}\`);
      }

      const data = await response.json();
      results.success.push(service.slug);
      console.log(\`  ✅ Success: \${service.name_en}\`);
      console.log(\`   Response: \${JSON.stringify(data).substring(0, 100)}...\n\`);
    } catch (error) {
      results.failed.push({
        slug: service.slug,
        error: error instanceof Error ? error.message : String(error),
      });
      console.log(\`  ❌ Failed: \${service.name_en}\`);
      console.log(\`   Error: \${error instanceof Error ? error.message : String(error)}\n\`);
    }
  }

  console.log("========================================");
  console.log("Seeding Complete!");
  console.log("========================================");
  console.log(\`Total services: \${services.length}\`);
  console.log(\`Successful: \${results.success.length}\`);
  console.log(\`Failed: \${results.failed.length}\`);

  if (results.failed.length > 0) {
    console.log("\nFailed services:");
    results.failed.forEach((f) => {
      console.log(\`  - \${f.slug}: \${f.error}\`);
    });
  }

  return results;
}

// Run the seed function
seedServices().catch((error) => {
  console.error("Fatal error during seeding:", error);
  process.exit(1);
});
