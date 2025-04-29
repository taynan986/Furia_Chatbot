import { State } from "./state-machine.js";

class ChatState extends State {
    constructor(name, messages = {}, fallback = function(){}){
        super(name);
        this.messages = messages;
        this.fallback = fallback;
    }
    addResponse(message, response){
        this.messages[message.toLowerCase()] = response;
    }
    setResponses(messages){
        for (let message in messages){
            let lowerCaseMessage = message.toLowerCase();
            if (message !== lowerCaseMessage){
                messages[lowerCaseMessage] = messages[message];
                delete messages[message];
            }
        }
        this.messages = messages;
    }
    respondTo(message){
        const response = this.messages[message];
        if (response) return response();
        else return this.fallback();
    }
    setFallBack(response){
        this.fallback = response;
    }
}

export default ChatState;