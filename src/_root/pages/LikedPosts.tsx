import React from "react";
import { GridPostList, Loader } from "@/components/shared";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations.ts";

const LikedPosts = () => {
    const { data: currentUser } = useGetCurrentUser();

    if (!currentUser)
        return (
            <div className="flex-center w-full h-full">
                <Loader />
            </div>
        );

    return (
        <React.Fragment>
            {currentUser.liked.length === 0 && (
                <p className="text-light-4">No liked posts</p>
            )}

            <GridPostList posts={currentUser.liked} showStats={false}/>
        </React.Fragment>
    );
};

export default LikedPosts;