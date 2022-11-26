export async function serviceRequest<T>(apiRequest: () => Promise<T>): Promise<T>;
export async function serviceRequest<T, Data>(
  apiRequest: () => Promise<T>,
  mapResponse?: (response: T) => Data,
): Promise<Data>;
export async function serviceRequest<T, Data>(
  apiRequest: () => Promise<T>,
  mapResponse?: (response: T) => Data
): Promise<unknown> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const data = await apiRequest();
      resolve(mapResponse ? mapResponse(data) : data);
    } catch (error: any) {
      reject({ statusCode: error.status, message: error.body?.message, error });
    }
  });
}
