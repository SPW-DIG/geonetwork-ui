import { Component, OnInit } from '@angular/core'
import { ColorService } from '@lib/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = ''
  isDarkTheme = false

  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.colorService.theme$.subscribe(
      (theme) => (this.isDarkTheme = theme === 'dark')
    )
  }
}
