import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { RouterModule } from '@angular/router';
import { SearchResolver } from '../shared/resolvers/search.resolver';
import { CommonComponentsModule } from '../common-components/common-components.module';



@NgModule({
    declarations: [SearchComponent],
    providers: [SearchResolver],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: SearchComponent, resolve: { recipes: SearchResolver }, runGuardsAndResolvers: 'always' },
        ]),
        CommonComponentsModule,
    ]
})
export class SearchModule { }
