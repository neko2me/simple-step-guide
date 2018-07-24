import {
  Component
} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li id="m1">Menu 1</li>
      <li id="m2">Menu 2</li>
      <li id="m3">Menu 3</li>
      <li id="m4">Menu 4</li>
      <li id="m5">Menu 5</li>
      <li id="m6">Menu 6</li>
      <li id="m7">Menu 7</li>
      <li id="m8">Menu 8</li>
      <li id="m9">Menu 9</li>
      <li id="m10">Menu 10</li>
    </ul>
    <div class="container">
      <div class="content">content</div>
    </div>
    <simple-step-guide [guides]="guides" [options]="options" (completed)="onCompleted()"></simple-step-guide>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: start;
      border: solid 1px silver;
    }
    ul {
      padding: 0;
      margin: 0;
      border-right: dashed 1px silver;
      max-height: 30em;
      overflow-y: scroll;
      width: 12em;
    }
    li {
      margin: 2em;
      list-style: none;
      white-space: nowrap;
      cursor: pointer;
    }
    div.container {
      padding: 2em;
      width: 100%;
    }
    div.content {
      padding: 2em;
    }
  `]
})
export class AppComponent {
  GUIDE_DATAS = [
    {id: "m1", message: "first step."},
    {id: "m2", message: "next step."},
    {id: "m3", message: "skip this on intercept."},
    {id: "m4", message: "long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long text."},
    {id: "m8", message: "display position is changing automatically."},
    {id: "m10", message: "scroll on intercept."}
  ];

  guides;
  ngOnInit() {
    let resumeIndex = localStorage.getItem("resumeIndex") || -1;
    this.guides = this.GUIDE_DATAS.filter((_, i) => i > resumeIndex);
  }

  options = {
    intercept: this.interceptGuide.bind(this)
  };

  interceptGuide(guide, index) {
    if (guide.id === "m10") document.getElementById("m10").scrollIntoView();

    // save resume index.
    // localStorage.setItem("resumeIndex", index);

    return (guide.id !== "m3");
  }

  onCompleted() {
    // save completed.
    // localStorage.setItem("resumeIndex", this.GUIDE_DATAS.length - 1);
  }
}
