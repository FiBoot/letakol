import * as Pizzicato from 'pizzicato';

class Variation {
  constructor(
    readonly name: string,
    readonly min: number,
    readonly max: number,
    public value: number = (min + max) / 2,
    readonly tick: number = Math.abs((min + max) / 100 || .01)
  ) { }
}

export class Percent extends Variation {
  constructor(readonly name: string, value?: number) {
    super(name, 0, 1, value);
  }
}

export class Effect {
  public active: boolean = false;
  constructor(readonly name: string, readonly ref, public params: Array<Variation>) { }
  get clone(): Effect {
    const params = this.params.map(param => new Variation(param.name, param.min, param.max, param.value));
    return new Effect(this.name, this.ref, params);
  }
}

export const effects = [
  new Effect('Delay', Pizzicato.Effects.Delay, [
    new Percent('feedback', .5),
    new Variation('time', 0, 1, .1),
    new Percent('mix', .5)
  ]),
  new Effect('Ping-pong delay', Pizzicato.Effects.PingPongDelay, [
    new Percent('feedback', .5),
    new Variation('time', 0, 1, .1),
    new Percent('mix', .5)
  ]),
  new Effect('Dub delay', Pizzicato.Effects.DubDelay, [
    new Percent('feedback', .5),
    new Variation('time', 0, 5, .5),
    new Variation('cutoff', 0, 4000, 700),
    new Percent('mix', .5)
  ]),
  new Effect('Distortion', Pizzicato.Effects.Distortion, [new Percent('gain')]),
  new Effect('Quadrafuzz', Pizzicato.Effects.Quadrafuzz, [
    new Percent('lowGain', .6),
    new Percent('midLowGain', .8),
    new Percent('midHighGain'),
    new Percent('highGain', .6),
    new Percent('mix', .5)
  ]),
  new Effect('Flanger', Pizzicato.Effects.Flanger, [
    new Percent('time', .5),
    new Percent('speed', .2),
    new Percent('depth', .1),
    new Percent('feedback', .1),
    new Percent('mix', .5)
  ]),
  // BUGGED?
  // new Effect('Reverb', Pizzicato.Effects.Reverb, [
  //   new Variation('time', 0, 3, 1),
  //   new Variation('decay', 0, 3, 1),
  //   new Percent('mix', .5)
  // ]),
  new Effect('Tremolo', Pizzicato.Effects.Tremolo, [
    new Variation('speed', 0, 20, 7),
    new Percent('depth', .8),
    new Percent('mix', .8)
  ]),
  new Effect('Stereo Panner', Pizzicato.Effects.StereoPanner, [new Variation('pan', -1, 1, 0)]),
  new Effect('Compressor', Pizzicato.Effects.Compressor, [
    new Variation('threshold', -100, 0, -25),
    new Variation('knee', 0, 40, 30),
    new Variation('ratio', 1, 20, 12)
  ]),
  new Effect('Low-pass filter', Pizzicato.Effects.LowPassFilter, [
    new Variation('frequency', 10, 22050),
    new Variation('peak', .001, 20)
  ]),
  new Effect('High-pass filter', Pizzicato.Effects.HighPassFilter, [
    new Variation('frequency', 10, 22050, 400),
    new Variation('peak', .001, 20, 10)
  ]),
  new Effect('Ring modulator', Pizzicato.Effects.RingModulator, [
    new Variation('speed', 0, 2000, 10, 30),
    new Variation('distortion', .2, 50, 10, 1),
    new Percent('mix', .5)
  ])
];
