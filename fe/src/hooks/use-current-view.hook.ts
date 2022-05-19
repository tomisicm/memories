import { useCallback, useState } from "react";

export enum CurrentView {
  View = "view",
  Edit = "edit",
}

export const useCurrentView = (initialState = CurrentView.Edit) => {
  const [currentView, setCurrentView] = useState<CurrentView>(initialState);

  // const updateCurrentViewHandler = (view: CurrentView) => {
  //   setCurrentView(view);
  // };

  // TODO: recheck
  const updateCurrentViewHandler = useCallback(
    (currentView: CurrentView) => setCurrentView(currentView),
    []
  );

  return [currentView, updateCurrentViewHandler] as const;
};
