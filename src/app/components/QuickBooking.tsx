// app/components/QuickBooking.tsx
'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from './actions';
import { sendConfirmationEmail } from './sendConfirmationEmail';
import { toast } from 'sonner';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function QuickBooking() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [packageType, setPackageType] = useState<'basic' | 'premium' | 'vip'>('basic');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const timeSlots = packageType === 'vip'
    ? []
    : packageType === 'premium'
      ? ['12:00', '16:00']
      : ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  const isFormComplete = selectedDate && (packageType === 'vip' || selectedTime);

  const handleCreatePayment = async () => {
    if (!isFormComplete) return;

    setIsLoading(true);

    try {
      const result = await createPaymentIntent({ 
        packageType,
        email: email || undefined 
      });
      setClientSecret(result.clientSecret);
    } catch (error) {
      toast.error("Failed to start payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (clientSecret) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <EmbeddedPaymentForm
          email={email}
          selectedDate={selectedDate!}
          packageType={packageType}
          selectedTime={selectedTime}
          onSuccess={async () => {
            toast.success("🎉 Payment successful! Your booking is confirmed.");

            // Send confirmation email if email was provided
            if (email) {
              await sendConfirmationEmail({
                email,
                bookingId: "BOOK-" + Date.now().toString(36),
                packageType,
                date: selectedDate!.toDateString(),
                time: selectedTime || undefined,
                duration: packageType === 'basic' ? '2 hours' : packageType === 'premium' ? '4 hours' : '8 hours',
                guests: packageType === 'basic' ? 10 : packageType === 'premium' ? 20 : 99,
              });
            }

            setClientSecret(null);
          }}
        />
      </Elements>
    );
  }

  return (
    <section className="mt-20 mb-12">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-headline font-extrabold text-primary">Book Your Joy Session</h2>
        <p className="text-on-surface-variant mt-3">Choose a date and package — we’ll take care of the rest</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12">
        
        {/* Calendar */}
        <div>
          <h3 className="font-headline font-bold text-xl mb-6 text-primary">Select a Date</h3>
          <div className="bg-white border border-outline-variant rounded-2xl p-6">
            <div className="grid grid-cols-7 gap-2 text-center mb-4">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div key={index} className="font-headline font-bold text-on-surface-variant text-sm py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
              {Array.from({ length: 35 }, (_, i) => {
                const day = i + 1;
                const isSelected = selectedDate?.getDate() === day;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(new Date(2026, 3, day))}
                    className={`h-11 flex items-center justify-center rounded-2xl font-headline font-bold text-lg transition-all
                      ${isSelected ? 'bg-primary text-white shadow-md scale-110' : 'hover:bg-primary/10 text-primary'}`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <h3 className="font-headline font-bold text-xl mb-6 text-primary">Your Details</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-headline font-bold text-on-surface-variant mb-2">First Name</label>
              <input className="w-full bg-surface-container-highest border-0 rounded-full px-6 py-4 focus:ring-2 focus:ring-primary" placeholder="Alex" type="text" />
            </div>
            <div>
              <label className="block text-sm font-headline font-bold text-on-surface-variant mb-2">Last Name</label>
              <input className="w-full bg-surface-container-highest border-0 rounded-full px-6 py-4 focus:ring-2 focus:ring-primary" placeholder="Joyner" type="text" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-headline font-bold text-on-surface-variant mb-2">Email Address <span className="text-xs text-on-surface-variant">(optional)</span></label>
            <input
              className="w-full bg-surface-container-highest border-0 rounded-full px-6 py-4 focus:ring-2 focus:ring-primary"
              placeholder="you@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-headline font-bold text-on-surface-variant mb-2">Phone Number</label>
            <input className="w-full bg-surface-container-highest border-0 rounded-full px-6 py-4 focus:ring-2 focus:ring-primary" placeholder="+1 (555) 123-4567" type="tel" />
          </div>

          {/* Package Selector */}
          <div>
            <label className="block text-sm font-headline font-bold text-on-surface-variant mb-3">Choose Package</label>
            <div className="flex bg-surface-container-highest rounded-3xl p-1 gap-1">
              <button onClick={() => { setPackageType('basic'); setSelectedTime(null); }} className={`flex-1 py-4 text-sm font-headline font-bold rounded-3xl transition-all ${packageType === 'basic' ? 'bg-primary text-white shadow-md' : 'hover:bg-white/60 text-on-surface-variant'}`}>Basic Fun</button>
              <button onClick={() => { setPackageType('premium'); setSelectedTime(null); }} className={`flex-1 py-4 text-sm font-headline font-bold rounded-3xl transition-all ${packageType === 'premium' ? 'bg-primary text-white shadow-md' : 'hover:bg-white/60 text-on-surface-variant'}`}>Premium Joy</button>
              <button onClick={() => { setPackageType('vip'); setSelectedTime(null); }} className={`flex-1 py-4 text-sm font-headline font-bold rounded-3xl transition-all ${packageType === 'vip' ? 'bg-primary text-white shadow-md' : 'hover:bg-white/60 text-on-surface-variant'}`}>VIP Utopia</button>
            </div>
          </div>

          {/* Time Slots */}
          {packageType !== 'vip' && (
            <div>
              <label className="block text-sm font-headline font-bold text-on-surface-variant mb-3">Select Start Time</label>
              <div className="flex flex-wrap gap-3">
                {timeSlots.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-7 py-3 text-base font-headline font-bold rounded-3xl border-2 transition-all
                        ${isSelected ? 'bg-primary text-white border-primary' : 'border-primary text-primary hover:bg-primary hover:text-white'}`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {packageType === 'vip' && (
            <div className="bg-primary/10 text-primary rounded-3xl p-6 text-center font-headline font-bold text-lg">
              All Day Access (8 hours)
            </div>
          )}

          <button
            onClick={handleCreatePayment}
            disabled={!isFormComplete || isLoading}
            className={`w-full py-6 rounded-3xl font-headline font-bold text-xl transition-all shadow-lg
              ${isFormComplete ? 'bg-primary text-on-primary hover:scale-[1.02]' : 'bg-surface-container-highest text-on-surface-variant opacity-50 cursor-not-allowed'}`}
          >
            {isLoading ? 'Preparing payment...' : 'Pay 10% Deposit & Confirm'}
          </button>
        </div>
      </div>
    </section>
  );
}

// Embedded Stripe Payment Form
function EmbeddedPaymentForm({ email, selectedDate, packageType, selectedTime, onSuccess }: {
  email: string;
  selectedDate: Date;
  packageType: 'basic' | 'premium' | 'vip';
  selectedTime: string | null;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const result = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (result.error) {
      toast.error(result.error.message || 'Payment failed');
    } else if (result.paymentIntent?.status === 'succeeded') {
      onSuccess();
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-primary text-on-primary py-6 rounded-3xl font-headline font-bold text-xl hover:scale-[1.02] transition-transform"
      >
        {isProcessing ? 'Processing payment...' : 'Complete Payment'}
      </button>
    </form>
  );
}