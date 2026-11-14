import prisma from "../config/prisma.js";





export async function getAll(){


return prisma.forum.findMany({

include:{

comments:true

},


orderBy:{

createdAt:"desc"

}


});


}







export async function getById(id){


return prisma.forum.findUnique({

where:{
id
},


include:{

comments:true

}

});


}








export async function create(
data,
user
){


return prisma.forum.create({

data:{

title:
data.title,


content:
data.content,


userId:
user.id


}

});


}








export async function comment(
forumId,
data,
user
){



return prisma.comment.create({

data:{

content:
data.content,


forumId,


userId:
user.id


}

});


}