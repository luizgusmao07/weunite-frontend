import FeedProfile from "@/components/profile/FeedProfile";
import HeaderProfile from "@/components/profile/HeaderProfile";
import { useParams } from "react-router-dom";

export function Profile() {
  const { username } = useParams<{ username: string }>();
  return (
    <>
      <div className="realative h-full mb-10">
        <HeaderProfile profileUsername={username}/>
      </div>
      <FeedProfile profileUsername={username} />
    </>
  );
}
