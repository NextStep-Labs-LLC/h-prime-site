'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PatternFormat } from 'react-number-format';
import { X, ChevronLeft } from 'lucide-react';

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
  preferredDate: z.string().min(1, 'Please select a date'),
  timeSlot: z.enum(['morning', 'afternoon']),
});

type FormData = z.infer<typeof formSchema>;

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadFormModal({ isOpen, onClose }: LeadFormModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  });

  const watchedData = watch();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Convert to ISO format for HouseCallPro CRM
      const selectedDate = new Date(data.preferredDate);
      const isoDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
      
      // Time slots
      const startTime = data.timeSlot === 'morning' ? '08:00:00' : '13:00:00';
      const endTime = data.timeSlot === 'morning' ? '13:00:00' : '20:00:00';
      
      const now = new Date();
      const submittedAtISO = now.toISOString(); // Full ISO timestamp

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
        preferred_day: isoDate, // ISO format: YYYY-MM-DD
        start_time: startTime, // ISO time format: HH:MM:SS
        end_time: endTime, // ISO time format: HH:MM:SS
        time_slot: data.timeSlot === 'morning' ? '8:00AM - 1:00 PM' : '1:00PM - 8:00PM',
        source: 'Website - H-Prime Appliance Repair Services',
        submitted_at: submittedAtISO, // Full ISO timestamp
      };

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
        setCurrentStep(4);
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

  const handleClose = () => {
    setCurrentStep(1);
    setSubmitStatus('idle');
    reset();
    onClose();
  };

  const nextStep = async () => {
    // Validate step 1 fields before proceeding
    if (currentStep === 1) {
      const isValid = await trigger(['message']);
      if (!isValid) return; // Don't proceed if validation fails
    }
    // Validate step 2 fields before proceeding
    if (currentStep === 2) {
      const isValid = await trigger(['firstName', 'lastName', 'phone', 'email', 'street', 'city', 'zipCode']);
      if (!isValid) return; // Don't proceed if validation fails
    }
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-xl font-bold text-gray-900">
            {submitStatus === 'success' ? 'Thank You!' : 'H-Prime Appliance Repair Services - Appliance Service'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        {submitStatus !== 'success' && (
          <div className="px-6 py-4">
            <div className="flex items-center justify-center mb-2">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition ${
                      step === currentStep
                        ? 'text-white'
                        : step < currentStep
                        ? 'text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                    style={step === currentStep ? { backgroundColor: '#1B2A4A' } : step < currentStep ? { backgroundColor: '#1B2A4A' } : {}}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition ${
                        step < currentStep ? '' : 'bg-gray-200'
                      }`}
                      style={step < currentStep ? { backgroundColor: '#1B2A4A' } : {}}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4">
          {/* Step 1: Welcome & Issue */}
          {currentStep === 1 && submitStatus !== 'success' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to H-Prime Appliance Repair Services</h3>
                <p className="text-gray-600">What can we do for you?</p>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Please briefly describe the issue *
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 bg-white"
                  placeholder="My Samsung Washer is not draining"
                />
                {errors.message && (
                  <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="button"
                onClick={nextStep}
                className="w-full text-white py-4 rounded-lg transition font-semibold text-lg shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#1B2A4A' }}
              >
                Next
              </button>
            </div>
          )}

          {/* Step 2: Contact & Address */}
          {currentStep === 2 && submitStatus !== 'success' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevStep}
                  className="p-1 hover:bg-gray-100 rounded-full transition"
                  style={{ color: '#1E3A8A' }}
                  aria-label="Back"
                >
                  <ChevronLeft size={24} />
                </button>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Your Information</h3>
                  <p className="text-xs text-gray-600">Contact details and service address</p>
                </div>
              </div>

              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-semibold text-gray-700 mb-1">
                    First name *
                  </label>
                  <input
                    {...register('firstName')}
                    type="text"
                    id="firstName"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-xs mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-semibold text-gray-700 mb-1">
                    Last name *
                  </label>
                  <input
                    {...register('lastName')}
                    type="text"
                    id="lastName"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="Smith"
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-xs mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-gray-700 mb-1">
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
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                      />
                    )}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1">
                    E-mail address *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Street Address */}
              <div>
                <label htmlFor="street" className="block text-xs font-semibold text-gray-700 mb-1">
                  Street address *
                </label>
                <input
                  {...register('street')}
                  type="text"
                  id="street"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  placeholder="123 Main Street"
                />
                {errors.street && (
                  <p className="text-red-600 text-xs mt-1">{errors.street.message}</p>
                )}
              </div>

              {/* Apartment & City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <label htmlFor="apartment" className="block text-xs font-semibold text-gray-700 mb-1">
                    Unit / apartment / suite
                  </label>
                  <input
                    {...register('apartment')}
                    type="text"
                    id="apartment"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="Apt 4B"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-xs font-semibold text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    {...register('city')}
                    type="text"
                    id="city"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    placeholder="Newark"
                  />
                  {errors.city && (
                    <p className="text-red-600 text-xs mt-1">{errors.city.message}</p>
                  )}
                </div>
              </div>

              {/* Zip Code */}
              <div>
                <div>
                  <label htmlFor="zipCode" className="block text-xs font-semibold text-gray-700 mb-1">
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
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                      />
                    )}
                  />
                  {errors.zipCode && (
                    <p className="text-red-600 text-xs mt-1">{errors.zipCode.message}</p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={nextStep}
                className="w-full text-white py-2.5 rounded-lg transition font-semibold text-sm shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#1B2A4A' }}
              >
                Next
              </button>
            </div>
          )}

          {/* Step 3: Date & Time */}
          {currentStep === 3 && submitStatus !== 'success' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevStep}
                  className="p-1 hover:bg-gray-100 rounded-full transition"
                  style={{ color: '#1E3A8A' }}
                  aria-label="Back"
                >
                  <ChevronLeft size={24} />
                </button>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Select preferred day</h3>
                  <p className="text-sm text-gray-600">Choose a date and time slot</p>
                </div>
              </div>

              {/* Date Picker */}
              <div>
                <label htmlFor="preferredDate" className="block text-sm font-semibold text-gray-700 mb-2">
                  Select preferred day *
                </label>
                <input
                  {...register('preferredDate')}
                  type="date"
                  id="preferredDate"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                />
                {errors.preferredDate && (
                  <p className="text-red-600 text-sm mt-1">{errors.preferredDate.message}</p>
                )}
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  We'll arrive within the selected timeframe:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label
                    className={`relative flex items-center justify-center p-6 border-2 rounded-lg cursor-pointer transition ${
                      watchedData.timeSlot === 'morning'
                        ? 'border-orange-600 bg-orange-50'
                        : 'border-gray-300 hover:border-green-400'
                    }`}
                  >
                    <input
                      {...register('timeSlot')}
                      type="radio"
                      value="morning"
                      className="sr-only"
                    />
                    <span className="text-lg font-semibold text-gray-900">8:00AM - 1:00 PM</span>
                  </label>
                  <label
                    className={`relative flex items-center justify-center p-6 border-2 rounded-lg cursor-pointer transition ${
                      watchedData.timeSlot === 'afternoon'
                        ? 'border-orange-600 bg-orange-50'
                        : 'border-gray-300 hover:border-green-400'
                    }`}
                  >
                    <input
                      {...register('timeSlot')}
                      type="radio"
                      value="afternoon"
                      className="sr-only"
                    />
                    <span className="text-lg font-semibold text-gray-900">1:00PM - 8:00PM</span>
                  </label>
                </div>
                {errors.timeSlot && (
                  <p className="text-red-600 text-sm mt-1">{errors.timeSlot.message}</p>
                )}
              </div>

              <p className="text-sm text-gray-600">
                We will confirm the approximate arrival time a little later.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white py-4 rounded-lg transition font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#1B2A4A' }}
              >
                {isSubmitting ? 'Submitting...' : 'Book my appointment'}
              </button>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {submitStatus === 'success' && (
            <div className="space-y-6 text-center py-8">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Appointment Confirmed!</h3>
              <div className="bg-gray-50 rounded-lg p-6 text-left space-y-3">
                <h4 className="font-semibold text-gray-900 mb-3">Review & confirm</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Arrival window:</span>{' '}
                    {watchedData.preferredDate && new Date(watchedData.preferredDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                    })}{' '}
                    — {watchedData.timeSlot === 'morning' ? '8am-1pm' : '1pm-8pm'}
                  </p>
                  <p>
                    <span className="font-semibold">Location:</span> {watchedData.street}
                    {watchedData.apartment && `, ${watchedData.apartment}`}, {watchedData.city}, TX{' '}
                    {watchedData.zipCode}
                  </p>
                  <p>
                    <span className="font-semibold">Contact:</span> {watchedData.firstName}{' '}
                    {watchedData.lastName}, {watchedData.phone}
                  </p>
                </div>
              </div>
              <p className="text-gray-600">
                We will confirm the approximate arrival time a little later.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="w-full text-white py-4 rounded-lg transition font-semibold text-lg shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#1B2A4A' }}
              >
                Close
              </button>
            </div>
          )}

          {/* Error State */}
          {submitStatus === 'error' && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
              Something went wrong. Please try again or call us directly at (720) 784-6766.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

