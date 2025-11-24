"use client"

import type React from "react"

import Navigation from "@/components/navigation"

import { Mail, Phone, MapPin, Calendar, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { WorldMap } from "@/components/world-map"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// Validation Schema
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  position: z.string().min(2, { message: "Position is required" }),
  service: z.string().min(1, { message: "Please select a service" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  appointmentDate: z.string().optional(),
  appointmentTime: z.string().optional(),
})

type ContactFormValues = z.infer<typeof contactSchema>

const services = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Cloud Solutions",
  "AI & Machine Learning",
  "Digital Transformation Strategy",
  "Cybersecurity",
  "Consultation",
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: "",
      service: "",
      message: "",
      appointmentDate: "",
      appointmentTime: "",
    },
  })

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Form submitted:", data)
    setIsSubmitting(false)
    setIsSuccess(true)
    reset()
    setTimeout(() => setIsSuccess(false), 5000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-heading text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Ready to start your digital transformation journey? Let's discuss how we can help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-foreground/80 mb-2 font-medium">
                      Name
                    </label>
                    <input
                      {...register("name")}
                      type="text"
                      id="name"
                      className={`w-full px-4 py-3 bg-card border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground dark:bg-card/50 ${errors.name ? "border-red-500" : "border-border"
                        }`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-foreground/80 mb-2 font-medium">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      id="email"
                      className={`w-full px-4 py-3 bg-card border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground dark:bg-card/50 ${errors.email ? "border-red-500" : "border-border"
                        }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-foreground/80 mb-2 font-medium">
                      Phone Number
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      id="phone"
                      className={`w-full px-4 py-3 bg-card border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground dark:bg-card/50 ${errors.phone ? "border-red-500" : "border-border"
                        }`}
                      placeholder="+1 (555) 000-0000"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="position" className="block text-foreground/80 mb-2 font-medium">
                      Position
                    </label>
                    <input
                      {...register("position")}
                      type="text"
                      id="position"
                      className={`w-full px-4 py-3 bg-card border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground dark:bg-card/50 ${errors.position ? "border-red-500" : "border-border"
                        }`}
                      placeholder="e.g. CTO, Manager"
                    />
                    {errors.position && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.position.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-foreground/80 mb-2 font-medium">
                    Service of Interest
                  </label>
                  <div className="relative">
                    <select
                      {...register("service")}
                      id="service"
                      className={`w-full px-4 py-3 bg-card border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground dark:bg-card/50 appearance-none ${errors.service ? "border-red-500" : "border-border"
                        }`}
                    >
                      <option value="">Select a service...</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-muted-foreground">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  {errors.service && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.service.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-foreground/80 mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    id="message"
                    rows={6}
                    className={`w-full px-4 py-3 bg-card border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground resize-none dark:bg-card/50 ${errors.message ? "border-red-500" : "border-border"
                      }`}
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 font-medium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Sending...
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle size={20} />
                      Message Sent!
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Info & Appointment */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Contact Information */}
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-1">Email</h3>
                      <a
                        href="mailto:hello@neotech.com"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        hello@neotech.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-1">Phone</h3>
                      <a href="tel:+1234567890" className="text-muted-foreground hover:text-accent transition-colors">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-1">Address</h3>
                      <p className="text-muted-foreground">
                        123 Tech Street
                        <br />
                        Innovation District
                        <br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div className="h-[400px] w-full rounded-2xl overflow-hidden border border-border bg-card dark:bg-card/50 relative group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.063686266068!2d-122.3962650235336!3d37.78755697198263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807ab753b821%3A0x62780f2452331584!2sInnovation%20District!5e0!3m2!1sen!2sus!4v1709234567890!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
                <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-2xl" />
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
              Global Presence
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connecting businesses worldwide with innovative solutions and cutting-edge technology.
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
