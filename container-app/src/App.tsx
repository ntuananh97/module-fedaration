import { lazy, useState, useEffect } from "react";
import { loadRemote, init } from "@module-federation/enhanced/runtime";
import RemoteComponentWrapper from "./components/RemoteComponentWrapper";
import { fetchRemotesApi } from "./api";

type RemoteInfo = {
  name: string;
  entry: string;
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [remotes, setRemotes] = useState<RemoteInfo[]>([]);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [isFederationInitialized, setIsFederationInitialized] = useState(false);

  // 🔹 Fake Login function (Thay thế bằng auth thực tế)
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // 🔹 Fetch danh sách remotes từ API sau khi đăng nhập
  useEffect(() => {
    const fetchRemotes = async () => {
      try {
        const data = await fetchRemotesApi();
        setRemotes(data);

        // 🔹 Khởi tạo Module Federation sau khi fetch danh sách remote
        init({
          name: "host",
          remotes: data.map(({ name, entry }) => ({ name, entry })),
          shared: {
            react: {
              version: "18.2.0",
              scope: "default",
              lib: () => import("react"),
              shareConfig: {
                singleton: true,
                requiredVersion: "^18.2.0",
              },
            },
            "react-dom": {
              version: "18.2.0",
              scope: "default",
              lib: () => import("react-dom"),
              shareConfig: {
                singleton: true,
                requiredVersion: "^18.2.0",
              },
            },
          },
        });

        // Đánh dấu là Federation đã khởi tạo
        setIsFederationInitialized(true);
      } catch (error) {
        console.error("Failed to fetch remotes:", error);
      }
    };

    if (isAuthenticated) {
      fetchRemotes();
    }
  }, [isAuthenticated]);

  const handleToggle = (appName: string) => {
    setSelectedApps((prev) =>
      prev.includes(appName) ? prev.filter((app) => app !== appName) : [...prev, appName]
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      {!isAuthenticated ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <>
          <h2>Load Remote Apps Dynamically</h2>

          {/* 🔹 Chỉ hiển thị checkbox khi Federation đã khởi tạo */}
          {isFederationInitialized ? (
            <>
              <div>
                {remotes.map((remote) => (
                  <label key={remote.name} style={{ display: "block", marginBottom: "5px" }}>
                    <input
                      type="checkbox"
                      value={remote.name}
                      checked={selectedApps.includes(remote.name)}
                      onChange={() => handleToggle(remote.name)}
                    />
                    Load {remote.name}
                  </label>
                ))}
              </div>

              {/* 🔹 Hiển thị Remote Apps đã chọn */}
              <div>
                {selectedApps.map((remoteName) => {
                  const RemoteComponent = lazy(() => loadRemote(`${remoteName}/RemoteApp`));

                  return (
                    <RemoteComponentWrapper key={remoteName} fallback={<div>Loading {remoteName}...</div>}>
                      <RemoteComponent />
                    </RemoteComponentWrapper>
                  );
                })}
              </div>
            </>
          ) : (
            <div>Loading remotes...</div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
