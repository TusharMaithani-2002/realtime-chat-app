import { fetchRedis } from "@/helper/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { addFriendValidator } from "@/lib/validations/add-friend";
import { getServerSession } from "next-auth";
import { z,ZodError } from "zod";

export async function POST(req) {
  try {
    const body = await req.json();

    const { email: emailToAdd } = addFriendValidator.parse(body.email);
    
    console.log(`user:email:${emailToAdd}`)
    const idToAdd = await fetchRedis('get',`user:email:${emailToAdd}`)
    console.log("logging id:"+idToAdd)

    if(idToAdd == null) {
      return new Reponse('This person does not exist!',{status:400})
    }
    
    const session = await getServerSession(authOptions);

    if(!session) {
        return new Response('Unauthorized',{staus:401});
    }

    if(idToAdd === session.user?.id) {
        return new Response('You cannot add yourself as friend',{status:400});
    }


    // check if user is already added

    const isAlreadyAdded = await fetchRedis('sismember',`user:${idToAdd}:incoming_friend_requests`,session.user.id);
    
    if(isAlreadyAdded) {
        return new Response('Already added a user',{status : 400})
    }

    const isAlreadyFriends = await fetchRedis('sismember',`user:${session.user.id}:friends`,idToAdd);

    if(isAlreadyFriends) {
        return new Response('Already friends with this user',{status : 400})
    }

    // valid request, send friend request
    db.sadd(`user:${idToAdd}:incoming_friend_requests`,session.user.id);

    return new Response('ok');
  } catch (error) {
    if(error instanceof ZodError) {
        return new Response('Invalid request payload',{status:422});
    }

    return new Response('Invalid request',{status:400});
  }
}
