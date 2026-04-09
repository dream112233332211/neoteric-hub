"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, ShoppingCart } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { Service, ServiceConfiguration } from "@/types";
import toast from "react-hot-toast";

interface ServiceConfiguratorProps {
  service: Service;
  onClose: () => void;
}

export function ServiceConfigurator({
  service,
  onClose,
}: ServiceConfiguratorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const addService = useCartStore((s) => s.addService);

  const steps = service.configuratorSteps;
  const totalSteps = steps.length;
  const isLastStep = currentStep === totalSteps - 1;

  const totalPrice = useMemo(() => {
    let price = service.basePrice;
    for (const step of steps) {
      const selectedOptionId = selections[step.id];
      if (selectedOptionId) {
        const option = step.options.find((o) => o.id === selectedOptionId);
        if (option) {
          price += option.priceModifier;
        }
      }
    }
    return price;
  }, [selections, steps, service.basePrice]);

  const estimatedDays = useMemo(() => {
    let days = service.deliveryTimeDays;
    for (const step of steps) {
      const selectedOptionId = selections[step.id];
      if (selectedOptionId) {
        const option = step.options.find((o) => o.id === selectedOptionId);
        if (option && option.priceModifier > 5000) {
          days += 14;
        } else if (option && option.priceModifier > 2000) {
          days += 7;
        }
      }
    }
    return days;
  }, [selections, steps, service.deliveryTimeDays]);

  const handleSelect = (stepId: string, optionId: string) => {
    setSelections((prev) => ({ ...prev, [stepId]: optionId }));
  };

  const handleAddToCart = () => {
    const configuration: ServiceConfiguration = {
      serviceId: service.id,
      selectedOptions: selections,
      totalPrice,
      estimatedDeliveryDays: estimatedDays,
    };
    addService({
      id: service.id,
      name: service.name,
      price: totalPrice,
      imageUrl: service.imageUrl,
      configuration,
    });
    toast.success(`${service.name} added to cart`);
    onClose();
  };

  const currentStepData = steps[currentStep];
  if (!currentStepData) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <GlassCard hover={false} className="overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">{service.name}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-white transition-colors text-xl leading-none"
              >
                &times;
              </button>
            </div>

            {/* Step indicators */}
            <div className="flex items-center gap-2">
              {steps.map((step, i) => (
                <div key={step.id} className="flex items-center gap-2 flex-1">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                      i < currentStep
                        ? "bg-cyan-500 text-white"
                        : i === currentStep
                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                        : "bg-white/5 text-gray-600"
                    }`}
                  >
                    {i < currentStep ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  {i < totalSteps - 1 && (
                    <div
                      className={`flex-1 h-px ${
                        i < currentStep ? "bg-cyan-500" : "bg-white/10"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-white mb-1">
                  {currentStepData.title}
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                  {currentStepData.description}
                </p>

                <div className="space-y-3">
                  {currentStepData.options.map((option) => {
                    const isSelected =
                      selections[currentStepData.id] === option.id;
                    return (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() =>
                          handleSelect(currentStepData.id, option.id)
                        }
                        className={`w-full text-left p-4 rounded-xl border transition-all ${
                          isSelected
                            ? "border-cyan-500/50 bg-cyan-500/10"
                            : "border-white/10 bg-white/[0.02] hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-white text-sm">
                              {option.label}
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">
                              {option.description}
                            </div>
                          </div>
                          <div className="text-right shrink-0 ml-4">
                            <div className="text-sm font-semibold text-white">
                              {option.priceModifier > 0
                                ? `+${formatCurrency(option.priceModifier)}`
                                : "Included"}
                            </div>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 ml-auto mt-1"
                              >
                                <Check className="h-3 w-3 text-white" />
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-gray-500">Estimated Total</div>
                <div className="text-2xl font-bold text-white">
                  {formatCurrency(totalPrice)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Delivery</div>
                <div className="text-sm font-medium text-gray-300">
                  ~{estimatedDays} days
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <NeonButton
                variant="ghost"
                onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                disabled={currentStep === 0}
                className="flex-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </NeonButton>

              {isLastStep ? (
                <NeonButton
                  onClick={handleAddToCart}
                  disabled={
                    Object.keys(selections).length < totalSteps
                  }
                  className="flex-1"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </NeonButton>
              ) : (
                <NeonButton
                  onClick={() =>
                    setCurrentStep((s) => Math.min(totalSteps - 1, s + 1))
                  }
                  disabled={!selections[currentStepData.id]}
                  className="flex-1"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </NeonButton>
              )}
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
