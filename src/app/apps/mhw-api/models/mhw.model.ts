interface MHWBase {
  id: number;
  slug: string;
  name: string;
}

interface MHWAttack {
  display: number;
  raw: number;
}

interface MHWDefense {
  base: number;
  max: number;
  augmented: number;
}

interface MHWResistances {
  fire: number;
  water: number;
  ice: number;
  thunder: number;
  dragon: number;
}

interface MHWSlot {
  rank: number;
}

interface MHWCraftingCost {
  quantity: number;
  item: MHWItem;
}

interface MHWSetInfo {
  id: number;
  name: string;
  rank: MHWArmorRank;
  pieces: Array<number>;
}
