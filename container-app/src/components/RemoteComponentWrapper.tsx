import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
};

const RemoteComponentWrapper: React.FC<Props> = ({ children, fallback, errorFallback }) => {
  return (
    <ErrorBoundary fallbackRender={() => errorFallback || <div>Failed to load component.</div>}>
      <Suspense fallback={fallback || <div>Loading...</div>}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default RemoteComponentWrapper;
