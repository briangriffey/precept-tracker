import type { PreceptDefinition, PreceptGroupDefinition } from './types'

// ── Individual Precept Definitions ──────────────────────────────────────────

export const precepts: PreceptDefinition[] = [
  // ── The Three Refuges (1-3) ───────────────────────────────────────────────

  {
    number: 1,
    group: 'three-refuges',
    vow: 'I take refuge in Buddha',
    shortName: 'Refuge in Buddha',
    description:
      'Taking refuge in Buddha means trusting that awakening is possible — for the historical Buddha, for all beings, for you. Buddha also means your own awakened nature, the capacity for enlightenment already present.',
    defaultPrompts: [
      'Was there a moment today when you doubted your ability to grow or change? What happened?',
      'Did you notice yourself or someone else acting with genuine wisdom today? What did it look like?',
      'When did you feel most awake and present today?',
      'Was there a situation where you trusted your own capacity to handle something difficult?',
      'Did you catch yourself thinking "I could never..." about something? What was it?',
      'Was there a moment today when you paused before reacting and found clarity?',
    ],
  },
  {
    number: 2,
    group: 'three-refuges',
    vow: 'I take refuge in Dharma',
    shortName: 'Refuge in Dharma',
    description:
      'Taking refuge in Dharma means committing to the teachings as your guide and trusting reality as it is, even when it is difficult. It means aligning yourself with what is true rather than with your preferences and delusions.',
    defaultPrompts: [
      'Was there a moment today when you resisted accepting something as it is? What was the situation?',
      'Did you learn something today that shifted your understanding, even slightly?',
      'When did you catch yourself believing a story about a situation rather than seeing it clearly?',
      'Was there a conversation where you heard something true that was hard to hear?',
      'Did you notice a gap between how you wanted things to be and how they actually were?',
      'What did reality teach you today that your plans did not account for?',
    ],
  },
  {
    number: 3,
    group: 'three-refuges',
    vow: 'I take refuge in Sangha',
    shortName: 'Refuge in Sangha',
    description:
      'Taking refuge in Sangha means recognizing you cannot do this alone and committing to practice with others. It also means recognizing the interconnection of all beings — the sangha in its widest sense includes everyone.',
    defaultPrompts: [
      'Did someone support you today in a way you did not expect? How did it feel?',
      'Was there a moment where you felt disconnected from the people around you? What happened?',
      'Did you reach out to someone today, or did someone reach out to you?',
      'Was there a time when working with others made something easier or better than doing it alone?',
      'Did you notice yourself pulling away from community or connection today? Why?',
      'How did you contribute to someone else\'s well-being today, even in a small way?',
    ],
  },

  // ── The Three Pure Precepts (4-6) ─────────────────────────────────────────

  {
    number: 4,
    group: 'three-pure-precepts',
    vow: 'I vow to refrain from all evil',
    shortName: 'Refrain from Evil',
    description:
      'The precept of restraint. You vow to stop doing harm — to others, to yourself, to the world. It acknowledges that your actions have consequences and that some actions cause suffering.',
    defaultPrompts: [
      'Was there a moment today when you chose not to do something because you knew it would cause harm?',
      'Did you notice a habit or impulse that could hurt someone, including yourself? How did you respond?',
      'Were there words you almost said but held back because they would have been hurtful?',
      'Did you make a choice today that you later realized caused unnecessary harm?',
      'Was there a situation where the easy path would have been harmful and you chose differently?',
    ],
  },
  {
    number: 5,
    group: 'three-pure-precepts',
    vow: 'I vow to do all good',
    shortName: 'Do All Good',
    description:
      'The precept of active virtue. It is not enough to avoid harm; you also cultivate what is beneficial. Kindness, generosity, compassion, wisdom — these are to be actively developed, not just passively hoped for.',
    defaultPrompts: [
      'What is one kind thing you did today that you might normally overlook?',
      'Did you have an opportunity to help someone and take it? What happened?',
      'Was there a moment when you could have been generous — with your time, attention, or resources — and followed through?',
      'Did you actively encourage or support someone today? Who and how?',
      'Was there a situation where you went out of your way to do something good, even when it was inconvenient?',
    ],
  },
  {
    number: 6,
    group: 'three-pure-precepts',
    vow: 'I vow to save all beings',
    shortName: 'Save All Beings',
    description:
      'The bodhisattva vow, the heart of Mahayana Buddhism. You commit to awakening not just for yourself but for the benefit of all beings. It orients your life toward service rather than personal attainment.',
    defaultPrompts: [
      'Did you act today with someone else\'s benefit in mind, not just your own?',
      'Was there a moment where you put aside your own agenda to be present for someone?',
      'Did you notice suffering in someone around you today? How did you respond?',
      'Was there a decision you made today that considered its impact on others beyond yourself?',
      'Did you find yourself ignoring someone\'s need because you were focused on your own concerns?',
    ],
  },

  // ── The Ten Grave Precepts (7-16) ─────────────────────────────────────────

  {
    number: 7,
    group: 'ten-grave-precepts',
    vow: 'I vow not to kill',
    shortName: 'Affirming Life',
    description:
      'The precept of affirming life. This extends into how you relate to all living things — how you handle insects, what you eat, how you speak about others. It invites continuous examination of how you support or diminish life.',
    defaultPrompts: [
      'How did you support or nurture life today — in your home, at work, or in passing?',
      'Did your words build someone up or diminish them today?',
      'Was there a moment where you chose care over convenience with another living being?',
      'Did you notice yourself dismissing or devaluing someone\'s experience today?',
      'How did you take care of your own vitality — rest, nourishment, movement?',
    ],
  },
  {
    number: 8,
    group: 'ten-grave-precepts',
    vow: 'I vow not to steal',
    shortName: 'Not Taking What Is Not Given',
    description:
      'Beyond obvious theft, this includes taking more than your share, exploiting others\' labor, wasting resources, taking credit for others\' work. Positively, it points toward generosity and being satisfied with what you have.',
    defaultPrompts: [
      'Did you take credit for something today that was not entirely yours?',
      'Was there a moment when you took more than your fair share — of time, space, food, or attention?',
      'Did you feel envy or a sense of lacking today? What triggered it?',
      'Were you generous with something today — your time, a compliment, your patience?',
      'Did you respect other people\'s time and energy in your interactions today?',
    ],
  },
  {
    number: 9,
    group: 'ten-grave-precepts',
    vow: 'I vow not to misuse sexuality',
    shortName: 'Respecting the Body',
    description:
      'The precept of respecting the body and intimate relationships. It means bringing awareness and care to this powerful dimension of human life rather than acting out of compulsion.',
    defaultPrompts: [
      'Did you treat your own body with care and respect today?',
      'Were you mindful of boundaries — yours and others\' — in your interactions today?',
      'Was there a moment when you noticed objectifying someone or reducing them to appearance?',
      'Did you honor your commitments to the people closest to you today?',
      'Were there moments today where you acted from genuine care rather than habit or compulsion in your relationships?',
    ],
  },
  {
    number: 10,
    group: 'ten-grave-precepts',
    vow: 'I vow not to lie',
    shortName: 'Truthful Speech',
    description:
      'Beyond not telling outright lies, this includes not exaggerating, not omitting important truths, not using words to manipulate. It also means being honest with yourself — not hiding from uncomfortable realities.',
    defaultPrompts: [
      'Was there a moment today where you chose honesty even when it was uncomfortable?',
      'Did you catch yourself exaggerating or softening the truth? What was the situation?',
      'Were you honest with yourself about something you would rather not face?',
      'Did you withhold something important from someone? Why?',
      'Was there a conversation where you said exactly what you meant, clearly and kindly?',
    ],
  },
  {
    number: 11,
    group: 'ten-grave-precepts',
    vow: 'I vow not to intoxicate self or others',
    shortName: 'Clarity',
    description:
      'The precept of clarity. This extends to anything that clouds awareness or encourages escapism — excessive entertainment, compulsive consumption, even spiritual bypassing. The question is: what do you use to avoid being present?',
    defaultPrompts: [
      'Did you reach for something today to numb or distract yourself? What was it?',
      'Was there a time today when you chose to stay present with discomfort instead of escaping it?',
      'How much of your screen time today was intentional versus autopilot?',
      'Did you notice yourself consuming something — food, media, shopping — out of boredom or avoidance?',
      'Was there a moment of genuine clarity today where you saw a situation exactly as it was?',
    ],
  },
  {
    number: 12,
    group: 'ten-grave-precepts',
    vow: 'I vow not to speak of the faults of others',
    shortName: 'Not Elevating Self by Criticizing Others',
    description:
      'Gossip, complaining about people behind their backs, dwelling on others\' shortcomings — these actions harm both the person spoken about and the speaker. The question is: are you speaking to help, or to make yourself feel superior?',
    defaultPrompts: [
      'Did you talk about someone behind their back today? What motivated it?',
      'Was there a moment when you caught yourself about to gossip and stopped?',
      'Did you complain about a coworker, friend, or family member today? Was it necessary or just venting?',
      'When you noticed someone else\'s flaw today, did you sit with it quietly or share it with others?',
      'Was there an opportunity to speak well of someone who was not present? Did you take it?',
    ],
  },
  {
    number: 13,
    group: 'ten-grave-precepts',
    vow: 'I vow not to praise myself while abusing others',
    shortName: 'Humility',
    description:
      'This focuses on self-aggrandizing comparison. Putting others down to elevate yourself is a particularly toxic pattern. The precept invites you to notice when you are doing this, even subtly.',
    defaultPrompts: [
      'Did you compare yourself favorably to someone else today? What was the context?',
      'Was there a moment when you highlighted your own success at someone else\'s expense?',
      'Did you notice yourself feeling superior to someone today? What triggered it?',
      'Was there a time when you let someone else take the spotlight instead of claiming it?',
      'Did you downplay someone else\'s contribution in a conversation today?',
    ],
  },
  {
    number: 14,
    group: 'ten-grave-precepts',
    vow: 'I vow not to be possessive of anything',
    shortName: 'Generosity',
    description:
      'Clinging to possessions, status, relationships, ideas — all of this creates suffering. The precept does not mean you cannot have things; it means holding them lightly, recognizing their impermanence, and being willing to share and let go.',
    defaultPrompts: [
      'Did you cling tightly to something today — a plan, an opinion, a possession? What was it?',
      'Was there a moment when you shared something freely without expecting anything in return?',
      'Did you feel anxious about losing something today — a role, a relationship, a routine?',
      'Were you able to let go of something today, even something small, with ease?',
      'Did you notice yourself hoarding — time, information, resources — when you could have been open-handed?',
    ],
  },
  {
    number: 15,
    group: 'ten-grave-precepts',
    vow: 'I vow not to harbor ill will',
    shortName: 'Loving-Kindness',
    description:
      'Anger arises — that is natural. But nursing resentment, cultivating hatred, holding grudges — these poison your own mind as much as they harm others. The practice is to feel anger when it arises and then let it move through.',
    defaultPrompts: [
      'Did you hold onto anger or resentment toward someone today? What was it about?',
      'Was there a moment when you felt irritation and let it pass without acting on it?',
      'Did you wish someone ill today, even silently? What prompted it?',
      'Was there a grudge or old resentment that came up today? Were you able to soften around it?',
      'Did you respond to a frustrating person or situation today with patience instead of hostility?',
    ],
  },
  {
    number: 16,
    group: 'ten-grave-precepts',
    vow: 'I vow not to disparage the Three Treasures',
    shortName: 'Honoring the Path',
    description:
      'Disparaging the Three Treasures includes dismissing your own capacity for awakening (Buddha), denying truth or deceiving yourself (Dharma), and separating yourself from others (Sangha). It is a vow to keep faith with the path.',
    defaultPrompts: [
      'Did you dismiss your own practice or growth today — telling yourself it does not matter?',
      'Was there a moment when you deceived yourself about something important?',
      'Did you separate yourself from others today — physically, emotionally, or mentally — out of cynicism or despair?',
      'Were you able to appreciate something about your practice today, even if it felt small?',
      'Did you catch yourself thinking that your efforts at self-awareness are pointless? What was happening?',
    ],
  },
]

// ── Group Definitions ───────────────────────────────────────────────────────

export const preceptGroups: PreceptGroupDefinition[] = [
  {
    id: 'three-refuges',
    name: 'The Three Refuges',
    description:
      'Taking refuge is the fundamental act of becoming a Buddhist. You place yourself under the protection of, and commit yourself to, these three treasures.',
    precepts: precepts.filter((p) => p.group === 'three-refuges'),
  },
  {
    id: 'three-pure-precepts',
    name: 'The Three Pure Precepts',
    description:
      'The broadest ethical guidelines, sometimes called the three collective pure precepts. Everything else flows from them.',
    precepts: precepts.filter((p) => p.group === 'three-pure-precepts'),
  },
  {
    id: 'ten-grave-precepts',
    name: 'The Ten Grave Precepts',
    description:
      'More specific ethical guidelines. In Soto Zen, they are understood not as commandments but as descriptions of how an awakened person naturally lives.',
    precepts: precepts.filter((p) => p.group === 'ten-grave-precepts'),
  },
]

// ── Lookup Helpers ──────────────────────────────────────────────────────────

export function getPreceptByNumber(num: number): PreceptDefinition | undefined {
  return precepts.find((p) => p.number === num)
}

export function getPreceptsByGroup(group: PreceptDefinition['group']): PreceptDefinition[] {
  return precepts.filter((p) => p.group === group)
}
