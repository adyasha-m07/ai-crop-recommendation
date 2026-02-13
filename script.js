/* ========== GLOBAL STATE ========== */
const WEATHER_API_KEY = "demo"; // demo mode
const WEATHER_API_BASE = "https://api.openweathermap.org/data/2.5/weather";
let currentLang = localStorage.getItem("lang") || "en";

/* ========== TRANSLATIONS ========== */
const translations = {
 en: {
    title: "🌾 AI Crop Recommendation",
    location: "Location (Village/City)",
    soil: "Soil Type",
    season: "Season",
    water: "Water Availability",
    submit: "Get Recommendation",
    reset: "Reset",
    soilOptions: { clay: "Clay", loam: "Loam", sandy: "Sandy", silt: "Silt", red: "Red Soil", black: "Black Soil" },
    seasonOptions: { kharif: "Kharif", rabi: "Rabi", zaid: "Zaid" },
    waterOptions: { high: "High", medium: "Medium", low: "Low" }
  },
  hi: {
    title: "🌾 एआई फसल अनुशंसा",
    location: "स्थान (गांव/शहर)",
    soil: "मिट्टी का प्रकार",
    season: "मौसम",
    water: "पानी की उपलब्धता",
    submit: "सिफारिश प्राप्त करें",
    reset: "रीसेट",
    soilOptions: { clay: "चिकनी", loam: "दोमट", sandy: "रेतीली", silt: "गाद", red: "लाल मिट्टी", black: "काली मिट्टी" },
    seasonOptions: { kharif: "खरीफ", rabi: "रबी", zaid: "ज़ायद" },
    waterOptions: { high: "अधिक", medium: "मध्यम", low: "कम" }
  },
  mr: {
    title: "🌾 एआय पीक शिफारस",
    location: "स्थान (गाव/शहर)",
    soil: "मातीचा प्रकार",
    season: "हंगाम",
    water: "पाण्याची उपलब्धता",
    submit: "शिफारस मिळवा",
    reset: "रीसेट",
    soilOptions: { clay: "चिकणमाती", loam: "दोमट", sandy: "वालुकामय", silt: "गाळ", red: "लाल माती", black: "काळी माती" },
    seasonOptions: { kharif: "खरीप", rabi: "रब्बी", zaid: "झायड" },
    waterOptions: { high: "जास्त", medium: "मध्यम", low: "कमी" }
  },
  ta: {
    title: "🌾 ஏஐ பயிர் பரிந்துரை",
    location: "இடம் (கிராமம்/நகரம்)",
    soil: "மண் வகை",
    season: "பருவம்",
    water: "நீர் கிடைக்கும் நிலை",
    submit: "பரிந்துரை பெறவும்",
    reset: "மறு அமைப்பு",
    soilOptions: { clay: "சரண் மண்", loam: "மண்வளம் மண்", sandy: "மணல் மண்", silt: "கரிமண்", red: "சிவப்பு மண்", black: "கருப்பு மண்" },
    seasonOptions: { kharif: "கரீஃப்", rabi: "ரபி", zaid: "ஜைத்" },
    waterOptions: { high: "அதிகம்", medium: "நடுத்தரம்", low: "குறைவு" }
  },
  te: {
    title: "🌾 ఏఐ పంట సిఫార్సు",
    location: "ప్రాంతం (గ్రామం/నగరం)",
    soil: "మట్టి రకం",
    season: "సీజన్",
    water: "నీటి లభ్యత",
    submit: "సిఫార్సు పొందండి",
    reset: "రిసెట్",
    soilOptions: { clay: "చిక్కటి మట్టి", loam: "లోమ్ మట్టి", sandy: "రేగడి మట్టి", silt: "సిల్ట్ మట్టి", red: "ఎర్ర మట్టి", black: "నల్ల మట్టి" },
    seasonOptions: { kharif: "ఖరీఫ్", rabi: "రబీ", zaid: "జైద్" },
    waterOptions: { high: "అధికం", medium: "మధ్యస్థం", low: "తక్కువ" }
  },
  kn: {
    title: "🌾 ಏಐ ಬೆಳೆ ಶಿಫಾರಸು",
    location: "ಸ್ಥಳ (ಹಳ್ಳಿ/ನಗರ)",
    soil: "ಮಣ್ಣು ಪ್ರಕಾರ",
    season: "ಹಂಗಾಮು",
    water: "ನೀರು ಲಭ್ಯತೆ",
    submit: "ಶಿಫಾರಸು ಪಡೆಯಿರಿ",
    reset: "ಮರುಹೊಂದಿಸಿ",
    soilOptions: { clay: "ಚೆಪ್ಪಾದ ಮಣ್ಣು", loam: "ಲೋಮ್ ಮಣ್ಣು", sandy: "ಮರಳು ಮಣ್ಣು", silt: "ಸಿಲ್ಟ್ ಮಣ್ಣು", red: "ಕೆಂಪು ಮಣ್ಣು", black: "ಕಪ್ಪು ಮಣ್ಣು" },
    seasonOptions: { kharif: "ಖರೀಫ್", rabi: "ರಬೀ", zaid: "ಜಾಯ್ಡ್" },
    waterOptions: { high: "ಹೆಚ್ಚು", medium: "ಮಧ್ಯಮ", low: "ಕಡಿಮೆ" }
  },
  gu: {
    title: "🌾 એઆઈ પાક ભલામણ",
    location: "સ્થળ (ગામ/શહેર)",
    soil: "માટીની જાત",
    season: "મોસમ",
    water: "પાણી ઉપલબ્ધતા",
    submit: "ભલામણ મેળવો",
    reset: "રીસેટ",
    soilOptions: { clay: "ચીકણી માટી", loam: "દોળિયાળી માટી", sandy: "વાલુકામય માટી", silt: "ગાદવાળી માટી", red: "લાલ માટી", black: "કાળી માટી" },
    seasonOptions: { kharif: "ખરીફ", rabi: "રવિ", zaid: "ઝાયદ" },
    waterOptions: { high: "વધારે", medium: "મધ્યમ", low: "ઓછું" }
  },
  or: {
    title: "🌾 AI ଫସଲ ପରାମର୍ଶ",
    location: "ଅବସ୍ଥିତି (ଗାଁ/ସହର)",
    soil: "ମାଟି ପ୍ରକାର",
    season: "ଋତୁ",
    water: "ପାଣି ଉପଲବ୍ଧତା",
    submit: "ଫସଲ ସୁପାରିଶ କରନ୍ତୁ",
    reset: "ପୁନଃସେଟ୍",
    soilOptions: { clay: "ଦଳିଆ ମାଟି", loam: "ଦୋଆଁଶ ମାଟି", sandy: "ବାଲୁକାମୟ ମାଟି", silt: "ସିଲ୍ଟ ମାଟି", red: "ଲାଲ ମାଟି", black: "କଳା ମାଟି" },
    seasonOptions: { kharif: "ଖରିଫ", rabi: "ରବି", zaid: "ଗ୍ରୀଷ୍ମ" },
    waterOptions: { high: "ଅଧିକ", medium: "ମଧ୍ୟମ", low: "କମ" }
  },
  bn: {
    title: "🌾 এআই ফসল পরামর্শ",
    location: "অবস্থান (গ্রাম/শহর)",
    soil: "মাটির ধরণ",
    season: "মৌসুম",
    water: "জল উপলভ্যতা",
    submit: "পরামর্শ পান",
    reset: "রিসেট",
    soilOptions: { clay: "এঁটেল মাটি", loam: "দোআঁশ মাটি", sandy: "বেলে মাটি", silt: "পলিমাটি", red: "লাল মাটি", black: "কালো মাটি" },
    seasonOptions: { kharif: "খরিফ", rabi: "রবি", zaid: "জায়েদ" },
    waterOptions: { high: "উচ্চ", medium: "মাঝারি", low: "কম" }
  },
  ml: {
    title: "🌾 എഐ വിള ശിപാർശ",
    location: "സ്ഥലം (ഗ്രാമം/നഗരം)",
    soil: "മണ്ണിന്റെ തരങ്ങൾ",
    season: "കാലാവസ്ഥ",
    water: "വെള്ള ലഭ്യത",
    submit: "ശിപാർശ നേടുക",
    reset: "പുനഃസജ്ജമാക്കുക",
    soilOptions: { clay: "മണ്ണു ചുരണ്ട്", loam: "ലോം മണ്ണ്", sandy: "മണ്ണ് മണൽ", silt: "സിൽട്ട് മണ്ണ്", red: "ചുവപ്പ് മണ്ണ്", black: "കറുപ്പ് മണ്ണ്" },
    seasonOptions: { kharif: "ഖരിഫ്", rabi: "റബി", zaid: "സുമർ" },
    waterOptions: { high: "ഉയർന്ന", medium: "മധ്യമ", low: "കുറഞ്ഞ" }
  },
  pa: {
    title: "🌾 ਏਆਈ ਫਸਲ ਸਿਫ਼ਾਰਸ਼",
    location: "ਸਥਾਨ (ਪਿੰਡ/ਸ਼ਹਿਰ)",
    soil: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ",
    season: "ਮੌਸਮ",
    water: "ਪਾਣੀ ਉਪਲਬਧਤਾ",
    submit: "ਸਿਫ਼ਾਰਸ਼ ਪ੍ਰਾਪਤ ਕਰੋ",
    reset: "ਰੀਸੈਟ",
    soilOptions: { clay: "ਚਿੱਟੀ ਮਿੱਟੀ", loam: "ਦੋਮਟ ਮਿੱਟੀ", sandy: "ਰੇਤਲੀ ਮਿੱਟੀ", silt: "ਸਿਲਟ ਮਿੱਟੀ", red: "ਲਾਲ ਮਿੱਟੀ", black: "ਕਾਲੀ ਮਿੱਟੀ" },
    seasonOptions: { kharif: "ਖਰੀਫ", rabi: "ਰਬੀ", zaid: "ਜੈਦ" },
    waterOptions: { high: "ਵਧੇਰੇ", medium: "ਦਰਮਿਆਨਾ", low: "ਘੱਟ" }
  },
  as: {
    title: "🌾 এআই শস্য পৰামৰ্শ",
    location: "অৱস্থান (গ্ৰাম/চহৰ)",
    soil: "মাটিৰ প্ৰকাৰ",
    season: "মৌসম",
    water: "পানী উপলব্ধতা",
    submit: "পৰামৰ্শ লাভ কৰক",
    reset: "পুনঃসেট",
    soilOptions: { clay: "মাটি চিকচিকীয়া", loam: "দোমট মাটি", sandy: "বালিৰ মাটি", silt: "পলি মাটি", red: "ৰঙা মাটি", black: "কালা মাটি" },
    seasonOptions: { kharif: "খৰিফ", rabi: "ৰবী", zaid: "গ্ৰীষ্ম" },
    waterOptions: { high: "উচ্চ", medium: "মধ্যম", low: "নিম্ন" }
  },
  sd: {
    title: "🌾 AI فصل جي سفارش",
    location: "جڳھ (ڳوٺ/شهر)",
    soil: "مٽي جو قسم",
    season: "موسم",
    water: "پاڻي جي دستيابي",
    submit: "سفارش حاصل ڪريو",
    reset: "ري سيٽ",
    soilOptions: { clay: "چکڻ مٽي", loam: "لويم مٽي", sandy: "ريت واري مٽي", silt: "سيلٽ مٽي", red: "ڳاڙهي مٽي", black: "ڪاري مٽي" },
    seasonOptions: { kharif: "کريف", rabi: "ربي", zaid: "زائد" },
    waterOptions: { high: "وڌيڪ", medium: "وچولي", low: "گهٽ" }
  },
  ks: {
    title: "🌾 اے آئی فصل کی سفارش",
    location: "جگہ (گاؤں/شہر)",
    soil: "مٹی کی قسم",
    season: "موسم",
    water: "پانی کی دستیابی",
    submit: "سفارش حاصل کریں",
    reset: "ری سیٹ",
    soilOptions: { clay: "چکنی مٹی", loam: "ڈومٹ مٹی", sandy: "ریتلی مٹی", silt: "سلٹ مٹی", red: "سرخ مٹی", black: "سیاہ مٹی" },
    seasonOptions: { kharif: "کھریف", rabi: "ربی", zaid: "زائد" },
    waterOptions: { high: "زیادہ", medium: "درمیانہ", low: "کم" }
  }
};

/* ========== CROP DATA ========== */
const crops = [
  { name: { en: "Rice", hi: "चावल" }, icon: "🌾", seasons: ["kharif"], soils: ["clay","loam"], water: ["high"], yield: "4-6 ton/ha", duration: "120 days", fertilizer: ["NPK"], minTemp: 20, maxTemp: 35 },
  { name: { en: "Wheat", hi: "गेहूं" }, icon: "🌱", seasons: ["rabi"], soils: ["loam"], water: ["medium"], yield: "3-4 ton/ha", duration: "110 days", fertilizer: ["Urea"], minTemp: 10, maxTemp: 25 }
];

/* ========== LANGUAGE FUNCTIONS ========== */
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  updateUI();
  toggleDropdown(false);
}

function updateUI() {
  const t = translations[currentLang];
  if (!t) return;

  // Update headings and labels
  document.querySelectorAll("[data-translate]").forEach(el => {
    const key = el.getAttribute("data-translate");
    if(t[key]) el.innerText = t[key];
  });

  // Update select options
  updateSelectOptions("soil", t.soilOptions);
  updateSelectOptions("season", t.seasonOptions);
  updateSelectOptions("water", t.waterOptions);
}

function updateSelectOptions(selectId, optionsObj) {
  const select = document.getElementById(selectId);
  if(!select || !optionsObj) return;
  Array.from(select.options).forEach(option => {
    if(optionsObj[option.value]) option.text = optionsObj[option.value];
  });
}

/* ========== DROPDOWN ========== */
function toggleDropdown(force) {
  const menu = document.getElementById("languageMenu");
  if(!menu) return;
  if(typeof force === "boolean") {
    force ? menu.classList.add("show") : menu.classList.remove("show");
  } else {
    menu.classList.toggle("show");
  }
}

/* ========== WEATHER ========== */
async function getWeatherInfo(location) {
  if(WEATHER_API_KEY === "demo") return { temperature: 30, humidity: 40 };
  try {
    const res = await fetch(`${WEATHER_API_BASE}?q=${location}&appid=${WEATHER_API_KEY}&units=metric`);
    const data = await res.json();
    return { temperature: data.main.temp, humidity: data.main.humidity };
  } catch { return { temperature: 30, humidity: 40 }; }
}

/* ========== RECOMMENDATION LOGIC ========== */
function getRecommendations(soil, season, water, weather) {
  return crops.map(crop => {
    let score = 0;
    if(crop.soils.includes(soil)) score += 3;
    if(crop.seasons.includes(season)) score += 3;
    if(crop.water.includes(water)) score += 2;
    if(weather.temperature >= crop.minTemp && weather.temperature <= crop.maxTemp) score += 2;
    return {...crop, score};
  }).filter(c => c.score >= 5).sort((a,b)=>b.score - a.score).slice(0,3);
}

/* ========== DISPLAY RESULTS ========== */
function displayResults(list) {
  const container = document.getElementById("cropResults");
  container.innerHTML = "";
  if(list.length === 0) {
    container.innerHTML = `<p>No suitable crops found for your selection.</p>`;
    return;
  }
  list.forEach((crop,i) => {
    const card = document.createElement("div");
    card.className = "crop-card";
    card.innerHTML = `
      <h3>${i+1}. ${crop.icon} ${crop.name[currentLang] || crop.name.en}</h3>
      <p>Yield: ${crop.yield}</p>
      <p>Duration: ${crop.duration}</p>
      <p>Fertilizer: ${crop.fertilizer.join(", ")}</p>
      <p>Score: ${crop.score}/10</p>
    `;
    container.appendChild(card);
  });
}

/* ========== FORM HANDLER ========== */
async function handleFormSubmit(event) {
  event.preventDefault();
  const soil = document.getElementById("soil").value;
  const season = document.getElementById("season").value;
  const water = document.getElementById("water").value;
  const location = document.getElementById("location").value;
  const weather = await getWeatherInfo(location);
  const recommendations = getRecommendations(soil, season, water, weather);
  displayResults(recommendations);
}

/* ========== RESET FORM ========== */
function resetForm() {
  document.getElementById("cropForm").reset();
  document.getElementById("cropResults").innerHTML = "";
}

/* ========== INIT ========== */
document.addEventListener("DOMContentLoaded", () => updateUI());
