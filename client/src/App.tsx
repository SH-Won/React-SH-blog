import { QueryClient, QueryClientProvider } from 'react-query';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const queryClient = new QueryClient();

const LandingPage = lazy(() => import('./page/LandingPage'));
const DetailArticlePage = lazy(() => import('./page/DetailArticlePage'));
const App = () => {
    return (
        <Suspense fallback={<div>loading...</div>}>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/detail/:id" element={<DetailArticlePage />} />
                </Routes>
            </QueryClientProvider>
        </Suspense>
    );
};

export default App;
