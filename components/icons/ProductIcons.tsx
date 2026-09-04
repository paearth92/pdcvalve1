interface IconProps {
  className?: string;
}

/** Control — flow regulation gauge */
export function ControlIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer arc */}
      <path
        d="M12 40 A22 22 0 0 1 52 40"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Tick marks */}
      {[0, 45, 90, 135, 180].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 32 + Math.cos(rad) * 22;
        const y1 = 40 - Math.sin(rad) * 22;
        const x2 = 32 + Math.cos(rad) * 17;
        const y2 = 40 - Math.sin(rad) * 17;
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.4"
          />
        );
      })}
      {/* Needle */}
      <line
        x1="32"
        y1="40"
        x2="44"
        y2="24"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Center hub */}
      <circle cx="32" cy="40" r="4" fill="currentColor" />
      <circle cx="32" cy="40" r="7" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

/** Automation — actuator with gear */
export function AutomationIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Actuator body */}
      <rect x="18" y="10" width="28" height="22" rx="3" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      {/* Top cap */}
      <line x1="22" y1="10" x2="22" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="42" y1="10" x2="42" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Indicator window */}
      <rect x="26" y="16" width="12" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="32" y1="16" x2="32" y2="22" stroke="currentColor" strokeWidth="1.5" />
      {/* Stem */}
      <rect x="29" y="32" width="6" height="8" fill="currentColor" opacity="0.5" />
      {/* Gear below */}
      <circle cx="32" cy="48" r="10" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="48" r="4" fill="currentColor" />
      {/* Gear teeth */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45) * (Math.PI / 180);
        const x1 = 32 + Math.cos(angle) * 10;
        const y1 = 48 + Math.sin(angle) * 10;
        const x2 = 32 + Math.cos(angle) * 13;
        const y2 = 48 + Math.sin(angle) * 13;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

/** Isolation — valve with sealed disc */
export function IsolationIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Pipe left */}
      <line x1="4" y1="32" x2="20" y2="32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      {/* Pipe right */}
      <line x1="44" y1="32" x2="60" y2="32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      {/* Valve body circle */}
      <circle cx="32" cy="32" r="14" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      {/* Sealed disc — vertical line indicating closed */}
      <line x1="32" y1="18" x2="32" y2="46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Top handle stem */}
      <rect x="29" y="8" width="6" height="10" rx="1" fill="currentColor" opacity="0.6" />
      {/* Handle */}
      <rect x="24" y="4" width="16" height="5" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Seal indicators */}
      <circle cx="32" cy="32" r="3" fill="currentColor" />
      {/* Flange marks */}
      <line x1="20" y1="26" x2="20" y2="38" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="44" y1="26" x2="44" y2="38" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

/** Butterfly damper valve silhouette */
export function ButterflyDamperIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Pipe */}
      <rect x="6" y="48" width="108" height="24" rx="2" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      {/* Flanges */}
      <rect x="2" y="40" width="8" height="40" rx="1" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <rect x="110" y="40" width="8" height="40" rx="1" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      {/* Valve body */}
      <circle cx="60" cy="60" r="26" stroke="currentColor" strokeWidth="2.5" opacity="0.5" />
      <circle cx="60" cy="60" r="20" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      {/* Damper blades — multiple louvers */}
      {[50, 56, 62, 68].map((y) => (
        <line key={y} x1="40" y1={y} x2="80" y2={y} stroke="currentColor" strokeWidth="2" opacity="0.6" />
      ))}
      {/* Center hub */}
      <circle cx="60" cy="60" r="4" fill="currentColor" opacity="0.7" />
      {/* Top stem */}
      <rect x="57" y="28" width="6" height="14" fill="currentColor" opacity="0.5" />
      {/* Actuator box */}
      <rect x="48" y="16" width="24" height="14" rx="2" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    </svg>
  );
}

/** Butterfly valve silhouette */
export function ButterflyValveIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Pipe */}
      <rect x="6" y="48" width="108" height="24" rx="2" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      {/* Flanges */}
      <rect x="2" y="40" width="8" height="40" rx="1" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <rect x="110" y="40" width="8" height="40" rx="1" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      {/* Valve body */}
      <circle cx="60" cy="60" r="26" stroke="currentColor" strokeWidth="2.5" opacity="0.5" />
      {/* Disc — tilted ellipse */}
      <ellipse
        cx="60"
        cy="60"
        rx="8"
        ry="22"
        fill="currentColor"
        fillOpacity="0.5"
        stroke="currentColor"
        strokeWidth="1.5"
        transform="rotate(25 60 60)"
      />
      {/* Center hub */}
      <circle cx="60" cy="60" r="5" fill="currentColor" opacity="0.7" />
      <circle cx="60" cy="60" r="2" fill="currentColor" />
      {/* Top stem */}
      <rect x="57" y="28" width="6" height="14" fill="currentColor" opacity="0.5" />
      {/* Handle */}
      <rect x="50" y="16" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    </svg>
  );
}

/** Pneumatic actuator silhouette */
export function PneumaticActuatorIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Actuator body — cylinder */}
      <rect x="34" y="14" width="52" height="44" rx="4" stroke="currentColor" strokeWidth="2.5" opacity="0.5" />
      {/* Inner cylinder */}
      <rect x="40" y="20" width="40" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      {/* Piston */}
      <line x1="40" y1="36" x2="80" y2="36" stroke="currentColor" strokeWidth="3" opacity="0.6" />
      {/* Air ports */}
      <circle cx="28" cy="24" r="3" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <circle cx="28" cy="48" r="3" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      {/* Stem */}
      <rect x="57" y="58" width="6" height="16" fill="currentColor" opacity="0.5" />
      {/* Valve body below */}
      <circle cx="60" cy="82" r="18" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      {/* Disc */}
      <ellipse cx="60" cy="82" rx="6" ry="15" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1" transform="rotate(20 60 82)" />
      {/* Pipe stubs */}
      <line x1="24" y1="82" x2="42" y2="82" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="78" y1="82" x2="96" y2="82" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

/** Electric actuator silhouette */
export function ElectricActuatorIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Actuator body — rounded rectangle */}
      <rect x="32" y="12" width="56" height="48" rx="6" stroke="currentColor" strokeWidth="2.5" opacity="0.5" />
      {/* Inner panel */}
      <rect x="40" y="20" width="40" height="32" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      {/* Display screen */}
      <rect x="46" y="26" width="28" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="60" y1="26" x2="60" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      {/* Electric bolt symbol */}
      <path d="M56 44 L60 40 L58 46 L62 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      {/* Stem */}
      <rect x="57" y="60" width="6" height="14" fill="currentColor" opacity="0.5" />
      {/* Valve body */}
      <circle cx="60" cy="82" r="18" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      {/* Disc */}
      <ellipse cx="60" cy="82" rx="6" ry="15" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1" transform="rotate(20 60 82)" />
      {/* Pipe stubs */}
      <line x1="24" y1="82" x2="42" y2="82" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="78" y1="82" x2="96" y2="82" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

const productIconMap = {
  'butterfly-damper-valves': ButterflyDamperIcon,
  'butterfly-valves': ButterflyValveIcon,
  'pneumatic-actuators': PneumaticActuatorIcon,
  'electric-actuators': ElectricActuatorIcon,
} as const;

export function ProductIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = productIconMap[slug as keyof typeof productIconMap];
  if (!Icon) return null;
  return <Icon className={className} />;
}
