"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function ReduxDebug() {
  const authState = useSelector((state: RootState) => state.auth);

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Redux Auth State:</h3>
      <pre className="whitespace-pre-wrap">
        {JSON.stringify(
          {
            isAuthenticated: authState.isAuthenticated,
            userId: authState.user?.id,
            avatar: authState.user?.avatar,
            displayName: authState.user?.displayName,
          },
          null,
          2
        )}
      </pre>
    </div>
  );
}
