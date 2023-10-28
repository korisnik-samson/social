import { Route, Routes } from "react-router-dom";

import SignInForm from "./_auth/forms/SignInForm.tsx";
import SignUpForm from "./_auth/forms/SignUpForm.tsx";
import { Home } from "./_root/pages";

import './globals.css';
import AuthLayout from "./_auth/AuthLayout.tsx";
import RootLayout from "./_root/RootLayout.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import Explore from "@/_root/pages/Explore.tsx";
import AllUsers from "@/_root/pages/AllUsers.tsx";
import CreatePost from "@/_root/pages/CreatePost.tsx";
import Saved from "@/_root/pages/Saved.tsx";
import EditPost from "@/_root/pages/EditPost.tsx";
import PostDetails from "@/_root/pages/PostDetails.tsx";
import Profile from "@/_root/pages/Profile.tsx";
import UpdateProfile from "@/_root/pages/UpdateProfile.tsx";

const App = () => {
    return (
        <main className="flex h-screen">
            <Routes>
                {/* public routes */}
                <Route element={<AuthLayout />}>
                    <Route path='/sign-in' element={<SignInForm />} />
                    <Route path='/sign-up' element={<SignUpForm />} />
                </Route>

                {/* private routes */}
                <Route element={<RootLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/saved" element={<Saved />} />
                    <Route path="/all-users" element={<AllUsers />} />
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route path="/update-post/:id" element={<EditPost />} />
                    <Route path="/posts/:id" element={<PostDetails />} />
                    <Route path="/profile/:id/*" element={<Profile />} />
                    <Route path="/update-profile/:id" element={<UpdateProfile />} />
                </Route>
            </Routes>

            <Toaster />
        </main>
    );
}

export default App;