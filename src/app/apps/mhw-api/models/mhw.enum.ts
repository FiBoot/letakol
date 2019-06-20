enum MHWWeaponType {
  GREAT_SWORD = 'great_sword',
  LONG_SWORD = 'long_sword',
  SWORD_AND_SHIELD = 'sword_and-shield',
  DUAL_BLADES = 'dual_blades',
  HAMMER = 'hammer',
  HUNTING_HORN = 'hunting_horn',
  LANCE = 'lance',
  GUNLANCE = 'gunlance',
  SWITCH_AXE = 'switch_axe',
  CHARGE_BLADE = 'charge_blade',
  INSECT_GLAIVE = 'insect_glaive',
  LIGHT_BOWGUN = 'light_bowgun',
  HEAVY_BOWGUN = 'heavy_bowgun',
  BOW = 'bow'
}

enum MHWElementType {
  FIRE = 'fire',
  WATER = 'water',
  ICE = 'ice',
  THUNDER = 'thunder',
  DRAGON = 'dragon',
  BLAST = 'blast',
  POISON = 'poison',
  SLEEP = 'sleep',
  PARALYSIS = 'paralysis'
}

enum MHWArmorType {
  HEAD = 'head',
  CHEST = 'chest',
  GLOVES = 'gloves',
  WAIST = 'waist',
  LEGS = 'legs'
}

enum MHWArmorRank {
  LOW = 'low',
  HIGHT = 'hight'
}

enum MHWGender {
  MALE = 'male',
  FEMALE = 'female'
}

module.exports = {
  MHWWeaponType,
  MHWElementType,
  MHWArmorType,
  MHWArmorRank,
  MHWGender
};
