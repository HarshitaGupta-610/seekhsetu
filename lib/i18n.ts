'use client'

import { useAppState } from '@/lib/store'
import type { Language } from '@/lib/types'

export const LANGUAGE_OPTIONS: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिन्दी' },
  { value: 'bn', label: 'বাংলা' },
]

const COPY = {
  en: {
    language: 'Language', home: 'Home', roadmap: 'Roadmap', challenge: 'Challenge', passport: 'Passport', more: 'More',
    journey: 'Your journey', practise: 'Practise & show', explore: 'Explore', settings: 'Settings', discover: 'Discover interests',
    myRoadmap: 'My roadmap', lessons: 'Lessons', planner: 'Skill planner', weeklyChallenge: 'Weekly challenge', projects: 'Community projects',
    skillPassport: 'Skill Passport', opportunities: 'Opportunity board', skillsInAction: 'Skills in action', guides: 'Ask a Local Guide',
    ask: 'Ask SeekhSetu', saved: 'Saved for later', profile: 'Profile & settings', facilitator: 'Facilitator view',
    openMenu: 'Open menu', closeMenu: 'Close menu', forTeachers: 'For teachers', openApp: 'Open app',
    students: 'For students from Class 9 onwards', hero: 'Small steps can open new paths.',
    heroText: "SeekhSetu is your learning bridge. Start with what interests you, try small practical challenges, and build a record of what you've practised — without having to choose a career today.",
    start: 'Start your journey', free: 'Free learning companion · Your progress stays on this device',
    fiveSteps: 'Five steps across the bridge', fiveStepsText: 'Move at your own pace. Every step is small, and you can come back any time.',
    safe: 'Built to be safe and honest', footer: "SeekhSetu · Learn, practise, and show what you've practised.",
  },
  hi: {
    language: 'भाषा', home: 'होम', roadmap: 'रोडमैप', challenge: 'चुनौती', passport: 'पासपोर्ट', more: 'और',
    journey: 'आपकी यात्रा', practise: 'अभ्यास और प्रदर्शन', explore: 'खोजें', settings: 'सेटिंग्स', discover: 'रुचियां खोजें',
    myRoadmap: 'मेरा रोडमैप', lessons: 'पाठ', planner: 'कौशल योजनाकार', weeklyChallenge: 'साप्ताहिक चुनौती', projects: 'सामुदायिक प्रोजेक्ट',
    skillPassport: 'कौशल पासपोर्ट', opportunities: 'अवसर बोर्ड', skillsInAction: 'कौशल का उपयोग', guides: 'स्थानीय गाइड से पूछें',
    ask: 'SeekhSetu से पूछें', saved: 'बाद के लिए सेव', profile: 'प्रोफाइल और सेटिंग्स', facilitator: 'फैसिलिटेटर व्यू',
    openMenu: 'मेन्यू खोलें', closeMenu: 'मेन्यू बंद करें', forTeachers: 'शिक्षकों के लिए', openApp: 'ऐप खोलें',
    students: 'कक्षा 9 और उससे ऊपर के विद्यार्थियों के लिए', hero: 'छोटे कदम नए रास्ते खोल सकते हैं।',
    heroText: 'SeekhSetu आपका सीखने का पुल है। अपनी रुचि से शुरुआत करें, छोटे व्यावहारिक अभ्यास आजमाएं और अपनी प्रगति का रिकॉर्ड बनाएं — आज ही करियर चुनना जरूरी नहीं है।',
    start: 'अपनी यात्रा शुरू करें', free: 'मुफ्त सीखने का साथी · आपकी प्रगति इसी डिवाइस पर रहती है',
    fiveSteps: 'पुल के पांच कदम', fiveStepsText: 'अपनी गति से आगे बढ़ें। हर कदम छोटा है और आप कभी भी वापस आ सकते हैं।',
    safe: 'सुरक्षित और ईमानदार सीखने के लिए', footer: 'SeekhSetu · सीखें, अभ्यास करें और अपनी प्रगति दिखाएं।',
  },
  bn: {
    language: 'ভাষা', home: 'হোম', roadmap: 'রোডম্যাপ', challenge: 'চ্যালেঞ্জ', passport: 'পাসপোর্ট', more: 'আরও',
    journey: 'আপনার যাত্রা', practise: 'অনুশীলন ও দেখান', explore: 'অন্বেষণ', settings: 'সেটিংস', discover: 'আগ্রহ খুঁজুন',
    myRoadmap: 'আমার রোডম্যাপ', lessons: 'পাঠ', planner: 'দক্ষতা পরিকল্পনা', weeklyChallenge: 'সাপ্তাহিক চ্যালেঞ্জ', projects: 'কমিউনিটি প্রজেক্ট',
    skillPassport: 'দক্ষতা পাসপোর্ট', opportunities: 'সুযোগের বোর্ড', skillsInAction: 'কাজে দক্ষতা', guides: 'স্থানীয় গাইডকে জিজ্ঞেস করুন',
    ask: 'SeekhSetu-কে জিজ্ঞেস করুন', saved: 'পরে দেখার জন্য সেভ', profile: 'প্রোফাইল ও সেটিংস', facilitator: 'ফ্যাসিলিটেটর ভিউ',
    openMenu: 'মেনু খুলুন', closeMenu: 'মেনু বন্ধ করুন', forTeachers: 'শিক্ষকদের জন্য', openApp: 'অ্যাপ খুলুন',
    students: 'নবম শ্রেণি ও তার উপরের শিক্ষার্থীদের জন্য', hero: 'ছোট পদক্ষেপ নতুন পথ খুলে দিতে পারে।',
    heroText: 'SeekhSetu আপনার শেখার সেতু। আপনার আগ্রহ দিয়ে শুরু করুন, ছোট বাস্তব অনুশীলন করুন এবং আপনার শেখার রেকর্ড তৈরি করুন — আজই পেশা বেছে নেওয়া জরুরি নয়।',
    start: 'আপনার যাত্রা শুরু করুন', free: 'বিনামূল্যের শেখার সঙ্গী · আপনার অগ্রগতি এই ডিভাইসেই থাকে',
    fiveSteps: 'সেতু পার হওয়ার পাঁচ ধাপ', fiveStepsText: 'নিজের গতিতে এগিয়ে চলুন। প্রতিটি ধাপ ছোট, যখন খুশি ফিরে আসতে পারেন।',
    safe: 'নিরাপদ ও সৎভাবে তৈরি', footer: 'SeekhSetu · শিখুন, অনুশীলন করুন এবং আপনার শেখা দেখান।',
  },
} as const

export type TranslationKey = keyof typeof COPY.en
export function getCopy(language: Language = 'en') {
  return COPY[language === 'hi' || language === 'bn' ? language : 'en']
}
export function useCopy() {
  const state = useAppState()
  return getCopy(state?.profile?.language ?? state?.chatLang ?? 'en')
}
