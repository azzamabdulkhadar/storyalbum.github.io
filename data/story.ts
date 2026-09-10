/**
 * Static content pack (Version 1). Later each export maps 1:1 to a
 * Supabase table — see the plan's database schema.
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
};

export const chapters: Chapter[] = [
  { year: "2004", title: "The Beginning", text: "She came into this world with a heart full of love and endless possibilities.", preset: "dawn" },
  { year: "2010", title: "Childhood", text: "Tiny hands, big dreams.", preset: "meadow" },
  { year: "2015", title: "Growing Up", text: "School, friends & countless memories.", preset: "bloom" },
  { year: "2019", title: "Teenage Years", text: "New dreams. New people. New emotions.", preset: "sunset" },
  { year: "2023", title: "A New Chapter", text: "Life started changing.", preset: "sea" },
  { year: "2025", title: "Present", text: "The girl she has become.", preset: "night" },
];

export type Memory = {
  id: string;
  title: string;
  date: string;
  note: string;
  category: string;
  preset: string;
  tall?: boolean;
};

export const memoryCategories = [
  "All", "Childhood", "School", "Friends", "Family", "College", "Trips", "Birthdays", "Random",
];

export const memories: Memory[] = [
  { id: "m1", title: "Golden hour with her", date: "12 Sep 2024", note: "A completely ordinary day that somehow became a beautiful memory.", category: "Friends", preset: "sunset" },
  { id: "m2", title: "Under the stars", date: "04 Jan 2025", note: "Counting stars and losing count.", category: "Trips", preset: "night", tall: true },
  { id: "m3", title: "Chai & conversations", date: "21 Nov 2024", note: "Where every problem felt smaller.", category: "Family", preset: "dawn" },
  { id: "m4", title: "The birthday cake", date: "05 Nov 2024", note: "She wished. We pretended not to watch.", category: "Birthdays", preset: "bloom" },
  { id: "m5", title: "School corridor laughs", date: "14 Feb 2019", note: "Laughing too loud in a quiet corridor.", category: "School", preset: "meadow" },
  { id: "m6", title: "First trip together", date: "02 Jun 2023", note: "Where the map ended, the fun began.", category: "Trips", preset: "sea" },
  { id: "m7", title: "Tiny dancer", date: "2009", note: "Twirling in the rain without a care.", category: "Childhood", preset: "dawn" },
  { id: "m8", title: "College fest nights", date: "18 Mar 2024", note: "Music, lights and zero worries.", category: "College", preset: "night" },
  { id: "m9", title: "Random Tuesday", date: "27 Aug 2025", note: "No reason to remember it. Remembering it anyway.", category: "Random", preset: "bloom" },
];

export type Quote = { id: string; text: string; category: string; language: string };

export const shayariCategories = ["All", "Emotional", "Love", "Cute", "Sad", "Deep", "Her"];

export const shayari: Quote[] = [
  { id: "q1", text: "Uski muskurahat mein kuch toh baat hai,\nwarna yun hi koi dil ke itne paas nahi aata.", category: "Love", language: "hinglish" },
  { id: "q2", text: "Kuch log yaadon mein nahi,\ndil ke kisi khoobsurat kone mein rehte hain.", category: "Emotional", language: "hinglish" },
  { id: "q3", text: "Woh saamne ho toh lafz kam pad jaate hain,\naur door ho toh khayal zyada aa jaate hain.", category: "Deep", language: "hinglish" },
  { id: "q4", text: "Uski ek muskurahat kaafi hai,\nek ordinary din ko yaadgaar banane ke liye.", category: "Cute", language: "hinglish" },
  { id: "q5", text: "Chaand ko dekha tha raat bhar,\nphir yaad aaya... usse zyada khoobsurat toh koi aur hai.", category: "Her", language: "hinglish" },
  { id: "q6", text: "Kuch rishte khamoshi se bhi gehre hote hain,\nbin kahe sab kuch samajh jaana bhi ek ibaadat hai.", category: "Emotional", language: "hindi" },
  { id: "q7", text: "Woh jab door jaati hai toh lagta hai,\nkoi apna hissa saath le jaata hai.", category: "Sad", language: "hinglish" },
  { id: "q8", text: "Dil ne har baar usi ko chuna,\njab bhi usne dekha, galti se bhi sahi.", category: "Love", language: "hinglish" },
];

export type Line = { id: string; text: string; category: string };

export const lineCategories = ["All", "Cute", "Romantic", "Playful", "Flirty", "Compliments", "Good Morning", "Good Night"];

export const lines: Line[] = [
  { id: "l1", text: "Are you always this cute, or do you save it for special occasions? 🙈", category: "Flirty" },
  { id: "l2", text: "I was going to write something beautiful about you... then I realized you already are.", category: "Romantic" },
  { id: "l3", text: "You're becoming a little difficult to forget.", category: "Flirty" },
  { id: "l4", text: "If being cute was a crime, you'd be guilty.", category: "Playful" },
  { id: "l5", text: "You make everything better.", category: "Compliments" },
  { id: "l6", text: "I think my favorite notification might be your name.", category: "Cute" },
  { id: "l7", text: "I had a clever opening line, but then you smiled and I forgot it.", category: "Playful" },
  { id: "l8", text: "Good morning to the girl who somehow makes an ordinary morning feel a little prettier.", category: "Good Morning" },
  { id: "l9", text: "Good night. May your dreams be as beautiful as the smile you leave behind.", category: "Good Night" },
  { id: "l10", text: "Tumhari smile ka koi shortcut hai kya? Har baar mood theek kar deti hai.", category: "Cute" },
  { id: "l11", text: "Tumhari aadat thodi dangerous hai... ek baar baat karo toh phir aur baat karne ka mann karta hai.", category: "Flirty" },
  { id: "l12", text: "Tum ordinary moments ko bhi thoda sa special bana deti ho.", category: "Compliments" },
  { id: "l13", text: "If being adorable was a competition, I'd stop competing and just cheer for you.", category: "Playful" },
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

export type Song = { id: string; title: string; artist: string; reason: string; duration: string; preset: string };

export const songTabs = ["Around Her", "Reminds Me of Her", "Your Song", "Late Night Songs", "Childhood Songs"];

export const songs: Song[] = [
  { id: "s1", title: "Perfect", artist: "Ed Sheeran", reason: "Because she's perfect, just the way she is.", duration: "4:23", preset: "dawn" },
  { id: "s2", title: "Raataan Lambiyan", artist: "Jubin Nautiyal, Asees Kaur", reason: "Reminds me of her soft heart.", duration: "4:41", preset: "night" },
  { id: "s3", title: "Let Her Go", artist: "Passenger", reason: "Because she deserves to be happy.", duration: "4:12", preset: "sea" },
  { id: "s4", title: "Apna Bana Le", artist: "Arijit Singh", reason: "Because she feels like home.", duration: "4:22", preset: "bloom" },
  { id: "s5", title: "Tum Hi Kaho", artist: "Abhi Dutt", reason: "Because there's no one like her.", duration: "4:45", preset: "meadow" },
];

export type Letter = { id: string; title: string; preview: string; body: string[]; signature: string };

export const letters: Letter[] = [
  {
    id: "lt1", title: "Dear Younger Me...", preview: "A little advice from her future self.",
    body: [
      "You are allowed to take up space. The things that make you different are the things that will make you unforgettable.",
      "Stop worrying so much about what everyone thinks — most of them are busy worrying about themselves. Be kinder to yourself; you are doing better than you know.",
    ],
    signature: "with love, your future self",
  },
  {
    id: "lt2", title: "Dear Present Me...", preview: "You're doing better than you think.",
    body: [
      "Look at you — carrying everything so gracefully. It's okay to rest. It's okay to not have it all figured out today.",
      "Drink some water, step into the sunlight for a minute, and remember: an ordinary day spent smiling is not an ordinary day at all.",
    ],
    signature: "yours, always",
  },
  {
    id: "lt3", title: "To The Girl I Admire...", preview: "Keep being you. The world needs it.",
    body: [
      "You laugh with your whole heart, you care without keeping score, and you make rooms warmer just by being in them.",
      "Never shrink yourself to fit into places that weren't built for your kind of light.",
    ],
    signature: "someone who notices",
  },
  {
    id: "lt4", title: "Things I Wish I Could Tell You...", preview: "Some things never got said out loud.",
    body: [
      "Some things never got said out loud. Maybe they didn't need to be — maybe you already felt them in the small moments.",
      "But if words ever found their way: thank you. For every ordinary day you made feel like a memory worth keeping.",
    ],
    signature: "unsent, always",
  },
  {
    id: "lt5", title: "One Day, When You Read This...", preview: "You'll smile. I promise.",
    body: [
      "I hope by now you've seen the places you dreamed about, and become everything your little heart whispered about at night.",
      "And I hope someone, somewhere, still tells you stories about the girl who smiled at sunsets — because she was worth every story.",
    ],
    signature: "from the past, with hope",
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
