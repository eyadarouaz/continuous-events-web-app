import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name:'search'
})

export class SearchPipe implements PipeTransform {
    transform(result: any[], searchInput: string): any[]{
        if(!searchInput) {
            return  result;
        }

       searchInput = searchInput.toLowerCase();
       return result.filter(
         element => {
            if(element.title)
            return element.title.toLowerCase().includes(searchInput)
            else
            return element.question.toLowerCase().includes(searchInput)
         });
     }
}