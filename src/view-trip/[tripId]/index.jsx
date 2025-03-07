import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { db } from "../../service/firebaseconfig";
import { useState } from "react";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

const ViewTrip = () => {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
      setTripData(docSnap.data());
    } else {
      console.log("No such document!");
      toast.error("No such document!");
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information section */}

      <InfoSection trip={tripData} />

      {/* Recommended hotels */}
      <Hotels trip={tripData} />

      {/* Daily plan */}
      <PlacesToVisit trip={tripData} />

      {/* footer */}
      <Footer trip={tripData}/>
    </div>
  );
};

export default ViewTrip;
