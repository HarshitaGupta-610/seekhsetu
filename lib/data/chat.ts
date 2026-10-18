interface Rule {
  keywords: string[]
  en: string
  hi: string
}

const RULES: Rule[] = [
  {
    keywords: ['career', 'job', 'future', 'करियर', 'नौकरी', 'भविष्य'],
    en: 'You don’t need to choose a career right now. Try the interest discovery activity, then explore one pathway for a week. Notice what you enjoy — that is useful information. Open “Discover” to begin.',
    hi: 'आपको अभी करियर चुनने की ज़रूरत नहीं है। पहले “Discover” में रुचि खोज गतिविधि करें, फिर एक हफ़्ते तक एक रास्ता आज़माएँ। जो अच्छा लगे, उस पर ध्यान दें।',
  },
  {
    keywords: ['stream', 'science', 'commerce', 'arts', 'humanities', 'class 11', 'स्ट्रीम', 'विज्ञान', 'कॉमर्स'],
    en: 'Streams in Class 11–12 connect to different paths, but many careers accept more than one stream. Talk to your teacher about which subject combinations your school offers, and check each pathway in your roadmap for study routes.',
    hi: 'कक्षा 11–12 की स्ट्रीम अलग-अलग रास्तों से जुड़ी होती हैं, लेकिन कई करियर एक से ज़्यादा स्ट्रीम से संभव हैं। अपने शिक्षक से पूछें कि आपके स्कूल में कौन से विषय मिलते हैं।',
  },
  {
    keywords: ['skill', 'learn', 'practise', 'practice', 'कौशल', 'सीख'],
    en: 'Pick one skill and practise it in small steps. The Skill Planner shows useful skills for a goal and links each one to a lesson, challenge or project. Even 15 minutes a day adds up.',
    hi: 'एक कौशल चुनें और छोटे कदमों में अभ्यास करें। “Skill Planner” हर कौशल के लिए पाठ, चुनौती या प्रोजेक्ट दिखाता है। रोज़ 15 मिनट भी काफ़ी हैं।',
  },
  {
    keywords: ['challenge', 'week', 'चुनौती', 'हफ़्ते'],
    en: 'This week’s “One Skill, One Week” challenge is on the Challenges page. You can save a draft and finish later, and use low-cost materials from home.',
    hi: 'इस हफ़्ते की “एक कौशल, एक हफ़्ता” चुनौती Challenges पेज पर है। आप ड्राफ़्ट सेव करके बाद में पूरा कर सकते हैं।',
  },
  {
    keywords: ['scholarship', 'opportunit', 'competition', 'workshop', 'छात्रवृत्ति', 'अवसर', 'प्रतियोगिता'],
    en: 'The Opportunity Board lists opportunities you can filter by class and location. Listings should be verified — always check real scholarships on official government or institution websites with a trusted adult.',
    hi: 'Opportunity Board पर नमूना अवसर हैं जिन्हें आप कक्षा और जगह से फ़िल्टर कर सकते हैं। असली छात्रवृत्तियाँ हमेशा सरकारी या आधिकारिक वेबसाइट पर किसी बड़े के साथ जाँचें।',
  },
  {
    keywords: ['money', 'earn', 'income', 'paid', 'पैसे', 'कमाई'],
    en: 'Right now, focus on learning and building skills. Explore “Skills in action” to see safe next steps like practising, building a portfolio and volunteering. Always involve a trusted adult before any paid work.',
    hi: 'अभी सीखने और कौशल बनाने पर ध्यान दें। “Skills in action” में सुरक्षित अगले कदम देखें। किसी भी पैसे वाले काम से पहले किसी भरोसेमंद बड़े को ज़रूर शामिल करें।',
  },
  {
    keywords: ['project', 'प्रोजेक्ट'],
    en: 'Community projects help you practise real skills. Open Projects, pick one that fits your time, and record your progress step by step. Add it to your Skill Passport when you finish.',
    hi: 'सामुदायिक प्रोजेक्ट असली कौशल सिखाते हैं। Projects खोलें, एक चुनें और हर कदम पर प्रगति लिखें। पूरा होने पर Skill Passport में जोड़ें।',
  },
  {
    keywords: ['stress', 'sad', 'worried', 'pressure', 'तनाव', 'चिंता', 'दबाव'],
    en: 'It’s normal to feel unsure about the future. Please talk to a parent, teacher or school counsellor you trust. SeekhSetu’s guide is not a counsellor, but small steps can help you feel more confident.',
    hi: 'भविष्य को लेकर अनिश्चित महसूस करना सामान्य है। कृपया किसी भरोसेमंद माता-पिता, शिक्षक या स्कूल काउंसलर से बात करें। SeekhSetu गाइड काउंसलर नहीं है।',
  },
]

const FALLBACK = {
  en: 'Good question! I can help with interests, skills, challenges, projects and study pathways. Try asking “How do I choose a stream?” or “What skill should I practise?”. For important decisions, talk to a teacher or trusted adult.',
  hi: 'अच्छा सवाल! मैं रुचियों, कौशल, चुनौतियों, प्रोजेक्ट और पढ़ाई के रास्तों में मदद कर सकता हूँ। जैसे पूछें: “स्ट्रीम कैसे चुनूँ?” ज़रूरी फ़ैसलों के लिए किसी शिक्षक या बड़े से बात करें।',
}

export function getGuideReply(input: string, lang: 'en' | 'hi') {
  const text = input.toLowerCase()
  const rule = RULES.find((r) => r.keywords.some((k) => text.includes(k)))
  return rule ? rule[lang] : FALLBACK[lang]
}

export const CHAT_SUGGESTIONS = {
  en: ['How do I choose a stream?', 'What skill should I practise?', 'Show me this week’s challenge', 'Where can I find scholarships?'],
  hi: ['स्ट्रीम कैसे चुनूँ?', 'कौन सा कौशल सीखूँ?', 'इस हफ़्ते की चुनौती क्या है?', 'छात्रवृत्ति कहाँ मिलेगी?'],
}
