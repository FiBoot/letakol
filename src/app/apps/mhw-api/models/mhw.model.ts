import { MHWArmor } from './mhw-armor.model';
import { MHWCharm } from './mhw-charm.model';
import { MHWDecoration } from './mhw-decoration.model';
import { MHWItem } from './mhw-item.model';
import { MHWSkill } from './mhw-skill.model';
import { MHWWeapon } from './mhw-weapon.model';
import { MHWArmorRank, MHWDataType } from './mhw.enum';

export type MHWBase = MHWItem | MHWSkill | MHWDecoration | MHWWeapon | MHWCharm | MHWArmor;

export interface MHWBaseType {
  base: MHWBase;
  type: MHWDataType;
}

export interface MHWAttack {
  display: number;
  raw: number;
}

export interface MHWDefense {
  base: number;
  max: number;
  augmented: number;
}

export interface MHWResistances {
  fire: number;
  water: number;
  ice: number;
  thunder: number;
  dragon: number;
}

export interface MHWSlot {
  rank: number;
}

export interface MHWCraftingCost {
  quantity: number;
  item: MHWItem;
}

export interface MHWSetInfo {
  id: number;
  name: string;
  rank: MHWArmorRank;
  pieces: Array<number>;
}
