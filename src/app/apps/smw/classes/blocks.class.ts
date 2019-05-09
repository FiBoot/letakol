enum EBlock {
  DEFAULT = 'DEFAULT',
  EMPTY = 'EMPTY',
  UNKNOW = 'UNKNOW',
  TEST = 'TEST'
}
enum EColor {
  DEFAULT = '#123',
  EMPTY = '#EEE',
  UNKNOW = 'lightred',
  TEST = 'lightgreen'
}

export class Block {
  constructor(readonly type: EBlock = EBlock.DEFAULT) {}
  public get color(): string {
    return EColor[this.type] || EBlock.DEFAULT;
  }
}

export class Empty extends Block {
  constructor() {
    super(EBlock.EMPTY);
  }
}

export class Unknow extends Block {
  constructor() {
    super(EBlock.TEST);
  }
}

export class Test extends Block {
  constructor() {
    super(EBlock.TEST);
  }
}
