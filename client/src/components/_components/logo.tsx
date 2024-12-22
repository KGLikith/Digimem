import React from 'react'

interface MemoryVaultLogoProps {
  className?: string;
  darkMode?: boolean;
}

const MemoryVaultLogo: React.FC<MemoryVaultLogoProps> = ({ className = "w-10 h-10", darkMode = false }) => {
  const bgColor = darkMode ? "#1A202C" : "#EDF2F7";
  const primaryColor = darkMode ? "#4299E1" : "#2B6CB0";
  const secondaryColor = darkMode ? "#ED8936" : "#C05621";
  const accentColor = darkMode ? "#A0AEC0" : "#4A5568";

  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="20" cy="20" r="20" fill={bgColor} />
      
      {/* Vault door */}
      <path
        d="M10 12C10 10.8954 10.8954 10 12 10H28C29.1046 10 30 10.8954 30 12V28C30 29.1046 29.1046 30 28 30H12C10.8954 30 10 29.1046 10 28V12Z"
        fill={primaryColor}
      />
      
      {/* Vault handle */}
      <circle cx="26" cy="20" r="2.5" fill={accentColor} />
      <circle cx="26" cy="20" r="1.5" fill={primaryColor} />
      
      {/* Digital elements */}
      <rect x="14" y="15" width="8" height="1.5" rx="0.75" fill={bgColor} />
      <rect x="14" y="19" width="8" height="1.5" rx="0.75" fill={bgColor} />
      <rect x="14" y="23" width="8" height="1.5" rx="0.75" fill={bgColor} />
      
      {/* Memory symbols */}
      <circle cx="12.5" cy="16" r="1" fill={secondaryColor} />
      <circle cx="12.5" cy="20" r="1" fill={secondaryColor} />
      <circle cx="12.5" cy="24" r="1" fill={secondaryColor} />
    </svg>
  )
}

export default MemoryVaultLogo

