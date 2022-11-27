import getConfig from 'next/config';

export const getBaseUrl = () => {
  const { publicRuntimeConfig } = getConfig();
  return publicRuntimeConfig.nextPublicApiBaseUri
}
