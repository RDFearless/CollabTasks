import collectionService from "../api/collection";
import { useSelector, useDispatch } from "react-redux";
import { Container, CollectionCard } from "../components";
import { useState, useEffect } from "react";
import { setCollection } from "../store/collectionSlice";

function Home() {
  const [collections, setCollections] = useState([]);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userCollections = useSelector((state) => state.collection.collections);

  useEffect(() => {
    setError("");
    ;(async () => {
      try {
        // if store is holding collections, use them
        if (userCollections !== null) {
          setCollections(userCollections);
        }
        // else fetch from API once, and store in redux
        else {
          const response = await collectionService.getMyCollections();
          const collectionData = response.data;

          setCollections(collectionData.collections); // update UI
          dispatch(setCollection(collectionData.collections)); // update redux store
        }
      } catch (error) {
        setError(
          error.message || "An error occurred while fetching collections."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return loading ? (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-8">
        <h2 className="text-2xl font-bold text-gray-600">
          Loading collections...
        </h2>
      </div>
    </Container>
  ) : error ? (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-8">
        <h2 className="text-xl font-bold text-red-500">Error</h2>
        <p className="text-gray-600 mt-2">{error}</p>
      </div>
    </Container>
  ) : collections.length === 0 ? (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-8">
        <h2 className="text-2xl font-bold text-gray-600">No Collections</h2>
        <p className="text-gray-500 mt-2">
          Create your first collection to get started
        </p>
      </div>
    </Container>
  ) : (
    <Container>
      <div className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Collections</h2>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {collections.length} Total
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {collections.map((collection) => (
            <CollectionCard key={collection._id} collection={collection} />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Home;
