export interface MHWSkillRankModifier {
  affinity: string;
  attack: number;
  damageFire: number;
  damageWater: number;
  damageIce: number;
  damageThunder: number;
  damageDragon: number;
  defense: number;
  health: number;
  sharpnessBonus: number;
  resistAll: number;
  resistFire: number;
  resistWater: number;
  resistIce: number;
  resistThunder: number;
  resistDragon: number;
}

export interface MHWSkillRank {
  id: number;
  slug: string;
  level: number;
  description: string;
  skill: number;
  skillName: string;
  modifiers: MHWSkillRankModifier;
}

export interface MHWSkill {
  id: number;
  slug: string;
  name: string;
  description: string;
  ranks: Array<MHWSkillRank>;
}
