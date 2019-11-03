import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';

import { AppConfigService } from './shared/services/app-config.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { AuthService } from './shared/services/auth.service';
import { AccountService } from './shared/services/account.service';
import { RefusedConnectionInterceptor } from './shared/interceptors/refused-connection.interceptor';
import { ServiceUnavailableComponent } from './error-pages/service-unavailable/service-unavailable.component';
import { CommonComponentsModule } from './common-components/common-components.module';
import { PopularRecentRecipesResolver } from './shared/resolvers/popular-recent-recipes.resolver';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

export function initializeApp(appConfig: AppConfigService) {
    return () => appConfig.load();
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MenuComponent,
        NotFoundComponent,
        ServiceUnavailableComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            preventDuplicates: true,
        }),
        CommonComponentsModule,
        RouterModule.forRoot([
            { path: 'home', component: HomeComponent, resolve: { recipes: PopularRecentRecipesResolver },
             runGuardsAndResolvers: 'always' },
            { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
            { path: 'recipe', loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule) },
            { path: 'user', loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule) },
            { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) },
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            { path: '404', component: NotFoundComponent },
            { path: '503', component: ServiceUnavailableComponent },
            { path: '**', redirectTo: '/404', pathMatch: 'full' }
        ], {onSameUrlNavigation: 'reload'})
    ],
    providers: [AppConfigService,
        PopularRecentRecipesResolver,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [AppConfigService],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RefusedConnectionInterceptor,
            deps: [Router],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            deps: [AccountService, Router, AuthService],
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
