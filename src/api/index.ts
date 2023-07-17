const API_KEY = "567fb009055f8d8fddf69948130c088f";

const endpoints = {
  currentWeather: ({ query }: { query: string }) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`,
};

// Using keyof to get the type of the keys of endpoints object
type Endpoint = keyof typeof endpoints;

// Using Parameters to get the type of the parameters of a function type
type Params<T extends Endpoint> = Parameters<(typeof endpoints)[T]>;

const handleRequest = async ({ endpoint }: { endpoint: string }) => {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (response.status >= 400) {
      return {
        error: data,
      };
    }
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(` error: ${error.message}`);
    }
    throw error;
  }
};

export const makeRequest = async <T extends Endpoint>({
  endpoint,
  params,
}: {
  endpoint: T;
  params: Params<T>[0];
}): Promise<any> =>
  await handleRequest({
    endpoint: endpoints[endpoint](params as any),
  });
