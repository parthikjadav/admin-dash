import { sidebarLinksType } from "@/types";

export const sidebarLinks: sidebarLinksType[] = [
    {
        title: "Events",
        links: [
            {
                icon: "/icons/ticket.svg",
                title: "Events",
                href: "/events"
            },
            {
                icon: "/icons/settings.svg",
                title: "Events Settings",
                href: "/settings"
            }
        ]
    },
    {
        title: "Sales",
        links: [
            {
                icon: "/icons/funnel.svg",
                title: "Event Sales",
                href: "/sales"
            },
            {
                icon: "/icons/booking.svg",
                title: "Event Booking",
                href: "/booking"
            }
        ] 
    }
]

export const config = {
    CLOUDINARY_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
    CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
    CLOUDINARY_API_SECRET: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET!,
    CLOUDINARY_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!
}

export const EventStatus = {
    DRAFT: "DRAFT",
    PUBLISHED: "PUBLISHED",
}

export const textEditorLinks = [
    "File",
    "Edit",
    "Insert",
    "Format",
    "Tools",
    "Table"
]

export const indianCities = [
  { label: "Mumbai", value: "mumbai" },
  { label: "Delhi", value: "delhi" },
  { label: "Bengaluru", value: "bengaluru" },
  { label: "Hyderabad", value: "hyderabad" },
  { label: "Ahmedabad", value: "ahmedabad" },
  { label: "Chennai", value: "chennai" },
  { label: "Kolkata", value: "kolkata" },
  { label: "Pune", value: "pune" },
  { label: "Jaipur", value: "jaipur" },
  { label: "Surat", value: "surat" },
  { label: "Lucknow", value: "lucknow" },
  { label: "Kanpur", value: "kanpur" },
  { label: "Nagpur", value: "nagpur" },
  { label: "Indore", value: "indore" },
  { label: "Bhopal", value: "bhopal" },
  { label: "Patna", value: "patna" },
  { label: "Ludhiana", value: "ludhiana" },
  { label: "Agra", value: "agra" },
  { label: "Nashik", value: "nashik" },
  { label: "Vadodara", value: "vadodara" },
  { label: "Faridabad", value: "faridabad" },
  { label: "Rajkot", value: "rajkot" },
  { label: "Meerut", value: "meerut" },
  { label: "Varanasi", value: "varanasi" },
  { label: "Amritsar", value: "amritsar" },
  { label: "Visakhapatnam", value: "visakhapatnam" },
  { label: "Coimbatore", value: "coimbatore" },
  { label: "Thane", value: "thane" },
  { label: "Guwahati", value: "guwahati" },
  { label: "Chandigarh", value: "chandigarh" }
];


export const indianStates = [
  { label: "Andhra Pradesh", value: "andhra_pradesh" },
  { label: "Arunachal Pradesh", value: "arunachal_pradesh" },
  { label: "Assam", value: "assam" },
  { label: "Bihar", value: "bihar" },
  { label: "Chhattisgarh", value: "chhattisgarh" },
  { label: "Goa", value: "goa" },
  { label: "Gujarat", value: "gujarat" },
  { label: "Haryana", value: "haryana" },
  { label: "Himachal Pradesh", value: "himachal_pradesh" },
  { label: "Jharkhand", value: "jharkhand" },
  { label: "Karnataka", value: "karnataka" },
  { label: "Kerala", value: "kerala" },
  { label: "Madhya Pradesh", value: "madhya_pradesh" },
  { label: "Maharashtra", value: "maharashtra" },
  { label: "Manipur", value: "manipur" },
  { label: "Meghalaya", value: "meghalaya" },
  { label: "Mizoram", value: "mizoram" },
  { label: "Nagaland", value: "nagaland" },
  { label: "Odisha", value: "odisha" },
  { label: "Punjab", value: "punjab" },
  { label: "Rajasthan", value: "rajasthan" },
  { label: "Sikkim", value: "sikkim" },
  { label: "Tamil Nadu", value: "tamil_nadu" },
  { label: "Telangana", value: "telangana" },
  { label: "Tripura", value: "tripura" },
  { label: "Uttar Pradesh", value: "uttar_pradesh" },
  { label: "Uttarakhand", value: "uttarakhand" },
  { label: "West Bengal", value: "west_bengal" }
];

export const countries = [
  { label: "United States", value: "united_states" },
  { label: "Canada", value: "canada" },
  { label: "United Kingdom", value: "united_kingdom" },
  { label: "Germany", value: "germany" },
  { label: "France", value: "france" },
  { label: "Italy", value: "italy" },
  { label: "Spain", value: "spain" },
  { label: "India", value: "india" },
  { label: "China", value: "china" },
  { label: "Japan", value: "japan" },
  { label: "South Korea", value: "south_korea" },
  { label: "Australia", value: "australia" },
  { label: "Brazil", value: "brazil" },
  { label: "Mexico", value: "mexico" },
  { label: "Russia", value: "russia" },
  { label: "South Africa", value: "south_africa" },
  { label: "Indonesia", value: "indonesia" },
  { label: "Saudi Arabia", value: "saudi_arabia" },
  { label: "Turkey", value: "turkey" },
  { label: "Netherlands", value: "netherlands" }
];

export const fontFamilies = [
    {
      label: "Inter",
      value: "Inter"
    },
    {
      label: "Arial",
      value: "Arial"
    },
    {
      label: "Georgia",
      value: "Georgia"
    },
    {
      label: "Fira Code",
      value: "'Fira Code'"
    },
    {
      label: "Helvetica",
      value: "Helvetica"
    },
    {
      label: "poppins",
      value: "poppins"
    }
]

export const fontSizes = [
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "22px",
    "24px",
    "26px",
    "28px",
    "30px"
]