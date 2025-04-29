class StateMachine {
    constructor(states = []){
        this.states = states;
        this.queue = [];
    }
    getState(){
        return this.queue.at(-1);
    }
    push(state){
        if (typeof state === "string") this.queue.push(this.findStateByName(state));
        else this.queue.push(state);
    }
    pop(){
        this.queue.pop();
    }
    set(state){
        this.queue = [state];
    }
    findStateByName(name){
        for (let i=0; i<this.states.length; i++) {
            let t = this.states[i];
            if (t.name === name)
                return t;
        }
    }
}

class State {
    constructor(name){
        this.name = name;
    }
}

export {StateMachine, State};