import { EmitterVisitorContext } from '@angular/compiler';
import { Directive, ElementRef, EventEmitter, Input, OnInit, Output,  } from '@angular/core';

@Directive({
  selector: '[appBlockStyle]',
  host: {
    '(document:keyup)': 'initKeyUp($event)'
  },
  exportAs: 'blockStyle'
})
export class BlockStyleDirective implements OnInit {
  @Input()
  selector: string;
  @Input()
  initFirst: boolean = false;
  @Output()
  renderComplete = new EventEmitter()

  private items: HTMLElement[]
  private index: number = 1
  public activeElementIndex: number = 0
  constructor(private el: ElementRef) { }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.activeElementIndex = 0
    if (this.selector) {
      this.items = this.el.nativeElement.querySelectorAll(this.selector)
      if (this.initFirst) {
        // console.log(this.initFirst);
        (this.items[0] as HTMLElement).setAttribute('style', 'border: 2px solid red')

      }
    } else {
      console.log('Не передан селектор')
    }
    setTimeout(() => {
      this.renderComplete.emit(true)
    });
  }

  ngOnChanges() {

  }
  initKeyUp(event: KeyboardEvent) {
      if (event.key === 'ArrowRight' || 'Arrowleft') {
        (this.items[this.index] as HTMLElement).removeAttribute('style')
      }

      if (event.key === 'ArrowRight') {
        this.index++;
        if (this.items[this.index]) {
          (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red')
        }
      } else if (event.key === 'ArrowLeft') {
        this.index--;
        if (this.items[this.index]) {
          (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red')
          // console.log(this.index)
        }
    }
    this.activeElementIndex = this.index
  }


  initStyle(index: number = 0): void {
    if (this['index']) {
      this.activeElementIndex = index
      this.items[this.index - 1].setAttribute('style', 'border: 2px solid red');
    }
  }
}

