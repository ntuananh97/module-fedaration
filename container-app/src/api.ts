export const fetchRemotesApi = (): Promise<{ name: string; entry: string }[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { name: "remote1", entry: "http://localhost:5001/remoteEntry.js" },
          { name: "remote2", entry: "http://localhost:5002/remoteEntry.js" },
        ]);
      }, 1000); // Giả lập thời gian chờ API (1 giây)
    });
  };