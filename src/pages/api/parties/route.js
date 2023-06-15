import { PrismaClient } from '@prisma/client'

export const GET = async (request) => {
    try {
        // await connectToDB();
        // const parties = await Parties.find({}).populate('creator');
        const parties = await prisma.parties.findMany();
        return new Response(JSON.stringify(parties), {status: 200})
    } catch (error) {
        return new Response("Failed to fetch all parties", {status: 500})
    }
}