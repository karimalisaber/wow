// export class Editor {
// import { Editor } from './memento.class';
// import { History } from './memento.class';
    // private _content : string ;

//     set setContent(content){
//         this._content = content
//     }  

//     get getContent(){
//         return this._content;
//     }

//     createState() : EditorState {
//         return new EditorState(this._content) // pass All States
//     }

//     restore(state : EditorState): void {
//         this._content = state.getContent
//     }
// }

// export class EditorState {
//   constructor(private content : string){
//   }

//   get getContent(){ 
//       return this.content;
//   }
// }

// export class History {
//     private _States : Array<EditorState> = []

//     push(state : EditorState){
//         this._States.push(state)
//     }

//     pop(): EditorState{
//         return this._States.pop()
//     }
// }







export class Editor {
    private _content;

    set setContent(content : string){
        this._content = content
    }

    get getContent (){
        return this._content
    }


    createState(): EditorState{
        return new EditorState(this._content)
    }

    restoreState(state: EditorState) {
        this._content = state.getContent
    }
}

export class EditorState {
    constructor(private content : string){

    }

    getContent(){
        return this.content
    }
}

export class History{
    private _states : Array<EditorState> = [];

    constructor(){}

    push(state: EditorState){
         this._states.push(state)
    }

    pop(): EditorState{
      return  this._states.pop()

    }
}