"use client"

import type React from "react"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

import { Mail, Phone, MapPin, Calendar, CheckCircle, AlertCircle, Loader2, ChevronDown, X, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { WorldMap } from "@/components/world-map"
import { contactAPI } from "@/lib/api-service"

// Technova Services organized by department
const serviceCategories = [
  {
    department: "Innovation & Technical Solutions",
    services: [
      "AI Solutions & Smart Systems Development",
      "Web & Application Development",
      "Technical Training & Capacity Building",
      "Systems Integration",
      "Advanced AI Consulting",
    ]
  },
  {
    department: "Big Data & Analytics",
    services: [
      "Data Management & Analytics",
      "Predictive Modelling & Business Intelligence",
    ]
  },
  {
    department: "Creative & Digital Production",
    services: [
      "AI-Driven Video & Image Production",
      "Virtual Avatars & Digital Twin Development",
      "Interactive Experiences & Deepfake Solutions",
    ]
  },
  {
    department: "AI Audio Technologies",
    services: [
      "Text-to-Speech & Voice Cloning",
      "Speech-to-Speech Processing",
      "AI Music & Audio Generation",
    ]
  },
]

// Multi-select services component
function ServicesMultiSelect({
  selectedServices,
  onServicesChange,
  error
}: {
  selectedServices: string[],
  onServicesChange: (services: string[]) => void,
  error?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      onServicesChange(selectedServices.filter(s => s !== service))
    } else {
      onServicesChange([...selectedServices, service])
    }
  }

  const removeService = (service: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onServicesChange(selectedServices.filter(s => s !== service))
  }

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    onServicesChange([])
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full min-h-[44px] px-3 py-2 rounded-md border cursor-pointer transition-all duration-200 
          ${error ? 'border-red-500 focus-visible:ring-red-500' : 'border-input'} 
          bg-background hover:bg-muted/50 flex items-center justify-between gap-2`}
      >
        <div className="flex-1 flex flex-wrap gap-1.5">
          {selectedServices.length === 0 ? (
            <span className="text-muted-foreground text-sm">Select services you're interested in...</span>
          ) : (
            selectedServices.slice(0, 3).map((service) => (
              <span
                key={service}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
              >
                {service.length > 25 ? service.substring(0, 25) + '...' : service}
                <button
                  onClick={(e) => removeService(service, e)}
                  className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                >
                  <X size={12} />
                </button>
              </span>
            ))
          )}
          {selectedServices.length > 3 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
              +{selectedServices.length - 3} more
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {selectedServices.length > 0 && (
            <button
              onClick={clearAll}
              className="p-1 hover:bg-muted rounded transition-colors"
              title="Clear all"
            >
              <X size={14} className="text-muted-foreground" />
            </button>
          )}
          <ChevronDown
            size={16}
            className={`text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 py-2 bg-popover border border-border rounded-lg shadow-xl max-h-[400px] overflow-y-auto"
          >
            {serviceCategories.map((category, idx) => (
              <div key={category.department} className={idx > 0 ? 'mt-2 pt-2 border-t border-border/50' : ''}>
                {/* Department Header */}
                <div className="px-3 py-2 sticky top-0 bg-popover/95 backdrop-blur-sm">
                  <h4 className="text-xs font-semibold text-accent uppercase tracking-wider">
                    {category.department}
                  </h4>
                </div>
                {/* Services */}
                {category.services.map((service) => {
                  const isSelected = selectedServices.includes(service)
                  return (
                    <div
                      key={service}
                      onClick={() => toggleService(service)}
                      className={`px-3 py-2.5 cursor-pointer transition-all duration-150 flex items-center gap-3 mx-1 rounded-md
                        ${isSelected
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground hover:bg-muted'
                        }`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                        ${isSelected
                          ? 'bg-primary border-primary'
                          : 'border-muted-foreground/30'
                        }`}
                      >
                        {isSelected && <Check size={12} className="text-primary-foreground" />}
                      </div>
                      <span className="text-sm">{service}</span>
                    </div>
                  )
                })}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Services Summary (shown below when dropdown is closed) */}
      {!isOpen && selectedServices.length > 3 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {selectedServices.slice(3).map((service) => (
            <span
              key={service}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground"
            >
              {service.length > 30 ? service.substring(0, 30) + '...' : service}
              <button
                onClick={(e) => removeService(service, e)}
                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ContactPage() {
  const t = useTranslations('contactPage')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const formSchema = z.object({
    name: z.string().min(2, { message: t('validation.nameRequired') }),
    email: z.string().email({ message: t('validation.emailInvalid') }),
    phone: z.string().min(10, { message: t('validation.phoneMin') }),
    services: z.array(z.string()).min(1, { message: t('validation.serviceRequired') }),
    message: z.string().min(10, { message: t('validation.messageMin') }),
    appointmentDate: z.string().optional(),
    appointmentTime: z.string().optional(),
  })

  type ContactFormValues = z.infer<typeof formSchema>

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      services: [],
      message: "",
    },
  })

  // Sync selectedServices with form state
  useEffect(() => {
    form.setValue('services', selectedServices, { shouldValidate: selectedServices.length > 0 })
  }, [selectedServices, form])

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true)
    try {
      // Call the backend API with services array
      const response = await contactAPI.send({
        name: data.name,
        email: data.email,
        phone: data.phone,
        services: data.services,
        message: data.message,
      })

      if (response.success) {
        setIsSuccess(true)
        toast.success(t('form.success'))
        form.reset()
        setSelectedServices([])
      } else {
        toast.error(response.message || t('form.error'))
      }
    } catch (error: any) {
      console.error('Contact form error:', error)
      toast.error(error.message || t('form.error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-40 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-block mb-6">
              <span className="px-4 py-2 rounded-full glass-panel border border-border text-sm font-medium text-accent">
                {t('hero.badge')}
              </span>
            </div>
            <h1 className="font-heading text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <div className="h-1 w-32 mx-auto my-6 bg-gradient-to-r from-primary to-accent rounded-full" />
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('hero.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="glass-panel p-8 rounded-3xl border border-border h-full">
                <h2 className="font-heading text-3xl font-bold text-foreground mb-8">{t('info.address')}</h2>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2">{t('info.address')}</h3>
                      <p className="text-muted-foreground">
                        Abu Dhabi UAE <br />
                        <br />

                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2">{t('info.phone')}</h3>
                      <p className="text-muted-foreground">
                        +971502717411<br />

                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2">{t('info.email')}</h3>
                      <p className="text-muted-foreground">

                        Info@globaltechnova.com

                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-2">{t('info.officeHours')}</h3>
                      <p className="text-muted-foreground">
                        Mon - Fri: 9:00 AM - 6:00 PM<br />
                        Sat - Sun: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="glass-panel p-8 lg:p-10 rounded-3xl border border-border relative overflow-hidden">
                {isSuccess ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/95 backdrop-blur-sm z-20 text-center p-8">
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-6">
                      <CheckCircle size={40} />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-2">{t('form.success')}</h3>
                    <p className="text-muted-foreground mb-8">
                      We'll get back to you as soon as possible.
                    </p>
                    <Button onClick={() => setIsSuccess(false)} variant="outline">
                      Send another message
                    </Button>
                  </div>
                ) : null}

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        {t('form.name')}
                      </label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        {...form.register("name")}
                        className={form.formState.errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                      />
                      {form.formState.errors.name && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle size={12} /> {form.formState.errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        {t('form.email')}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        {...form.register("email")}
                        className={form.formState.errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                      />
                      {form.formState.errors.email && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle size={12} /> {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>


                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">
                      {t('form.phone')}
                    </label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 000-0000"
                      {...form.register("phone")}
                      className={form.formState.errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
                    />
                    {form.formState.errors.phone && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle size={12} /> {form.formState.errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {t('form.service')} <span className="text-muted-foreground text-xs">(Select multiple)</span>
                    </label>
                    <ServicesMultiSelect
                      selectedServices={selectedServices}
                      onServicesChange={setSelectedServices}
                      error={form.formState.errors.services?.message}
                    />
                    {form.formState.errors.services && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle size={12} /> {form.formState.errors.services.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      {t('form.message')}
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project..."
                      rows={5}
                      {...form.register("message")}
                      className={form.formState.errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}
                    />
                    {form.formState.errors.message && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle size={12} /> {form.formState.errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('form.submitting')}
                      </>
                    ) : (
                      t('form.submit')
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* World Map Section */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('globalPresence.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('globalPresence.description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <WorldMap
              dots={[
                { start: { lat: 37.7749, lng: -122.4194 }, end: { lat: 51.5074, lng: -0.1278 } },
                { start: { lat: 40.7128, lng: -74.0060 }, end: { lat: 35.6762, lng: 139.6503 } },
                { start: { lat: -33.8688, lng: 151.2093 }, end: { lat: 52.5200, lng: 13.4050 } },
              ]}
            />
          </motion.div>
        </div>
      </section>


    </div>
  )
}
