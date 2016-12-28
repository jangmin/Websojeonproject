window.addEventListener('load', onLoad);

function onLoad() {
    let socket = io.connect('http://localhost:9999');

    socket.on('welcome', data => {
        handshaked = true;
        chatContainer.innerHTML += `${data.nickname}님 환영합니다.\n`;
    });

    socket.on('chat', data => {
        addMessage(data,false);
    });

    socket.on('whisper',data =>{
        addMessage(data,true);
    });

    socket.on('change nickname', data => {
        chatContainer.innerHTML += `${data.old}님이 ${data.new}로 닉네임을 변경하셨습니다.\n`;
    });

    socket.on('user disconnected', data => {
        chatContainer.innerHTML += `${data.nickname}님이 접속을 종료하였습니다.\n`;
    });

    function addMessage(message,isWhisper){
            if(isWhisper){
            chatContainer.innerHTML += `${message.nickname}님으로 부터 온 귓속말:${message.message}\n`;
            }else{
                chatContainer.innerHTML += `${message.nickname}:${message.message}\n`;
            }
            chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}