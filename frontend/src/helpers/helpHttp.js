// This variables will change when the backend is deployed
export const localUrl = "http://localhost:8080"
export const prodUrl = "http://digitalbooking.ddns.net:8080";

export const backendUrl = prodUrl;

export const helpHttp = () => {
  const customFetch = async (endpoint, options) => {
    const defaultHeader = {
      accept: "application/json",
      "content-type": "application/json",
    };

    options.method = options.method || "GET";
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;

    if (options.headers["content-type"] === "application/json") {
      options.body = JSON.stringify(options.body) || false;
      if (!options.body) delete options.body;
    }
    try {
      return await fetch(endpoint, { ...options, credentials: "include" })

    } catch (error) {
      console.log(error)
    }

  };

  const get = (url, options = {}) => customFetch(url, options);

  const post = (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };

  const put = (url, options = {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  };

  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del
  };
};
