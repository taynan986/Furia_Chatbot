class Message {
    constructor(text, className){
        const lay = document.createElement("div");
        lay.id = "message-layout";

        const msg = document.createElement("div");
        msg.className = `message ${className}`;
        msg.innerText = text;
        lay.appendChild(msg);

        this.layout = lay;
        this.message = msg;
    }
    append(){
        document.getElementById("message-area").appendChild(this.layout);
    }
}

class Menu extends Message {
    constructor(text, className, options, onClick){
        super("", className);
        const list = document.createElement("div");
        for (let i=0; i<options.length; i++){
            const li = document.createElement("div");
            li.className = "menu-item";
            li.innerText = options[i];
            li.addEventListener("click", (e) => onClick(e.target.innerText));
            list.appendChild(li);
        }
        this.message.appendChild(list);
    }
}

class User {
    message(text){
        new Message(text, "user-message").append();
    }
    async send(text){
        const res = await fetch("/api/query?" + new URLSearchParams({message: text}).toString());
        return await res.json();
    }
}

class ChatBot {
    message(text){
        new Message(text, "bot-message").append();
    }
    menu(text, options, onClick){
        new Menu(text, "menu", options, onClick).append();
    }
}

export {User, ChatBot};