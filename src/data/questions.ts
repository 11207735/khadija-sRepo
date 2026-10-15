export interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface QuestionItem {
  id: number;
  question: string;
  options: QuestionOption[];
}

export const QUESTIONS: QuestionItem[] = [
  {
    id: 1,
    question: "As your birthday rolls around each year, what is the honest feeling that sneaks into your heart first?",
    options: [
      { key: 'A', text: "A quiet nostalgia for days and people that are no longer present." },
      { key: 'B', text: "Gratitude for how far I've come, with a small corner of regret." },
      { key: 'C', text: "A strong desire to move forward and start a completely clean slate." },
      { key: 'D', text: "A subtle sense of loneliness, no matter how many people surround me." },
    ],
  },
  {
    id: 2,
    question: "If you were given the chance to return to just one single moment in our story, what would you do?",
    options: [
      { key: 'A', text: "Fix the misunderstanding where our distance first began." },
      { key: 'B', text: "Relive the moment with the exact same passion, without changing a thing." },
      { key: 'C', text: "Walk away earlier before things grew complicated and distant." },
      { key: 'D', text: "Tell you honest words that I kept hidden in my heart and never said." },
    ],
  },
  {
    id: 3,
    question: "When you randomly hear a song or pass by a place we used to share, how do you react inside?",
    options: [
      { key: 'A', text: "I smile quietly and remember our best days with fond loyalty." },
      { key: 'B', text: "I feel a sudden sting and quickly try to change the music or leave." },
      { key: 'C', text: "I pretend not to care on the outside, but inside it lingers." },
      { key: 'D', text: "I get lost in thought, asking myself: \"How did we end up here?\"" },
    ],
  },
  {
    id: 4,
    question: "What is the deepest thing you truly miss about my presence in your life?",
    options: [
      { key: 'A', text: "The rare sense of safety and familiarity I haven't found with anyone else." },
      { key: 'B', text: "The genuine way you understood me and supported me without condition." },
      { key: 'C', text: "The small everyday details and the endless late-night conversations." },
      { key: 'D', text: "My pride stops me from admitting what I actually miss." },
    ],
  },
  {
    id: 5,
    question: "Do you believe the end of what we had was inevitable, or did we give up too quickly?",
    options: [
      { key: 'A', text: "We surrendered to wrong timing and circumstances we could have overcome." },
      { key: 'B', text: "It was a natural outcome of differences we couldn't bridge." },
      { key: 'C', text: "Timing was unfair to us; we weren't ready for what we felt." },
      { key: 'D', text: "I don't know, but the result was heavy on both of us." },
    ],
  },
  {
    id: 6,
    question: "If you had to describe the chapter we spent together in one single phrase, what would it be?",
    options: [
      { key: 'A', text: "A beautiful dream that ended before its time." },
      { key: 'B', text: "A hard lesson that reshaped my maturity and life path." },
      { key: 'C', text: "The most authentic emotions I have ever experienced." },
      { key: 'D', text: "A warm sanctuary during a cold season of life." },
    ],
  },
  {
    id: 7,
    question: "When everyone wishes you \"Happy Birthday\" today, whose message is secretly sitting in the back of your mind?",
    options: [
      { key: 'A', text: "The person who is distant, but whose ghost never truly leaves my thoughts." },
      { key: 'B', text: "I'm not waiting for anyone specific; I focus on who is here now." },
      { key: 'C', text: "Someone I know is thinking of me right now despite the silence." },
      { key: 'D', text: "The one forgotten by circumstances, but remembered by my heart." },
    ],
  },
  {
    id: 8,
    question: "What thought crosses your mind when you ponder my future without you in it?",
    options: [
      { key: 'A', text: "I sincerely wish you genuine happiness, even if I'm not the cause of it." },
      { key: 'B', text: "It is still hard for me to picture you sharing your life with someone else." },
      { key: 'C', text: "I feel there will always be a missing piece between us." },
      { key: 'D', text: "I try not to think about it so I don't exhaust myself." },
    ],
  },
  {
    id: 9,
    question: "If we accidentally bumped into each other today, what would be your instant reaction?",
    options: [
      { key: 'A', text: "A warm, quiet hello that summarizes all the silence and longing." },
      { key: 'B', text: "A faint smile while quickly averting my eyes." },
      { key: 'C', text: "Stopping to talk and trying to bring back a spark of memories." },
      { key: 'D', text: "Total indifference to protect my feelings from breaking." },
    ],
  },
  {
    id: 10,
    question: "Is there a promise or a word spoken between us that you wish you could take back?",
    options: [
      { key: 'A', text: "The promise to stay forever that we couldn't keep." },
      { key: 'B', text: "Harsh words spoken during moments of anger and haste." },
      { key: 'C', text: "Confessing my feelings so deeply right at the beginning." },
      { key: 'D', text: "I don't regret a single honest word that came from my heart." },
    ],
  },
  {
    id: 11,
    question: "In your view, what truly breaks attractive, genuine connections between two people?",
    options: [
      { key: 'A', text: "Silence, suppression, and failing to confront issues on time." },
      { key: 'B', text: "Excessive pride and hesitating to apologize when wrong." },
      { key: 'C', text: "Misunderstandings and overwhelming external circumstances." },
      { key: 'D', text: "Allowing third parties to influence decisions and step between us." },
    ],
  },
  {
    id: 12,
    question: "What was a secret feeling about yourself that I never quite understood while we were together?",
    options: [
      { key: 'A', text: "My constant fear of loss, which made me pull away without meaning to." },
      { key: 'B', text: "How deeply I cared, even when I didn't know how to express it." },
      { key: 'C', text: "That I needed reassurance and emotional safety more than anything else." },
      { key: 'D', text: "That I carried conflicting emotions I couldn't explain even to myself." },
    ],
  },
  {
    id: 13,
    question: "How do you deal with memories that stubbornly refuse to fade from your mind?",
    options: [
      { key: 'A', text: "I let them visit me and feel them peacefully without running away." },
      { key: 'B', text: "I keep myself constantly busy so I don't leave time for thinking." },
      { key: 'C', text: "I store them in a quiet corner of my heart as part of my history." },
      { key: 'D', text: "I try to erase them, but they return in moments of stillness." },
    ],
  },
  {
    id: 14,
    question: "If you had to write one final one-word message to me right now, what would it be?",
    options: [
      { key: 'A', text: "\"Sorry\" (for everything that happened, and everything that didn't)." },
      { key: 'B', text: "\"Thank you\" (for every warm moment and lesson learned)." },
      { key: 'C', text: "\"Return\" (because the space remains unfilled)." },
      { key: 'D', text: "\"Goodbye\" (with all the finality and weight it carries)." },
    ],
  },
  {
    id: 15,
    question: "When today ends and you blow out your new birthday candle, what is your secret wish?",
    options: [
      { key: 'A', text: "To find inner peace and quiet comfort wherever I go." },
      { key: 'B', text: "That you find true happiness, success, and fulfillment in your journey." },
      { key: 'C', text: "That time could rewind to heal what broke between us." },
      { key: 'D', text: "To completely move past the past and start fresh." },
    ],
  },
];
