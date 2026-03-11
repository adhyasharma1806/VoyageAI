'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { GlassCard } from '@/components/glass-card';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const steps = [
  { id: 1, title: 'Destination', icon: MapPin },
  { id: 2, title: 'Dates & Budget', icon: Calendar },
  { id: 3, title: 'Travelers', icon: Users },
  { id: 4, title: 'Preferences', icon: Sparkles },
];

export default function PlannerPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = React.useState(1);

  const [formData, setFormData] = React.useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    travelers: '1',
    travelStyle: '',
    interests: '',
    notes: '',
  });

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const destinationImages: Record<string, string> = {
    france: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    japan: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    china: "https://images.unsplash.com/photo-1549693578-d683be217e58",
    india: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
    italy: "https://images.unsplash.com/photo-1529260830199-42c24126f198",
    thailand: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  };

  const handleNext = async () => {

  if (currentStep < steps.length) {
    setCurrentStep((prev) => prev + 1);
    return;
  }

  try {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      router.push("/auth/signin");
      return;
    }

    // AI itinerary generation
    const aiRes = await fetch("https://voyageai-1-b0iw.onrender.com/api/ai/generate-trip", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        destination: formData.destination,
        startDate: formData.startDate,
        endDate: formData.endDate,
        travelStyle: formData.travelStyle,
        interests: formData.interests
      })
    });

    if (!aiRes.ok) {
      const err = await aiRes.text();
      console.error("AI generation failed:", err);
      throw new Error("AI itinerary generation failed");
    }

    const aiData = await aiRes.json();

    // Save trip
    const tripRes = await fetch("https://voyageai-1-b0iw.onrender.com/api/trips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        destination: formData.destination,
        startDate: formData.startDate,
        endDate: formData.endDate,
        travelers: formData.travelers,
        budget: formData.budget,
        image: destinationImages[formData.destination.toLowerCase()] || "/travel.jpg",
        days: aiData.days || []
      })
    });

    if (!tripRes.ok) {
      const err = await tripRes.text();
      console.error("Trip save failed:", err);
      throw new Error("Trip save failed");
    }

    router.push("/dashboard");

  } catch (err) {
    console.error("Trip generation failed", err);
  }
};

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.destination.trim() !== '';
      case 2:
        return formData.startDate && formData.endDate && formData.budget;
      case 3:
        return formData.travelers;
      case 4:
        return formData.travelStyle;
      default:
        return false;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-cyan-900/20" />

      <div className="relative py-12 px-4 sm:px-6 lg:px-8">

        <div className="max-w-4xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >

            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Plan Your Perfect Trip
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300">
              Tell us about your dream destination and let AI craft your ideal itinerary
            </p>

          </motion.div>

          <GlassCard className="p-8">

            <AnimatePresence mode="wait">

              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >

                  <Label className="text-lg font-semibold">
                    Where do you want to go?
                  </Label>

                  <Input
                    placeholder="Enter destination (e.g., Paris, France)"
                    value={formData.destination}
                    onChange={(e) =>
                      updateFormData('destination', e.target.value)
                    }
                  />

                </motion.div>
              )}

            </AnimatePresence>

            <div className="flex justify-between mt-8">

              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
              >
                {currentStep === steps.length
                  ? "Generate Itinerary"
                  : "Next"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

            </div>

          </GlassCard>

        </div>

      </div>

    </div>
  );
}