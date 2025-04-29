# Furia_Chatbot

O Chatbot tem 1. Interface e 2. API que se comunica com a API Pandascore para obter informações de jogos da Fúria.

Na interface, a primeira mensagem inicia o menu principal, que no momento dá apenas uma opção: Jogos

Essa opção resulta em outro menu quando selecionada: o menu de jogos em que a Fúria participou ou participará. As opções são Jogos futuros, Jogos passados e Todos. Os significados são evidentes.

A API tem 3 endpoints por hora, que correspondem a essas 3 opções: /api/matches -> Todos; /api/matches/scheduled -> Jogos futuros; /api/matches/past -> Jogos passados.

Uma Máquina de Estados Finitos(FSM, inglês) foi implementada no código para gerenciar os estados do ChatBot, como o estado padrão, estados para menus, etc... Isso ajuda a manter organizado cada ação para cada resposta em cada situação.

TODO: User DB, Response DB, refactor, UI changes.
