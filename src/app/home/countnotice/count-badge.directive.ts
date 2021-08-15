import { Directive, Input } from "@angular/core";
import { BaseBadgeDirective } from "./base-badge.directive";
import { CountBadgeBodyComponent } from "./count-badge-body/count-badge-body.component";

@Directive({
  selector: "[countBadge]",
})
export class CountBadgeDirective {
  @Input() set countBadge(n: number) {
    this.baseBadge.setBadgeEnabled(!!n);
    this.baseBadge.setBadgeContext({ count: n });
  }

  constructor(private baseBadge: BaseBadgeDirective) {
    this.baseBadge.setBadgeBodyComponent(CountBadgeBodyComponent);
  }
}
