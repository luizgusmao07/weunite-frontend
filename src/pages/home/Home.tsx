import Post from "@/components/post/Post";

export function Home() {

  return (
     <div className="home-container" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh',
      padding: '20px',
      boxSizing: 'border-box',
      margin: '0 auto',
    }}>
      <div style={{
        width: 'fit-content',
        maxWidth: '100%',
      }}>
        <Post />
      </div>
    </div>
  );
}