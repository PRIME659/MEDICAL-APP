"use client";

import { createContext, useContext, useState, useEffect } from "react";

const translations = {
  en: {
    welcome: "Welcome to PrimeHealth",
    tagline: "Find doctors, book appointments, and access pharmacy drugs easily.",
    findDoctor: "Find a Doctor",
    browsePharmacy: "Browse Pharmacy",
    medicalTips: "Medical Tips",
    medicalTipsDesc: "Daily health tips will appear here using a medical tips API later.",
    doctors: "Doctors",
    pharmacy: "Pharmacy",
    appointments: "Appointments",
    dashboard: "Dashboard",
    home: "Home",
    bookAppointment: "Book an Appointment",
    bookDesc: "Fill out the form below to schedule an appointment with a doctor.",
    login: "Login",
    signUp: "Sign Up",
    logout: "Log Out",
    myDashboard: "My Dashboard",
    faq: "FAQ",
  },
  fr: {
    welcome: "Bienvenue sur PrimeHealth",
    tagline: "Trouvez des médecins, prenez des rendez-vous et accédez facilement aux médicaments.",
    findDoctor: "Trouver un Médecin",
    browsePharmacy: "Parcourir la Pharmacie",
    medicalTips: "Conseils Médicaux",
    medicalTipsDesc: "Les conseils de santé quotidiens apparaîtront ici plus tard.",
    doctors: "Médecins",
    pharmacy: "Pharmacie",
    appointments: "Rendez-vous",
    dashboard: "Tableau de bord",
    home: "Accueil",
    bookAppointment: "Prendre un Rendez-vous",
    bookDesc: "Remplissez le formulaire ci-dessous pour planifier un rendez-vous.",
    login: "Connexion",
    signUp: "S'inscrire",
    logout: "Se déconnecter",
    myDashboard: "Mon Tableau de bord",
    faq: "FAQ",
  },
  yo: {
    welcome: "Kaabo si PrimeHealth",
    tagline: "Wa awon dokita, ṣeto awon ipade, ki o si wọle si awon oogun.",
    findDoctor: "Wa Dokita",
    browsePharmacy: "Wo Ile Oogun",
    medicalTips: "Imoran Ilera",
    medicalTipsDesc: "Awon imoran ilera ojoojumo yoo han nibi nigbamii.",
    doctors: "Awon Dokita",
    pharmacy: "Ile Oogun",
    appointments: "Awon Ipade",
    dashboard: "Ibi Iṣakoso",
    home: "Ile",
    bookAppointment: "Ṣeto Ipade",
    bookDesc: "Kun fọọmu ti o wa ni isalẹ lati ṣeto ipade pẹlu dokita.",
    login: "Wọle",
    signUp: "Forukọsilẹ",
    logout: "Jade",
    myDashboard: "Ibi Iṣakoso Mi",
    faq: "Awon Ibeere",
  },
  ha: {
    welcome: "Barka da zuwa PrimeHealth",
    tagline: "Nemi likitoci, yi alƙawari, kuma sami magunguna cikin sauƙi.",
    findDoctor: "Nemi Likita",
    browsePharmacy: "Duba Magatakardar",
    medicalTips: "Shawarwarin Lafiya",
    medicalTipsDesc: "Shawarwarin lafiya na yau da kullum za su bayyana anan daga baya.",
    doctors: "Likitoci",
    pharmacy: "Magatakardar",
    appointments: "Alƙawura",
    dashboard: "Dashboard",
    home: "Gida",
    bookAppointment: "Yi Alƙawari",
    bookDesc: "Cika fom da ke ƙasa don tsara alƙawari tare da likita.",
    login: "Shiga",
    signUp: "Yi rajista",
    logout: "Fita",
    myDashboard: "Dashboard Na",
    faq: "Tambayoyi",
  },
  ig: {
    welcome: "Nnọọ na PrimeHealth",
    tagline: "Chọta ndị dọkịta, kee oge ụlọ ọrịa, wee nweta ọgwụ n'ụzọ dị mfe.",
    findDoctor: "Chọta Dọkịta",
    browsePharmacy: "Lee Ụlọ Ọgwụ",
    medicalTips: "Ndụmọdụ Ahụike",
    medicalTipsDesc: "Ndụmọdụ ahụike kwa ụbọchị ga-apụta ebe a ka e mesịa.",
    doctors: "Ndị Dọkịta",
    pharmacy: "Ụlọ Ọgwụ",
    appointments: "Oge Ụlọ Ọrịa",
    dashboard: "Dashboard",
    home: "Ụlọ",
    bookAppointment: "Kee Oge Ụlọ Ọrịa",
    bookDesc: "Juzu fọọm dị n'okpuru iji hazi oge ụlọ ọrịa na dọkịta.",
    login: "Banye",
    signUp: "Debanye aha",
    logout: "Pụọ",
    myDashboard: "Dashboard M",
    faq: "Ajụjụ",
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved) setLanguage(saved);
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}