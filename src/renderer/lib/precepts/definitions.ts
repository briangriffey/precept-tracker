import type { PreceptDefinition, PreceptGroupDefinition } from './types'

export const precepts: PreceptDefinition[] = [
  // === The Three Refuges ===
  {
    number: 1,
    group: 'three-refuges',
    vow: 'I take refuge in Buddha',
    shortName: 'Refuge in Buddha',
    description:
      'Taking refuge in Buddha means trusting that awakening is possible — for the historical Buddha, for all beings, for you. It is trusting your own awakened nature, the capacity for enlightenment already present.',
    defaultPrompts: [
      'Was there a moment today when you doubted your ability to grow or change? What happened?',
      'Did you notice yourself or someone else acting with genuine wisdom today? What did it look like?',
      'When did you feel most awake and present today?',
      'Was there a situation where you trusted your own capacity to handle something difficult?',
      "Did you catch yourself thinking 'I could never...' about something? What was it?",
      'Was there a moment today when you recognized your own goodness or potential?',
    ],
  },
  {
    number: 2,
    group: 'three-refuges',
    vow: 'I take refuge in Dharma',
    shortName: 'Refuge in Dharma',
    description:
      "Taking refuge in Dharma means committing to the teachings as your guide and trusting reality as it is, even when it's difficult. It means aligning yourself with what's true rather than with your preferences and delusions.",
    defaultPrompts: [
      'Was there a moment today when you resisted seeing something as it really is? What were you avoiding?',
      'Did you learn something today — from a conversation, a mistake, or just paying attention?',
      'Was there a time today when accepting a situation, rather than fighting it, brought relief?',
      'Did you notice a gap between what you wanted to be true and what was actually true?',
      'What did you read, hear, or observe today that felt genuinely wise or helpful?',
      'Was there a moment when you chose truth over comfort today?',
    ],
  },
  {
    number: 3,
    group: 'three-refuges',
    vow: 'I take refuge in Sangha',
    shortName: 'Refuge in Sangha',
    description:
      "Taking refuge in Sangha means recognizing you can't do this alone and committing to practice with others. It also means recognizing the interconnection of all beings.",
    defaultPrompts: [
      'Did you ask for help today, or did you try to do everything alone?',
      'Was there a moment of genuine connection with another person today — even brief?',
      'Did you feel part of something larger than yourself at any point today?',
      'Was there someone whose presence supported you today, even if they didn\'t know it?',
      'Did you offer support to someone today? What did that look like?',
      'Was there a time today when you felt isolated? What might have helped?',
    ],
  },

  // === The Three Pure Precepts ===
  {
    number: 4,
    group: 'three-pure-precepts',
    vow: 'I vow to refrain from all evil',
    shortName: 'Refrain from evil',
    description:
      'The precept of restraint. You vow to stop doing harm — to others, to yourself, to the world. It acknowledges that your actions have consequences and that some actions cause suffering.',
    defaultPrompts: [
      'Was there a moment today when you stopped yourself from doing something you knew would cause harm?',
      'Did you notice a habit or impulse today that, if followed, would have hurt someone — including yourself?',
      'Was there a situation where you chose not to react, even though you wanted to?',
      'Did you catch yourself about to say something hurtful and hold back?',
      'Looking at your day, was there anything you did that caused unnecessary suffering?',
      'Was there a small choice today — what you bought, ate, or said — where you considered its impact?',
    ],
  },
  {
    number: 5,
    group: 'three-pure-precepts',
    vow: 'I vow to do all good',
    shortName: 'Do all good',
    description:
      "The precept of active virtue. It's not enough to avoid harm; you also cultivate what's beneficial. Kindness, generosity, compassion, wisdom — these are to be actively developed.",
    defaultPrompts: [
      'What was one kind thing you did today, even if small?',
      'Did you go out of your way to help someone today? What happened?',
      'Was there an opportunity to do something good that you noticed but passed by?',
      'Did you do something today that made someone\'s day a little easier?',
      'How did you actively contribute to someone else\'s well-being today?',
      'Was there a moment where being generous — with time, attention, or resources — felt natural?',
    ],
  },
  {
    number: 6,
    group: 'three-pure-precepts',
    vow: 'I vow to save all beings',
    shortName: 'Save all beings',
    description:
      "The bodhisattva vow. You commit to awakening not just for yourself but for the benefit of all beings. It orients your life toward service rather than personal attainment.",
    defaultPrompts: [
      'Did you do something today primarily for someone else\'s benefit rather than your own?',
      'Was there a moment when you put another person\'s needs ahead of your convenience?',
      'Did you notice suffering around you today — in a person, an animal, or the world? How did you respond?',
      'Was there a time today when you acted from a sense of duty or care for others?',
      'How did you serve — your family, your coworkers, your community, or a stranger — today?',
      'Did you consider how your choices today affected people beyond your immediate circle?',
    ],
  },

  // === The Ten Grave Precepts ===
  {
    number: 7,
    group: 'ten-grave-precepts',
    vow: 'I vow not to kill',
    shortName: 'Affirming life',
    description:
      'The precept of affirming life. This extends into how you relate to all living things — how you speak about others, whether your words diminish or support life.',
    defaultPrompts: [
      'How did you support or nurture life today — in your home, at work, or in passing?',
      'Did your words build someone up or diminish them today?',
      'Was there a moment where you chose care over convenience with another living being?',
      'Did you notice yourself dismissing or devaluing someone\'s experience today?',
      'How did you take care of your own vitality — rest, nourishment, movement?',
      'Was there a time you paused to appreciate something alive — a plant, an animal, a person?',
    ],
  },
  {
    number: 8,
    group: 'ten-grave-precepts',
    vow: 'I vow not to steal',
    shortName: 'Not stealing',
    description:
      "The precept of not taking what is not given. Beyond obvious theft, this includes taking more than your share, exploiting others' labor, wasting resources, or taking credit for others' work.",
    defaultPrompts: [
      'Did you take credit for something that wasn\'t entirely your doing today?',
      'Was there a moment when you took more than your fair share — of time, space, or resources?',
      'Did you respect other people\'s time today, or did you waste it?',
      'Was there an opportunity to be generous rather than grasping? Did you take it?',
      'Did you feel satisfied with what you have today, or were you focused on what you lack?',
      'Was there a moment when you used something — energy, supplies, attention — carelessly?',
    ],
  },
  {
    number: 9,
    group: 'ten-grave-precepts',
    vow: 'I vow not to misuse sexuality',
    shortName: 'Respecting intimacy',
    description:
      'The precept of respecting the body and intimate relationships. It means bringing awareness and care to this powerful dimension of human life rather than acting out of compulsion.',
    defaultPrompts: [
      'Did you treat your own body with care and respect today?',
      'Were you honest and respectful in your close relationships today?',
      'Was there a moment when you objectified someone — in person, online, or in your thoughts?',
      'Did you honor a boundary — yours or someone else\'s — today?',
      'How did you show care for the people closest to you today?',
      'Was there a moment today when you acted out of compulsion rather than genuine connection?',
    ],
  },
  {
    number: 10,
    group: 'ten-grave-precepts',
    vow: 'I vow not to lie',
    shortName: 'Truthful speech',
    description:
      'The precept of truthful speech. Beyond not telling outright lies, this includes not exaggerating, not omitting important truths, and being honest with yourself.',
    defaultPrompts: [
      'Was there a moment today where you chose honesty even when it was uncomfortable?',
      'Did you catch yourself exaggerating or softening the truth? What was the situation?',
      'Were you honest with yourself about something you\'d rather not face?',
      'Did you withhold something important from someone? Why?',
      'Was there a conversation where you said exactly what you meant, clearly and kindly?',
      'Did you tell a white lie today? Was it truly necessary?',
    ],
  },
  {
    number: 11,
    group: 'ten-grave-precepts',
    vow: 'I vow not to intoxicate self or others',
    shortName: 'Clarity of mind',
    description:
      'The precept of clarity. This extends to anything that clouds awareness or encourages escapism — excessive entertainment, compulsive consumption, even spiritual bypassing.',
    defaultPrompts: [
      'Did you reach for something to numb or distract yourself today? What was it?',
      'Was there a time today when you chose to stay present with discomfort rather than escape it?',
      'How much of your screen time today was intentional versus habitual?',
      'Did you consume anything today — food, drink, media — that left you feeling worse?',
      'Was there a moment when you were fully clear and alert? What were you doing?',
      'Did you notice an urge to check out or zone out today? What was happening at the time?',
    ],
  },
  {
    number: 12,
    group: 'ten-grave-precepts',
    vow: 'I vow not to speak of the faults of others',
    shortName: 'Not gossiping',
    description:
      "The precept of not elevating oneself by criticizing others. Gossip and dwelling on others' shortcomings harm both the person spoken about and the speaker.",
    defaultPrompts: [
      'Did you talk about someone behind their back today? What motivated it?',
      'Was there a moment when you complained about a coworker, friend, or family member? Was it helpful?',
      'Did you catch yourself judging someone today? What was the judgment?',
      'Was there a conversation where you chose to speak well of someone, or stayed silent rather than criticize?',
      'Did you notice yourself feeling superior to someone today? What triggered it?',
      'Was there a moment when you gave someone the benefit of the doubt rather than assuming the worst?',
    ],
  },
  {
    number: 13,
    group: 'ten-grave-precepts',
    vow: 'I vow not to praise myself while abusing others',
    shortName: 'Humility',
    description:
      'The precept of humility. Putting others down to elevate yourself is a particularly toxic pattern. The precept invites you to notice when you\'re doing this, even subtly.',
    defaultPrompts: [
      'Did you compare yourself favorably to someone else today? What was the context?',
      'Was there a moment when you took credit you should have shared?',
      'Did you put someone down — even in your own mind — to feel better about yourself?',
      'Was there a situation where you could have lifted someone else up instead of focusing on your own accomplishment?',
      'Did you notice any bragging — obvious or subtle — in your conversations today?',
      'Was there a moment when someone else\'s success made you feel threatened or diminished?',
    ],
  },
  {
    number: 14,
    group: 'ten-grave-precepts',
    vow: 'I vow not to be possessive of anything',
    shortName: 'Generosity',
    description:
      'The precept of generosity. Clinging to possessions, status, relationships, ideas — all of this creates suffering. The precept means holding things lightly and being willing to share and let go.',
    defaultPrompts: [
      'Was there something today you had difficulty sharing or letting go of?',
      'Did you feel attached to a particular outcome today? What happened when things went differently?',
      'Was there an opportunity to be generous that you took — or missed?',
      'Did you notice yourself clinging to an idea, a plan, or a possession today?',
      'Was there a moment when letting go of something brought you relief?',
      'Did you hold tightly to being right in a disagreement today?',
    ],
  },
  {
    number: 15,
    group: 'ten-grave-precepts',
    vow: 'I vow not to harbor ill will',
    shortName: 'Loving-kindness',
    description:
      'The precept of loving-kindness. Anger arises naturally, but nursing resentment and holding grudges poison your own mind. The practice is to feel anger and then let it move through.',
    defaultPrompts: [
      'Did you hold onto anger or resentment today? Toward whom?',
      'Was there a moment when you felt irritated and let it pass without acting on it?',
      'Did someone frustrate you today? Were you able to respond with patience?',
      'Is there a grudge you\'re carrying that weighed on you today?',
      'Was there a moment of genuine warmth or goodwill toward someone — even someone difficult?',
      'Did you wish someone well today, even silently?',
    ],
  },
  {
    number: 16,
    group: 'ten-grave-precepts',
    vow: 'I vow not to disparage the Three Treasures',
    shortName: 'Honoring the path',
    description:
      'The precept of honoring Buddha, Dharma, and Sangha. This includes not dismissing your own capacity for awakening, not denying truth, and not separating yourself from others.',
    defaultPrompts: [
      'Did you dismiss your own capacity for growth or change today?',
      'Was there a moment when you separated yourself from others — emotionally or physically — when connection was possible?',
      'Did you deceive yourself about something today to avoid discomfort?',
      'Was there a time today when you honored your own practice or path, even in a small way?',
      'Did you feel cynical about something meaningful today? What was behind that feeling?',
      'Was there a moment when you felt grateful for the support of others on your path?',
    ],
  },
]

export const preceptGroups: PreceptGroupDefinition[] = [
  {
    id: 'three-refuges',
    name: 'The Three Refuges',
    description:
      'Taking refuge is the fundamental act of placing yourself under the protection of, and committing yourself to, the three treasures: Buddha, Dharma, and Sangha.',
    precepts: precepts.filter((p) => p.group === 'three-refuges'),
  },
  {
    id: 'three-pure-precepts',
    name: 'The Three Pure Precepts',
    description:
      'The broadest ethical guidelines. Everything else flows from them: restraint from harm, cultivation of good, and service to all beings.',
    precepts: precepts.filter((p) => p.group === 'three-pure-precepts'),
  },
  {
    id: 'ten-grave-precepts',
    name: 'The Ten Grave Precepts',
    description:
      'Specific ethical guidelines understood not as commandments but as descriptions of how an awakened person naturally lives.',
    precepts: precepts.filter((p) => p.group === 'ten-grave-precepts'),
  },
]
