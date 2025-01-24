import { lazy, useState } from "react";
import { loadRemote } from "@module-federation/enhanced/runtime";
import RemoteComponentWrapper from "./components/RemoteComponentWrapper";

const RemoteApp1 = lazy(() => loadRemote("remote1/RemoteApp"));
const RemoteApp2 = lazy(() => loadRemote("remote2/RemoteApp"));

const App: React.FC = () => {
  const [selectedApps, setSelectedApps] = useState<string[]>([]);

  const handleToggle = (appName: string) => {
    setSelectedApps((prev) =>
      prev.includes(appName) ? prev.filter((app) => app !== appName) : [...prev, appName]
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Load Remote Apps Dynamically</h2>
      <div>
        <label>
          <input
            type="checkbox"
            value="remote1"
            checked={selectedApps.includes("remote1")}
            onChange={() => handleToggle("remote1")}
          />
          Load Remote App 1
        </label>

        <label>
          <input
            type="checkbox"
            value="remote2"
            checked={selectedApps.includes("remote2")}
            onChange={() => handleToggle("remote2")}
          />
          Load Remote App 2
        </label>
      </div>

      <div>
        {selectedApps.includes("remote1") && (
          <RemoteComponentWrapper fallback={<div>Loading Remote App 1...</div>}>
            <RemoteApp1 />
          </RemoteComponentWrapper>
        )}

        {selectedApps.includes("remote2") && (
          <RemoteComponentWrapper fallback={<div>Loading Remote App 2...</div>}>
            <RemoteApp2 />
          </RemoteComponentWrapper>
        )}
      </div>
    </div>
  );
};

export default App;
