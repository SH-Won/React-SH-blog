import { QueryClient, QueryClientProvider } from 'react-query';
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import LandingTab from './components/LandingTab/LandingTab';
import Auth from './hoc/Auth';
import EditPage from './page/EditPage';
import { RecoilRoot } from 'recoil';
import Loading from './components/Loading/Loading';

const queryClient = new QueryClient();

const LandingPage = lazy(() => import('./page/LandingPage'));
const DetailArticlePage = lazy(() => import('./page/DetailArticlePage'));
// const EditPage = lazy(() => import('./page/EditPage'));
const LoginPage = lazy(() => import('./page/LoginPage'));
const AuthEditPage = Auth(EditPage, true);
const AuthLandingTab = Auth(LandingTab, false);
const App = () => {
    return (
        <>
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <NavBar />
                    <Suspense fallback={<Loading/>}>
                        <Routes>
                            <Route path="/*" element={<AuthLandingTab />} />
                            <Route path="/detail/:id" element={<DetailArticlePage />} />
                            <Route path="/edit" element={<AuthEditPage />} />
                            <Route path="/login" element={<LoginPage />} />
                        </Routes>
                    </Suspense>
                </QueryClientProvider>
            </RecoilRoot>
        </>
    );
};

export default App;
