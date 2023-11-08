export interface GlobalStateProps {
  children: React.ReactNode;
}

export interface GlobalContextValue {
  currentPage: string;
  updateCurrentPage: (value: string) => void;
  isAuthenticated: boolean;
  email: string | null;
  name: string | null;
  role: number | null;
  userUuid: string | null;
}
