interface MHWCharmRankCrafting {
  craftable: Boolean;
  materials: Array<MHWCraftingCost>;
}

interface MHWCharmRank {
  name: string;
  level: number;
  rarity: number;
  skills: Array<MHWSkillRank>;
  crafting: MHWCharmRankCrafting;
}

interface MHWCharm {
  id: number;
  slug: string;
  name: string;
  ranks: Array<MHWCharmRank>;
}
