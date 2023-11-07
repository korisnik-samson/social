import { SearchResultsProps } from "@/types";
import Loader from "@/components/shared/Loader.tsx";
import GridPostList from "@/components/shared/GridPostList.tsx";

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultsProps) => {
    if (isSearchFetching) return <Loader />

    if (searchedPosts && searchedPosts.documents.length > 0) {
        return (
            <GridPostList posts={searchedPosts.documents} />
        )
    }

    return (
        <p className="text-light-4 mt-10 text-center w-full">
            No Results
        </p>
    );
}

export default SearchResults;