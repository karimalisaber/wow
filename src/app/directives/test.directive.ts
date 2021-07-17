 import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
  selector: '[newIf]'
})

export class TestDirective implements OnInit {
@Input('newIf') set  newIf (condition: boolean){
  if(condition){
    console.log(true);
    this.vcRef.createEmbeddedView(this.templateRef)
  }else{
    console.log(false );
    this.vcRef.clear()
  }
};
  
constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef  ) { 
    console.log('appTest Directive ');
    
  }

  ngOnInit(){
    
  }
}
