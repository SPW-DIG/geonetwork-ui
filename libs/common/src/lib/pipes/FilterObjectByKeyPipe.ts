import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'filterObjectByKey',
  pure: false,
})
export class FilterObjectByKeyPipe implements PipeTransform {
  transform(items: any[], property: string, value: string): any {
    if (!items || !property || (property && !value)) {
      return items
    }
    return items.filter((item) => item[property] === value)
  }
}
