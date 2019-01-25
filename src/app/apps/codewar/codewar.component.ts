import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Base } from 'src/app/classes/base.class';
import { Codewar } from './classes/codewar.class';

import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/markdown/markdown.js';
import { LOG_LEVEL } from 'src/app/classes/logs.class';
import { AIList, AICodeList } from './models/ai-list';
import { CodewarConfig } from './models/codewar.configuration';

@Component({
  selector: 'app-codewar',
  templateUrl: './codewar.component.html',
  styleUrls: ['./codewar.component.css']
})
export class CodewarComponent implements OnInit {

  @ViewChild('codewarCanvas') private canvasRef: ElementRef;
  @ViewChild('codewarLogs') private logsRef: ElementRef;

  private Base: Base;
  public Codewar: Codewar;
  public AIList = [AICodeList.randomAI, AICodeList.nulAI, AICodeList.proAI];

  public code = {
    config: { lineNumbers: true, mode: 'javascript' },
    value: AICodeList.randomAI.code
  };
  public doc = {
    config: { mode: 'markdown', readonly: true },
    value: '',
    visible: false
  };
  public started: boolean;
  public AICount = 1;

  constructor() {
    this.Base = new Base({
      timeout: CodewarConfig.SPEED,
      loopCallback: this.loop.bind(this),
      keyCallback: this.key.bind(this),
      preventDefaultAllKey: false,
      preventDefaultKeys: []
    });
  }

  ngOnInit() {
    this.Codewar = new Codewar(this.canvasRef.nativeElement.getContext('2d'));
    this.Codewar.end.subscribe(this.stop.bind(this));
    this.reset();
  }

  public reset(): void {
    this.stop();
    this.Codewar.reset();
    this.AICount = 1;
    if (this.compile()) {
      this.Codewar.draw();
    }
  }

  private stop(): void {
    this.Base.stop();
    this.started = false;
  }

  public start(): void {
    this.started = !this.started;
    this.Base.pause();
  }

  public compile(): boolean {
    try {
      const func = Function(this.code.value).call({ DIR: { RIGHT: 0, DOWN: 1, LEFT: 2, UP: 3 } });
      if (!func.hasOwnProperty('playTurn')) {
        // TODO: better error description
        throw new Error('Interface not respected');
      }
      this.Codewar.addAI(func);
    } catch (e) {
      this.Codewar.Logs.addLogMessage(`Compile error: ${e.message}`, LOG_LEVEL.ERROR);
      return false;
    }
    return true;
  }

  public addAI(index: number): void {
    if (!this.started) {
      if (this.AICount < CodewarConfig.MAX_TEAM) {
        this.Codewar.addAI([AIList.randomAI, AIList.nulAI, AIList.proAI][index], this.AICount++);
      } else {
        this.Codewar.Logs.addLogMessage('Can\'t add anymore AI', LOG_LEVEL.ERROR);
      }
    } else {
      this.Codewar.Logs.addLogMessage('Can\'t add AI while running', LOG_LEVEL.ERROR);
    }
  }

  public seeDoc(): void {
    this.doc.visible = !this.doc.visible;
  }

  private loop(timestamp: number): void {
    this.Codewar.next();
    setTimeout(this.Codewar.draw.bind(this.Codewar), CodewarConfig.SPEED / 3);
    setTimeout(this.scrollLogs.bind(this), CodewarConfig.SPEED * 2 / 3);
  }

  private scrollLogs() {
    this.logsRef.nativeElement.scrollTop = this.logsRef.nativeElement.scrollHeight;
  }

  private key(key: string, pressed: boolean): void { }

  public onClick(event: Event): void { }

}
