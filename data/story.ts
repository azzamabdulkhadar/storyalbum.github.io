/**
 * Static content pack (Version 1), served as a static data file.
 */

export const profile = {
  name: "Her Name",
  nickname: "Nick",
  birthday: "05th (Nov)",
  hometown: "City, Earth",
  favoriteColor: "Lavender",
  favoriteFood: "Pasta, Chocolate",
  hobbies: "Reading, Music, Photography",
  personality: "Kind, Caring, Funny, Stubborn",
  littleHabits: "Overthinks, Talks to herself, Laughs a lot",
  thingsSheLoves: [
    "Nature & sunsets",
    "Good music",
    "Rainy days",
    "Her family & friends",
    "Cute things",
    "Long conversations",
  ],
};

export type Chapter = {
  year: string;
  title: string;
  text: string;
  preset: string;
  src?: string;
};

export const chapters: Chapter[] = [
  { year: "2004", title: "The Beginning", text: "She came into this world with a heart full of love and endless possibilities.", preset: "dawn", src: "/images/pic4.jpg" },
  { year: "2010", title: "Childhood", text: "Tiny hands, big dreams.", preset: "meadow", src: "/images/pic13.jpg" },
  { year: "2015", title: "Growing Up", text: "School, friends & countless memories.", preset: "bloom", src: "/images/pic2.jpg" },
  { year: "2019", title: "Teenage Years", text: "New dreams. New people. New emotions.", preset: "sunset", src: "/images/pic11.jpg" },
  { year: "2023", title: "A New Chapter", text: "Life started changing.", preset: "sea", src: "/images/pic12.jpg" },
  { year: "2026", title: "Present", text: "The girl she has become.", preset: "night", src: "/images/home-2.jpg" },
];

export type Memory = {
  id: string;
  title: string;
  date: string;
  note: string;
  category: string;
  preset: string;
  src?: string;
  tall?: boolean;
};

export const memoryCategories = [
  "All", "Childhood", "School", "Friends", "Family", "College", "Trips", "Birthdays", "Random",
];

export const memories: Memory[] = [
  { id: "m1", title: "Golden hour with her", date: "12 Sep 2024", note: "A completely ordinary day that somehow became a beautiful memory.", category: "Friends", preset: "sunset", src: "/images/pic2.jpg" },
  { id: "m2", title: "Under the stars", date: "04 Jan 2025", note: "Counting stars and losing count.", category: "Trips", preset: "night", tall: true, src: "/images/pic3.jpg" },
  { id: "m3", title: "Chai & conversations", date: "21 Nov 2024", note: "Where every problem felt smaller.", category: "Family", preset: "dawn", src: "/images/pic4.jpg" },
  { id: "m4", title: "The birthday cake", date: "05 Nov 2024", note: "She wished. We pretended not to watch.", category: "Birthdays", preset: "bloom", src: "/images/pic5.jpg" },
  { id: "m5", title: "School corridor laughs", date: "14 Feb 2019", note: "Laughing too loud in a quiet corridor.", category: "School", preset: "meadow", src: "/images/pic6.jpg" },
  { id: "m6", title: "First trip together", date: "02 Jun 2023", note: "Where the map ended, the fun began.", category: "Trips", preset: "sea", src: "/images/pic7.jpg" },
  { id: "m7", title: "Tiny dancer", date: "2009", note: "Twirling in the rain without a care.", category: "Childhood", preset: "dawn", tall: true, src: "/images/pic8.jpg" },
  { id: "m8", title: "College fest nights", date: "18 Mar 2024", note: "Music, lights and zero worries.", category: "College", preset: "night", src: "/images/pic9.jpg" },
  { id: "m9", title: "Random Tuesday", date: "27 Aug 2025", note: "No reason to remember it. Remembering it anyway.", category: "Random", preset: "bloom", src: "/images/pic10.jpg" },
  { id: "m10", title: "That one evening", date: "19 Jul 2024", note: "The sky put on a show just for her.", category: "Friends", preset: "sunset", src: "/images/pic11.jpg" },
  { id: "m11", title: "Classroom doodles", date: "03 Dec 2018", note: "Half notes, half drawings, full memories.", category: "School", preset: "meadow", src: "/images/pic12.jpg" },
  { id: "m12", title: "Cousins' chaos", date: "15 Aug 2015", note: "Loud house, louder laughter.", category: "Family", preset: "bloom", src: "/images/pic13.jpg" },
  { id: "m13", title: "Wanderlust weekend", date: "11 Oct 2024", note: "Wrong turns, right memories.", category: "Trips", preset: "sea", tall: true, src: "/images/pic14.jpg" },
  { id: "m14", title: "Candles & wishes", date: "05 Nov 2023", note: "Another year softer, brighter, braver.", category: "Birthdays", preset: "dawn", src: "/images/pic15.jpg" },
  { id: "m15", title: "Campus sunsets", date: "22 Feb 2024", note: "Lectures ended, conversations didn't.", category: "College", preset: "night", src: "/images/pic16.jpg" },
  { id: "m16", title: "Monsoon puddles", date: "2011", note: "Small shoes, giant splashes.", category: "Childhood", preset: "meadow", src: "/images/pic17.jpg" },
];

export type Quote = { id: string; text: string; category: string; language: string };

export const shayariCategories = ["All", "Romantic", "Deep", "Love", "Emotional", "Her", "Sad"];

export const shayari: Quote[] = [
  { id: "q1", text: "Kahein tum chand ho, ya meri duaon ka jawab,\nHar dafa tumhe dekhoon, dil kahe bas tum hi lajawab.", category: "Romantic", language: "hinglish" },
  { id: "q2", text: "Teri muskurahat ne ajeeb sa jaadu kar diya,\nJo dil kabhi kisi ka na hua, woh tera ho gaya.", category: "Romantic", language: "hinglish" },
  { id: "q3", text: "Tum se milna sirf ek mulaqat nahi,\nLagta hai jaise meri adhuri kahani ka aakhri safha mil gaya.", category: "Romantic", language: "hinglish" },
  { id: "q4", text: "Kahein wo raat jaisa manzar tha, Ya teri aankhon ka asar tha,\nJo bhi tha... Us lamhe mein sirf tera hi zikr tha.", category: "Romantic", language: "hinglish" },
  { id: "q5", text: "Har dua mein tera naam chupaya hai,\nLog kehte hain mohabbat chhup nahi sakti,\nMaine muskura kar sirf tera khayal bataya hai.", category: "Love", language: "hinglish" },
  { id: "q6", text: "Teri baatein chai ki pehli sip jaisi hain,\nHar roz chahiye... Aur kabhi kam nahi hoti.", category: "Love", language: "hinglish" },
  { id: "q7", text: "Tumhare baad kisi aur ko dekha hi nahi,\nNa isliye ke koi khoobsurat nahi tha,\nBas meri nazar wafadar thi.", category: "Love", language: "hinglish" },
  { id: "q8", text: "Mohabbat ka hisaab nahi hota,\nBas ek naam hota hai... Aur mere liye woh tum ho.", category: "Love", language: "hinglish" },
  { id: "q9", text: "Uski muskurahat mein kuch toh baat hai,\nwarna yun hi koi dil ke itne paas nahi aata.", category: "Her", language: "hinglish" },
  { id: "q10", text: "Kuch rishte khamoshi se bhi gehre hote hain,\nbin kahe sab kuch samajh jaana bhi ek ibaadat hai.", category: "Emotional", language: "hinglish" },
  { id: "q11", text: "Chaand ko dekha tha raat bhar,\nphir yaad aaya... usse zyada khoobsurat toh koi aur hai.", category: "Her", language: "hinglish" },
  { id: "q12", text: "Woh jab door jaati hai toh lagta hai,\nkoi apna hissa saath le jaata hai.", category: "Sad", language: "hinglish" },
  { id: "q13", text: "Kuch log yaadon mein nahi,\ndil ke kisi khoobsurat kone mein rehte hain.", category: "Emotional", language: "hinglish" },
  { id: "q14", text: "Uski ek muskurahat kaafi hai,\nek ordinary din ko yaadgaar banane ke liye.", category: "Her", language: "hinglish" },
  { id: "q15", text: "Woh saamne ho toh lafz kam pad jaate hain,\naur door ho toh khayal zyada aa jaate hain.", category: "Deep", language: "hinglish" },
  { id: "q16", text: "Ajeeb si aadat ho tum,\nDoor bhi raho... Toh bhi sabse kareeb lagte ho.", category: "Deep", language: "hinglish" },
  { id: "q17", text: "Raat bhar chand se baatein ki,\nUsne poocha kis ki yaad hai?\nMaine muskura kar sirf tumhara naam liya.", category: "Deep", language: "hinglish" },
  { id: "q18", text: "Na chaand chahiye, Na sitare chahiye,\nBas ek tum ho... Aur woh bhi hamesha ke liye.", category: "Romantic", language: "hinglish" },
  { id: "q19", text: "Tumhari aankhon mein jo sukoon dekha,\nUske baad duniya ki har jagah bechain si lagi.", category: "Deep", language: "hinglish" },
  { id: "q20", text: "Kaash waqt bhi tumhari tarah hota,\nJitna guzarta... Utna hi khoobsurat lagta.", category: "Emotional", language: "hinglish" },
];

export type Line = { id: string; text: string; category: string };

export const lineCategories = ["All", "Flirty", "Romantic", "Cute", "Compliments"];

export const lines: Line[] = [
  { id: "l1", text: "Tum Google ho kya? Kyunki jo dhoondta hoon, woh tum mein mil jaata hai.", category: "Flirty" },
  { id: "l2", text: "Itni khoobsurat hona legal hai ya permission leni padti hai?", category: "Flirty" },
  { id: "l3", text: "Warning: Tumhari smile addictive hai.", category: "Flirty" },
  { id: "l4", text: "Tumhare saath time fast nahi hota... bas yaadgar ho jaata hai.", category: "Flirty" },
  { id: "l5", text: "Tumse baat karna meri favourite hobby ban chuki hai.", category: "Flirty" },
  { id: "l6", text: "Agar beauty ka koi syllabus hota, tum uska complete textbook hoti.", category: "Compliments" },
  { id: "l7", text: "Dil ne bola \"Ignore kar,\" aankhon ne bola \"Impossible.\"", category: "Flirty" },
  { id: "l8", text: "Ek baat bataun? Tum real life filter lagti ho.", category: "Compliments" },
  { id: "l9", text: "Tumhari DP dekh kar Wi-Fi bhi full signal de deta hai.", category: "Cute" },
  { id: "l10", text: "Main shayad poet nahi... lekin tumhe dekh kar har lafz shayari ban jaata hai.", category: "Romantic" },
  { id: "l11", text: "Kuch log zindagi mein aate nahi... bas dil mein utar jaate hain.", category: "Romantic" },
  { id: "l12", text: "Tumhari hasi meri favourite notification hai.", category: "Cute" },
  { id: "l13", text: "Agar sukoon ka koi chehra hota, toh shayad tumhara hota.", category: "Compliments" },
  { id: "l14", text: "Tum mere din ki sabse khoobsurat wajah ho.", category: "Romantic" },
  { id: "l15", text: "Har kahani mein hero zaroori nahi hota... kabhi kabhi ek muskurahat hi kaafi hoti hai.", category: "Romantic" },
  { id: "l16", text: "Dil ko ghar mil gaya jab se tum mile.", category: "Romantic" },
  { id: "l17", text: "Tum sirf pasand nahi... aadat ban gaye ho.", category: "Romantic" },
  { id: "l18", text: "Tumhari khamoshi bhi bohot kuch keh jaati hai.", category: "Cute" },
  { id: "l19", text: "Tum meri favourite \"what if\" nahi... meri favourite \"finally\" ho.", category: "Romantic" },
  { id: "l20", text: "Kuch log milte hain... aur phir ghar jaisa sukoon de jaate hain.", category: "Compliments" },
  { id: "l21", text: "Mohabbat awaaz nahi karti... bas dil mein reh jaati hai.", category: "Romantic" },
  { id: "l22", text: "Agar lafzon ki rooh hoti, toh woh tumhara naam leti.", category: "Romantic" },
  { id: "l23", text: "Dil ki sabse khoobsurat jagah par tum rehte ho.", category: "Compliments" },
  { id: "l24", text: "Tumhari yaad bhi tumhari tarah khoobsurat hai.", category: "Compliments" },
  { id: "l25", text: "Har baar tumhe dekh kar lagta hai... duniya itni buri bhi nahi.", category: "Cute" },
  { id: "l26", text: "Tum meri dua ka woh hissa ho jo kabhi alfaaz nahi ban saka.", category: "Romantic" },
];

export const thenNowPairs = [
  { title: "Then", then: "Little girl with big dreams.", now: "Still dreaming. Just a little bigger now.", thenPreset: "dawn", nowPreset: "sunset" },
];

export const thenNowChips = [
  "Then → Now",
  "Dreams → Achievements",
  "Childhood → Adulthood",
  "Old Photos → New Photos",
];

export type Song = {
  id: string;
  title: string;
  artist: string;
  reason: string;
  duration: string;
  preset: string;
  audio: string;
};

export const songTabs = ["Around Her", "Reminds Me of Her", "Your Song", "Late Night Songs", "Childhood Songs"];

export const songs: Song[] = [
  { id: "s1", title: "Aaj Phir", artist: "Arijit Singh", reason: "Because every heartbeat hums her name.", duration: "4:37", preset: "sunset", audio: "/songs/song1.mp3" },
  { id: "s2", title: "Broken Angel", artist: "Arash feat. Helena", reason: "The song that feels like her voice.", duration: "4:16", preset: "night", audio: "/songs/song2.mp3" },
  { id: "s3", title: "Pehli Dafa", artist: "Atif Aslam", reason: "Because first meetings change everything.", duration: "4:15", preset: "dawn", audio: "/songs/song3.mp3" },
  { id: "s4", title: "Kangna Tera Ni", artist: "Lashkare", reason: "Because she looks perfect in every rhythm.", duration: "3:50", preset: "bloom", audio: "/songs/song4.mp3" },
  { id: "s5", title: "Despacito", artist: "Luis Fonsi ft. Daddy Yankee", reason: "For the days she dances without a care.", duration: "4:41", preset: "sea", audio: "/songs/song5.mp3" },
  { id: "s6", title: "Labon Ko", artist: "K.K.", reason: "Because some songs are felt, not heard.", duration: "4:29", preset: "night", audio: "/songs/song6.mp3" },
  { id: "s7", title: "Tujhe Main Pyar Karoon", artist: "Kailash Kher", reason: "Because loving her is the easiest thing.", duration: "4:19", preset: "meadow", audio: "/songs/song7.mp3" },
  { id: "s8", title: "Tera Mera Hai Pyar Amar", artist: "Ahmed Jahanzeb", reason: "Because this love story deserves an OST.", duration: "3:45", preset: "bloom", audio: "/songs/song8.mp3" },
];

export type Letter = { id: string; title: string; preview: string; body: string[]; signature: string };

export const letters: Letter[] = [
  {
    id: "lt1", title: "Kabhi Kabhi Sochta Hoon...", preview: "Agar tum meri zindagi mein na aate, toh...",
    body: [
      "Kabhi kabhi sochta hoon... agar tum meri zindagi mein na aate, toh shayad mujhe kabhi pata hi na chalta ke kisi ki ek muskurahat bhi poora din khoobsurat bana sakti hai.",
      "Tumhari har baat, har hasi, aur har choti si aadat dil ko sukoon deti hai.",
      "Main sirf itna chahta hoon... jab bhi tumhari zindagi ki kahani likhi jaye, usmein meri jagah ek achhi yaad ki tarah hamesha rahe.",
    ],
    signature: "ek hamesha ki yaad",
  },
  {
    id: "lt2", title: "Dear Tum", preview: "Koi hai jo tumhari ek smile ke liye hazaar wajah dhoond lega.",
    body: [
      "Main promises kam karta hoon... lekin ek baat zaroor keh sakta hoon.",
      "Jab bhi tum muskuraogi, meri dua hogi ke woh muskurahat kabhi kam na ho.",
      "Aur agar kabhi udaas ho jao... toh yaad rakhna, koi hai jo tumhari ek smile ke liye hazaar wajah dhoond lega.",
    ],
    signature: "always, for her",
  },
];

export const dreamCategories = [
  { icon: "plane", title: "Places To Visit", text: "Switzerland, Iceland, Paris." },
  { icon: "briefcase", title: "Career Dreams", text: "Build a life she loves." },
  { icon: "home", title: "Future Dreams", text: "Cozy home filled with joy and people." },
  { icon: "heart", title: "Relationship Dreams", text: "A love story worth telling." },
  { icon: "compass", title: "Experiences", text: "Skydiving, stargazing, new cuisines." },
  { icon: "award", title: "Achievements", text: "Make her family proud." },
] as const;

export const whySpecial = [
  { num: "01", title: "Her Smile", text: "It can light up the darkest days.", hand: "So special ♡" },
  { num: "02", title: "Her Laugh", text: "The kind of sound rooms remember.", hand: "priceless" },
  { num: "03", title: "Her Kindness", text: "She gives without keeping score.", hand: "soft heart" },
  { num: "04", title: "Her Little Habits", text: "Overthinking, humming, talking to herself.", hand: "so her" },
  { num: "05", title: "Her Dreams", text: "Quiet, enormous, and absolutely possible.", hand: "dreamer" },
  { num: "06", title: "Her Strength", text: "Soft heart, unshakeable spine.", hand: "brave" },
];

export const peopleGroups = [
  {
    group: "Family",
    members: [
      { name: "Her Family", relation: "Home base", note: "Her first story, her safest place.", preset: "dawn" },
    ],
  },
  {
    group: "Best Friends",
    members: [
      { name: "The Trio", relation: "Partners in crime", note: "Group chats, inside jokes, endless laughs.", preset: "night" },
    ],
  },
  {
    group: "Special People",
    members: [
      { name: "Special People", relation: "The ones who matter", note: "A few souls who changed her story.", preset: "sunset" },
    ],
  },
  {
    group: "Mentors",
    members: [
      { name: "Her Mentors", relation: "Guides", note: "Teachers who believed in her first.", preset: "meadow" },
    ],
  },
  {
    group: "Pets",
    members: [
      { name: "The Goodest Girl", relation: "Four-legged best friend", note: "Unconditional love, wagging tail.", preset: "bloom" },
    ],
  },
];

export const storyChapters = [
  { num: "01", title: "Once Upon a Time", text: "Before we begin, everyone always wonder, her smile, her vibe, her energy, everything." },
  { num: "02", title: "Growing Up", text: "NewCAPTERGIRL, new lessons, new beautiful little moments." },
  { num: "03", title: "The People She Met", text: "Some taught her lessons, some gave her love, both shaped her." },
  { num: "04", title: "The Things That Changed Her", text: "Everything changed her, softly or strongly, both mattered." },
  { num: "05", title: "Who She Is Today", text: "Stronger, softer, braver, and still becoming." },
];
