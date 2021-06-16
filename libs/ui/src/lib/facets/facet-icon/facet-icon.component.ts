import { Component, Input, OnInit } from '@angular/core'

export enum FacetIconTypes {
  CLASS = 'CLASS',
  IMG = 'IMG',
}

@Component({
  selector: 'ui-facet-icon',
  templateUrl: './facet-icon.component.html',
})
export class FacetIconComponent implements OnInit {
  @Input() icon: string
  types = FacetIconTypes
  type: FacetIconTypes
  ref: string
  constructor() {}

  ngOnInit(): void {
    const config = this.parseIconConfig(this.icon)
    this.type = config.type
    this.ref = config.ref
  }

  parseIconConfig(icon): { type: FacetIconTypes; ref: string } {
    const iconConfig = icon.split(/(class|img):/)

    if (iconConfig.length !== 3) {
      console.error(
        'Icon configuration is invalid. MUST be "class:my-class" or "img:my-img-url".'
      )
      return
    }

    return {
      type:
        iconConfig[1] === 'class' ? FacetIconTypes.CLASS : FacetIconTypes.IMG,
      ref: iconConfig[2],
    }
  }
}
