import React, { useState, useEffect, Suspense } from "react";

import Loading from "./Component/MainPage/Loading";
import Router from "./routes/routes";
import { setupPwaUpdateNotifications } from "./pwaUpdateNotifications";

interface DataState {
  firstname: string;
  lastname: string;
}

function App(props) {
  useEffect(() => {
    setupPwaUpdateNotifications();
  }, []);

  return (
    <>
      <div>
        <Suspense fallback={<Loading />}>
          <Router />
        </Suspense>
      </div>
    </>
  );
}
export default App;
