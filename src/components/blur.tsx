import { ReactNode } from "react";

export const Blur = ({ children }: { children: ReactNode }): ReactNode => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-10 flex items-center justify-center">
      {children}
    </div>
  );
};
