"use client";

import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { toast, Toaster } from 'react-hot-toast';
import * as analytics from '@/lib/analytics';

// Define schema for validation
const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  interests: z.array(z.string()).optional(),
});

type WaitlistFormData = z.infer<typeof schema>;

interface WaitlistFormProps {
  onClose?: () => void;
  className?: string;
  source?: string;
}

export default function WaitlistForm({ onClose, className = '', source = 'waitlist' }: WaitlistFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInterests, setShowInterests] = useState(false);
  const [submissionAttempts, setSubmissionAttempts] = useState(0);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<WaitlistFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      interests: [],
    },
  });

  // Track form view once on component mount
  useEffect(() => {
    analytics.trackFormView('waitlist', source);
  }, [source]);

  // Track form submission (successful or failed)
  const trackFormSubmission = (status: 'success' | 'failure', data: any) => {
    analytics.trackFormSubmission('waitlist', status, { 
      source, 
      attempts: submissionAttempts + 1,
      ...data 
    });
  };

  const onSubmit = async (data: WaitlistFormData) => {
    try {
      setIsSubmitting(true);
      setSubmissionAttempts(prev => prev + 1);
      
      // Using the same API endpoint as the subscription form
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          source: source,
          metadata: {
            form_location: source,
            submission_timestamp: new Date().toISOString(),
            submission_attempts: submissionAttempts + 1,
          }
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Track successful submission
        trackFormSubmission('success', { email: data.email });
        
        toast.success(
          <div>
            <p>Thank you for joining our waitlist!</p>
            <p className="text-sm mt-1">We'll keep you updated on all future opportunities.</p>
          </div>,
          { duration: 5000 }
        );
        reset();
        if (onClose) {
          setTimeout(() => {
            onClose();
          }, 2000);
        }
      } else {
        // Already subscribed isn't really an error for the user
        if (result.message === 'Email already subscribed') {
          trackFormSubmission('success', { 
            email: data.email, 
            status: 'already_subscribed' 
          });
          
          toast.success(
            <div>
              <p>You're already on our waitlist!</p>
              <p className="text-sm mt-1">We'll keep you updated on all future opportunities.</p>
            </div>,
            { duration: 5000 }
          );
          reset();
          if (onClose) {
            setTimeout(() => {
              onClose();
            }, 2000);
          }
        } else {
          // Track failed submission
          trackFormSubmission('failure', { 
            email: data.email, 
            error: result.message 
          });
          
          toast.error(result.message || "Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      // Track exception
      trackFormSubmission('failure', { 
        email: data.email, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      
      toast.error("Failed to submit. Please try again later.");
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-black/90 backdrop-blur-md border border-white/10 rounded-xl p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
          Can't commit to $200 right now?
        </h3>
        <p className="text-neutral-300">
          Join {5321} diabetics on our waitlist for future opportunities
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input 
            type="email" 
            placeholder="Your email address"
            className={`w-full px-4 py-3 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
            {...register('email')}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <Button 
            type="button"
            variant="secondary" 
            className={`w-full flex items-center justify-between ${showInterests ? 'mb-3' : ''}`}
            onClick={() => setShowInterests(!showInterests)}
          >
            <span>What are you interested in?</span>
            <svg 
              className={`w-5 h-5 transform transition-transform ${showInterests ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
          
          {showInterests && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-lg p-3"
            >
              <div className="grid grid-cols-1 gap-3">
                {['Hypoglycemia Prediction', 'Voice Biomarkers', 'Early Access', 'Clinical Research'].map((interest) => (
                  <label key={interest} className="flex items-center space-x-3 text-white cursor-pointer">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        value={interest}
                        {...register('interests')}
                        className="sr-only peer"
                      />
                      <div className="w-4 h-4 border border-white/30 rounded bg-white/5 peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-colors"></div>
                      <svg 
                        className="absolute w-2.5 h-2.5 text-white left-0.75 top-0.75 opacity-0 peer-checked:opacity-100 pointer-events-none" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-sm">{interest}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </div>
        
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          ) : (
            'Join Waitlist'
          )}
        </Button>
      </form>
      
      <Toaster position="top-center" />
    </div>
  );
}
