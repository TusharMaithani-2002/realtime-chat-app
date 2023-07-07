

const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL;
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN;

export async function fetchRedis(comand, ...args) {
  const comandUrl = `${upstashRedisRestUrl}/${comand}/${args.join("/")}`;

  const response = await fetch(comandUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    cache: "no-store", // not storing result
  });

  if(!response.ok) {
    throw new Error(`Error executing redis comand: ${response.statusText}`)
  }

  const data = await response.json();
  return data.result;
}
