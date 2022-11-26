import getConfig from 'next/config';

export const getBaseUrl = () => {
  let { publicRuntimeConfig } = getConfig();
  return publicRuntimeConfig.nextPublicApiBaseUri
}
