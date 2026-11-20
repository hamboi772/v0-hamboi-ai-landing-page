export interface MentalHealthResource {
  name: string
  phone: string[]
  website?: string
  description: string
  availability: string
  type: "crisis" | "counseling" | "emergency" | "substance"
}

export const nigerianMentalHealthResources: MentalHealthResource[] = [
  {
    name: "Mentally Aware Nigeria Initiative (MANI)",
    phone: [],
    website: "https://mentallyaware.org",
    description: "Visit the official website for current support options and contact details. Availability may vary.",
    availability: "Check the official website",
    type: "counseling",
  },
]

export function getResourcesByType(type?: MentalHealthResource["type"]) {
  if (!type) return nigerianMentalHealthResources
  return nigerianMentalHealthResources.filter((resource) => resource.type === type)
}
