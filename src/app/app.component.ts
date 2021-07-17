import { Component, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { AssetsService } from './services/assets.service';
import { Editor , EditorState, History } from './memento.class';
import { TextBox, Canvas, SelectionTool, BrushTool } from './state.class';
import { rejects } from 'assert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'wow';
  c = true

  // test() : Array<T> {
  //   return []
  // }

  constructor(public assets: AssetsService){
    let x = new Promise((resolve, reject)=>{
      let test = 10;

      if(test ===5410){
        resolve('success')
      }
      else{
        reject('failer')
      }
    });


    x.then(res=>{
      console.log(res);

    }).catch(res=>{
      console.log(res);

    })

    // setInterval(() => {
        // this.c = !this.c;
        // console.log('\cha');

    // }, 2000);

  }

 context(){
   return[
     12
   ]
 }

  check(s: string){
    var reg = /^\d{11}$/
    var reg2 = /[a-z]{5,12}/i
    var reg3 = /^[\w@-]{8,20}$/i
    var emailPattern = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i
    let x = reg3.test(s)
    // let x =
    console.log(x);

    // console.log(x);

  }
}


@Directive({
  selector: '[test]'
})

export class InnerTestDirective {
  @Input() test ;

  @HostListener('focus') onFocus($event){
    // console.log('focus', $event);
    // console.log(this.test);

  }

  @HostListener('blur') onBlur($e){
    // console.log('blur', $e);
  }


  constructor(private el: ElementRef ){
    // console.log('test directive');

    // console.log(this.el);
    this.el.nativeElement.style.background = 'red'
    // this.el.nativeElement.innerHtml = 'r ed'

  }

  ngOnInit(){
    this.el.nativeElement.innerText = 'r ed'

  }
}
