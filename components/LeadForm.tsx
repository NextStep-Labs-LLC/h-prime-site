'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PatternFormat } from 'react-number-format';
// import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'; // Temporarily disabled

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string()
    .min(10, 'Please enter a valid phone number')
    .refine((val) => {
      // Remove all non-digit characters
      const digitsOnly = val.replace(/\D/g, '');
      // Check that we have exactly 10 digits
      return digitsOnly.length === 10;
    }, 'Please enter a complete 10-digit phone number'),
  email: z.string().email('Please enter a valid email'),
  street: z.string().min(3, 'Street address is required'),
  apartment: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  zipCode: z.string().min(5, 'Please enter a valid 5-digit ZIP code'),
  message: z.string().min(5, 'Please describe the issue (minimum 5 characters)'),
});

type FormData = z.infer<typeof formSchema>;

export default function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  // const { executeRecaptcha } = useGoogleReCaptcha(); // Temporarily disabled

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare data for Make.com webhook
      const now = new Date();
      
      // Clean phone number - remove all formatting (parentheses, spaces, dashes)
      const cleanedPhone = data.phone.replace(/\D/g, '');
      
      // Clean text fields - remove quotes and newlines to prevent JSON parsing errors in CRM
      const cleanText = (text: string) => {
        return text
          .replace(/["']/g, '') // Remove all quotes (double and single)
          .replace(/\n/g, ' ') // Replace newlines with spaces
          .replace(/\s+/g, ' ') // Replace multiple spaces with single space
          .trim();
      };
      
      const webhookData = {
        first_name: data.firstName,
        last_name: data.lastName,
        phone: cleanedPhone,
        email: data.email,
        street: cleanText(data.street),
        apartment_or_unit: cleanText(data.apartment || ''),
        city: cleanText(data.city),
        zip_code: data.zipCode,
        state: 'CO',
        country: 'US',
        issue: cleanText(data.message || ''),
        preferred_day: '',
        start_time: '',
        end_time: '',
        time_slot: '',
        source: 'Website - H-Prime Appliance Repair Services',
        submitted_at_date: now.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
        submitted_at_time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      };

      // Submit directly to Make.com webhook
      // WEBHOOK TEMPORARILY DISABLED - Will be configured later
      const response = await fetch('#', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      });

      if (response.ok) {
        // GTM Event
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'lead_submitted',
            lead_data: {
              email: data.email,
              phone: cleanedPhone,
              source: 'Website - H-Prime Appliance Repair Services'
            }
          });
        }
        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lead-form" className="py-16 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Request Service Today
            </h2>
            <p className="text-lg text-gray-600">
              Fill out the form and we'll call you back within 15 minutes
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                  First name *
                </label>
                <input
                  {...register('firstName')}
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John"
                />
                {errors.firstName && (
                  <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Last name *
                </label>
                <input
                  {...register('lastName')}
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Smith"
                />
                {errors.lastName && (
                  <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone *
                </label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <PatternFormat
                      {...field}
                      format="(###) ###-####"
                      mask="_"
                      placeholder="(555) 123-4567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  E-mail address *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Street Address */}
            <div>
              <label htmlFor="street" className="block text-sm font-semibold text-gray-700 mb-2">
                Street address *
              </label>
              <input
                {...register('street')}
                type="text"
                id="street"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="123 Main Street"
              />
              {errors.street && (
                <p className="text-red-600 text-sm mt-1">{errors.street.message}</p>
              )}
            </div>

            {/* Apartment & City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="apartment" className="block text-sm font-semibold text-gray-700 mb-2">
                  Unit / apartment / suite
                </label>
                <input
                  {...register('apartment')}
                  type="text"
                  id="apartment"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Apt 4B"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                  City *
                </label>
                <input
                  {...register('city')}
                  type="text"
                  id="city"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Newark"
                />
                {errors.city && (
                  <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>
                )}
              </div>
            </div>

            {/* Zip Code */}
            <div>
              <div>
                <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-700 mb-2">
                  Zip code *
                </label>
                <Controller
                  name="zipCode"
                  control={control}
                  render={({ field }) => (
                    <PatternFormat
                      {...field}
                      format="#####"
                      mask="_"
                      placeholder="77001"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                />
                {errors.zipCode && (
                  <p className="text-red-600 text-sm mt-1">{errors.zipCode.message}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                What appliance needs repair? *
              </label>
              <textarea
                {...register('message')}
                id="message"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="My Samsung Washer is not draining"
              />
              {errors.message && (
                <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-600 text-white py-4 rounded-lg hover:bg-orange-700 transition font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Request Service Call'}
            </button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="bg-orange-100 border border-green-400 text-orange-700 px-4 py-3 rounded">
                Thank you! We'll contact you shortly.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                Something went wrong. Please try again or call us directly.
              </div>
            )}

            {/* reCAPTCHA Notice */}
            <p className="text-xs text-gray-500 text-center">
              This site is protected by reCAPTCHA and the Google Privacy Policy applies.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

