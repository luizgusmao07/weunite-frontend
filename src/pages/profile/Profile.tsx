import FeedProfile from "@/components/profile/FeedProfile";
import HeaderProfile from "@/components/profile/HeaderProfile";

export function Profile() {
    return (
        <>
            <div className="realative h-full mb-10">
                <HeaderProfile />
            </div>
            <FeedProfile />
        </>

    );
}