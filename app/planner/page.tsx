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
  spain: "https://images.unsplash.com/photo-1505739774141-9c4e3f8c3b1d",
  germany: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
  portugal: "https://images.unsplash.com/photo-1513735492246-483525079686",
  greece: "https://images.unsplash.com/photo-1503152394-c571994fd383",
  switzerland: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  austria: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc",
  netherlands: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
  belgium: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
  denmark: "https://images.unsplash.com/photo-1501436513145-30f24e19fcc4",
  norway: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  sweden: "https://images.unsplash.com/photo-1509358273864-bd9d0d0c9c5f",
  iceland: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  finland: "https://images.unsplash.com/photo-1508711040639-359a1d59dff6",

  usa: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
  canada: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  mexico: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
  brazil: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325",
  argentina: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  chile: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  peru: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
  colombia: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
  cuba: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",

  turkey: "https://images.unsplash.com/photo-1527838832700-5059252407fa",
  egypt: "https://images.unsplash.com/photo-1539650116574-75c0c6d73b6e",
  morocco: "https://images.unsplash.com/photo-1489493585363-d69421e0edd3",
  southafrica: "https://images.unsplash.com/photo-1484318571209-661cf29a69c3",
  kenya: "https://images.unsplash.com/photo-1508672019048-805c876b67e2",

  uae: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
  qatar: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
  saudiarabia: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",

  singapore: "https://images.unsplash.com/photo-1508962914676-134849a727f0",
  malaysia: "https://images.unsplash.com/photo-1508962914676-134849a727f0",
  indonesia: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  philippines: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  vietnam: "https://images.unsplash.com/photo-1528127269322-539801943592",
  cambodia: "https://images.unsplash.com/photo-1528127269322-539801943592",
  laos: "https://images.unsplash.com/photo-1528127269322-539801943592",

  australia: "https://images.unsplash.com/photo-1506976785307-8732e854ad03",
  newzealand: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  fiji: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  maldives: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  srilanka: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da",
  nepal: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  bhutan: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
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

    // Generate AI itinerary
    const aiRes = await fetch(
      "https://voyageai-1-b0iw.onrender.com/api/ai/generate-trip",
      {
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
      }
    );

    if (!aiRes.ok) {
      const errorText = await aiRes.text();
      console.error("AI generation failed:", errorText);
      throw new Error("AI itinerary generation failed");
    }

    const aiData = await aiRes.json();

    // Save trip
    const tripRes = await fetch(
      "https://voyageai-1-b0iw.onrender.com/api/trips",
      {
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
          image:
            destinationImages[formData.destination.toLowerCase()] ||
            "/travel.jpg",
          days: aiData.days || []
        })
      }
    );

    if (!tripRes.ok) {
      const errorText = await tripRes.text();
      console.error("Trip save failed:", errorText);
      throw new Error("Trip save failed");
    }

    router.push("/dashboard");

  } catch (err) {
    console.error("Trip generation failed", err);
    alert("Trip generation failed. Check console.");
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >

            <div className="flex justify-between items-center">

              {steps.map((step, index) => (

                <React.Fragment key={step.id}>

                  <div className="flex flex-col items-center gap-2">

                    <motion.div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        currentStep > step.id
                          ? 'bg-gradient-to-br from-green-500 to-emerald-500'
                          : currentStep === step.id
                          ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >

                      {currentStep > step.id ? (
                        <Check className="h-6 w-6 text-white" />
                      ) : (
                        <step.icon
                          className={`h-6 w-6 ${
                            currentStep >= step.id
                              ? 'text-white'
                              : 'text-gray-500 dark:text-gray-400'
                          }`}
                        />
                      )}

                    </motion.div>

                    <span className={`text-sm font-medium hidden sm:block ${
                      currentStep >= step.id
                        ? 'text-gray-900 dark:text-gray-100'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.title}
                    </span>

                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                        currentStep > step.id
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  )}

                </React.Fragment>

              ))}

            </div>

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

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >

                  <div className="grid grid-cols-2 gap-6">

                    <div>
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) =>
                          updateFormData('startDate', e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) =>
                          updateFormData('endDate', e.target.value)
                        }
                      />
                    </div>

                  </div>

                  <div>
                    <Label>Budget</Label>

                    <Select
                      value={formData.budget}
                      onValueChange={(v) => updateFormData('budget', v)}
                    >

                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="budget">Budget</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                      </SelectContent>

                    </Select>

                  </div>

                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >

                  <Label>Number of Travelers</Label>

                  <Select
                    value={formData.travelers}
                    onValueChange={(v) => updateFormData('travelers', v)}
                  >

                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      {[1,2,3,4,5,6].map(n=>(
                        <SelectItem key={n} value={n.toString()}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>

                  </Select>

                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >

                  <Label>Travel Style</Label>

                  <Select
                    value={formData.travelStyle}
                    onValueChange={(v)=>updateFormData("travelStyle",v)}
                  >

                    <SelectTrigger>
                      <SelectValue placeholder="Select style"/>
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="relaxation">Relaxation</SelectItem>
                      <SelectItem value="adventure">Adventure</SelectItem>
                      <SelectItem value="culture">Culture</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="nightlife">Nightlife</SelectItem>
                    </SelectContent>

                  </Select>

                  <Label>Interests</Label>

                  <Input
                    placeholder="museums, hiking, beaches..."
                    value={formData.interests}
                    onChange={(e)=>updateFormData("interests",e.target.value)}
                  />

                  <Label>Notes</Label>

                  <Textarea
                    value={formData.notes}
                    onChange={(e)=>updateFormData("notes",e.target.value)}
                  />

                </motion.div>
              )}

            </AnimatePresence>

            <div className="flex justify-between mt-8">

              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep===1}
              >
                <ArrowLeft className="h-4 w-4 mr-2"/>
                Back
              </Button>

              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
              >
                {currentStep === steps.length ? "Generate Itinerary" : "Next"}
                <ArrowRight className="h-4 w-4 ml-2"/>
              </Button>

            </div>

          </GlassCard>

        </div>

      </div>

    </div>
  );
}