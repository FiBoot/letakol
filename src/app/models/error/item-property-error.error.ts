
export class ItemPropertyError extends Error {
  constructor() {
    super('You do not have the permision to modify this item');
    this.name = 'Item property Error';
  }
}
