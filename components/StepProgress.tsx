import React from 'react';
import { Album, CloudUpload, ListMusic, Globe, Verified } from 'lucide-react';

interface StepProgressProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
  showLabels?: boolean;
}

const steps = [
  { id: 1, label: 'Thông tin', icon: Album },
  { id: 2, label: 'Tài nguyên', icon: CloudUpload },
  { id: 3, label: 'Bài hát', icon: ListMusic },
  { id: 4, label: 'Phân phối', icon: Globe },
  { id: 5, label: 'Kiểm duyệt', icon: Verified },
];

export const StepProgress: React.FC<StepProgressProps> = ({ 
  currentStep, 
  onStepClick, 
  showLabels = true 
}) => {
  return (
    <div className="my-12">
      <div className="flex items-center justify-between relative">
        {/* Progress line background */}
        <div className="absolute left-0 top-5 h-0.5 bg-surface-container-highest -translate-y-1/2 w-full -z-10" />
        
        {/* Steps */}
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const isLast = index === steps.length - 1;
          
          return (
            <React.Fragment key={step.id}>
              <div
                className="relative z-10 flex flex-col items-center justify-center"
                onClick={() => onStepClick?.(step.id)}
              >
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${isActive 
                      ? 'bg-primary text-background shadow-lg shadow-primary/20' 
                      : isCompleted 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-surface-container-highest text-on-surface-variant'
                    }
                    ${onStepClick ? 'cursor-pointer hover:scale-110' : ''}
                  `}
                >
                  <Icon size={18} />
                </div>
              
              {showLabels && (
                <span className={`
                  mt-2 text-xs font-medium transition-colors
                  ${isActive 
                    ? 'text-primary' 
                    : isCompleted 
                      ? 'text-on-surface' 
                      : 'text-on-surface-variant'
                  }
                `}>
                  {step.label}
                </span>
              )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
