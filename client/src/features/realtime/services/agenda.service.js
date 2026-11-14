import prisma from "../config/prisma.js";



export async function getAll(){


return prisma.agenda.findMany({

orderBy:{

createdAt:"desc"

}

});


}





export async function getById(id){


const agenda =
await prisma.agenda.findUnique({

where:{
id
}

});



if(!agenda){

throw new Error(
"Agenda tidak ditemukan"
);

}



return agenda;


}





export async function create(
data,
user
){



return prisma.agenda.create({

data:{

title:
data.title,


description:
data.description,


date:
new Date(data.date),


createdBy:
user.id


}

});


}







export async function update(
id,
data
){


return prisma.agenda.update({

where:{
id
},


data

});


}







export async function remove(id){


return prisma.agenda.delete({

where:{
id
}

});


}