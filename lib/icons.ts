import { Brain, Cloud, Shield, Sparkles, Database, Code, Cpu, Network, TrendingUp, Lightbulb, BookOpen, ArrowRight, Calendar, Clock, Briefcase, MapPin, Users, Heart, Zap, Trophy, Activity, Globe, BarChart3 } from "lucide-react"

export const iconMap: Record<string, any> = {
    Brain,
    Cloud,
    Shield,
    Sparkles,
    Database,
    Code,
    Cpu,
    Network,
    TrendingUp,
    Lightbulb,
    BookOpen,
    ArrowRight,
    Calendar,
    Clock,
    Briefcase,
    MapPin,
    Users,
    Heart,
    Zap,
    Trophy,
    Activity,
    Globe,
    BarChart3
}

export function getIcon(name: string) {
    return iconMap[name] || Sparkles
}
