export default function forumSocket(io){



io.on(
"connection",
(socket)=>{



socket.on(
"join-forum",
(id)=>{


socket.join(
`forum-${id}`
);


});





socket.on(
"new-comment",
(data)=>{


io.to(
`forum-${data.forumId}`
)
.emit(
"comment-added",
data
);



});



});



}