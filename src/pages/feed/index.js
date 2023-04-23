import { firestoreApi } from "@/utils/firebase/firestore";

function Feed() {
  return (
    <div>
      Feed
      <button
        onClick={async () => {
          await firestoreApi.updateData("user", "lorake444", {
            username: "lorake444",
          });
        }}
      >
        Get Dob
      </button>
    </div>
  );
}

export default Feed;
