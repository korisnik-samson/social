import React, { useEffect, useState } from "react";

import { PostStatsProps } from "@/types";
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutations";

import { Models } from "appwrite";
import { checkIsLiked } from "@/lib/utils";
import Loader from "@/components/shared/Loader";
import { useLocation } from "react-router-dom";

const PostStats = ({ post, userId }: PostStatsProps) => {
    const location = useLocation();
    const likedList = post?.likes.map((user: Models.Document) => user.id);

    const [likes, setLikes] = useState<string[]>(likedList);
    const [isSaved, setIsSaved] = useState(false);

    const { mutate: likePost } = useLikePost();
    const { mutate: savePost, isPending: isSavingPost } = useSavePost();
    const { mutate: deleteSavedPost, isPending: isDeletingSaved } = useDeleteSavedPost();

    const { data: currentUser } = useGetCurrentUser();
    const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.post.$id === post?.$id);

    useEffect(() => {
        setIsSaved(!!savedPostRecord)
    }, [currentUser, savedPostRecord]);

    const handleLikedPost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();

        let likesArray = [...likes];

        if (likesArray.includes(userId)) {
            likesArray = likesArray.filter((id) => id !== userId);
        } else {
            likesArray.push(userId)
        }

        setLikes(likesArray)
        likePost({ postId: post?.$id || '', likesArray })
    }

    const containerStyles = location.pathname.startsWith("/profile") ? "w-full" : "";

    const handleSavedPost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();

        if (savedPostRecord) {
            setIsSaved(false);
            deleteSavedPost(savedPostRecord.$id)

        } else {
            savePost({ postId: post?.$id || '', userId })
            setIsSaved(true);
        }
    }

    return (
        <div className={`flex justify-between items-center z-20 ${containerStyles}`}>
            <div className="flex gap-2 mr-5">
                <img src={checkIsLiked(likes, userId) ? '/assets/icons/liked.svg' : '/assets/icons/like.svg'}
                    alt="like" width={20} height={20} onClick={(e) => handleLikedPost(e)}
                    className="cursor-pointer" />

                <p className="small-medium lg:base-medium">{likes.length}</p>
            </div>

            <div className="flex gap-2">
                {isSavingPost || isDeletingSaved ? <Loader /> : <img src={isSaved ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'}
                      alt="save" width={20} height={20} onClick={(e) => handleSavedPost(e)}
                      className="cursor-pointer" />
                }
            </div>
        </div>
    );
}

export default PostStats;