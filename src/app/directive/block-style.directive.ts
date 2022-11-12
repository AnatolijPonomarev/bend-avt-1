import { EmitterVisitorContext } from '@angular/compiler';
import { Directive, ElementRef, EventEmitter, Input, OnInit, Output,  } from '@angular/core';
import { fromEvent } from 'rxjs';

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
    this.activeElementIndex = 1
    if (this.selector) {
      console.log(this.selector)
      this.items = this.el.nativeElement.querySelectorAll(this.selector)
      if (this.initFirst) {
        (this.items[0] as HTMLElement).setAttribute('style', 'border: 2px solid red')
      }
    } else {
      console.log('Не передан селектор')
    }
    setTimeout(() => {
      this.renderComplete.emit(true);
    });

  }

  ngOnChanges() {

  }
  initKeyUp(event: KeyboardEvent) {
    // console.log(this.activeElementIndex)
    while (this.index >= 1 && this.index <= this.items.length) {
      if ( (event.key === 'ArrowRight') && (this.activeElementIndex <= this.items.length - 1)) {
        // console.log(this.items[this.index - 1])
        this.items[this.index - 1]?.classList.remove('ticket-border', 'slowMoveUp');
        this.index++
        this.items[this.index - 1].classList.add('ticket-border', 'slowMoveUp');
        this.activeElementIndex = this.index
      }
      if ((event.key === 'ArrowLeft') && (this.activeElementIndex >= 2)) {
        // console.log('arrow left')
        this.items[this.index - 1]?.classList.remove('ticket-border', 'slowMoveUp');
        this.index--
        this.items[this.index - 1].classList.add('ticket-border', 'slowMoveUp');
        this.activeElementIndex = this.index
      }
      break
    }
  }

  initStyle(index: number = 1): void {
    if (this['index']) {

      this.items[this.index -1]?.classList.remove('ticket-border', 'slowMoveUp')
      this.activeElementIndex = index
      setTimeout( () => {
        this.items[this.index - 1]?.classList.add('ticket-border', 'slowMoveUp')
        console.log('block init style')
      });
    }

  }


  updateItems(): void {
    console.log('updateItems')
    this.items = this.el.nativeElement.querySelectorAll(this.selector)
  }
}

