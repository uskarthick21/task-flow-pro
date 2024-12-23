import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { AuthContext, AuthContextProps } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const renderWithAuthProvider = (authValues: AuthContextProps) => {
  return render(
    <AuthContext.Provider value={authValues}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

// Utility to render with both AuthContext and QueryClient
const renderWithAuthAndQueryClient = (authValues: AuthContextProps) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={authValues}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

describe("App Component with multiple scenario", () => {
  test("Show loading, when loading is true", async () => {
    renderWithAuthProvider({
      loading: true,
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
    });
    //expect(screen.findAllByText(/Loading.../i)).toBeInTheDocument();
    const loadingElement = await screen.findAllByText(/Loading.../i);
    expect(loadingElement.length).toBeGreaterThan(0);
  });

  test("redirect to login for protected route when not authetiated", async () => {
    renderWithAuthAndQueryClient({
      loading: false,
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
    });
    const loginElement = await screen.findByText(/Login/i);
    expect(loginElement).toBeInTheDocument();
  });
});
