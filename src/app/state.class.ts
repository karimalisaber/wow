export enum ToolTypes{ // add class foreach Tool
    SELECTION,
    BRUSH,
    ERASER
}

export class Main{
    constructor(arg: Array<string>){
        this.DrawUIController(new TextBox())
    }

    DrawUIController(control: UIController){
        control.draw()
    }
}

export class Canvas{
    private _currentTool : Tool; 

    get getCurrentTool(): Tool{
        return this._currentTool;
    }

    set setCurrentTool(tool: Tool){
        this._currentTool = tool
    }

    

    mouseUp(){
        // if(this._currentTool === ToolTypes.SELECTION){
        //     console.log('selection icon');
            
        // }else if( this._currentTool ===ToolTypes.BRUSH){
        //     console.log('brush icon');

        // }else if( this._currentTool ===ToolTypes.ERASER){
        //     console.log('eraser icon');

        // }
        this.getCurrentTool.mouseUp()
    }

    mouseDown(){
        this.getCurrentTool.mouseDowun()
        // if(this._currentTool === ToolTypes.SELECTION){
        //     console.log('draw dash');
            
        // }else if( this._currentTool ===ToolTypes.BRUSH){
        //     console.log('draw line');

        // }else if( this._currentTool ===ToolTypes.ERASER){
        //     console.log('erase something');

        // }
    }
}



export abstract class UIController{
    enable (){
        console.log('enable');
        
    }

    abstract draw(): void;
}

export class TextBox extends UIController{
    draw(){
        console.log('drawing in TextBox');
            
    }
}

// export abstract class Tools {
//     abstract mouseUp(): void;
//     abstract mouseDowun(): void;
// }

export interface Tool{
    mouseUp(): void;
    mouseDowun(): void;
}

export class SelectionTool implements Tool{
    mouseUp(): void {
        console.log('selection Icon ');
        
    }

    mouseDowun(): void {
        console.log('selection Down ');
        
    }

}


export class BrushTool implements Tool{
    mouseUp(): void {
        console.log('brush tool up Icon ');
    }

    mouseDowun(): void {
        console.log('brush Tool Down Icon');
        
    }

}