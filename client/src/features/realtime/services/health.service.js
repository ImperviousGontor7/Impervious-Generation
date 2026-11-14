import prisma from "../config/prisma.js";



export async function status(){


await prisma.$queryRaw`
SELECT 1
`;



return {

database:"connected",

time:new Date()

};


}