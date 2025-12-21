export interface MentalHealthResource {
  name: string
  phone: string[]
  description: string
  availability: string
  type: "crisis" | "counseling" | "emergency" | "substance"
}

export const nigerianMentalHealthResources: MentalHealthResource[] = [
  {
    name: "Mentally Aware Nigeria Initiative (MANI)",
    phone: ["0809 111 6264", "0811 1680 686"],
    description: "24-hour crisis helpline with trained mental health professionals",
    availability: "24/7",
    type: "crisis",
  },
  {
    name: "Lagos Lifeline",
    phone: ["09090006463"],
    description: "Free psychosocial support, counseling, and psychotherapy services",
    availability: "Daily",
    type: "counseling",
  },
  {
    name: "Yaba Voice Crisis Line",
    phone: ["08138209409", "08075251315", "09029944321"],
    description: "Mental health crisis support and counseling",
    availability: "Daily",
    type: "crisis",
  },
  {
    name: "Suicide Research and Prevention Initiative (SURPIN)",
    phone: ["09080217555", "09034400009", "08111909909", "07013811143"],
    description: "Suicide prevention hotline with trained counselors",
    availability: "24/7",
    type: "crisis",
  },
  {
    name: "Nigerian Suicide Prevention Initiative",
    phone: ["0806 210 6493", "0809 210 6493"],
    description: "Specialized suicide prevention counseling center",
    availability: "24/7",
    type: "crisis",
  },
  {
    name: "Lagos State Government Suicide Hotlines",
    phone: ["08058820777", "09030000741"],
    description: "Government-run suicide prevention and crisis support",
    availability: "24/7",
    type: "crisis",
  },
  {
    name: "National Emergency Hotline",
    phone: ["112"],
    description: "National emergency services including mental health crises",
    availability: "24/7",
    type: "emergency",
  },
  {
    name: "Lagos Emergency Hotline",
    phone: ["767"],
    description: "Lagos state emergency services including crisis intervention",
    availability: "24/7",
    type: "emergency",
  },
  {
    name: "NDLEA Substance Abuse Helpline",
    phone: ["0800 1020 3040"],
    description: "Free 24/7 support for substance abuse and addiction",
    availability: "24/7",
    type: "substance",
  },
]

export function getResourcesByType(type?: MentalHealthResource["type"]) {
  if (!type) return nigerianMentalHealthResources
  return nigerianMentalHealthResources.filter((resource) => resource.type === type)
}
