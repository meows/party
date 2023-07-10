import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// react-query needs this provider to work properly.
// This provider be used in src/index.tsx and will wrap the entire app.
const Providers = ({ children }: {children: React.ReactNode }) => {
    const queryClient = new QueryClient()
    return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

export default Providers