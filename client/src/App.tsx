import { QueryClient, QueryClientProvider } from 'react-query';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import LandingTab from './components/LandingTab/LandingTab';

const queryClient = new QueryClient();

const LandingPage = lazy(() => import('./page/LandingPage'));
const DetailArticlePage = lazy(() => import('./page/DetailArticlePage'));
const App = () => {
    return (
        <>
        <NavBar/>
        <Suspense fallback={<div>loading...</div>}>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    {/* <Route path="/" element={
                        <>
                        <LandingTab/>
                        <LandingPage/>
                        </>
                    }/>
                     */}
                     <Route path="/*" element={<LandingTab/>}/>
                    <Route path="/detail/:id" element={<DetailArticlePage />} />
                </Routes>
            </QueryClientProvider>
        </Suspense>
        </>
    );
};

export default App;
