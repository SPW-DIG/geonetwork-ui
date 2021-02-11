import { Injectable } from '@angular/core'
import chroma from 'chroma-js'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  constructor() {}
  private themeSubject: BehaviorSubject<any> = new BehaviorSubject('light')
  public readonly theme$: Observable<any> = this.themeSubject.asObservable()

  static getColor(name: string) {
    return document.documentElement.style.getPropertyValue(`--color-${name}`)
  }

  static applyColor = (name: string, color) => {
    document.documentElement.style.setProperty(`--color-${name}`, color.css())
  }

  static applyCssVariables(
    primary: string,
    secondary: string,
    main: string,
    background: string
  ) {
    const black = chroma('black')
    const white = chroma('white')
    this.applyColor('primary', chroma(primary))
    this.applyColor(
      'primary-lighter',
      chroma.scale([primary, white]).mode('lab')(0.3)
    )
    this.applyColor(
      'primary-lightest',
      chroma.scale([primary, white]).mode('lab')(0.6)
    )
    this.applyColor(
      'primary-darker',
      chroma.scale([primary, black]).mode('lab')(0.3)
    )
    this.applyColor(
      'primary-darkest',
      chroma.scale([primary, black]).mode('lab')(0.6)
    )
    this.applyColor('secondary', chroma(secondary))
    this.applyColor(
      'secondary-lighter',
      chroma.scale([secondary, white]).mode('lab')(0.3)
    )
    this.applyColor(
      'secondary-lightest',
      chroma.scale([secondary, white]).mode('lab')(0.6)
    )
    this.applyColor(
      'secondary-darker',
      chroma.scale([secondary, black]).mode('lab')(0.3)
    )
    this.applyColor(
      'secondary-darkest',
      chroma.scale([secondary, black]).mode('lab')(0.6)
    )
    this.applyColor('main', chroma(main))
    this.applyColor('background', chroma(background))

    const scale = chroma.scale([background, main]).mode('lrgb')
    this.applyColor('gray-100', scale(0.1))
    this.applyColor('gray-200', scale(0.2))
    this.applyColor('gray-300', scale(0.3))
    this.applyColor('gray-400', scale(0.4))
    this.applyColor('gray-500', scale(0.5))
    this.applyColor('gray-600', scale(0.6))
    this.applyColor('gray-700', scale(0.7))
    this.applyColor('gray-800', scale(0.8))
    this.applyColor('gray-900', scale(0.9))
  }

  static generateLabelColor(
    label: string,
    saturation: number,
    lightness: number
  ): string {
    let hue = 0
    for (let i = 0; i < label.length; i++) {
      hue += label.charCodeAt(i)
    }
    return chroma.hsl(hue % 360, saturation, lightness)
  }

  /**
   * Material theme rely on RGB color definition.
   * See --color-${c}-rgb color variables.
   * When a HEX color is updated, we need to update the corresponding
   * RGB values manually for now.
   */
  static updateThemeColors() {
    const colors = [
      'main',
      'light',
      'background',
      'foreground',
      'primary',
      'secondary',
      'warn',
    ]
    colors.forEach((c) => {
      const cssVar = getComputedStyle(
        document.documentElement
      ).getPropertyValue(`--color-${c}`)
      try {
        const color = chroma(cssVar.trim())
        document.documentElement.style.setProperty(
          `--color-${c}-rgb`,
          color.rgb().join(',')
        )
      } catch (e) {
        console.warn(
          `Color ${c} not supported. Error is '${e}'. Check color variable.`
        )
      }
    })
  }

  public setTheme(theme: string) {
    this.themeSubject.next(theme)
  }
}
