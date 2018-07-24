import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  DomSanitizer,
  SafeStyle
} from "@angular/platform-browser";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

@Component({
  selector: 'simple-step-guide',
  templateUrl: './simple-step-guide.html',
  styleUrls: ['./simple-step-guide.scss'],
  animations: [
    trigger('messagesState', [
      state('inactiveBottom', style({bottom: "-5rem", opacity: "0"}) ),
      state('activeBottom', style({bottom: "15vh", opacity: "1"})),
      transition('inactiveBottom => activeBottom', animate('1s ease')),

      state('inactiveTop', style({top: "-5rem", opacity: "0"}) ),
      state('activeTop', style({top: "15vh", opacity: "1"})),
      transition('inactiveTop => activeTop', animate('1s ease'))
    ]),
    trigger('buttonsState', [
      state('inactive', style({opacity: "0"}) ),
      state('active', style({opacity: "1"})),
      transition('inactive => active', animate('1s ease')),
    ])
  ]
})
export class SimpleStepGuideComponent implements OnInit {

  @Input() guides: Array<{
    id: string,
    message: string
  }>;
  @Input() options: {
    next?: string,
    skip?: string,
    complete?: string,
    intercept?: (guide: {
      id: string,
      message: string
    }, number) => boolean,
    color?: string
  } = {};
  @Output() completed = new EventEmitter();

  constructor(private domSanitizer: DomSanitizer) { }

  get coverBackground(): SafeStyle {
    return this.domSanitizer.bypassSecurityTrustStyle(
      `radial-gradient(circle at ${this.focusLeft}px ${this.focusTop}px, transparent ${this.focusSize}px, ${this.messageColor}4d ${this.focusSize + 10}px)`
    );
  }
  get messageColor() {
    return this.options.color || this.DEFAULT_COLOR;
  }

  messagesState;
  buttonsState;

  private focusLeft = 10;
  private focusTop = 10;
  private focusSize = 10;

  currentMessage = "";
  currentNext = "";
  currentSkip = "";

  private DEFAULT_COLOR = "#009688";
  private DEFAULT_NEXT = "NEXT";
  private DEFAULT_COMPLETE = "COMPLETE";
  private DEFAULT_SKIP = "SKIP";

  active: boolean;
  private index: number;
  ngOnInit() {
    this.start();
  }

  start() {
    this.index = 0;
    this.active = true;
    this.nextOrComplete();
  }
  nextOrComplete() {
    if (this.guides.length > this.index) {
      let guide = this.guides[this.index];
      if (this.options.intercept && !this.options.intercept(guide, this.index)) {
        this.index++;
        this.nextOrComplete();
        return;
      }

      let rect = document.getElementById(guide.id).getBoundingClientRect();
      this.focusLeft = rect.left + rect.width / 2;
      this.focusTop = rect.top + rect.height / 2;
      this.focusSize = rect.width;
      this.currentMessage = guide.message;
      this.currentNext = this.guides.length > this.index + 1? (this.options.next || this.DEFAULT_NEXT): (this.options.complete || this.DEFAULT_COMPLETE);
      this.currentSkip = this.options.skip || this.DEFAULT_SKIP;

      if (this.focusTop > window.innerHeight / 2) {
        this.messagesState = "inactiveTop";
        setTimeout(() => this.messagesState = "activeTop", 0);
      } else {
        this.messagesState = "inactiveBottom";
        setTimeout(() => this.messagesState = "activeBottom", 0);
      }
      this.buttonsState = "inactive";
      setTimeout(() => this.buttonsState = "active", 1000);

      this.index++;
    } else this.complete();
  }
  complete() {
    this.active = false;
    this.completed.emit();
  }
}
