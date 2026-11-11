import { CONDITIONS } from './grid.js';
import {
  check, containedCrop, crop, distinctCrops, floodedPlants, hold, living, rescue,
  simultaneous, supportedContact, temperatureCollection, witnessed,
} from './task-goals.js';
import { MAIN_TASK_DIALOGUE } from './main-task-dialogue.js';

export const FIRST_TASK = 'M-3KJ45T';
export const CARE_TASK = 'M-8NQ2VC';
export const DISCOVERY_TASK = 'M-6PT9RX';
export const LEAVES_TASK = 'M-4HV7LK';
export const PUMPKIN_TASK = 'M-P7H3LM';
export const INVENTORY_TASK = 'M-R6T2YZ';
export const FLOWERS_TASK = 'M-F4L8VQ';
export const AQUATIC_TASK = 'M-A2W7VD';
export const WOODLANDS_TASK = 'M-W8M3GT';
export const DESERT_TASK = 'M-D5S9CB';
export const SPICES_TASK = 'M-S6P4NR';
export const BULK_ORDER_TASK = 'M-Q7D2BL';
export const EXHIBITION_TASK = 'M-E9G5HN';
const SOUP = 'M-S8Q5TP';
const FLOODED_PRACTICE = 'M-J8F2WQ';
const SHOPPING = 'M-A6T2PR';
const ARRANGEMENT = 'M-A5D7CF';
const CHAMELEON = 'M-N2G5HF';
const FLORAL_ACCOUNTING = 'M-R4F8CV';
const CLIMATE_PRACTICE = 'M-D8N3CM';
const FLOWER_DISPLAY = 'M-B9F2PQ';
const PROMOTION = 'M-U7G2ML';
const COLONY = 'M-C8H6RD';
const BOOST = 'M-B2W9EN';
const CONTAINMENT = 'M-C7T2SP';
const ORCHIWITCH = 'M-O4H6LP';
const NIGHT_SHIFT = 'M-N7T2LS';
const FLOWERS_FINALE = 'M-L3H6ST';
const MOONLIT = 'M-M5L8GV';
const DRAIN = 'M-D6L2TH';
const AQUATIC_FINALE = 'M-S4L8AV';
const FOREST = 'M-F3M8NC';
const DEPARTURE = 'M-F2G9MR';
const WOODLANDS_FINALE = 'M-M4D8AB';
const HEAT = 'M-T5H8CE';
const COLD = 'M-C2H9MJ';
const DESERT_FINALE = 'M-E2J6AR';
const TASTE = 'M-T8S2CE';
const MINT = 'M-H7C2NT';
const SPICES_FINALE = 'M-R9S4PN';

export const SPECIALIZATION_FINALES = [FLOWERS_FINALE, AQUATIC_FINALE, WOODLANDS_FINALE, DESERT_FINALE, SPICES_FINALE];
export const EXHIBITION_PREVIEWS = {
  Pumpkin: COLONY, Orchiwitch: COLONY, Starlotus: AQUATIC_TASK, Mandrakadabra: WOODLANDS_TASK,
  Everjade: DESERT_TASK, Cinnamancer: SPICES_TASK,
};

const task = (id, order, title, requires, options) => ({
  id, order, title, requires, category: 'main', speaker: 'Instructor', ...options,
  description: options.description || MAIN_TASK_DIALOGUE[order]?.description || [],
  completion: options.completion || MAIN_TASK_DIALOGUE[order]?.completion || ['Assignment complete. Well done.'],
  instructions: options.instructions || [],
  rewards: { gold: 0, ...options.rewards },
});
const after = (id, order, title, prerequisite, options) => task(id, order, title, [prerequisite], options);
const collection = (...species) => simultaneous(...species.map(name => crop(name)));
const retain = (...species) => check(`Keep ${species.join(' and ')} alive together`, collection(...species));
const starter = (family, species, spores) => ({
  family, seeds: { [species]: 25 }, spores, seedStock: [species],
});
const blocker = (design, quantity = 2) => ({ [`blocker:${design}:edge`]: quantity });
const climateCrops = [
  crop('Potato', 'Damp', 'Cold'), crop('Pumpkin', 'Damp', 'Hot'),
  crop('Strawberry', 'Damp', 'Temperate', 'Bright'),
];

export const MAIN_TASKS = [
  after(DISCOVERY_TASK, 3, "Well, I'm Sure You Can Figure It Out", CARE_TASK, {
    goals: [witnessed('Beanstalk', 'Potato'), witnessed('Beanstalk', 'Onion')],
    description: ['The kitchen has requested Potatoes and Onions. Apparently, “another Carrot” does not count as a varied menu.',
      'For Potato, think of a cool cellar and soil that hasn’t turned to dust. For Onion? Well, I’m sure you can figure it out.'],
    completion: ['Potatoes and Onions. You figured it out.', 'I’d like it recorded that I had complete confidence in you. Preferably before anyone reads the training forms.'],
  }),
  after(LEAVES_TASK, 4, 'Leaves, Please', DISCOVERY_TASK, {
    delivery: { Carrot: 8 }, rewards: { spores: { Emberbolete: 8 } },
    description: ['The infirmary has requested Carrot Leaves. Apparently, one of our adventurers tried to headbutt a locked door.',
      'The door won.'],
    instructions: ['Inspect the available Leaf yield before harvesting. Harvesting removes the Plant.',
      'Harvest before the Leaf yield falls away and the Plant is producing Seeds instead.'],
    completion: ['Eight Leaves. Correct Plant. Correct part of the Plant. You’re already doing better than several departments.'],
  }),
  after(PUMPKIN_TASK, 5, 'A Pumpkin Problem', LEAVES_TASK, {
    goals: [witnessed('Beanstalk', 'Pumpkin'), living('Pumpkin', 3)],
    rewards: { rows: 1, seedStock: ['Pumpkin'] },
  }),
  after(SOUP, 6, 'The Soup Has Requirements', PUMPKIN_TASK, {
    delivery: { Pumpkin: 18, Potato: 10 }, rewards: { spores: { Rainmorel: 8 }, seedStock: ['Carrot', 'Potato', 'Onion'] },
  }),
  after(INVENTORY_TASK, 7, 'A Little Rain, A Lot of Sunshine', SOUP, {
    goals: [witnessed('Beanstalk', 'Rice'), witnessed('Beanstalk', 'Strawberry')],
    rewards: { slots: 10, seedStock: ['Rice', 'Strawberry'] },
  }),
  task(FLOODED_PRACTICE, 7.1, 'Through the Water', [SOUP], {
    unlockOn: { task: INVENTORY_TASK, goal: 0 },
    goals: [check('Reach a living Rice with Dewmender through at least two connected Flooded hexes', floodedPlants('Rice', 1, 2))],
    description: ['Dewmender’s cultivation effect can travel through connected Flooded hexes. Follow its route to your Rice in the Inspector.'],
    rewards: { spores: { Dewmender: 4 } },
  }),
  task(SHOPPING, 8, 'A Perfectly Reasonable Shopping List', [INVENTORY_TASK, FLOODED_PRACTICE], {
    delivery: { Rice: 6, Strawberry: 8, Onion: 10 },
  }),
  after(FLOWERS_TASK, 9, 'The Guild’s Botanical Inspection', SHOPPING, {
    goals: [check('Keep four different Ingredients alive, including Pumpkin and either Rice or Strawberry',
      distinctCrops('Ingredients', 4, ['Pumpkin'], ['Rice', 'Strawberry']))],
    rewards: { ...starter('Flowers', 'Daisydaze', { Mistruffle: 8 }), sourceGroup: 1, sources: ['weeping-statue'] },
  }),
  after(ARRANGEMENT, 10, 'A Question of Arrangement', FLOWERS_TASK, {
    goals: [witnessed('Daisydaze', 'Marigloom'), witnessed('Daisydaze', 'Charmomile')],
    rewards: { spores: { Hushroom: 8 } },
  }),
  after(CHAMELEON, 11, 'Now You See Me…', ARRANGEMENT, {
    goals: [witnessed('Charmomile', 'Chamomeleon')], rewards: { blockers: blocker('shade-panel') },
  }),
  after(FLORAL_ACCOUNTING, 12, 'Floral Accounting', CHAMELEON, {
    delivery: { Marigloom: 8, Charmomile: 10, Chamomeleon: 2 },
    rewards: { spores: { Prismorel: 12 }, seedStock: ['Marigloom', 'Charmomile'] },
  }),
  after(CLIMATE_PRACTICE, 12.1, 'Two Climates, One Garden', FLORAL_ACCOUNTING, {
    goals: [check('Keep a Damp, Cold Potato and a Damp, Hot Pumpkin alive at the same time',
      simultaneous(...climateCrops.slice(0, 2)))],
    description: ['Give the Potato and Pumpkin different climates at the same time. Inspect each plant to check the conditions it receives.'],
    rewards: { blockers: blocker('insulating-panel') },
  }),
  after(FLOWER_DISPLAY, 13, 'A Blooming Ridiculous Display', CLIMATE_PRACTICE, {
    goals: [witnessed('Daisydaze', 'Lavendream'), check('Keep three different Flowers alive together, including Lavendream',
      distinctCrops('Flowers', 3, ['Lavendream']))],
    rewards: { seedStock: ['Lavendream'], blockers: blocker('garden-screen') },
  }),
  after(PROMOTION, 14, 'The Guild’s Unreasonable Promotion', FLOWER_DISPLAY, {
    delivery: { Carrot: 12, Potato: 8, Marigloom: 8, Charmomile: 8, Lavendream: 4 },
    rewards: { spores: { Mycelord: 8 } },
  }),
  after(COLONY, 14.1, 'Something’s Growing Under There', PROMOTION, {
    goals: [check('Grow three connected Mycelial hexes supported by one living Mycelord',
      scene => scene.supported.some(keys => keys.length >= 3))],
    instructions: ['Mycelial ground slows Plant growth and ripening. Prolonged exposure kills most Plants.',
      'Some Fungi grow stronger on it and can reach Plants growing on ordinary ground.'],
    rewards: { spores: { "Sim'mushro'dim": 8 } },
  }),
  after(BOOST, 14.2, 'Use a Boosted Fungus', COLONY, {
    goals: [check('Reach a Plant on ordinary ground with Emberbolete growing on supported Mycelial ground',
      scene => supportedContact(scene, 1, 'Emberbolete', null, true))],
    description: ['Emberbolete gains a stronger Seed Yield effect on Mycelial ground. Put the Fungus on the colony and keep the crop outside it.'],
    instructions: ['Inspect the receiving Plant to see Emberbolete’s Seed Yield bonus rise from +10% to +30%.'],
    rewards: { blockers: blocker('root-barrier', 4) },
  }),
  after(CONTAINMENT, 14.3, 'Contain the Spread', BOOST, {
    description: ['Use the Root Barriers to keep a living crop out of an active Mycelial colony. Check the other paths the colony could take around the barriers.'],
    instructions: ['Keep Mycelord and its supported colony alive. Check the Mycelial overlay and the protected crop in the Inspector.'],
    goals: [check('Use Root Barriers to close all remaining Mycelial paths from a supported colony to a living crop', containedCrop)],
    completion: ['A living crop, a living colony, and a boundary holding them apart. The guild calls that a very good day.'],
    rewards: { blockers: blocker('root-barrier', 2) },
  }),
  after(AQUATIC_TASK, 15, 'A Watershed Moment', BOOST, {
    goals: [hold('Keep two living Rice reached by Dewmender in one region of four or more Flooded hexes',
      24, floodedPlants('Rice', 2, 4))],
    rewards: { ...starter('Aquatic', 'Algea', { Dewmender: 8 }), blockers: blocker('water-gate') },
  }),
  after(WOODLANDS_TASK, 16, 'Roots of the Problem', BOOST, {
    goals: [check('Grow a four-hex supported Mycelial colony and reach living Charmomile with Mistruffle growing in it',
      scene => supportedContact(scene, 4, 'Mistruffle', 'Charmomile'))],
    rewards: starter('Woodlands', 'Moss', { Siltgill: 8 }),
  }),
  after(DESERT_TASK, 17, 'A Little Too Much Sunshine', BOOST, {
    goals: [rescue('Beanstalk', 24)], instructions: ['Keep one living Beanstalk Dry and Scorching for 24 garden hours.',
      'Bring that same Plant back to Damp, Temperate conditions while it is still alive.'],
    rewards: { ...starter('Desert', 'Jadeheart', { Frostfolio: 8 }), blockers: blocker('windbreak') },
  }),
  after(SPICES_TASK, 18, 'Three Climates, One Garden', BOOST, {
    goals: [hold('Keep a Damp, Cold Potato, a Damp, Hot Pumpkin, and a Damp, Temperate, Bright Strawberry alive together',
      12, simultaneous(...climateCrops))],
    rewards: { ...starter('Spices', 'Thymekeeper', { Hushroom: 8 }), blockers: blocker('climate-divider') },
  }),
  task(BULK_ORDER_TASK, 19, 'The Quartermaster’s Grand Unified Disaster', [
    CONTAINMENT, AQUATIC_TASK, WOODLANDS_TASK, DESERT_TASK, SPICES_TASK,
  ], {
    delivery: { Algea: 24, Moss: 24, Jadeheart: 24, Thymekeeper: 24, Carrot: 28, Charmomile: 28 },
    rewards: { spores: { Rushroom: 8 }, sourceGroup: 2, sources: ['frostbell'] },
  }),
  after(ORCHIWITCH, 19.1, 'An Orchid Under Suspicion', COLONY, {
    goals: [witnessed('Marigloom', 'Orchiwitch')], rewards: { spores: { Rilllace: 8 } },
  }),
  after(NIGHT_SHIFT, 19.2, 'The Night Shift', ORCHIWITCH, {
    goals: [witnessed('Marigloom', 'Nightmarigold'), retain('Orchiwitch', 'Nightmarigold')],
    rewards: { spores: { Prismorel: 12, Mistruffle: 8 } },
  }),
  after(FLOWERS_FINALE, 19.3, 'Lights Out. Lights On.', NIGHT_SHIFT, {
    goals: [witnessed('Orchiwitch', 'Orchidemon')], rewards: { specialization: 'Flowers' },
  }),
  after(MOONLIT, 20, 'Something in the Deep', AQUATIC_TASK, {
    goals: [witnessed('Sunken Lotus', 'Moonlit Lotus')],
    description: ['The Guild wants to see what a Sunken Lotus can become under dim light. Grow a Moonlit Lotus and keep its Flooded habitat available for the next experiment.'],
    rewards: { spores: { Rainmorel: 8 } },
  }),
  after(DRAIN, 20.1, 'When the Water Recedes', MOONLIT, {
    goals: [witnessed('Moonlit Lotus', 'Starlotus')],
    description: ['Prepare a Moonlit Lotus in cold, dim water. When it is ready, drain its hex to Damp to produce Starlotus.'],
    instructions: ['Check the Taskboard or Inspector for the preparation signal. Plan how to remove the extra Wetting before you drain the hex.'],
    preparation: 'Starlotus', rewards: { blockers: blocker('pond-liner') },
  }),
  after(AQUATIC_FINALE, 20.2, 'A Harvest of Stars', DRAIN, {
    goals: [check('Harvest Starlotus Leaves and keep at least one in inventory', scene => (scene.garden.inventory.leaves.Starlotus || 0) > 0)],
    description: ['Grow the Starlotus through its Leaf harvest window. Keep its Leaves for the Grand Exhibition.'],
    rewards: { specialization: 'Aquatic' },
  }),
  after(FOREST, 21, 'A Forest of Bad Puns', WOODLANDS_TASK, {
    goals: [witnessed('Moss', 'Bamboom'), witnessed('Moss', 'Tanglethorn'), retain('Bamboom', 'Tanglethorn')],
    rewards: { spores: { Hushroom: 8, Mistruffle: 8 } },
  }),
  after(DEPARTURE, 21.1, 'The Fungus Must Go', FOREST, {
    goals: [witnessed('Tanglethorn', 'Mistlefoe'), witnessed('Mistlefoe', 'Mandrabra')],
    rewards: { spores: { Dewmender: 8, Siltgill: 8, Prismorel: 12 } },
  }),
  after(WOODLANDS_FINALE, 21.2, 'Now That’s Magic', DEPARTURE, {
    goals: [rescue('Mandrakadabra')],
    instructions: ['Prepare a way to lower the illumination before transforming Mandrabra. As soon as Mandrakadabra appears, reduce the light below Bright.'],
    rewards: { spores: { Siltgill: 8 }, specialization: 'Woodlands' },
  }),
  after(HEAT, 22, 'Too Hot to Handle', DESERT_TASK, {
    goals: [witnessed('Jadeheart', 'Aloechemist'), witnessed('Aloechemist', 'Aloemancer')],
    rewards: { spores: { Frostfolio: 8, Rilllace: 8 } },
  }),
  after(COLD, 22.1, 'Cold Comfort', HEAT, {
    goals: [witnessed('Jadeheart', 'Moonjade'), witnessed('Moonjade', 'Jadewisp')],
    rewards: { spores: { Hushroom: 8, Prismorel: 8, Dewmender: 8 } },
  }),
  after(DESERT_FINALE, 22.2, 'The Two Roads to Everjade', COLD, {
    goals: [witnessed('Aloemancer', 'Everjade'), witnessed('Jadewisp', 'Everjade')],
    rewards: { spores: { Dewmender: 8 }, specialization: 'Desert' },
  }),
  after(TASTE, 23, 'A Matter of Taste', SPICES_TASK, {
    goals: [witnessed('Thymekeeper', 'Oreganoir'), witnessed('Thymekeeper', 'Clovely')],
    rewards: { spores: { Emberbolete: 8, Rilllace: 8 } },
  }),
  after(MINT, 23.1, 'Some Like It Hot', TASTE, {
    goals: [witnessed('Oreganoir', 'Cinnamancer'), witnessed('Clovely', 'Mighty Mint'), retain('Cinnamancer', 'Mighty Mint')],
    rewards: { spores: { Prismorel: 12, Mistruffle: 8, Rainmorel: 8 } },
  }),
  after(SPICES_FINALE, 23.2, 'A Royal Pain in the Pantry', MINT, {
    goals: [witnessed('Dilly-Dally Dill', 'Wyrmsalt'), witnessed('Oreganoir', 'Papriking')],
    delivery: { Wyrmsalt: 8, Papriking: 10 }, rewards: { specialization: 'Spices' },
  }),
  task(EXHIBITION_TASK, 24, 'The Guild’s Grand Exhibition', [BULK_ORDER_TASK, ...SPECIALIZATION_FINALES], {
    delivery: { Pumpkin: 12, Orchiwitch: 10, Starlotus: 8, Mandrakadabra: 8, Everjade: 8, Cinnamancer: 12 },
    rewards: { blockers: blocker('stone-wall') },
  }),
  after('M-K5M2GS', 25, 'The Guild’s Living Museum', EXHIBITION_TASK, {
    goals: [hold('Keep all six exhibits alive in their assigned conditions', 48, simultaneous(
      crop('Strawberry', 'Damp', 'Temperate', 'Bright'), crop('Orchiwitch', 'Damp', 'Hot', 'Bright'),
      crop('Pearlily', 'Flooded', 'Temperate', 'Lit'), crop('Mandrabra', 'Damp', 'Temperate', 'Lit'),
      crop('Jadewisp', 'Damp', 'Cold', 'Dim'), crop('Dilly-Dally Dill', 'Damp', 'Cold', 'Dark')))],
    instructions: ['Damp: Strawberry (Temperate, Bright), Orchiwitch (Hot, Bright), Mandrabra (Temperate, Lit), Jadewisp (Cold, Dim), and Dilly-Dally Dill (Cold, Dark).',
      'Flooded: Pearlily (Temperate, Lit).'],
    rewards: { blockers: blocker('garden-screen', 4) },
  }),
  after('M-F9C3HW', 26, 'Five Climates, One Greenhouse', EXHIBITION_TASK, {
    goals: [hold('Keep five different species alive, one at each Temperature level', 36,
      temperatureCollection(CONDITIONS.Temperature, 1, true), true)],
    rewards: { blockers: blocker('insulating-panel', 4) },
  }),
  after('M-U6I8RD', 27, 'The Underground Irrigation Department', EXHIBITION_TASK, {
    goals: [check('Reach nine living Aquatic Plants from at least three species in one Flooded region with a single Dewmender',
      floodedPlants(null, 9, 9, 3))],
    rewards: { spores: { Dewmender: 12, Rainmorel: 8 } },
  }),
  after('M-C4R8NL', 28, 'No Crutches Allowed', EXHIBITION_TASK, {
    goals: [hold('Without deployed Source items, keep two Plants alive in each of three different Temperature states',
      36, temperatureCollection(CONDITIONS.Temperature, 2, false, true), true)],
    rewards: { blockers: blocker('climate-divider', 4) },
  }),
  after('M-T9W2GM', 29, 'Two Ways to Grow a Miracle', EXHIBITION_TASK, {
    goals: [witnessed('Moonlit Lotus', 'Starlotus'), witnessed('Kelpergeist', 'Starlotus'),
      witnessed('Orchiwitch', 'Orchidemon'), witnessed('Charmomile', 'Orchidemon')],
    rewards: { spores: { Frostfolio: 8, Hushroom: 8, Mistruffle: 8 } },
  }),
  after('M-B5L7FR', 30, 'The Guild’s Botanical Lifeboat', EXHIBITION_TASK, {
    goals: [witnessed('Mistlewoe', 'Tanglethorn'), witnessed('Kelpless', 'Wild Watercress'), witnessed('Cactastrophe', 'Prickly Pearl')],
    rewards: { spores: { Rainmorel: 8, Dewmender: 8 } },
  }),
  after('M-U3S6CL', 31, 'The Unseeded Collection', EXHIBITION_TASK, {
    goals: [hold('Keep Orchidemon, Starlotus and Papriking alive together', 24,
      collection('Orchidemon', 'Starlotus', 'Papriking'))],
    rewards: { sources: ['shadecloth-canopy', 'overflow-urn'] },
  }),
  after('M-D9G4NW', 32, 'The Dead Don’t Do Gardening', EXHIBITION_TASK, {
    goals: [hold('Keep Rosewraith, Kelpergeist, Branshee, Cactacomb and Phantarragon alive together', 60,
      collection('Rosewraith', 'Kelpergeist', 'Branshee', 'Cactacomb', 'Phantarragon'))],
    rewards: { blockers: blocker('stone-wall', 4), sources: ['sandglass-fountain'] },
  }),
];
