export const BRANCHES=["Computer Science","Mathematics & Computing","Electronics","Mechanical","Civil","Chemical","Mining","Metallurgical","Pharmaceutical","Biochemical","Architecture","Other"];
export const QUESTIONNAIRE_STEPS=[
{key:"sleepSchedule",label:"Sleep schedule",sub:"When do you usually sleep?",options:[["EARLY_SLEEPER","🌅 Early sleeper"],["MODERATE_SLEEPER","😴 Moderate sleeper"],["NIGHT_OWL","🦉 Night owl"]]},
{key:"sleepLightPreference",label:"Light while sleeping",sub:"How sensitive are you to light at night?",options:[["NEEDS_DARKNESS","🌑 Needs darkness"],["DIM_LIGHT_OK","🕯 Dim light okay"],["DOESNT_MATTER","💡 Doesn't matter"]]},
{key:"phoneVolume",label:"Phone volume",sub:"How do you typically use your phone?",options:[["ALWAYS_USE_HEADPHONES","🎧 Always headphones"],["SOMETIMES_USE_SPEAKER","📱 Sometimes speaker"],["OFTEN_USE_SPEAKER","🔊 Often speaker"]]},
{key:"cleanliness",label:"Cleanliness",sub:"How would you describe your tidiness?",options:[["MESSY","🌀 Messy"],["SLIGHTLY_MESSY","🤷 Slightly messy"],["CLEAN","✨ Clean"],["VERY_CLEAN","🧹 Very clean"]]},
{key:"studyLocation",label:"Where you study",sub:"Your preferred study spot?",options:[["ROOM","🏠 In the room"],["READING_ROOM","📖 Reading room"],["LIBRARY","🏛 Library"]]},
{key:"needSilence",label:"Silence needed",sub:"Do you need quiet to focus?",options:[["true","🔇 Yes, I need silence"],["false","🎵 No, some noise is fine"]]},
{key:"guestPreference",label:"Guests",sub:"How do you feel about guests in the room?",options:[["DONT_LIKE_GUESTS","🚫 Prefer no guests"],["OCCASIONAL_GUESTS_ARE_FINE","👥 Occasional is fine"],["ENJOY_HAVING_GUESTS","🎉 Love having people over"]]},
{key:"personality",label:"Personality",sub:"How do you usually recharge?",options:[["INTROVERT","🌿 Introvert"],["AMBIVERT","⚖️ Ambivert"],["EXTROVERT","🌟 Extrovert"]]},
{key:"sharingPreference",label:"Sharing things",sub:"Okay with sharing items?",options:[["DONT_SHARE","🔒 Prefer not to share"],["ASK_FIRST","🤝 Ask first, happy to"],["HAPPY_TO_SHARE","💫 Happy to share"]]},
{key:"languageImportance",label:"Shared language",sub:"Does speaking the same language matter?",options:[["NOT_IMPORTANT","🌍 Not important"],["SOMEWHAT_IMPORTANT","💬 Somewhat important"],["VERY_IMPORTANT","🗣 Very important"]]},
{key:"substanceUse",label:"Substance use",sub:"Your comfort level with alcohol/smoking?",options:[["NEVER","🚭 Never"],["RARELY","🍃 Rarely"],["SOMETIMES","🍺 Sometimes"],["REGULARLY","🔄 Regularly"]]}];
export const CRITERIA_LABELS={SLEEP_SCHEDULE:"Sleep schedule",SLEEP_LIGHT_PREFERENCE:"Light preference",PHONE_VOLUME:"Phone volume",CLEANLINESS:"Cleanliness",STUDY_LOCATION:"Study location",NEED_SILENCE:"Need silence",GUEST_PREFERENCE:"Guests",PERSONALITY:"Personality",SHARING_PREFERENCE:"Sharing",LANGUAGE_IMPORTANCE:"Language",SUBSTANCE_USE:"Substance use"};
export const ALL_CRITERIA=Object.keys(CRITERIA_LABELS);
