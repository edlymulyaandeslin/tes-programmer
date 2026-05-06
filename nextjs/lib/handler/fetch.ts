interface FetchOptions extends RequestInit {
  timeout?: number;
}

export const fetchHandler = async (url: string, options: FetchOptions) => {
  const {
    timeout = 100000,
    headers: customHeaders = {},
    ...restOptions
  } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const headers: HeadersInit = { ...defaultHeaders, ...customHeaders };
  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);

    clearTimeout(id);

    return await response.json();
  } catch (err) {
    return err;
  }
};
