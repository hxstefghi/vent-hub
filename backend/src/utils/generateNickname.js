/**
 * Generate a random anonymous nickname
 * This is a utility function that can be used if you want to offer
 * auto-generated nicknames instead of just "Anonymous"
 */

const adjectives = [
  'Peaceful',
  'Quiet',
  'Gentle',
  'Soft',
  'Calm',
  'Silent',
  'Kind',
  'Warm',
  'Bright',
  'Cool',
  'Sweet',
  'Tender',
  'Shy',
  'Brave',
  'Honest'
];

const nouns = [
  'Soul',
  'Heart',
  'Spirit',
  'Mind',
  'Voice',
  'Whisper',
  'Dream',
  'Thought',
  'Star',
  'Cloud',
  'Moon',
  'Wind',
  'River',
  'Sky',
  'Light'
];

/**
 * Generate a random nickname in the format "Adjective Noun"
 * @returns {string} Generated nickname
 */
export const generateNickname = () => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  
  return `${adjective} ${noun}`;
};

/**
 * Generate a nickname with a random number
 * @returns {string} Generated nickname with number
 */
export const generateNicknameWithNumber = () => {
  const nickname = generateNickname();
  const number = Math.floor(Math.random() * 1000);
  
  return `${nickname} ${number}`;
};

export default generateNickname;
