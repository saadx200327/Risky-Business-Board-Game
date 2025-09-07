// CardData.js - Initial JSON/JS object for event, career, romance, and social cards

// Event Cards - Random life events that can happen to any player
export const eventCards = [
  {
    id: 'event_001',
    type: 'event',
    title: 'Unexpected Inheritance',
    description: 'A distant relative left you money in their will!',
    effect: {
      money: 2000,
      reputation: 0
    },
    image: null,
    rarity: 'common'
  },
  {
    id: 'event_002',
    type: 'event',
    title: 'Traffic Ticket',
    description: 'You got caught speeding. Pay the fine.',
    effect: {
      money: -150,
      reputation: -1
    },
    image: null,
    rarity: 'common'
  },
  {
    id: 'event_003',
    type: 'event',
    title: 'Lottery Winner',
    description: 'Your lucky numbers came up! Jackpot!',
    effect: {
      money: 5000,
      reputation: 2
    },
    image: null,
    rarity: 'rare'
  },
  {
    id: 'event_004',
    type: 'event',
    title: 'Medical Emergency',
    description: 'Unexpected hospital visit. Insurance covers some costs.',
    effect: {
      money: -800,
      reputation: 0
    },
    image: null,
    rarity: 'uncommon'
  },
  {
    id: 'event_005',
    type: 'event',
    title: 'Found Money',
    description: 'You found cash on the street and turned it in. Reward!',
    effect: {
      money: 100,
      reputation: 3
    },
    image: null,
    rarity: 'common'
  }
];

// Career Cards - Job opportunities and workplace events
export const careerCards = [
  {
    id: 'career_001',
    type: 'career',
    title: 'Software Developer',
    description: 'High-paying tech job with flexible hours.',
    effect: {
      money: 3500,
      reputation: 2,
      salary: 4000
    },
    requirements: {
      education: 'college',
      skills: ['coding', 'problem-solving']
    },
    image: null,
    rarity: 'common'
  },
  {
    id: 'career_002',
    type: 'career',
    title: 'Startup Founder',
    description: 'Risky but potentially very rewarding venture.',
    effect: {
      money: -1000,
      reputation: 1,
      potential: 10000
    },
    requirements: {
      risk_tolerance: 'high',
      skills: ['leadership', 'innovation']
    },
    image: null,
    rarity: 'rare'
  },
  {
    id: 'career_003',
    type: 'career',
    title: 'Teacher',
    description: 'Rewarding career helping shape young minds.',
    effect: {
      money: 2000,
      reputation: 4,
      salary: 2500
    },
    requirements: {
      education: 'college',
      skills: ['communication', 'patience']
    },
    image: null,
    rarity: 'common'
  },
  {
    id: 'career_004',
    type: 'career',
    title: 'Promotion',
    description: 'Your hard work paid off! You got promoted.',
    effect: {
      money: 1500,
      reputation: 2,
      salary_increase: 500
    },
    requirements: {
      current_job: true
    },
    image: null,
    rarity: 'uncommon'
  },
  {
    id: 'career_005',
    type: 'career',
    title: 'Freelance Artist',
    description: 'Follow your passion, but income varies.',
    effect: {
      money: 0,
      reputation: 1,
      salary: 1500,
      variability: 'high'
    },
    requirements: {
      skills: ['creativity', 'self-motivation']
    },
    image: null,
    rarity: 'uncommon'
  }
];

// Romance Cards - Relationship opportunities and events
export const romanceCards = [
  {
    id: 'romance_001',
    type: 'romance',
    title: 'Perfect Match',
    description: 'You met someone special at a coffee shop!',
    effect: {
      money: 0,
      reputation: 2,
      happiness: 5,
      relationship_status: 'dating'
    },
    image: null,
    rarity: 'common'
  },
  {
    id: 'romance_002',
    type: 'romance',
    title: 'Expensive Date',
    description: 'Dinner at a fancy restaurant to impress.',
    effect: {
      money: -200,
      reputation: 0,
      happiness: 2
    },
    requirements: {
      relationship_status: 'dating'
    },
    image: null,
    rarity: 'common'
  },
  {
    id: 'romance_003',
    type: 'romance',
    title: 'Engagement',
    description: 'Popped the question! Time to plan a wedding.',
    effect: {
      money: -3000,
      reputation: 3,
      happiness: 8,
      relationship_status: 'engaged'
    },
    requirements: {
      relationship_status: 'dating',
      duration: '6_months'
    },
    image: null,
    rarity: 'uncommon'
  },
  {
    id: 'romance_004',
    type: 'romance',
    title: 'Breakup',
    description: 'Sometimes relationships don\'t work out.',
    effect: {
      money: 0,
      reputation: -1,
      happiness: -5,
      relationship_status: 'single'
    },
    image: null,
    rarity: 'uncommon'
  },
  {
    id: 'romance_005',
    type: 'romance',
    title: 'Wedding Day',
    description: 'The big day is here! Expensive but magical.',
    effect: {
      money: -8000,
      reputation: 4,
      happiness: 10,
      relationship_status: 'married'
    },
    requirements: {
      relationship_status: 'engaged'
    },
    image: null,
    rarity: 'rare'
  }
];

// Social Cards - Social interactions, friendships, and networking
export const socialCards = [
  {
    id: 'social_001',
    type: 'social',
    title: 'Networking Event',
    description: 'Met some great contacts at a professional mixer.',
    effect: {
      money: 0,
      reputation: 3,
      connections: 2
    },
    image: null,
    rarity: 'common'
  },
  {
    id: 'social_002',
    type: 'social',
    title: 'House Party',
    description: 'Threw an epic party! Everyone had a blast.',
    effect: {
      money: -300,
      reputation: 2,
      happiness: 3,
      friends: 1
    },
    image: null,
    rarity: 'common'
  },
  {
    id: 'social_003',
    type: 'social',
    title: 'Social Media Viral',
    description: 'Your post went viral! Fame and followers.',
    effect: {
      money: 500,
      reputation: 5,
      social_media_followers: 10000
    },
    image: null,
    rarity: 'rare'
  },
  {
    id: 'social_004',
    type: 'social',
    title: 'Charity Volunteer',
    description: 'Spent the weekend helping at a local charity.',
    effect: {
      money: 0,
      reputation: 4,
      happiness: 3,
      karma: 5
    },
    image: null,
    rarity: 'common'
  },
  {
    id: 'social_005',
    type: 'social',
    title: 'Social Faux Pas',
    description: 'Said the wrong thing at the wrong time. Awkward.',
    effect: {
      money: 0,
      reputation: -3,
      happiness: -2
    },
    image: null,
    rarity: 'uncommon'
  }
];

// Utility functions for card management
export const getAllCards = () => {
  return [
    ...eventCards,
    ...careerCards,
    ...romanceCards,
    ...socialCards
  ];
};

export const getCardsByType = (type) => {
  switch (type) {
    case 'event':
      return eventCards;
    case 'career':
      return careerCards;
    case 'romance':
      return romanceCards;
    case 'social':
      return socialCards;
    default:
      return [];
  }
};

export const getRandomCard = (type = null) => {
  let cards;
  if (type) {
    cards = getCardsByType(type);
  } else {
    cards = getAllCards();
  }
  
  if (cards.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * cards.length);
  return { ...cards[randomIndex] }; // Return a copy to avoid mutations
};

export const getCardById = (cardId) => {
  const allCards = getAllCards();
  return allCards.find(card => card.id === cardId) || null;
};

export const getCardsByRarity = (rarity) => {
  const allCards = getAllCards();
  return allCards.filter(card => card.rarity === rarity);
};

// Card rarity weights for weighted random selection
export const RARITY_WEIGHTS = {
  common: 0.6,    // 60% chance
  uncommon: 0.3,  // 30% chance
  rare: 0.1       // 10% chance
};

export const getWeightedRandomCard = (type = null) => {
  const cards = type ? getCardsByType(type) : getAllCards();
  if (cards.length === 0) return null;
  
  const random = Math.random();
  let cumulativeWeight = 0;
  
  // Try rare first, then uncommon, then common
  for (const rarity of ['rare', 'uncommon', 'common']) {
    cumulativeWeight += RARITY_WEIGHTS[rarity];
    if (random <= cumulativeWeight) {
      const rarityCards = cards.filter(card => card.rarity === rarity);
      if (rarityCards.length > 0) {
        const randomIndex = Math.floor(Math.random() * rarityCards.length);
        return { ...rarityCards[randomIndex] };
      }
    }
  }
  
  // Fallback to any random card
  return getRandomCard(type);
};

// Default export
const cardData = {
  eventCards,
  careerCards,
  romanceCards,
  socialCards,
  getAllCards,
  getCardsByType,
  getRandomCard,
  getCardById,
  getCardsByRarity,
  getWeightedRandomCard,
  RARITY_WEIGHTS
};

export default cardData;
