import {User, ChatBot} from "./chat.js";
import { StateMachine } from "./libs/state-machine.js";
import ChatState from "./libs/chat-state.js";

const user = new User();
const chatBot = new ChatBot();

async function uploadMessage(text){
    const res = await fetch("/api/query?" + new URLSearchParams({message: text}).toString());
    return await res.text();
}

const msgInput = document.getElementById("message-input");
const msgBtn = document.getElementById("message-button");

msgInput.addEventListener("input", function(e){
    if (e.target.value === "") {
        msgBtn.style.display = "none";
    } else msgBtn.style.display = "block";
});

const stateManager = new StateMachine();
const mainState = new ChatState("main");
const menuState = new ChatState("menu");
const gameMenuState = new ChatState("game-menu");
stateManager.push(mainState);

mainState.setFallBack(function(){
    stateManager.push(menuState);
    sendMenu("Olá, como posso te ajudar?", ["Jogos"]);
});

menuState.setFallBack(() => chatBot.message("Opção inválida"));

menuState.addResponse("Jogos", function(){
    stateManager.push(gameMenuState);
    sendMenu("Sobre quais jogos você quer ver informações?", ["Jogos futuros", "Jogos passados", "Todos", "Voltar"]);
});

gameMenuState.setFallBack(() => chatBot.message("Opção inválida"));

gameMenuState.addResponse("Jogos futuros", function(){
    fetch("/api/matches/scheduled").then(function(res){
        return res.text();
    }).then(function(res){
        chatBot.message(res);
        sendMenu("Sobre quais jogos você quer ver informações?", ["Jogos futuros", "Jogos passados", "Todos", "Voltar"]);
    });
});

gameMenuState.addResponse("Jogos passados", function(){
    fetch("/api/matches/past").then(function(res){
        return res.text();
    }).then(function(res){
        chatBot.message(res);
        sendMenu("Sobre quais jogos você quer ver informações?", ["Jogos futuros", "Jogos passados", "Todos", "Voltar"]);
    });
});

gameMenuState.addResponse("Todos", function(){
    fetch("/api/matches").then(function(res){
        return res.text();
    }).then(function(res){
        chatBot.message(res);
        sendMenu("Sobre quais jogos você quer ver informações?", ["Jogos futuros", "Jogos passados", "Todos", "Voltar"]);
    });
});

gameMenuState.addResponse("Voltar", function(){
    sendMenu("Olá, como posso te ajudar?", ["Jogos"]);
    stateManager.pop();
});

function sendMenu(text, options){
    chatBot.message(text);
    chatBot.menu("", options, function(value){
        sendMessage(value);
    });
}

async function sendMessage(text){
    user.message(text);
    stateManager.getState().respondTo(text.toLowerCase());
}

msgBtn.addEventListener("click", function(){
    sendMessage(msgInput.value);
    msgInput.value = "";
});
