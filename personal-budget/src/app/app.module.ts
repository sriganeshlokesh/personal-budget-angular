import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeroComponent } from './components/hero/hero.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ArticleComponent } from './components/article/article.component';
import { AboutpageComponent } from './components/aboutpage/aboutpage.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { P404Component } from './components/p404/p404.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ContactComponent } from './components/contact/contact.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeroComponent,
    FooterComponent,
    HomepageComponent,
    ArticleComponent,
    AboutpageComponent,
    LoginpageComponent,
    P404Component,
    BreadcrumbsComponent,
    ContactComponent,
    PieChartComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
