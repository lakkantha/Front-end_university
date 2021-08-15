import {
  Directive,
  EventEmitter,
  ViewContainerRef,
  Renderer2,
  ComponentFactoryResolver,
  Type,
  ComponentRef,
  ComponentFactory,
} from "@angular/core";
import { combineLatest, BehaviorSubject } from "rxjs";

@Directive({
  selector: "[countBadge]",
})
export class BaseBadgeDirective {
  private componentRef: ComponentRef<any>;
  private componentFactory: ComponentFactory<any>;

  setBadgeBodyComponent(componentType: Type<unknown>) {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
  }

  setBadgeEnabled(b = false) {
    this.badgeEnabledObs.next(b);
  }
  private badgeEnabledObs = new BehaviorSubject<boolean>(false);

  setBadgeContext(context: any) {
    this.badgeContextObs.next(context);
  }
  private badgeContextObs = new BehaviorSubject<any>({});

  constructor(
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  ngOnInit() {
    this.renderer.setStyle(this.viewContainerRef.element.nativeElement, "position", "relative");
    combineLatest(this.badgeEnabledObs, this.badgeContextObs).subscribe(([enabled, context]) => {
      if (enabled) {
        if (!this.componentRef) {
          this.componentRef = this.viewContainerRef.createComponent(this.componentFactory);
          const componentEl = this.componentRef.location.nativeElement;
          this.renderer.setStyle(componentEl, "position", "absolute");
          this.renderer.setStyle(componentEl, "top", "-4px");
          this.renderer.setStyle(componentEl, "right", "-4px");
          this.renderer.appendChild(this.viewContainerRef.element.nativeElement, componentEl);
        }
        Object.assign(this.componentRef.instance, context);
      } else {
        this.componentRef && this.componentRef.destroy();
        this.componentRef = null;
      }
    });
  }
}
